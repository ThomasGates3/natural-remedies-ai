import React, { useState } from 'react';
import { Remedy, HistoryItem } from '../types';
import { FavoritesPanel } from './FavoritesPanel';
import { HistoryPanel } from './HistoryPanel';

interface SidebarTabsProps {
  favorites: Remedy[];
  history: HistoryItem[];
  toggleFavorite: (remedy: Remedy) => void;
  onSearch: (symptoms: string) => void;
}

type TabType = 'favorites' | 'history';

const tabs: { id: TabType; label: string }[] = [
  { id: 'favorites', label: 'Favorites' },
  { id: 'history', label: 'History' },
];

export const SidebarTabs: React.FC<SidebarTabsProps> = ({
  favorites,
  history,
  toggleFavorite,
  onSearch,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('favorites');

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex border-b border-teal-100 dark:border-teal-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-3 font-medium text-sm transition-colors duration-200 border-b-2 ${
              activeTab === tab.id
                ? 'text-teal-700 dark:text-teal-300 border-teal-500 dark:border-teal-400'
                : 'text-teal-600 dark:text-teal-400 border-transparent hover:text-teal-700 dark:hover:text-teal-300'
            }`}
          >
            {tab.label}
            {tab.id === 'favorites' && favorites.length > 0 && (
              <span className="ml-2 inline-block bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-300 px-2 py-0.5 rounded-full text-xs">
                {favorites.length}
              </span>
            )}
            {tab.id === 'history' && history.length > 0 && (
              <span className="ml-2 inline-block bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-300 px-2 py-0.5 rounded-full text-xs">
                {history.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-fadeIn">
        {activeTab === 'favorites' && (
          <FavoritesPanel favorites={favorites} toggleFavorite={toggleFavorite} />
        )}
        {activeTab === 'history' && (
          <HistoryPanel history={history} onSearch={onSearch} />
        )}
      </div>
    </div>
  );
};
