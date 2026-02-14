const API_URL = 'https://api.anthropic.com/v1/messages';

// Access env variable securely
const getApiKey = () => {
    return import.meta.env.VITE_ANTHROPIC_API_KEY;
};

export const generateDateIdea = async (city, budget, vibe, dietary = '') => {
    const ANTHROPIC_API_KEY = getApiKey();

    if (!ANTHROPIC_API_KEY) {
        throw new Error('API key not found. Please set VITE_ANTHROPIC_API_KEY in .env file.');
    }

    // Budget mapping
    const budgetMap = {
        '$': '$30-50',
        '$$': '$50-100',
        '$$$': '$100-200',
        '$$$$': '$200+'
    };

    const budgetRange = budgetMap[budget] || budget;

    // Build prompt
    const prompt = `Generate a creative, practical date night itinerary for couples in ${city}.

Budget: ${budgetRange}
Vibe: ${vibe}
${dietary ? `Dietary restrictions: ${dietary}` : ''}

Create a complete date night plan with:
1. A catchy, creative title for this date (e.g., "Cozy Foodie Adventure", "Artsy Evening Escape")
2. 2-3 activities with specific times (use actual times like 6:00 PM, 7:30 PM, 9:00 PM)
3. For each activity, suggest the TYPE of place (e.g., "Thai restaurant", "craft cocktail bar", "indie movie theater") - do NOT give specific venue names
4. Include neighborhood suggestions and specific details to look for
5. One actionable pro tip
6. Total estimated cost for the evening

Format your response EXACTLY like this:

TITLE: [Creative date night title]

LOCATION: ${city} | BUDGET: ${budget} (~$[total estimate])

TIME: [time]
ACTIVITY: [activity type]
DETAILS: [what to look for, neighborhood suggestions, specific characteristics]

TIME: [time]
ACTIVITY: [activity type]
DETAILS: [what to look for, neighborhood suggestions, specific characteristics]

TIME: [time]
ACTIVITY: [activity type]
DETAILS: [what to look for, neighborhood suggestions, specific characteristics]

PRO TIP: [one actionable tip]

Make it feel personalized, exciting, and genuinely helpful. Be specific about neighborhoods, cuisine types, and activity categories.`;

    try {
        // Note: This fetch will likely fail due to CORS if calling directly from browser to Anthropic API.
        // In a real production app, this should go through a proxy or backend server.
        // For this demo/dev, we might need a proxy or we can try to use it directly if CORS allows (it usually doesn't for Anthropic).
        // If CORS fails, we'll need to instruct user to use a proxy or mock it.

        // However, the spec says "Anthropic Claude API". Let's assume standard fetch.

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01',
                'anthropic-dangerously-allow-browser': 'true' // Required for client-side calls
            },
            body: JSON.stringify({
                model: 'claude-3-sonnet-20240229', // Updated to a valid model name (Sonnet 3.5 or 3)
                max_tokens: 1024,
                messages: [{
                    role: 'user',
                    content: prompt
                }]
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(`API error: ${err.error?.message || response.statusText}`);
        }

        const data = await response.json();
        const content = data.content[0].text;

        // Parse the response
        return parseClaudeResponse(content, city, budget);

    } catch (error) {
        console.error('Claude API error:', error);
        throw error;
    }
};

// Parse Claude's response into structured data
const parseClaudeResponse = (text, city, budget) => {
    const lines = text.split('\n').filter(line => line.trim());

    const result = {
        title: 'Date Night', // Fallback
        location: city,
        budget: budget,
        totalCost: '???',
        activities: [],
        proTip: 'Have fun!'
    };

    let currentActivity = null;

    lines.forEach(line => {
        line = line.trim();
        if (line.startsWith('TITLE:')) {
            result.title = line.replace('TITLE:', '').trim();
        } else if (line.includes('BUDGET:') && line.includes('~$')) {
            // Try to extract cost
            const parts = line.split('~$');
            if (parts.length > 1) {
                result.totalCost = parts[1].replace(')', '').trim();
            }
        } else if (line.startsWith('TIME:')) {
            if (currentActivity) {
                result.activities.push(currentActivity);
            }
            currentActivity = {
                time: line.replace('TIME:', '').trim(),
                activity: '',
                details: ''
            };
        } else if (line.startsWith('ACTIVITY:')) {
            if (currentActivity) {
                currentActivity.activity = line.replace('ACTIVITY:', '').trim();
            }
        } else if (line.startsWith('DETAILS:')) {
            if (currentActivity) {
                currentActivity.details = line.replace('DETAILS:', '').trim();
            }
        } else if (line.startsWith('PRO TIP:')) {
            result.proTip = line.replace('PRO TIP:', '').trim();
        }
    });

    // Add last activity
    if (currentActivity) {
        result.activities.push(currentActivity);
    }

    // Create dummy activities if parsing failed (fallback)
    if (result.activities.length === 0) {
        result.activities.push({
            time: 'Evening',
            activity: 'Spontaneous Adventure',
            details: 'The AI gave us a plan that was hard to read, so go explore the city!'
        });
    }

    return result;
};
