import React from 'react';
import { StarIcon } from './icons/ActionIcons';

interface StarRatingProps {
    rating?: number;
    score?: number;
    label?: string;
    size?: 'sm' | 'md';
}

export const StarRating: React.FC<StarRatingProps> = ({
    rating,
    score,
    label,
    size = 'md'
}) => {
    const scoreValue = rating ?? score ?? 0;
    const sizeClass = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

    // If no label, just show stars (used in comparison cards)
    if (!label) {
        return (
            <div className="flex gap-0.5" aria-label={`Rating: ${scoreValue} out of 5 stars`}>
                {[...Array(5)].map((_, i) => (
                    <StarIcon
                        key={i}
                        className={`${sizeClass} ${i < scoreValue ? 'text-amber-400' : 'text-slate-300/40 dark:text-slate-600'}`}
                    />
                ))}
            </div>
        );
    }

    // With label (used in remedy details)
    return (
        <div className="flex items-center justify-between" aria-label={`${label}: ${scoreValue} out of 5 stars`}>
             <span className="text-sm font-medium text-subtle-onCard-light dark:text-subtle-dark">{label}</span>
            <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <StarIcon
                        key={i}
                        className={`w-5 h-5 ${i < scoreValue ? 'text-amber-400' : 'text-slate-300/40 dark:text-slate-600'}`}
                    />
                ))}
            </div>
        </div>
    );
};