import React, { useState } from 'react';
import { SunIcon, MoonIcon } from './icons/ThemeIcons';
import { BookIcon } from './icons/LeafIcon';
import { MenuIcon, CloseIcon } from './icons/ActionIcons';

interface HeaderProps {
    theme: 'light' | 'dark';
    setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
    onLogoClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, setTheme, onLogoClick }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const handleLogoClick = () => {
        setMobileMenuOpen(false);
        onLogoClick?.();
    };

    return (
        <header className="bg-white dark:bg-teal-900 shadow-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <button
                        onClick={handleLogoClick}
                        className="flex items-center space-x-3 hover:opacity-80 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 rounded-lg p-1"
                        aria-label="Go to home"
                    >
                        <BookIcon className="h-8 w-8 text-teal-600 dark:text-teal-300" />
                        <span className="text-xl font-bold text-teal-900 dark:text-white">RemedyAI</span>
                    </button>

                    <nav className="hidden md:flex items-center space-x-8 text-teal-800 dark:text-teal-100">
                        <a href="#" className="hover:text-teal-600 dark:hover:text-teal-300 transition focus:outline-none focus:ring-2 focus:ring-teal-500 rounded px-2 py-1">How it Works</a>
                        <a href="#" className="hover:text-teal-600 dark:hover:text-teal-300 transition focus:outline-none focus:ring-2 focus:ring-teal-500 rounded px-2 py-1">Our Science</a>
                        <a href="#" className="hover:text-teal-600 dark:hover:text-teal-300 transition focus:outline-none focus:ring-2 focus:ring-teal-500 rounded px-2 py-1">Partners</a>
                    </nav>

                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-teal-800 dark:text-teal-100 hover:bg-teal-100 dark:hover:bg-teal-800 transition focus:outline-none focus:ring-2 focus:ring-teal-500"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
                        </button>
                        <a href="#" className="text-teal-800 dark:text-teal-100 hover:text-teal-600 dark:hover:text-teal-300 transition hidden sm:inline focus:outline-none focus:ring-2 focus:ring-teal-500 rounded px-3 py-2">
                            Log In
                        </a>
                        <button className="px-4 sm:px-6 py-2 bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700 text-white rounded-full font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                            Sign Up
                        </button>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-full text-teal-800 dark:text-teal-100 hover:bg-teal-100 dark:hover:bg-teal-800 transition focus:outline-none focus:ring-2 focus:ring-teal-500"
                            aria-label="Toggle mobile menu"
                            aria-expanded={mobileMenuOpen}
                        >
                            {mobileMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <nav className="md:hidden pb-4 border-t border-teal-200 dark:border-teal-800 mt-4">
                        <div className="flex flex-col space-y-3">
                            <a href="#" className="text-teal-800 dark:text-teal-100 hover:text-teal-600 dark:hover:text-teal-300 py-2 px-3 rounded hover:bg-teal-50 dark:hover:bg-teal-800 transition focus:outline-none focus:ring-2 focus:ring-teal-500">How it Works</a>
                            <a href="#" className="text-teal-800 dark:text-teal-100 hover:text-teal-600 dark:hover:text-teal-300 py-2 px-3 rounded hover:bg-teal-50 dark:hover:bg-teal-800 transition focus:outline-none focus:ring-2 focus:ring-teal-500">Our Science</a>
                            <a href="#" className="text-teal-800 dark:text-teal-100 hover:text-teal-600 dark:hover:text-teal-300 py-2 px-3 rounded hover:bg-teal-50 dark:hover:bg-teal-800 transition focus:outline-none focus:ring-2 focus:ring-teal-500">Partners</a>
                            <a href="#" className="text-teal-800 dark:text-teal-100 hover:text-teal-600 dark:hover:text-teal-300 py-2 px-3 rounded hover:bg-teal-50 dark:hover:bg-teal-800 transition md:hidden focus:outline-none focus:ring-2 focus:ring-teal-500">Log In</a>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
};