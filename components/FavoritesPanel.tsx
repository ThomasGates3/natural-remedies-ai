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
        <div className="bg-white dark:bg-teal-900/40 p-4 rounded-xl shadow-lg border border-teal-100 dark:border-teal-800 text-teal-900 dark:text-teal-100">
            <h3 className="text-xl font-bold mb-4 flex items-center text-teal-900 dark:text-teal-100">
                <BookIcon className="w-6 h-6 mr-2 text-teal-700 dark:text-teal-300" />
                Book of Remedies
            </h3>
            {favorites.length === 0 ? (
                <p className="text-teal-700 dark:text-teal-300 text-sm">Click the book icon on a remedy to save it here.</p>
            ) : (
                <ul className="space-y-2">
                    {favorites.map((remedy) => (
                        <li key={remedy.name} className="flex justify-between items-center p-2 rounded-md bg-teal-50 dark:bg-teal-800/30 hover:bg-teal-100 dark:hover:bg-teal-800/50 transition">
                            <span className="font-medium truncate pr-2 text-teal-900 dark:text-teal-100">{remedy.name}</span>
                            <button
                                onClick={() => toggleFavorite(remedy)}
                                className="p-1 text-teal-600 dark:text-teal-400 hover:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-red-100/10 dark:hover:bg-red-900/50 transition-colors"
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