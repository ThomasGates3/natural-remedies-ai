import React from 'react';
import { Remedy } from '../types';
import { RemedyCard, RemedyCardSkeleton } from './RemedyCard';
import { BookIcon } from './icons/LeafIcon';
import { RemedyComparisonCards } from './RemedyComparisonCards';

interface RemedyListProps {
    remedies: Remedy[];
    isSample?: boolean;
    isLoading: boolean;
    error: string | null;
    toggleFavorite: (remedy: Remedy) => void;
    isFavorite: (remedy: Remedy) => boolean;
}

export const RemedyList: React.FC<RemedyListProps> = ({ remedies, isSample, isLoading, error, toggleFavorite, isFavorite }) => {
    if (isLoading) {
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4 text-teal-900 dark:text-teal-100">Finding Remedies...</h2>
                <RemedyCardSkeleton />
                <RemedyCardSkeleton />
                <RemedyCardSkeleton />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 rounded-md" role="alert">
                <p className="font-bold">An Error Occurred</p>
                <p>{error}</p>
            </div>
        );
    }

    if (remedies.length === 0) {
        return (
            <div className="text-center py-16 px-6 bg-white dark:bg-teal-900/40 rounded-lg text-teal-900 dark:text-teal-100 border border-teal-100 dark:border-teal-800">
                <BookIcon className="h-16 w-16 mx-auto text-teal-600 dark:text-teal-400 mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Welcome to RemedyBook</h2>
                <p className="text-teal-700 dark:text-teal-300 max-w-md mx-auto">
                    Enter your symptoms above to get personalized natural remedy recommendations from our AI assistant.
                </p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold text-teal-900 dark:text-teal-100">
                    {isSample ? 'Example Recommendations' : 'AI-Powered Recommendations'}
                </h2>
                <span className="text-[10px] uppercase tracking-widest font-mono px-2 py-1 rounded-full border border-teal-400/40 text-teal-600 dark:text-teal-300">
                    {isSample ? 'Demo data' : 'Gemini 2.5'}
                </span>
            </div>
            {isSample ? (
                <p className="mb-6 text-sm text-amber-700 dark:text-amber-300">
                    No API key configured — showing curated example remedies, not live AI output. Add a server-side key to enable personalized results.
                </p>
            ) : (
                <p className="mb-6 text-sm text-teal-700/80 dark:text-teal-300/80">
                    Generated from traditional-use and peer-reviewed evidence. Ratings are AI estimates — verify with a professional.
                </p>
            )}
            <div className="space-y-6">
                {remedies.map((remedy) => (
                    <RemedyCard
                        key={remedy.name}
                        remedy={remedy}
                        isFavorite={isFavorite(remedy)}
                        onToggleFavorite={() => toggleFavorite(remedy)}
                    />
                ))}
            </div>

            <div className="mt-12">
                 <RemedyComparisonCards
                     remedies={remedies}
                     toggleFavorite={toggleFavorite}
                     isFavorite={isFavorite}
                 />
            </div>
        </div>
    );
};