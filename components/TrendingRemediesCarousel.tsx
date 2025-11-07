import React from 'react';

interface Remedy {
  name: string;
  description: string;
}

interface TrendingRemediesCarouselProps {
  onSearch: (remedy: string) => void;
}

const trendingRemedies: Remedy[] = [
  {
    name: 'Honey',
    description: 'Natural antibacterial, soothes cough and sore throat',
  },
  {
    name: 'Apple Cider Vinegar',
    description: 'Aids digestion, boosts immunity, supports weight loss',
  },
  {
    name: 'Turmeric',
    description: 'Powerful anti-inflammatory, eases joint pain',
  },
  {
    name: 'Ginger',
    description: 'Reduces nausea, aids digestion, fights cold and flu',
  },
  {
    name: 'Lemon',
    description: 'Rich in vitamin C, detoxifies, aids digestion',
  },
];

export const TrendingRemediesCarousel: React.FC<TrendingRemediesCarouselProps> = ({
  onSearch,
}) => {
  return (
    <div className="mt-12 animate-slideUp">
      <p className="text-sm font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-4">
        Popular Remedies
      </p>
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
        {trendingRemedies.map((remedy) => (
          <button
            key={remedy.name}
            onClick={() => onSearch(remedy.name)}
            className="flex-shrink-0 w-64 snap-start bg-white dark:bg-teal-900/40 border border-teal-100 dark:border-teal-800 rounded-lg p-4 hover:shadow-lg hover:scale-105 transition transform duration-300 text-left group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-teal-950"
            aria-label={`Search for ${remedy.name}`}
          >
            <h4 className="font-semibold text-teal-900 dark:text-teal-100 mb-2 group-hover:text-teal-700 dark:group-hover:text-teal-200 transition">
              {remedy.name}
            </h4>
            <p className="text-sm text-teal-700 dark:text-teal-300 line-clamp-2">
              {remedy.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
