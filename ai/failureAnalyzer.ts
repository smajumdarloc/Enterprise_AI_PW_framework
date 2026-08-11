import OpenAI from 'openai';
import 'dotenv/config'; 

const client = new OpenAI(
    { 
    apiKey: process.env.OPENAI_API_KEY
    }); 
    
    export async function analyzeFailure(error: string) {
         const response = await client.chat.completions.create(
            { model: 'gpt-4o-mini', messages: [
                { 
                    role: 'system', content: 'You are a senior Playwright automation architect.'
                },
                {
                    role: 'user', content: `Analyze this Playwright failure and suggest root cause and fix: 
                    ${error
                }`
            }
        ]
    }); 
    return response.choices[
        0
    ].message.content;
}