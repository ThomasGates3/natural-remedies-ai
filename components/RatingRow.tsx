import React from 'react';
import { StarRating } from './StarRating';

interface RatingRowProps {
    label: string;
    icon: string;
    rating: number;
}

export const RatingRow: React.FC<RatingRowProps> = React.memo(({ label, icon, rating }) => (
    <div>
        <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-subtle-onCard-light dark:text-subtle-dark">{label}</span>
            <span className="text-xs">{icon}</span>
        </div>
        <StarRating rating={rating} size="sm" />
    </div>
));
