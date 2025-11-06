import React from 'react';
import { Remedy } from '../types';
import { RemedyCard, RemedyCardSkeleton } from './RemedyCard';
import { BookIcon } from './icons/LeafIcon';
import { RemedyComparisonCards } from './RemedyComparisonCards';

interface RemedyListProps {
    remedies: Remedy[];
    isLoading: boolean;
    error: string | null;
    toggleFavorite: (remedy: Remedy) => void;
    isFavorite: (remedy: Remedy) => boolean;
}

export const RemedyList: React.FC<RemedyListProps> = ({ remedies, isLoading, error, toggleFavorite, isFavorite }) => {
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
            <h2 className="text-3xl font-bold mb-6 text-teal-900 dark:text-teal-100">AI-Powered Recommendations</h2>
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