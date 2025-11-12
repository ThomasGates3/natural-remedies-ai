import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { SymptomInput } from './components/SymptomInput';
import { RemedyList } from './components/RemedyList';
import { Disclaimer } from './components/Disclaimer';
import { LandingPage } from './components/LandingPage';
import { Footer } from './components/Footer';
import { Remedy, HistoryItem } from './types';
import { getRemedies } from './services/apiService';
import { DiscoverPanel } from './components/DiscoverPanel';
import { SidebarTabs } from './components/SidebarTabs';
import { useLocalStorage } from './hooks/useLocalStorage';

const getInitialTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    const stored = window.localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const App: React.FC = () => {
    const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', getInitialTheme());
    const [remedies, setRemedies] = useState<Remedy[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [history, setHistory] = useLocalStorage<HistoryItem[]>('remedyHistory', []);
    const [favorites, setFavorites] = useLocalStorage<Remedy[]>('remedyFavorites', []);
    const [hasSearched, setHasSearched] = useState<boolean>(false);

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
    }, [theme]);

    const handleLogoClick = () => {
        setHasSearched(false);
    };

    const handleSearch = useCallback(async (symptoms: string) => {
        if (!symptoms.trim()) return;

        setHasSearched(true);
        setIsLoading(true);
        setError(null);
        setRemedies([]);

        try {
            const result = await getRemedies(symptoms);
            setRemedies(result);

            const newHistoryItem: HistoryItem = { id: Date.now(), symptoms };
            setHistory(prevHistory => [newHistoryItem, ...prevHistory.filter(item => item.symptoms !== symptoms)].slice(0, 10));

        } catch (err) {
            setError('Failed to fetch remedies. The model may be unavailable or the request was blocked. Please try again later.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const toggleFavorite = useCallback((remedy: Remedy) => {
        setFavorites(prevFavorites => {
            const isFavorite = prevFavorites.some(fav => fav.name === remedy.name);
            if (isFavorite) {
                return prevFavorites.filter(fav => fav.name !== remedy.name);
            } else {
                return [...prevFavorites, remedy];
            }
        });
    }, []);

    const isFavorite = (remedy: Remedy) => {
        return favorites.some(fav => fav.name === remedy.name);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-teal-950 text-teal-900 dark:text-white font-sans transition-colors duration-300">
            <Header theme={theme} setTheme={setTheme} onLogoClick={handleLogoClick} />

            {!hasSearched ? (
                <>
                    <LandingPage onSearch={handleSearch} isLoading={isLoading} />
                    <Footer />
                </>
            ) : (
                <>
                    <main className="container mx-auto p-4 md:p-6 lg:p-8">
                        <div className="max-w-4xl mx-auto text-center mb-8">
                            <h1 className="text-4xl md:text-5xl font-bold text-teal-900 dark:text-white mb-2">Your Remedies</h1>
                            <p className="text-lg text-teal-700 dark:text-teal-200">
                                Results for your search
                            </p>
                        </div>

                        <SymptomInput onSearch={handleSearch} isLoading={isLoading} />
                        <Disclaimer />

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
                            {/* Discover Panel on the left */}
                            <div className="lg:col-span-3">
                                <DiscoverPanel onSearch={handleSearch} />
                            </div>
                            {/* Main Content in the center */}
                            <div className="lg:col-span-6">
                                <RemedyList
                                    remedies={remedies}
                                    isLoading={isLoading}
                                    error={error}
                                    toggleFavorite={toggleFavorite}
                                    isFavorite={isFavorite}
                                />
                            </div>
                            {/* Side Panels on the right */}
                            <div className="lg:col-span-3">
                                 <SidebarTabs favorites={favorites} history={history} toggleFavorite={toggleFavorite} onSearch={handleSearch} />
                            </div>
                        </div>
                    </main>
                    <Footer />
                </>
            )}
        </div>
    );
};

export default App;