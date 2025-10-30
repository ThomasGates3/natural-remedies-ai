import React from 'react';
import { StarIcon } from './icons/ActionIcons';

interface StarRatingProps {
    score: number;
    label: string;
}

export const StarRating: React.FC<StarRatingProps> = ({ score, label }) => {
    return (
        <div className="flex items-center justify-between" aria-label={`${label}: ${score} out of 5 stars`}>
             <span className="text-sm font-medium text-subtle-onCard-light dark:text-subtle-dark">{label}</span>
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <StarIcon
                        key={i}
                        className={`w-5 h-5 ${i < score ? 'text-amber-400' : 'text-slate-300/40 dark:text-slate-600'}`}
                    />
                ))}
            </div>
        </div>
    );
};