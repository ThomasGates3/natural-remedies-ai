import React from 'react';
import { HistoryItem } from '../types';
import { HistoryIcon } from './icons/ActionIcons';

interface HistoryPanelProps {
    history: HistoryItem[];
    onSearch: (symptoms: string) => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSearch }) => {
    return (
        <div className="bg-white dark:bg-teal-900/40 text-teal-900 dark:text-teal-100 p-4 rounded-xl shadow-lg border border-teal-100 dark:border-teal-800">
            <h3 className="text-xl font-bold mb-4 flex items-center text-teal-900 dark:text-teal-100">
                <HistoryIcon className="w-6 h-6 mr-2 text-teal-700 dark:text-teal-300" />
                Search History
            </h3>
            {history.length === 0 ? (
                <p className="text-teal-700 dark:text-teal-300 text-sm">Your recent searches will appear here.</p>
            ) : (
                <ul className="space-y-2">
                    {history.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => onSearch(item.symptoms)}
                                className="w-full text-left p-2 rounded-md hover:bg-teal-50 dark:hover:bg-teal-800/30 transition-colors duration-200 truncate text-teal-900 dark:text-teal-100"
                                title={item.symptoms}
                            >
                                {item.symptoms}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};