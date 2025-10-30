export interface Ratings {
    accessibility: number;
    easeOfUse: number;
    effectiveness: number;
    speedOfRelief: number;
    safetyProfile: number;
}

export interface Remedy {
    name: string;
    description: string;
    instructions: string;
    timeframe: string;
    precautions: string;
    background: string;
    ratings: Ratings;
    pros: string[];
    cons: string[];
}

export interface HistoryItem {
    id: number;
    symptoms: string;
}

export interface GeminiRemedyResponse {
    remedies: Remedy[];
}