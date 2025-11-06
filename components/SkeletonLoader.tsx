import React from 'react';

export const RemedySkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-teal-900/40 border border-teal-100 dark:border-teal-800 rounded-lg p-6 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="h-6 bg-gradient-to-r from-teal-200 to-teal-100 dark:from-teal-800 dark:to-teal-700 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gradient-to-r from-teal-100 to-teal-50 dark:from-teal-800 dark:to-teal-900 rounded w-1/2"></div>
        </div>
        <div className="w-6 h-6 bg-gradient-to-r from-teal-200 to-teal-100 dark:from-teal-800 dark:to-teal-700 rounded-full flex-shrink-0"></div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="h-4 bg-gradient-to-r from-teal-100 to-teal-50 dark:from-teal-800 dark:to-teal-900 rounded"></div>
        <div className="h-4 bg-gradient-to-r from-teal-100 to-teal-50 dark:from-teal-800 dark:to-teal-900 rounded w-5/6"></div>
      </div>

      <div className="flex gap-2">
        <div className="h-8 bg-gradient-to-r from-teal-200 to-teal-100 dark:from-teal-800 dark:to-teal-700 rounded px-3 flex-1"></div>
        <div className="h-8 bg-gradient-to-r from-teal-200 to-teal-100 dark:from-teal-800 dark:to-teal-700 rounded px-3 flex-1"></div>
      </div>
    </div>
  );
};

export const SkeletonLoader: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <RemedySkeleton key={i} />
      ))}
    </div>
  );
};

export const PanelSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-teal-900/40 border border-teal-100 dark:border-teal-800 rounded-lg p-6 animate-pulse">
      <div className="h-6 bg-gradient-to-r from-teal-200 to-teal-100 dark:from-teal-800 dark:to-teal-700 rounded w-1/2 mb-4"></div>
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i}>
            <div className="h-4 bg-gradient-to-r from-teal-100 to-teal-50 dark:from-teal-800 dark:to-teal-900 rounded mb-2"></div>
            <div className="h-3 bg-gradient-to-r from-teal-100 to-teal-50 dark:from-teal-800 dark:to-teal-900 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
