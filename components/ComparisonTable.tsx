import React from 'react';
import { Remedy } from '../types';

interface ComparisonTableProps {
    remedies: Remedy[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ remedies }) => {
    if (!remedies || remedies.length === 0) {
        return null;
    }

    return (
        <div className="bg-card-light dark:bg-card-dark text-text-onCard-light dark:text-text-dark p-6 rounded-xl shadow-lg border border-slate-200/20 dark:border-slate-700">
            <h2 className="text-2xl font-bold mb-6 text-center">Remedy Comparison</h2>
            <div className="overflow-x-auto">
                <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${remedies.length}, minmax(200px, 1fr))` }}>
                    {remedies.map(remedy => (
                        <div key={remedy.name} className="flex flex-col">
                            <h3 className="font-bold text-lg text-primary dark:text-primary-light p-3 bg-slate-200/10 dark:bg-slate-900/50 rounded-t-lg text-center">
                                {remedy.name}
                            </h3>
                            <div className="flex-grow p-3 bg-slate-200/5 dark:bg-slate-800/30 rounded-b-lg">
                                <div>
                                    <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Pros</h4>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-subtle-onCard-light dark:text-subtle-dark">
                                        {remedy.pros.map((pro, index) => <li key={index}>{pro}</li>)}
                                    </ul>
                                </div>
                                <div className="mt-4">
                                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">Cons</h4>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-subtle-onCard-light dark:text-subtle-dark">
                                        {remedy.cons.map((con, index) => <li key={index}>{con}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};