import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { SymptomInput } from './components/SymptomInput';
import { RemedyList } from './components/RemedyList';
import { HistoryPanel } from './components/HistoryPanel';
import { FavoritesPanel } from './components/FavoritesPanel';
import { Disclaimer } from './components/Disclaimer';
import { Remedy, HistoryItem } from './types';
import { getRemedies } from './services/apiService';
import { DiscoverPanel } from './components/DiscoverPanel';

const App: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedTheme = window.localStorage.getItem('theme');
            if (storedTheme === 'dark' || storedTheme === 'light') {
                return storedTheme;
            }
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
        }
        return 'light';
    });

    const [remedies, setRemedies] = useState<Remedy[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [history, setHistory] = useState<HistoryItem[]>(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const savedHistory = window.localStorage.getItem('remedyHistory');
            return savedHistory ? JSON.parse(savedHistory) : [];
        }
        return [];
    });
    const [favorites, setFavorites] = useState<Remedy[]>(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const savedFavorites = window.localStorage.getItem('remedyFavorites');
            return savedFavorites ? JSON.parse(savedFavorites) : [];
        }
        return [];
    });
    
    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('remedyHistory', JSON.stringify(history));
    }, [history]);

    useEffect(() => {
        localStorage.setItem('remedyFavorites', JSON.stringify(favorites));
    }, [favorites]);

    const handleSearch = useCallback(async (symptoms: string) => {
        if (!symptoms.trim()) return;

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
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-sans transition-colors duration-300">
            <Header theme={theme} setTheme={setTheme} />
            <main className="container mx-auto p-4 md:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-primary-light mb-2">Natural Remedies AI</h1>
                    <p className="text-lg text-subtle-light dark:text-subtle-dark mb-8">
                        Discover natural remedies for your symptoms, powered by AI.
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
                    <div className="lg:col-span-3 space-y-8">
                         <FavoritesPanel favorites={favorites} toggleFavorite={toggleFavorite} />
                         <HistoryPanel history={history} onSearch={handleSearch} />
                    </div>
                </div>
            </main>
            <footer className="text-center p-4 mt-8 text-subtle-light dark:text-subtle-dark border-t border-slate-200 dark:border-slate-800">
              <p>&copy; {new Date().getFullYear()} Natural Remedies AI. For informational purposes only.</p>
            </footer>
        </div>
    );
};

export default App;