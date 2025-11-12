import React, { useState, useRef } from 'react';

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

const CARD_WIDTH = 272; // w-64 + gap-3 = 256 + 16 = 272px
const VISIBLE_CARDS = 3;

export const TrendingRemediesCarousel: React.FC<TrendingRemediesCarouselProps> = ({
  onSearch,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -CARD_WIDTH : CARD_WIDTH;
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  React.useEffect(() => {
    checkScroll();
    const carousel = carouselRef.current;
    carousel?.addEventListener('scroll', checkScroll);
    return () => carousel?.removeEventListener('scroll', checkScroll);
  }, []);

  return (
    <div className="mt-12 animate-slideUp">
      <p className="text-sm font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-4">
        Popular Remedies
      </p>
      <div className="relative flex items-center gap-3">
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className="hidden md:flex flex-shrink-0 w-10 h-10 items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 hover:bg-teal-200 dark:hover:bg-teal-800 transition disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
          aria-label="Scroll left"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex-1 overflow-hidden">
          <div
            ref={carouselRef}
            className="flex gap-3 overflow-hidden snap-x snap-mandatory scroll-smooth"
          >
            {trendingRemedies.map((remedy) => (
              <button
                key={remedy.name}
                onClick={() => onSearch(remedy.name)}
                className="flex-shrink-0 w-full md:w-64 snap-start bg-white dark:bg-teal-900/40 border border-teal-100 dark:border-teal-800 rounded-lg p-4 hover:shadow-lg hover:scale-105 transition transform duration-300 text-left group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-teal-950"
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

        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className="hidden md:flex flex-shrink-0 w-10 h-10 items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 hover:bg-teal-200 dark:hover:bg-teal-800 transition disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
          aria-label="Scroll right"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};
