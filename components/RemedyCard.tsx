import React from 'react';
import { Remedy } from '../types';
import { StarRating } from './StarRating';
import { BookIcon } from './icons/LeafIcon';

interface RemedyCardProps {
    remedy: Remedy;
    isFavorite: boolean;
    onToggleFavorite: () => void;
}

export const RemedyCard: React.FC<RemedyCardProps> = ({ remedy, isFavorite, onToggleFavorite }) => {
    return (
        <div className="bg-white dark:bg-teal-900/40 text-teal-900 dark:text-teal-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-teal-100 dark:border-teal-800">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-2xl font-bold text-teal-700 dark:text-teal-300">{remedy.name}</h3>
                    <p className="text-teal-600 dark:text-teal-400 italic">{remedy.description}</p>
                </div>
                <button
                  onClick={onToggleFavorite}
                  className={`p-2 rounded-full transition-colors duration-200 ${isFavorite ? 'text-teal-700 bg-teal-100 dark:text-teal-300 dark:bg-teal-700' : 'text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-800'}`}
                  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    <BookIcon className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Section title="Instructions" content={remedy.instructions} />
                    <Section title="Expected Relief" content={remedy.timeframe} />
                    <Section title="Safety Precautions" content={remedy.precautions} isWarning={true} />
                </div>
                <div>
                    <Section title="Background" content={remedy.background} />
                    <div className="mt-4">
                        <h4 className="font-semibold text-lg mb-2 text-teal-900 dark:text-teal-100">Ratings</h4>
                        <div className="space-y-2">
                           <StarRating label="Effectiveness" score={remedy.ratings.effectiveness} />
                           <StarRating label="Speed of Relief" score={remedy.ratings.speedOfRelief} />
                           <StarRating label="Ease of Use" score={remedy.ratings.easeOfUse} />
                           <StarRating label="Accessibility" score={remedy.ratings.accessibility} />
                           <StarRating label="Safety Profile" score={remedy.ratings.safetyProfile} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const Section: React.FC<{title: string; content: string; isWarning?: boolean}> = ({ title, content, isWarning }) => (
    <div className="mb-4">
        <h4 className={`font-semibold text-lg mb-1 text-teal-900 dark:text-teal-100 ${isWarning ? 'text-orange-600 dark:text-orange-400' : ''}`}>{title}</h4>
        <p className="text-teal-700 dark:text-teal-300 text-base whitespace-pre-wrap">{content}</p>
    </div>
);

export const RemedyCardSkeleton: React.FC = () => (
    <div className="bg-white dark:bg-teal-900/40 p-6 rounded-xl shadow-lg border border-teal-100 dark:border-teal-800 animate-pulse">
        <div className="flex justify-between items-start mb-4">
            <div>
                <div className="h-8 bg-gradient-to-r from-teal-200 to-teal-100 dark:from-teal-800 dark:to-teal-700 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gradient-to-r from-teal-100 to-teal-50 dark:from-teal-800 dark:to-teal-900 rounded w-64"></div>
            </div>
             <div className="h-10 w-10 bg-gradient-to-r from-teal-200 to-teal-100 dark:from-teal-800 dark:to-teal-700 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <div className="h-5 bg-gradient-to-r from-teal-200 to-teal-100 dark:from-teal-800 dark:to-teal-700 rounded w-32"></div>
                <div className="h-4 bg-gradient-to-r from-teal-100 to-teal-50 dark:from-teal-800 dark:to-teal-900 rounded w-full"></div>
                <div className="h-4 bg-gradient-to-r from-teal-100 to-teal-50 dark:from-teal-800 dark:to-teal-900 rounded w-5/6"></div>
                <div className="h-5 bg-gradient-to-r from-teal-200 to-teal-100 dark:from-teal-800 dark:to-teal-700 rounded w-40 mt-4"></div>
                <div className="h-4 bg-gradient-to-r from-teal-100 to-teal-50 dark:from-teal-800 dark:to-teal-900 rounded w-full"></div>
            </div>
            <div className="space-y-4">
                <div className="h-5 bg-gradient-to-r from-teal-200 to-teal-100 dark:from-teal-800 dark:to-teal-700 rounded w-32"></div>
                <div className="h-4 bg-gradient-to-r from-teal-100 to-teal-50 dark:from-teal-800 dark:to-teal-900 rounded w-full"></div>
                <div className="h-4 bg-gradient-to-r from-teal-100 to-teal-50 dark:from-teal-800 dark:to-teal-900 rounded w-5/6"></div>
                <div className="h-5 bg-gradient-to-r from-teal-200 to-teal-100 dark:from-teal-800 dark:to-teal-700 rounded w-24 mt-4"></div>
                <div className="space-y-2">
                    <div className="h-6 bg-gradient-to-r from-teal-100 to-teal-50 dark:from-teal-800 dark:to-teal-900 rounded w-full"></div>
                    <div className="h-6 bg-gradient-to-r from-teal-100 to-teal-50 dark:from-teal-800 dark:to-teal-900 rounded w-full"></div>
                    <div className="h-6 bg-gradient-to-r from-teal-100 to-teal-50 dark:from-teal-800 dark:to-teal-900 rounded w-full"></div>
                </div>
            </div>
        </div>
    </div>
);