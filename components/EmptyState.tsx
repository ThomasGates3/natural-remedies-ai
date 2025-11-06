import React from 'react';
import { SearchIcon } from './icons/ActionIcons';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fadeIn">
      <div className="mb-6 text-teal-300 dark:text-teal-600 w-16 h-16 mx-auto">
        {icon || <SearchIcon className="w-full h-full" />}
      </div>
      <h3 className="text-2xl font-bold text-teal-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-teal-700 dark:text-teal-200 max-w-md mb-6">
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-gradient-to-r from-teal-700 to-teal-600 hover:from-teal-800 hover:to-teal-700 dark:from-teal-600 dark:to-teal-500 dark:hover:from-teal-700 dark:hover:to-teal-600 text-white font-semibold rounded-full transition transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export const NoResultsState: React.FC<{ onSearch?: () => void }> = ({ onSearch }) => (
  <EmptyState
    title="No Remedies Found"
    description="Try searching for different symptoms or be more specific with your description."
    action={
      onSearch
        ? {
            label: 'Try Another Search',
            onClick: onSearch,
          }
        : undefined
    }
  />
);

export const NoHistoryState: React.FC = () => (
  <EmptyState
    title="No Search History"
    description="Your search history will appear here once you start searching for remedies."
  />
);

export const NoFavoritesState: React.FC = () => (
  <EmptyState
    title="No Favorites Yet"
    description="Save your favorite remedies to access them quickly later."
  />
);
