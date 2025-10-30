import React, { useState } from 'react';
import { Remedy } from '../types';
import { ChevronDownIcon, ChevronUpIcon } from './icons/ActionIcons';
import { RatingRow } from './RatingRow';

interface RemedyComparisonCardsProps {
    remedies: Remedy[];
    toggleFavorite: (remedy: Remedy) => void;
    isFavorite: (remedy: Remedy) => boolean;
}

export const RemedyComparisonCards: React.FC<RemedyComparisonCardsProps> = ({
    remedies,
    toggleFavorite,
    isFavorite
}) => {
    const [expandedRemedy, setExpandedRemedy] = useState<string | null>(null);

    if (!remedies || remedies.length === 0) {
        return null;
    }

    const toggleExpanded = (remedyName: string) => {
        setExpandedRemedy(expandedRemedy === remedyName ? null : remedyName);
    };

    return (
        <div className="bg-card-light dark:bg-card-dark text-text-onCard-light dark:text-text-dark p-6 rounded-xl shadow-lg border border-slate-200/20 dark:border-slate-700">
            <h2 className="text-2xl font-bold mb-6 text-center">Remedy Comparison</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {remedies.map(remedy => (
                    <div
                        key={remedy.name}
                        className="bg-slate-200/5 dark:bg-slate-800/30 rounded-lg border border-slate-200/20 dark:border-slate-700/50 overflow-hidden flex flex-col"
                    >
                        {/* Card Header */}
                        <div className="p-4 bg-slate-200/10 dark:bg-slate-900/50 border-b border-slate-200/20 dark:border-slate-700/50">
                            <h3 className="font-bold text-lg text-primary dark:text-primary-light mb-2">
                                {remedy.name}
                            </h3>
                            <p className="text-xs text-subtle-onCard-light dark:text-subtle-dark line-clamp-2">
                                {remedy.description}
                            </p>
                        </div>

                        {/* Ratings Grid */}
                        <div className="p-4 flex-grow space-y-3">
                            <RatingRow label="Accessibility" icon="🔵" rating={remedy.ratings.accessibility} />
                            <RatingRow label="Ease of Use" icon="🟢" rating={remedy.ratings.easeOfUse} />
                            <RatingRow label="Effectiveness" icon="🟠" rating={remedy.ratings.effectiveness} />
                            <RatingRow label="Speed of Relief" icon="🔴" rating={remedy.ratings.speedOfRelief} />
                            <RatingRow label="Safety Profile" icon="💜" rating={remedy.ratings.safetyProfile} />
                        </div>

                        {/* Pros/Cons Quick View */}
                        {!expandedRemedy || expandedRemedy !== remedy.name ? (
                            <div className="p-4 bg-slate-200/5 dark:bg-slate-800/20 border-t border-slate-200/20 dark:border-slate-700/50">
                                <div className="space-y-2">
                                    <div>
                                        <h4 className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1">Pros</h4>
                                        <ul className="text-xs text-subtle-onCard-light dark:text-subtle-dark space-y-1">
                                            {remedy.pros.slice(0, 2).map((pro, index) => (
                                                <li key={index} className="flex">
                                                    <span className="mr-2">✓</span>
                                                    <span className="line-clamp-1">{pro}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ) : null}

                        {/* Expanded Details */}
                        {expandedRemedy === remedy.name && (
                            <div className="p-4 bg-slate-200/5 dark:bg-slate-800/20 border-t border-slate-200/20 dark:border-slate-700/50 max-h-60 overflow-y-auto">
                                <div className="space-y-4 text-xs text-subtle-onCard-light dark:text-subtle-dark">
                                    <div>
                                        <h4 className="font-semibold text-text-onCard-light dark:text-text-dark mb-1">Instructions</h4>
                                        <p className="whitespace-pre-wrap text-xs">{remedy.instructions}</p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-text-onCard-light dark:text-text-dark mb-1">Timeframe</h4>
                                        <p>{remedy.timeframe}</p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-text-onCard-light dark:text-text-dark mb-1">Precautions</h4>
                                        <p className="whitespace-pre-wrap">{remedy.precautions}</p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-text-onCard-light dark:text-text-dark mb-1">Background</h4>
                                        <p className="whitespace-pre-wrap">{remedy.background}</p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-green-600 dark:text-green-400 mb-1">All Pros</h4>
                                        <ul className="space-y-1">
                                            {remedy.pros.map((pro, index) => (
                                                <li key={index} className="flex">
                                                    <span className="mr-2">✓</span>
                                                    {pro}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-red-600 dark:text-red-400 mb-1">Cons</h4>
                                        <ul className="space-y-1">
                                            {remedy.cons.map((con, index) => (
                                                <li key={index} className="flex">
                                                    <span className="mr-2">✗</span>
                                                    {con}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Card Footer */}
                        <div className="p-4 bg-slate-200/10 dark:bg-slate-900/50 border-t border-slate-200/20 dark:border-slate-700/50 flex items-center justify-between">
                            <button
                                onClick={() => toggleFavorite(remedy)}
                                className={`p-2 rounded-full transition-colors ${
                                    isFavorite(remedy)
                                        ? 'bg-red-500/20 text-red-500'
                                        : 'text-subtle-onCard-light dark:text-subtle-dark hover:bg-red-500/10'
                                }`}
                                aria-label={`${isFavorite(remedy) ? 'Remove from' : 'Add to'} Book of Remedies`}
                            >
                                ❤️
                            </button>
                            <button
                                onClick={() => toggleExpanded(remedy.name)}
                                className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-200/20 dark:bg-slate-700/50 hover:bg-slate-200/30 dark:hover:bg-slate-700 transition-colors text-xs font-medium"
                                aria-label={expandedRemedy === remedy.name ? 'Hide details' : 'View details'}
                            >
                                {expandedRemedy === remedy.name ? (
                                    <>
                                        <span>Less</span>
                                        <ChevronUpIcon className="w-4 h-4" />
                                    </>
                                ) : (
                                    <>
                                        <span>More</span>
                                        <ChevronDownIcon className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
