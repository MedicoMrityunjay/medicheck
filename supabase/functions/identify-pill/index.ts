import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: "Image is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert pharmacist and pill identification specialist. Analyze the provided pill image and identify it.

IMPORTANT: You must respond with ONLY a valid JSON object, no markdown, no code blocks, no additional text.

Analyze these visual characteristics:
- Shape (round, oval, oblong, capsule, tablet, etc.)
- Color(s) (front and back if visible)
- Imprint/markings (letters, numbers, logos, score lines)
- Size estimation
- Coating type (film-coated, sugar-coated, uncoated)

Response format (JSON only):
{
  "identified": true/false,
  "confidence": "high" | "medium" | "low",
  "pillInfo": {
    "name": "Drug name (generic)",
    "brandNames": ["Brand name 1", "Brand name 2"],
    "strength": "Dosage strength",
    "manufacturer": "Manufacturer if identifiable",
    "drugClass": "Therapeutic class",
    "commonUses": ["Use 1", "Use 2"],
    "description": "Brief description of the medication"
  },
  "visualCharacteristics": {
    "shape": "Shape description",
    "color": "Color description",
    "imprint": "Imprint text/markings",
    "size": "Approximate size",
    "coating": "Coating type"
  },
  "warnings": ["Important warning 1", "Important warning 2"],
  "disclaimer": "Always verify with a pharmacist. This is for informational purposes only.",
  "possibleAlternatives": [
    {
      "name": "Alternative drug name",
      "reason": "Why it might be this pill"
    }
  ]
}

If you cannot identify the pill or the image is unclear, set identified to false and provide what information you can observe.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Please identify this pill from the image. Provide detailed information about what medication this appears to be.",
              },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64,
                },
              },
            ],
          },
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No response from AI");
    }

    // Parse the JSON response
    let pillData;
    try {
      const cleanedContent = content.replace(/```json\n?|\n?```/g, "").trim();
      pillData = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error("Parse error:", parseError);
      pillData = {
        identified: false,
        confidence: "low",
        pillInfo: null,
        visualCharacteristics: {
          shape: "Unable to determine",
          color: "Unable to determine",
          imprint: "Unable to determine",
          size: "Unable to determine",
          coating: "Unable to determine",
        },
        warnings: ["Could not parse pill identification results"],
        disclaimer: "Always verify with a pharmacist. This is for informational purposes only.",
        rawResponse: content,
      };
    }

    return new Response(JSON.stringify(pillData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in identify-pill function:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to identify pill";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
