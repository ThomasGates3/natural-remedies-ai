import React from 'react';
import { HistoryItem } from '../types';
import { HistoryIcon } from './icons/ActionIcons';

interface HistoryPanelProps {
    history: HistoryItem[];
    onSearch: (symptoms: string) => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSearch }) => {
    return (
        <div className="bg-card-light dark:bg-card-dark text-text-onCard-light dark:text-text-dark p-4 rounded-xl shadow-lg border border-slate-200/20 dark:border-slate-700">
            <h3 className="text-xl font-bold mb-4 flex items-center">
                <HistoryIcon className="w-6 h-6 mr-2 text-primary" />
                Search History
            </h3>
            {history.length === 0 ? (
                <p className="text-subtle-onCard-light dark:text-subtle-dark text-sm">Your recent searches will appear here.</p>
            ) : (
                <ul className="space-y-2">
                    {history.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => onSearch(item.symptoms)}
                                className="w-full text-left p-2 rounded-md hover:bg-slate-100/10 dark:hover:bg-slate-700 transition-colors duration-200 truncate"
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