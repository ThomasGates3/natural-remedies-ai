import React from 'react';
import { Remedy } from '../types';
import { RemedyTabs } from './RemedyTabs';

interface RemedyCardProps {
    remedy: Remedy;
    isFavorite: boolean;
    onToggleFavorite: () => void;
}

export const RemedyCard: React.FC<RemedyCardProps> = ({ remedy, isFavorite, onToggleFavorite }) => {
    return <RemedyTabs remedy={remedy} isFavorite={isFavorite} onToggleFavorite={onToggleFavorite} />;
};

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