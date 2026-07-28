import { Remedy } from '../types';
import { SAMPLE_REMEDIES } from './sampleRemedies';

export interface RemedyResult {
    remedies: Remedy[];
    sample: boolean; // true = clearly-labeled example data, not live AI output
}

// The Gemini key lives ONLY on the server. The browser calls our own
// serverless endpoint (/api/remedies) and never sees the key.
export const getRemedies = async (symptoms: string): Promise<RemedyResult> => {
    try {
        // Empty base = same-origin (Vercel-style). On GCP the frontend is on a
        // different domain than the Cloud Run API, so VITE_API_ENDPOINT points at it.
        const base = import.meta.env.VITE_API_ENDPOINT ?? '';
        const response = await fetch(`${base}/api/remedies`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ symptoms }),
        });

        if (!response.ok) throw new Error(`API error: ${response.status}`);

        const data = await response.json();
        return { remedies: data.remedies || [], sample: !!data.sample };
    } catch (error) {
        // No backend reachable (e.g. plain `vite` dev with no serverless runtime):
        // fall back to labeled example data instead of erroring.
        console.warn('Backend unavailable, showing example remedies:', error);
        return { remedies: SAMPLE_REMEDIES, sample: true };
    }
};
