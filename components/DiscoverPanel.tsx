import React, { useState, useEffect, useCallback } from 'react';
import { TurmericIcon, GingerIcon, EucalyptusIcon, ChamomileIcon } from './icons/RemedyIcons';
import { ChevronLeftIcon, ChevronRightIcon } from './icons/ActionIcons';

interface DiscoverPanelProps {
    onSearch: (symptoms: string) => void;
}

const trendingRemedies = [
    {
        name: 'Turmeric',
        description: 'A powerful natural anti-inflammatory to ease joint pain and swelling.',
        icon: <TurmericIcon className="w-24 h-24 mx-auto text-yellow-500" />,
    },
    {
        name: 'Ginger',
        description: 'Soothes nausea, aids digestion, and helps fight the common cold.',
        icon: <GingerIcon className="w-24 h-24 mx-auto text-amber-700" />,
    },
    {
        name: 'Eucalyptus Oil',
        description: 'Inhale to clear congestion and soothe coughs. A natural decongestant.',
        icon: <EucalyptusIcon className="w-24 h-24 mx-auto text-teal-500" />,
    },
    {
        name: 'Chamomile',
        description: 'A calming herb perfect for promoting sleep and reducing anxiety.',
        icon: <ChamomileIcon className="w-24 h-24 mx-auto text-yellow-300" />,
    }
];

export const DiscoverPanel: React.FC<DiscoverPanelProps> = ({ onSearch }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    const handleNavigation = useCallback((direction: 'next' | 'prev') => {
        setIsFading(true);
        setTimeout(() => {
            if (direction === 'next') {
                setCurrentIndex(prevIndex => (prevIndex === trendingRemedies.length - 1 ? 0 : prevIndex + 1));
            } else {
                setCurrentIndex(prevIndex => (prevIndex === 0 ? trendingRemedies.length - 1 : prevIndex - 1));
            }
            setIsFading(false);
        }, 300); // Corresponds to transition duration
    }, []);
    
    useEffect(() => {
        const timer = setInterval(() => {
            handleNavigation('next');
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(timer);
    }, [handleNavigation]);

    const currentRemedy = trendingRemedies[currentIndex];

    return (
        <div className="bg-card-light dark:bg-card-dark text-text-onCard-light dark:text-text-dark p-4 rounded-xl shadow-lg border border-slate-200/20 dark:border-slate-700 h-full flex flex-col">
            <h3 className="text-xl font-bold mb-4 text-center">Discover Trending Remedies</h3>
            <div className="flex-grow flex flex-col justify-center text-center overflow-hidden">
                {/* Carousel Content with fade transition */}
                <div className={`transition-opacity duration-300 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'} p-4`}>
                    {currentRemedy.icon}
                    <h4 className="text-2xl font-semibold mt-4 text-primary dark:text-primary-light">{currentRemedy.name}</h4>
                    <p className="text-subtle-onCard-light dark:text-subtle-dark mt-2 h-20">{currentRemedy.description}</p>
                </div>
            </div>
            
            {/* Controls */}
            <div className="flex justify-between items-center mt-4 px-2">
                 <button onClick={() => handleNavigation('prev')} className="p-2 rounded-full hover:bg-slate-200/10 dark:hover:bg-slate-700" aria-label="Previous remedy">
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
                 <button
                    onClick={() => onSearch(currentRemedy.name)}
                    className="flex-grow mx-4 px-4 py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-colors duration-300"
                >
                    Learn More
                </button>
                <button onClick={() => handleNavigation('next')} className="p-2 rounded-full hover:bg-slate-200/10 dark:hover:bg-slate-700" aria-label="Next remedy">
                    <ChevronRightIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};