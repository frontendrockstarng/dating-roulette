const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent';

const getApiKey = () => {
    return import.meta.env.VITE_GEMINI_API_KEY;
};

export const generateDateIdea = async (city, budget, vibe, dietary = '') => {
    const GEMINI_API_KEY = getApiKey();

    if (!GEMINI_API_KEY) {
        throw new Error('API key not found. Please set VITE_GEMINI_API_KEY in .env file.');
    }

    // Budget mapping - simply pass the raw string
    const budgetRange = budget;

    // Build prompt
    const prompt = `Generate 3 DISTINCT and CREATIVE date night itineraries for couples in ${city}.
Budget: ${budgetRange} (Currency: Nigerian Naira - NGN)
Vibe: ${vibe}
${dietary ? `Dietary restrictions: ${dietary}` : ''}

For each itinerary, provide a structured JSON object. The response must be a STRICT JSON ARRAY of 3 objects. Do not include markdown code fences or any other text.

Each object must have this structure:
{
  "id": 1,
  "title": "Creative Title (e.g. 'Mainland Chill')",
  "vibe": "One-line summary of the vibe (e.g. 'Cozy and intimate')",
  "totalCost": "Total estimated cost (e.g. '₦45,000')",
  "address": "A plausible address for the main venue (e.g. '123 Adetokunbo Ademola, VI, Lagos')",
  "contact_hint": "A plausible contact or social handle (e.g. 'IG: @place_name')",
  "highlight_review": "A short, catchy 1-sentence simulated review (e.g. 'Best pasta in Lagos!')",
  "activities": [
    {
      "time": "6:00 PM",
      "activity": "Specific Place Name",
      "cost": "Estimated cost",
      "details": "What to do/eat there"
    },
    ... (2-3 activities)
  ]
}

Ensure the 3 options are distinct from each other (different locations/vibes).
Make the addresses and contact info plausible based on the location (it doesn't have to be real, but looking real is good).
Ensure "activities" has specific real-world place names, not generic types.
`;

    try {
        const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(`API error: ${err.error?.message || response.statusText}`);
        }

        const data = await response.json();
        const content = data.candidates[0].content.parts[0].text;

        // Parse the response
        return parseGeminiResponse(content);

    } catch (error) {
        console.error('Gemini API error:', error);
        throw error;
    }
};

// Parse Gemini's response into structured data
const parseGeminiResponse = (text) => {
    // Clean up potential markdown code fences
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

    try {
        const json = JSON.parse(cleanText);
        // Validate it's an array
        if (Array.isArray(json)) {
            return json;
        }
        // If it returns a single object instead of array, wrap it
        return [json];
    } catch (e) {
        console.error("Failed to parse JSON response:", text);
        // Fallback or re-throw
        throw new Error("Failed to generate valid date ideas. Please try again.");
    }
};
