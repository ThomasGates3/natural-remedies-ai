import { Remedy, GeminiRemedyResponse } from '../types';
import { getRemediesDirectFromGemini } from './geminiService';

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const USE_DIRECT_API = !API_ENDPOINT; // Fall back to direct Gemini API if no backend endpoint

export const getRemedies = async (symptoms: string): Promise<Remedy[]> => {
    try {
        // In development without a backend, use direct Gemini API
        if (USE_DIRECT_API) {
            return await getRemediesDirectFromGemini(symptoms);
        }

        // In production, use Cloud Run backend
        const response = await fetch(`${API_ENDPOINT}/api/remedies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ symptoms })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const data: GeminiRemedyResponse = await response.json();
        return data.remedies || [];

    } catch (error) {
        console.error("Error fetching remedies from API:", error);
        throw new Error("Failed to communicate with the API. Please ensure the backend is running or add VITE_API_ENDPOINT to .env.local.");
    }
};
