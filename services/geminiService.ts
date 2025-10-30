import { GoogleGenAI, Type } from "@google/genai";
import { Remedy, GeminiRemedyResponse } from '../types';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey });

const remedySchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING, description: "The common name of the remedy (e.g., 'Ginger Tea', 'Peppermint Oil')." },
        description: { type: Type.STRING, description: "A brief, one-sentence summary of what the remedy is and what it's used for." },
        instructions: { type: Type.STRING, description: "Clear, step-by-step instructions on how to prepare and use the remedy." },
        timeframe: { type: Type.STRING, description: "Expected timeframe for relief (e.g., 'Within 30 minutes', '2-3 times a day for a week')." },
        precautions: { type: Type.STRING, description: "Important safety precautions, potential side effects, or contraindications (e.g., 'Avoid if pregnant', 'May interact with blood thinners')." },
        background: { type: Type.STRING, description: "A short paragraph on the scientific backing or traditional use background of the remedy." },
        ratings: {
            type: Type.OBJECT,
            properties: {
                accessibility: { type: Type.INTEGER, description: "Rating (1-5) of how easy it is to obtain the ingredients. 1=very difficult, 5=very easy." },
                easeOfUse: { type: Type.INTEGER, description: "Rating (1-5) of the simplicity of preparation and application. 1=very complex, 5=very simple." },
                effectiveness: { type: Type.INTEGER, description: "Rating (1-5) of the remedy's general effectiveness for the symptom. 1=low, 5=high." },
                speedOfRelief: { type: Type.INTEGER, description: "Rating (1-5) of how quickly results can be expected. 1=very slow, 5=very fast." },
                safetyProfile: { type: Type.INTEGER, description: "Rating (1-5) of how safe the remedy is for general use. 1=use with caution, 5=very safe." }
            },
            required: ["accessibility", "easeOfUse", "effectiveness", "speedOfRelief", "safetyProfile"]
        },
        pros: { type: Type.ARRAY, items: { type: Type.STRING }, description: "An array of 2-3 bullet points listing the pros or key benefits of the remedy." },
        cons: { type: Type.ARRAY, items: { type: Type.STRING }, description: "An array of 1-2 bullet points listing the cons, drawbacks, or minor side effects." }
    },
    required: ["name", "description", "instructions", "timeframe", "precautions", "background", "ratings", "pros", "cons"]
};

export const getRemedies = async (symptoms: string): Promise<Remedy[]> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Based on the following symptom(s), provide 3 to 5 natural remedy recommendations: "${symptoms}".`,
            config: {
                systemInstruction: `You are a helpful and knowledgeable assistant specializing in natural and traditional health remedies. Your primary goal is to provide safe, evidence-based, and practical information.

                IMPORTANT SAFETY RULES:
                1.  You MUST include a clear disclaimer with every response: "The information provided is for educational purposes only and is not a substitute for professional medical advice. Always consult with a healthcare provider for any health concerns or before starting a new treatment."
                2.  For serious symptoms (e.g., chest pain, difficulty breathing, severe bleeding, signs of stroke), your ONLY response should be to advise seeking immediate medical attention from a professional healthcare provider or emergency services. Do not provide any remedies in such cases.
                3.  Prioritize remedies with some level of scientific backing or strong traditional evidence. Avoid making unsubstantiated claims.
                4.  Always include clear safety precautions, contraindications, and potential side effects for each remedy.
                5.  Format your response as a valid JSON object according to the provided schema. Do not add any text or markdown formatting before or after the JSON object.`,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        remedies: {
                            type: Type.ARRAY,
                            items: remedySchema
                        }
                    },
                    required: ["remedies"]
                }
            }
        });
        
        const jsonText = response.text.trim();
        const parsedResponse: GeminiRemedyResponse = JSON.parse(jsonText);
        
        return parsedResponse.remedies || [];

    } catch (error) {
        console.error("Error fetching remedies from Gemini API:", error);
        throw new Error("Failed to communicate with the AI model.");
    }
};