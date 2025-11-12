import React, { useState } from 'react';
import { Remedy } from '../types';
import { StarRating } from './StarRating';

interface RemedyTabsProps {
  remedy: Remedy;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

type TabType = 'overview' | 'how-to-use' | 'safety' | 'science' | 'reviews';

const tabs: { id: TabType; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'how-to-use', label: 'How to Use' },
  { id: 'safety', label: 'Safety' },
  { id: 'science', label: 'Science' },
  { id: 'reviews', label: 'Reviews' },
];

export const RemedyTabs: React.FC<RemedyTabsProps> = ({
  remedy,
  isFavorite,
  onToggleFavorite,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  return (
    <div className="bg-white dark:bg-teal-900/40 text-teal-900 dark:text-teal-100 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-teal-100 dark:border-teal-800">
      {/* Header with favorite button */}
      <div className="p-6 border-b border-teal-100 dark:border-teal-800">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-teal-700 dark:text-teal-300">
              {remedy.name}
            </h3>
            <p className="text-teal-600 dark:text-teal-400 italic">
              {remedy.description}
            </p>
          </div>
          <button
            onClick={onToggleFavorite}
            className={`flex-shrink-0 p-2 rounded-full transition-colors duration-200 ml-4 ${
              isFavorite
                ? 'text-teal-700 bg-teal-100 dark:text-teal-300 dark:bg-teal-700'
                : 'text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-800'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg
              className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h6a2 2 0 012 2v12a1 1 0 01-1 1H6a1 1 0 01-1-1V5z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-teal-100 dark:border-teal-800 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors duration-200 border-b-2 ${
              activeTab === tab.id
                ? 'text-teal-700 dark:text-teal-300 border-teal-500 dark:border-teal-400'
                : 'text-teal-600 dark:text-teal-400 border-transparent hover:text-teal-700 dark:hover:text-teal-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-lg mb-2 text-teal-900 dark:text-teal-100">
                About
              </h4>
              <p className="text-teal-700 dark:text-teal-300 whitespace-pre-wrap">
                {remedy.description}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-3 text-teal-900 dark:text-teal-100">
                Quick Ratings
              </h4>
              <div className="space-y-2">
                <StarRating
                  label="Effectiveness"
                  score={remedy.ratings.effectiveness}
                />
                <StarRating
                  label="Speed of Relief"
                  score={remedy.ratings.speedOfRelief}
                />
                <StarRating label="Ease of Use" score={remedy.ratings.easeOfUse} />
                <StarRating
                  label="Accessibility"
                  score={remedy.ratings.accessibility}
                />
                <StarRating
                  label="Safety Profile"
                  score={remedy.ratings.safetyProfile}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'how-to-use' && (
          <div className="space-y-4">
            <Section title="Instructions" content={remedy.instructions} />
            <Section title="Expected Relief" content={remedy.timeframe} />
          </div>
        )}

        {activeTab === 'safety' && (
          <Section
            title="Safety Precautions"
            content={remedy.precautions}
            isWarning={true}
          />
        )}

        {activeTab === 'science' && (
          <Section title="Scientific Background" content={remedy.background} />
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-teal-900 dark:text-teal-100">
              Detailed Ratings
            </h4>
            <div className="space-y-2">
              <StarRating
                label="Effectiveness"
                score={remedy.ratings.effectiveness}
              />
              <StarRating
                label="Speed of Relief"
                score={remedy.ratings.speedOfRelief}
              />
              <StarRating label="Ease of Use" score={remedy.ratings.easeOfUse} />
              <StarRating
                label="Accessibility"
                score={remedy.ratings.accessibility}
              />
              <StarRating
                label="Safety Profile"
                score={remedy.ratings.safetyProfile}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Section: React.FC<{
  title: string;
  content: string;
  isWarning?: boolean;
}> = ({ title, content, isWarning }) => (
  <div>
    <h4
      className={`font-semibold text-lg mb-2 text-teal-900 dark:text-teal-100 ${
        isWarning ? 'text-orange-600 dark:text-orange-400' : ''
      }`}
    >
      {title}
    </h4>
    <p className="text-teal-700 dark:text-teal-300 text-base whitespace-pre-wrap">
      {content}
    </p>
  </div>
);
