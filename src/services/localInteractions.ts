import { DrugInteraction } from "@/types/drug";

// Define InteractionResult type for the new structure
type InteractionResult = Partial<DrugInteraction>;

export const KNOWN_INTERACTIONS: Record<string, InteractionResult[]> = {
    // --- NSAID Interactions ---
    "ASPIRIN+WARFARIN": [{
        severity: "major",
        confidence: "high",
        description: "Increases risk of bleeding.",
        mechanism: "Antiplatelet effect additive to anticoagulant effect.",
        clinicalEffects: "Risk of serious GI bleeding or hemorrhage.",
        recommendations: "Avoid concurrent use unless strictly monitored."
    }],
    "IBUPROFEN+LISINOPRIL": [{
        severity: "moderate",
        confidence: "high",
        description: "NSAIDs may diminish the antihypertensive effect of ACE inhibitors.",
        mechanism: "Inhibition of renal prostaglandins.",
        clinicalEffects: "Potential increase in blood pressure; risk of renal impairment.",
        recommendations: "Monitor blood pressure and kidney function."
    }],
    "IBUPROFEN+ASPIRIN": [{
        severity: "moderate",
        confidence: "high",
        description: "Ibuprofen may interfere with the cardioprotective effects of Aspirin.",
        mechanism: "Competitive inhibition of COX-1.",
        clinicalEffects: "Reduced cardioprotection from Aspirin.",
        recommendations: "Take Aspirin at least 30 minutes before or 8 hours after Ibuprofen."
    }],
    "NAPROXEN+LISINOPRIL": [{
        severity: "moderate",
        confidence: "high",
        description: "NSAIDs may diminish the antihypertensive effect of ACE inhibitors.",
        mechanism: "Inhibition of renal prostaglandins.",
        clinicalEffects: "Potential increase in blood pressure; risk of renal impairment.",
        recommendations: "Monitor blood pressure and kidney function."
    }],
    "NAPROXEN+WARFARIN": [{
        severity: "major",
        confidence: "high",
        description: "Increases risk of bleeding.",
        mechanism: "Antiplatelet effect additive to anticoagulant effect.",
        clinicalEffects: "Risk of serious GI bleeding or hemorrhage.",
        recommendations: "Avoid concurrent use unless strictly monitored."
    }],

    // --- Statin Interactions ---
    "SIMVASTATIN+GRAPEFRUIT": [{
        severity: "major",
        confidence: "high",
        description: "Grapefruit juice increases simvastatin levels.",
        mechanism: "Inhibition of CYP3A4 metabolism.",
        clinicalEffects: "Increased risk of myopathy and rhabdomyolysis.",
        recommendations: "Avoid grapefruit juice."
    }],
    "ATORVASTATIN+CLARITHROMYCIN": [{
        severity: "major",
        confidence: "high",
        description: "Clarithromycin increases atorvastatin levels.",
        mechanism: "Strong CYP3A4 inhibition.",
        clinicalEffects: "Increased risk of myopathy and rhabdomyolysis.",
        recommendations: "Avoid combination or use lower statin dose."
    }],
    "SIMVASTATIN+AMIODARONE": [{
        severity: "major",
        confidence: "high",
        description: "Amiodarone increases simvastatin levels.",
        mechanism: "Inhibition of CYP3A4.",
        clinicalEffects: "Increased risk of myopathy.",
        recommendations: "Do not exceed 20mg Simvastatin daily."
    }],

    // --- Antibiotic Interactions ---
    "CIPROFLOXACIN+TIZANIDINE": [{
        severity: "major",
        confidence: "high",
        description: "Ciprofloxacin dramatically increases tizanidine levels.",
        mechanism: "CYP1A2 inhibition.",
        clinicalEffects: "Hypotension, sedation, psychomotor impairment.",
        recommendations: "Contraindicated. Avoid combination."
    }],
    "DOXYCYCLINE+CALCIUM": [{
        severity: "moderate",
        confidence: "high",
        description: "Calcium supplements decrease doxycycline absorption.",
        mechanism: "Chelation complex formation.",
        clinicalEffects: "Reduced antibiotic efficacy.",
        recommendations: "Separate doses by at least 2 hours."
    }],
    "METRONIDAZOLE+ALCOHOL": [{
        severity: "major",
        confidence: "high",
        description: "Disulfiram-like reaction.",
        mechanism: "Inhibition of aldehyde dehydrogenase.",
        clinicalEffects: "Nausea, vomiting, flushing, tachycardia.",
        recommendations: "Avoid alcohol during and for 3 days after therapy."
    }],

    // --- Opioid/Sedative Interactions ---
    "OXYCODONE+ALCOHOL": [{
        severity: "major",
        confidence: "high",
        description: "Additive CNS depression.",
        mechanism: "Synergistic CNS depressant effects.",
        clinicalEffects: "Respiratory depression, sedation, coma.",
        recommendations: "Avoid alcohol concurrently."
    }],
    "DIAZEPAM+ALCOHOL": [{
        severity: "major",
        confidence: "high",
        description: "Additive CNS depression.",
        mechanism: "Synergistic CNS depressant effects.",
        clinicalEffects: "Respiratory depression, sedation.",
        recommendations: "Avoid alcohol concurrently."
    }],

    // --- Antidepressant Interactions ---
    "FLUOXETINE+TRAMADOL": [{
        severity: "major",
        confidence: "high",
        description: "Risk of Serotonin Syndrome.",
        mechanism: "Additive serotonergic effects and CYP2D6 inhibition.",
        clinicalEffects: "Serotonin syndrome, seizures, reduced tramadol efficacy.",
        recommendations: "Monitor closely or avoid."
    }],
    "SERTRALINE+ST. JOHN'S WORT": [{
        severity: "major",
        confidence: "high",
        description: "Risk of Serotonin Syndrome.",
        mechanism: "Additive serotonergic effects.",
        clinicalEffects: "Serotonin syndrome.",
        recommendations: "Avoid combination."
    }],

    // --- Common Misc ---
    "ACETAMINOPHEN+ALCOHOL": [{
        severity: "major",
        confidence: "high",
        description: "Chronic alcohol use increases risk of hepatotoxicity.",
        mechanism: "CYP2E1 induction increases toxic metabolite.",
        clinicalEffects: "Liver failure.",
        recommendations: "Avoid chronic alcohol use."
    }],
    "WARFARIN+VITAMIN K": [{
        severity: "moderate",
        confidence: "high",
        description: "Vitamin K antagonizes warfarin effects.",
        mechanism: "Direct antagonism.",
        clinicalEffects: "Reduced anticoagulation.",
        recommendations: "Maintain consistent dietary intake."
    }],
    "LISINOPRIL+POTASSIUM": [{
        severity: "major",
        confidence: "high",
        description: "Risk of hyperkalemia.",
        mechanism: "Additive potassium-retaining effects.",
        clinicalEffects: "Arrhythmias, cardiac arrest.",
        recommendations: "Monitor potassium levels closely."
    }],
    "SILDENAFIL+NITROGLYCERIN": [{
        severity: "major",
        confidence: "high",
        description: "Severe hypotension.",
        mechanism: "Synergistic vasodilation.",
        clinicalEffects: "Fatal hypotension, MI.",
        recommendations: "Contraindicated."
    }]
};

