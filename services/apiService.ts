import { Remedy, GeminiRemedyResponse } from '../types';

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:3000/api';

export const getRemedies = async (symptoms: string): Promise<Remedy[]> => {
    try {
        const response = await fetch(`${API_ENDPOINT}/remedies`, {
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
        throw new Error("Failed to communicate with the API. Please ensure the backend is running.");
    }
};
