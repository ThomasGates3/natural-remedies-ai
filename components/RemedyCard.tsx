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
        <div className="bg-card-light dark:bg-card-dark text-text-onCard-light dark:text-text-dark p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-slate-200/20 dark:border-slate-700">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-2xl font-bold text-primary dark:text-primary-light">{remedy.name}</h3>
                    <p className="text-subtle-onCard-light dark:text-subtle-dark italic">{remedy.description}</p>
                </div>
                <button 
                  onClick={onToggleFavorite}
                  className={`p-2 rounded-full transition-colors duration-200 ${isFavorite ? 'text-primary bg-green-100/10' : 'text-subtle-onCard-light dark:text-subtle-dark hover:bg-slate-200/10 dark:hover:bg-slate-600'}`}
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
                        <h4 className="font-semibold text-lg mb-2">Ratings</h4>
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
        <h4 className={`font-semibold text-lg mb-1 ${isWarning ? 'text-secondary' : ''}`}>{title}</h4>
        <p className="text-subtle-onCard-light dark:text-subtle-dark text-base whitespace-pre-wrap">{content}</p>
    </div>
);

export const RemedyCardSkeleton: React.FC = () => (
    <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 animate-pulse">
        <div className="flex justify-between items-start mb-4">
            <div>
                <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-48 mb-2"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-64"></div>
            </div>
             <div className="h-10 w-10 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-32"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
                <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-40 mt-4"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
            </div>
            <div className="space-y-4">
                <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-32"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
                <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-24 mt-4"></div>
                <div className="space-y-2">
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                </div>
            </div>
        </div>
    </div>
);