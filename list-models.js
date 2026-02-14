import { readFile, writeFile } from 'fs/promises';
import https from 'https';

async function listModels() {
    try {
        // Read .env file to get key
        const envContent = await readFile('.env', 'utf-8');
        const match = envContent.match(/VITE_GEMINI_API_KEY=(.+)/);

        if (!match || !match[1]) {
            console.error('Could not find VITE_GEMINI_API_KEY in .env file');
            return;
        }

        const key = match[1].trim();
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', async () => {
                try {
                    const json = JSON.parse(data);
                    if (json.error) {
                        console.error('API Error:', json.error.message);
                    } else {
                        const models = json.models || [];
                        const generateModels = models
                            .filter(m => m.supportedGenerationMethods?.includes('generateContent'))
                            .map(m => m.name)
                            .join('\n');

                        await writeFile('models.txt', generateModels);
                        console.log('Models written to models.txt');
                    }
                } catch (e) {
                    console.error('Error parsing response:', e);
                }
            });
        }).on('error', (err) => {
            console.error('Request error:', err.message);
        });

    } catch (error) {
        console.error('Error reading .env:', error.message);
    }
}

listModels();
