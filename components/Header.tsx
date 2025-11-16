import React, { useState } from 'react';
import { SunIcon, MoonIcon } from './icons/ThemeIcons';

interface HeaderProps {
    theme: 'light' | 'dark';
    setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
    onLogoClick?: () => void;
    isLanding?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ theme, setTheme, onLogoClick, isLanding = false }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const handleLogoClick = () => {
        setMobileMenuOpen(false);
        onLogoClick?.();
    };

    const headerClasses = isLanding
        ? "absolute top-0 left-0 right-0 z-10 py-6 px-4 sm:px-6 lg:px-8"
        : "bg-white dark:bg-dark-green-bg shadow-sm sticky top-0 z-50 py-4 px-4 sm:px-6 lg:px-8";

    const textClasses = isLanding
        ? "text-dark-green/80 hover:text-dark-green dark:text-text-light/80 dark:hover:text-text-light"
        : "text-teal-800 dark:text-teal-100 hover:text-teal-600 dark:hover:text-teal-300";

    const logoTextClasses = isLanding
        ? "text-dark-green dark:text-text-light"
        : "text-teal-900 dark:text-white";

    return (
        <header className={headerClasses}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <button
                    onClick={handleLogoClick}
                    className="flex items-center gap-3 hover:opacity-80 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-energetic-green rounded-lg p-1"
                    aria-label="Go to home"
                >
                    <div className="size-8 text-energetic-green">
                        <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"></path>
                        </svg>
                    </div>
                    <h1 className={`text-2xl font-bold ${logoTextClasses}`}>RemedyAI</h1>
                </button>

                <nav className={`hidden md:flex items-center gap-6`}>
                    <a href="#how-it-works" className={`${textClasses} font-medium transition`}>How it Works</a>
                    <a href="#our-science" className={`${textClasses} font-medium transition`}>Our Science</a>
                    <a href="#partners" className={`${textClasses} font-medium transition`}>Partners</a>
                </nav>

                <div className="hidden md:flex items-center gap-2">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full text-dark-green dark:text-teal-100 hover:bg-energetic-green/20 dark:hover:bg-teal-800 transition focus:outline-none focus:ring-2 focus:ring-energetic-green"
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
                    </button>
                    <button className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${isLanding ? 'text-dark-green dark:text-text-light hover:bg-energetic-green/20' : 'text-teal-800 dark:text-teal-100 hover:bg-teal-100 dark:hover:bg-teal-800'}`}>
                        Log In
                    </button>
                    <button className="px-4 py-2 text-sm font-bold text-white bg-dark-green dark:bg-energetic-green dark:text-dark-green-bg rounded-lg hover:bg-opacity-90 transition-colors">
                        Sign Up
                    </button>
                </div>

                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className={`md:hidden ${isLanding ? 'text-dark-green dark:text-text-light' : 'text-teal-800 dark:text-teal-100'}`}
                    aria-label="Toggle mobile menu"
                    aria-expanded={mobileMenuOpen}
                >
                    <span className="material-symbols-outlined text-3xl">menu</span>
                </button>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <nav className="md:hidden mt-4 pb-4 border-t border-energetic-green/20">
                    <div className="flex flex-col space-y-3 pt-4">
                        <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className={`${textClasses} py-2 px-3 rounded transition focus:outline-none focus:ring-2 focus:ring-energetic-green`}>How it Works</a>
                        <a href="#our-science" onClick={() => setMobileMenuOpen(false)} className={`${textClasses} py-2 px-3 rounded transition focus:outline-none focus:ring-2 focus:ring-energetic-green`}>Our Science</a>
                        <a href="#partners" onClick={() => setMobileMenuOpen(false)} className={`${textClasses} py-2 px-3 rounded transition focus:outline-none focus:ring-2 focus:ring-energetic-green`}>Partners</a>
                        <button
                            onClick={toggleTheme}
                            className={`${textClasses} py-2 px-3 rounded transition focus:outline-none focus:ring-2 focus:ring-energetic-green text-left flex items-center gap-2`}
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
                            <span>Toggle Theme</span>
                        </button>
                    </div>
                </nav>
            )}
        </header>
    );
};