export const checkLocalInteractions = (drugs: string[]): DrugInteraction[] => {
    const interactions: DrugInteraction[] = [];
    const normalizedDrugs = drugs.map(d => d.toUpperCase());

    // Check every pair
    for (let i = 0; i < normalizedDrugs.length; i++) {
        for (let j = i + 1; j < normalizedDrugs.length; j++) {
            const drug1 = normalizedDrugs[i];
            const drug2 = normalizedDrugs[j];

            // Check both A+B and B+A keys
            const key1 = `${drug1}+${drug2}`;
            const key2 = `${drug2}+${drug1}`;

            const found = KNOWN_INTERACTIONS[key1] || KNOWN_INTERACTIONS[key2];

            if (found) {
                found.forEach(interaction => {
                    interactions.push({
                        drug1: drugs[i],
                        drug2: drugs[j],
                        severity: interaction.severity || "moderate",
                        confidence: interaction.confidence || "medium",
                        description: interaction.description || "Interaction detected.",
                        mechanism: interaction.mechanism || "",
                        clinicalEffects: interaction.clinicalEffects || "",
                        recommendations: interaction.recommendations || "",
                        citations: interaction.citations || [],
                        alternatives: interaction.alternatives || []
                    });
                });
            }
        }
    }

    return interactions;
};
