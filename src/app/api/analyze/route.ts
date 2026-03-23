import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `
You are an advanced Canine Nutrition and Microbiome AI Reasoning Engine.
Your task is to analyze the user's selected or inputted diet (and dog stats) for deficiencies across these specific 7 microbiome wellness pillars:

1. Probiotic Core & Postbiotics: Check for heat-stable spore-forming probiotics (like Bacillus subtilis DSM 15544) and postbiotics (like heat-killed L. helveticus HA-122). Flag if missing.
2. Prebiotic Synergy: Check for diverse prebiotic fibers like Baobab fruit pulp, short-chain FOS, or Acacia gum. Flag standard kibble fiber as insufficient for microbiome diversity.
3. Adaptogens (Gut-Brain Axis): Check for stress-resilience bioactives like Ashwagandha (KSM-66), Reishi, or Turkey Tail mushroom. Flag if missing.
4. Aesthetic & Structural Support: Check for Marine/Type II Collagen Peptides, Glucosamine, MSM, and Omega-3s (EPA/DHA). Flag if missing.
5. Mineral Matrix: Check for chelated minerals (e.g., Zinc methionine, Magnesium glycinate, Selenium yeast). Flag if missing or if the food relies on inferior non-chelated minerals.
6. Polyphenol Bioactives: Check for Curcumin, Blueberry anthocyanins, or Quercetin. Flag if missing.

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
            console.error('GEMINI_API_KEY is missing');
            return NextResponse.json(
                { error: 'API Key not configured. Please add GEMINI_API_KEY to your environment.' },
                { status: 500 }
            );
        }

        const userPrompt = `
Dog Stats: ${JSON.stringify(stats, null, 2)}
Food Profile: ${JSON.stringify(food, null, 2)}

Please thoroughly analyze this food against the 6 pillars and output the required JSON.
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
