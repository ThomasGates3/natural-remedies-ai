import React from 'react';
import { Remedy } from '../types';
import { XMarkIcon } from './icons/ActionIcons';
import { BookIcon } from './icons/LeafIcon';

interface FavoritesPanelProps {
    favorites: Remedy[];
    toggleFavorite: (remedy: Remedy) => void;
}

export const FavoritesPanel: React.FC<FavoritesPanelProps> = ({ favorites, toggleFavorite }) => {
    return (
        <div className="bg-card-light dark:bg-card-dark p-4 rounded-xl shadow-lg border border-slate-200/20 dark:border-slate-700 text-text-onCard-light dark:text-text-dark">
            <h3 className="text-xl font-bold mb-4 flex items-center">
                <BookIcon className="w-6 h-6 mr-2 text-primary" />
                Favorite Remedies
            </h3>
            {favorites.length === 0 ? (
                <p className="text-subtle-onCard-light dark:text-subtle-dark text-sm">Click the book icon on a remedy to save it here.</p>
            ) : (
                <ul className="space-y-2">
                    {favorites.map((remedy) => (
                        <li key={remedy.name} className="flex justify-between items-center p-2 rounded-md bg-slate-50/10 dark:bg-slate-700/50">
                            <span className="font-medium truncate pr-2">{remedy.name}</span>
                            <button
                                onClick={() => toggleFavorite(remedy)}
                                className="p-1 text-subtle-onCard-light dark:text-subtle-dark hover:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-red-100/10 dark:hover:bg-red-900/50 transition-colors"
                                aria-label={`Remove ${remedy.name} from favorites`}
                            >
                                <XMarkIcon className="w-5 h-5"/>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};