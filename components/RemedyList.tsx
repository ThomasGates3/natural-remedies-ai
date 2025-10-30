import React from 'react';
import { Remedy } from '../types';
import { RemedyCard, RemedyCardSkeleton } from './RemedyCard';
import { BookIcon } from './icons/LeafIcon';
import { ComparisonTable } from './ComparisonTable';

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
                <h2 className="text-2xl font-bold mb-4">Finding Remedies...</h2>
                <RemedyCardSkeleton />
                <RemedyCardSkeleton />
                <RemedyCardSkeleton />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-200 p-4 rounded-md" role="alert">
                <p className="font-bold">An Error Occurred</p>
                <p>{error}</p>
            </div>
        );
    }

    if (remedies.length === 0) {
        return (
            <div className="text-center py-16 px-6 bg-card-light dark:bg-card-dark rounded-lg text-text-onCard-light dark:text-text-dark">
                <BookIcon className="h-16 w-16 mx-auto text-subtle-onCard-light dark:text-subtle-dark mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Welcome to RemedyBook</h2>
                <p className="text-subtle-onCard-light dark:text-subtle-dark max-w-md mx-auto">
                    Enter your symptoms above to get personalized natural remedy recommendations from our AI assistant.
                </p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">AI-Powered Recommendations</h2>
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
                 <ComparisonTable remedies={remedies} />
            </div>
        </div>
    );
};