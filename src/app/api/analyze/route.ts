import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `
You are an advanced Canine Nutrition and Microbiome AI Reasoning Engine.
Your task is to analyze the user's selected or inputted diet (and dog stats) and explicitly cross-reference the food's macros and the user's inputs against these 7 clinical pillars:

1. Probiotic Core: Flag if lacking heat-stable spore-forming probiotics (e.g., Bacillus subtilis DSM 15544).
2. Prebiotic Synergy: Flag if lacking diverse fibers like Baobab fruit pulp or Acacia gum.
3. Adaptogens: Flag if lacking stress-resilience bioactives like Ashwagandha (KSM-66) or Reishi.
4. Aesthetic Support: Flag if lacking Marine/Type II Collagen Peptides or Omega-3s.
5. Mineral Matrix: Flag if lacking chelated minerals (e.g., Zinc methionine).
6. Polyphenols: Flag if lacking Curcumin or Blueberry anthocyanins.

Analyze the provided food profile strictly against these pillars. Most commercial or basic custom diets will lack these advanced nutrients.
Return the result strictly as a JSON object matching this schema:
{
  "summary": "A 1-2 sentence overview of the microbiome gap analysis.",
  "hasDeficiencies": boolean,
  "pillars": [
    {
      "name": "string (The name of the pillar)",
      "status": "present" | "missing" | "insufficient",
      "analysis": "string (Brief explanation)",
      "criticalWarning": "string | null (If missing or insufficient, output a short, urgent warning message to display in red, else null)"
    }
  ]
}
No markdown formatting or backticks outside of the JSON string. Return only valid JSON.
`;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { food, stats } = body;

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.warn('GEMINI_API_KEY is missing. Returning a simulated, purely demonstrational microbiome gap analysis for the UI.');
            
            // Simulated fallback to ensure the UI renders the visual cues even without an API key.
            return NextResponse.json({
                summary: "This diet severely lacks advanced microbiome support nutrients.",
                hasDeficiencies: true,
                pillars: [
                    {
                        name: "Probiotic Core",
                        status: "missing",
                        analysis: "No heat-stable spore-forming probiotics (e.g., Bacillus subtilis DSM 15544) were detected.",
                        criticalWarning: "Critical missing nutrients: Probiotics."
                    },
                    {
                        name: "Prebiotic Synergy",
                        status: "insufficient",
                        analysis: "Lacks diverse fibers like Baobab fruit pulp or Acacia gum.",
                        criticalWarning: "Critical missing nutrients: Diverse prebiotic fiber."
                    },
                    {
                        name: "Adaptogens",
                        status: "missing",
                        analysis: "No stress-resilience bioactives like Ashwagandha (KSM-66) or Reishi found.",
                        criticalWarning: "Critical missing nutrients: Adaptogens."
                    },
                    {
                        name: "Aesthetic Support",
                        status: "missing",
                        analysis: "Missing Marine/Type II Collagen Peptides or Omega-3s.",
                        criticalWarning: "Critical missing nutrients: Aesthetic & Joint support."
                    },
                    {
                        name: "Mineral Matrix",
                        status: "insufficient",
                        analysis: "Missing chelated minerals (e.g., Zinc methionine).",
                        criticalWarning: "Critical missing nutrients: Chelated minerals."
                    },
                    {
                        name: "Polyphenols",
                        status: "missing",
                        analysis: "No Curcumin or Blueberry anthocyanins detected.",
                        criticalWarning: "Critical missing nutrients: Polyphenols."
                    }
                ]
            });
        }

        const userPrompt = `
Dog Stats (including Behavior/Stress Level and Medications): ${JSON.stringify(stats, null, 2)}
Food Profile: ${JSON.stringify(food, null, 2)}

Please thoroughly cross-reference the food's macros and the user's inputs against these 7 clinical pillars and output the required JSON.
`;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    systemInstruction: {
                        parts: [{ text: SYSTEM_PROMPT }]
                    },
                    contents: [
                        { parts: [{ text: userPrompt }] }
                    ],
                    generationConfig: {
                        responseMimeType: "application/json",
                        temperature: 0.2
                    }
                })
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Gemini API Error:', errorText);
            return NextResponse.json({ error: 'Failed to fetch from Gemini' }, { status: response.status });
        }

        const data = await response.json();
        const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!textResponse) {
             return NextResponse.json({ error: 'Invalid response from Gemini' }, { status: 500 });
        }

        const parsedJson = JSON.parse(textResponse);
        return NextResponse.json(parsedJson);

    } catch (error: any) {
        console.error('Error analyzing diet:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
