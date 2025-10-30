import React from 'react';
import { SunIcon, MoonIcon } from './icons/ThemeIcons';
import { BookIcon } from './icons/LeafIcon';

interface HeaderProps {
    theme: 'light' | 'dark';
    setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
}

export const Header: React.FC<HeaderProps> = ({ theme, setTheme }) => {
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <header className="bg-card-light dark:bg-card-dark shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-3">
                        <BookIcon className="h-8 w-8 text-primary" />
                        <span className="text-2xl font-bold text-text-onCard-light dark:text-text-dark">RemedyBook</span>
                    </div>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full text-subtle-onCard-light dark:text-subtle-dark hover:bg-slate-100/10 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
                    </button>
                </div>
            </div>
        </header>
    );
};