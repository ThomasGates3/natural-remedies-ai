import { GoogleGenAI, Type } from '@google/genai';
import { SAMPLE_REMEDIES } from '../services/sampleRemedies';

// Key is read ONLY on the server. It is never sent to the browser bundle.
const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

const ratingProp = (description: string) => ({ type: Type.INTEGER, description });

const remedySchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING, description: "The common name of the remedy (e.g., 'Ginger Tea')." },
        description: { type: Type.STRING, description: 'A brief, one-sentence summary of the remedy and its use.' },
        instructions: { type: Type.STRING, description: 'Clear, step-by-step preparation and usage instructions.' },
        timeframe: { type: Type.STRING, description: "Expected timeframe for relief (e.g., 'Within 30 minutes')." },
        precautions: { type: Type.STRING, description: 'Safety precautions, side effects, or contraindications.' },
        background: { type: Type.STRING, description: 'Short paragraph on scientific backing or traditional use.' },
        ratings: {
            type: Type.OBJECT,
            properties: {
                accessibility: ratingProp('1-5, how easy the ingredients are to obtain.'),
                easeOfUse: ratingProp('1-5, simplicity of preparation and application.'),
                effectiveness: ratingProp('1-5, general effectiveness for the symptom.'),
                speedOfRelief: ratingProp('1-5, how quickly results can be expected.'),
                safetyProfile: ratingProp('1-5, how safe the remedy is for general use.'),
            },
            required: ['accessibility', 'easeOfUse', 'effectiveness', 'speedOfRelief', 'safetyProfile'],
        },
        pros: { type: Type.ARRAY, items: { type: Type.STRING }, description: '2-3 key benefits.' },
        cons: { type: Type.ARRAY, items: { type: Type.STRING }, description: '1-2 drawbacks or side effects.' },
    },
    required: ['name', 'description', 'instructions', 'timeframe', 'precautions', 'background', 'ratings', 'pros', 'cons'],
};

const systemInstruction = `You are a knowledgeable assistant specializing in natural and traditional health remedies. Provide safe, evidence-based, practical information.
IMPORTANT SAFETY RULES:
1. For serious symptoms (chest pain, difficulty breathing, severe bleeding, signs of stroke), your ONLY response must advise seeking immediate medical attention. Do not provide remedies in such cases.
2. Prioritise remedies with scientific backing or strong traditional evidence. Avoid unsubstantiated claims.
3. Always include safety precautions, contraindications, and potential side effects for each remedy.
4. Respond ONLY with a valid JSON object matching the provided schema.`;

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const symptoms = (req.body?.symptoms || '').toString().trim().slice(0, 500);
    if (!symptoms) {
        res.status(400).json({ error: 'Missing "symptoms" in request body.' });
        return;
    }

    // Graceful fallback: no key configured -> return labeled example data.
    if (!apiKey) {
        res.status(200).json({ remedies: SAMPLE_REMEDIES, sample: true });
        return;
    }

    try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Based on the following symptom(s), provide 3 to 5 natural remedy recommendations: "${symptoms}".`,
            config: {
                systemInstruction,
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: { remedies: { type: Type.ARRAY, items: remedySchema } },
                    required: ['remedies'],
                },
            },
        });
        const parsed = JSON.parse((response.text || '').trim());
        res.status(200).json({ remedies: parsed.remedies || [], sample: false });
    } catch (error) {
        console.error('Gemini API error:', error);
        res.status(502).json({ error: 'Failed to communicate with the AI model.' });
    }
}
