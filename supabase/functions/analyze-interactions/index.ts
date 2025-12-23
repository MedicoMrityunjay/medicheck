
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is missing");
      throw new Error("Missing API key configuration");
    }

    const { drugs } = await req.json();
    console.log("Analyzing interactions for:", drugs);

    if (!drugs || !Array.isArray(drugs) || drugs.length < 2) {
      return new Response(
        JSON.stringify({ error: "Please provide at least two drugs to analyze" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // --- NLM RXNORM INTEGRATION START ---
    let nlmInteractionsText = "No data found from official database.";
    try {
      console.log("Querying NLM RxNorm for:", drugs);
      const rxcuis: string[] = [];

      // 1. Resolve names to RxCUIs
      for (const drug of drugs) {
        const searchRes = await fetch(`https://rxnav.nlm.nih.gov/REST/approximateTerm.json?term=${encodeURIComponent(drug)}&maxEntries=1`);
        const searchData = await searchRes.json();
        const rxcui = searchData.approximateGroup?.candidate?.[0]?.rxcui;
        if (rxcui) rxcuis.push(rxcui);
      }

      // 2. Check interactions
      if (rxcuis.length > 1) {
        const sourcesString = rxcuis.join('+');
        console.log("RxCUIs found:", sourcesString);
        const interactionRes = await fetch(`https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${sourcesString}`);
        const interactionData = await interactionRes.json();

        if (interactionData.fullInteractionTypeGroup) {
          const interactions = interactionData.fullInteractionTypeGroup.flatMap((g: any) =>
            g.fullInteractionType.flatMap((t: any) => t.interactionPair.map((p: any) => p.description))
          );
          if (interactions.length > 0) {
            nlmInteractionsText = "OFFICIAL NLM DATABASE MATCHES:\n" + interactions.map((i: string) => `- ${i}`).join("\n");
          } else {
            nlmInteractionsText = "Official NLM database checked: No known interactions found between these specific IDs.";
          }
        } else {
          nlmInteractionsText = "Official NLM database checked: No known interactions found between these specific IDs.";
        }
      } else {
        nlmInteractionsText = "Could not resolve enough drugs to RxCUIs to check official database.";
      }
    } catch (apiError) {
      console.error("NLM API Error:", apiError);
      nlmInteractionsText = "Official database check failed (API Error). Proceeding with theoretical analysis.";
    }
    // --- NLM RXNORM INTEGRATION END ---

    const systemPrompt = `You are a clinical pharmacology expert and medical researcher. 
    Analyze the potential interactions between the following medications with EXTREME DEPTH and scientific precision.
    
    CRITICAL INSTRUCTION:
    I have already queried the National Library of Medicine (NLM) database. Here are the findings:
    --------------------------------------------------
    ${nlmInteractionsText}
    --------------------------------------------------
    
    YOUR JOB:
    1. If NLM found interactions, explain them clearly but with high-level pharmacological detail.
    2. If NLM found nothing, perform a rigoros theoretical analysis based on PK/PD profiles (CYP450 metabolism, P-gp transport, protein binding, QT prolongation, additive pharmacodynamics).
    
    REQUIRED DEPTH:
    - **Mechanism**: Explain the *exact* pathway (e.g., "Competitive inhibition of CYP3A4 at the intestinal enterocyte level increasing oral bioavailability").
    - **Clinical Effects**: Describe the progression of toxicity.
    - **Management**: Specific, actionable steps for the clinician.
    
    Return the response in this JSON format:
    {
      "interactions": [
        {
          "drug1": "Drug Name",
          "drug2": "Drug Name",
          "severity": "critical" | "major" | "moderate" | "minor",
          "confidence": "high" | "medium" | "low",
          "description": "Executive summary of the interaction.",
          "mechanism": "Detailed pharmacokinetic/pharmacodynamic mechanism.",
          "clinicalEffects": "Detailed symptoms and chemical markers to watch for.",
          "recommendations": "Detailed clinical management strategy.",
          "citations": [{ "source": "string", "title": "string" }],
          "alternatives": [{ "name": "string", "reason": "string" }]
        }
      ]
    }
    If no interactions are found, return: {"interactions": []}`;

    const userPrompt = `Analyze interactions between: ${drugs.join(", ")}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("AI API Error:", errorData);
      throw new Error("Failed to get AI response");
    }

    const data = await response.json();
    const result = data.choices[0].message.content;

    // Parse JSON from markdown code block if present
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    const parsedResult = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(result);

    return new Response(JSON.stringify(parsedResult), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in analyze-interactions function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
