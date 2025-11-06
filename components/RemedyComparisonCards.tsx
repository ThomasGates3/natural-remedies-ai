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
        <div className="bg-white dark:bg-teal-900/40 text-teal-900 dark:text-teal-100 p-6 rounded-xl shadow-lg border border-teal-100 dark:border-teal-800">
            <h2 className="text-2xl font-bold mb-6 text-center text-teal-900 dark:text-teal-100">Remedy Comparison</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {remedies.map(remedy => (
                    <div
                        key={remedy.name}
                        className="bg-teal-50 dark:bg-teal-900/30 rounded-lg border border-teal-100 dark:border-teal-800 overflow-hidden flex flex-col"
                    >
                        {/* Card Header */}
                        <div className="p-4 bg-teal-100 dark:bg-teal-900/50 border-b border-teal-200 dark:border-teal-800">
                            <h3 className="font-bold text-lg text-teal-700 dark:text-teal-300 mb-2">
                                {remedy.name}
                            </h3>
                            <p className="text-xs text-teal-700 dark:text-teal-300 line-clamp-2">
                                {remedy.description}
                            </p>
                        </div>

                        {/* Ratings Grid */}
                        <div className="p-4 flex-grow space-y-3">
                            <RatingRow label="Accessibility" rating={remedy.ratings.accessibility} />
                            <RatingRow label="Ease of Use" rating={remedy.ratings.easeOfUse} />
                            <RatingRow label="Effectiveness" rating={remedy.ratings.effectiveness} />
                            <RatingRow label="Speed of Relief" rating={remedy.ratings.speedOfRelief} />
                            <RatingRow label="Safety Profile" rating={remedy.ratings.safetyProfile} />
                        </div>

                        {/* Pros/Cons Quick View */}
                        {!expandedRemedy || expandedRemedy !== remedy.name ? (
                            <div className="p-4 bg-teal-50 dark:bg-teal-900/20 border-t border-teal-100 dark:border-teal-800">
                                <div className="space-y-2">
                                    <div>
                                        <h4 className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1">Pros</h4>
                                        <ul className="text-xs text-teal-700 dark:text-teal-300 space-y-1">
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
                            <div className="p-4 bg-teal-50 dark:bg-teal-900/20 border-t border-teal-100 dark:border-teal-800 max-h-60 overflow-y-auto">
                                <div className="space-y-4 text-xs text-teal-700 dark:text-teal-300">
                                    <div>
                                        <h4 className="font-semibold text-teal-900 dark:text-teal-100 mb-1">Instructions</h4>
                                        <p className="whitespace-pre-wrap text-xs">{remedy.instructions}</p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-teal-900 dark:text-teal-100 mb-1">Timeframe</h4>
                                        <p>{remedy.timeframe}</p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-teal-900 dark:text-teal-100 mb-1">Precautions</h4>
                                        <p className="whitespace-pre-wrap">{remedy.precautions}</p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-teal-900 dark:text-teal-100 mb-1">Background</h4>
                                        <p className="whitespace-pre-wrap">{remedy.background}</p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-green-700 dark:text-green-400 mb-1">All Pros</h4>
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
                                        <h4 className="font-semibold text-red-700 dark:text-red-400 mb-1">Cons</h4>
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
                        <div className="p-4 bg-teal-100 dark:bg-teal-900/50 border-t border-teal-200 dark:border-teal-800 flex items-center justify-between">
                            <button
                                onClick={() => toggleFavorite(remedy)}
                                className={`p-2 rounded-full transition-colors ${
                                    isFavorite(remedy)
                                        ? 'bg-red-500/20 text-red-500 dark:text-red-400'
                                        : 'text-teal-600 dark:text-teal-400 hover:bg-red-500/10'
                                }`}
                                aria-label={`${isFavorite(remedy) ? 'Remove from' : 'Add to'} Book of Remedies`}
                            >
                                ❤️
                            </button>
                            <button
                                onClick={() => toggleExpanded(remedy.name)}
                                className="flex items-center gap-2 px-3 py-2 rounded-full bg-teal-200 dark:bg-teal-800 hover:bg-teal-300 dark:hover:bg-teal-700 transition-colors text-xs font-medium text-teal-900 dark:text-teal-100"
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
