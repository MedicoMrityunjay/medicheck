import { DrugInteraction } from "@/types/drug";

// NLM RxNav Interaction API
const INTERACTION_API_BASE = "https://rxnav.nlm.nih.gov/REST/interaction/list.json";

export const checkOnlineInteractions = async (rxcuis: string[]): Promise<DrugInteraction[]> => {
    if (rxcuis.length < 2) return [];

    // Filter out empty RxCUIs
    const validRxcuis = rxcuis.filter(id => id && id.length > 0);
    if (validRxcuis.length < 2) return [];

    try {
        const params = new URLSearchParams();
        params.append("rxcuis", validRxcuis.join("+"));

        // Construct URL manually to avoid encoding issues with the '+' separator if needed, 
        // but URLSearchParams usually encodes '+' as '%2B' which NLM might not like if it expects literal '+'.
        // NLM RxNav documentation says "rxcuis=207106+152923+656659"
        // Let's try manual string construction to be safe with the NLM specific format.
        const queryString = `rxcuis=${validRxcuis.join("+")}`;
        const url = `${INTERACTION_API_BASE}?${queryString}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`NLM API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return parseInteractionResponse(data, validRxcuis);

    } catch (error) {
        console.error("Failed to fetch interactions:", error);
        throw error;
    }
};

const parseInteractionResponse = (data: any, requestedRxcuis: string[]): DrugInteraction[] => {
    const interactions: DrugInteraction[] = [];

    if (!data.fullInteractionTypeGroup) return [];

    // Iterate through interaction groups (usually by source, e.g., ONCHigh)
    data.fullInteractionTypeGroup.forEach((group: any) => {
        // We prefer 'ONCHigh' source if available as it denotes "high priority" interactions
        // But we process all of them.

        if (group.fullInteractionType) {
            group.fullInteractionType.forEach((type: any) => {
                // Each 'type' is a pair of drugs interacting

                // Extract the drugs involved in this specific pair
                // usually type.minConcept represents the drugs
                const drug1 = type.minConcept[0]?.name;
                const drug2 = type.minConcept[1]?.name;

                if (type.interactionPair) {
                    type.interactionPair.forEach((pair: any) => {
                        interactions.push({
                            drug1: drug1 || "Drug A",
                            drug2: drug2 || "Drug B",
                            severity: pair.severity === "high" ? "major" : "moderate", // NLM usually returns 'high' or 'N/A'
                            confidence: "high", // Clinical data is usually high confidence
                            description: pair.description,
                            mechanism: "See full clinical details.", // NLM API v1 sometimes lacks mechanism text in this endpoint
                            recommendations: "Consult healthcare provider.", // Generic recommendation since API might not provide granular actionable text here without deep parsing
                            clinicalEffects: "Potential adverse interaction."
                        });
                    });
                }
            });
        }
    });

    return interactions;
};
