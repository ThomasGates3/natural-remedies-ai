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
        <header className="bg-white dark:bg-teal-900 shadow-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-3">
                        <BookIcon className="h-8 w-8 text-teal-600 dark:text-teal-300" />
                        <span className="text-xl font-bold text-teal-900 dark:text-white">RemedyAI</span>
                    </div>

                    <nav className="hidden md:flex items-center space-x-8 text-teal-800 dark:text-teal-100">
                        <a href="#" className="hover:text-teal-600 dark:hover:text-teal-300 transition">How it Works</a>
                        <a href="#" className="hover:text-teal-600 dark:hover:text-teal-300 transition">Our Science</a>
                        <a href="#" className="hover:text-teal-600 dark:hover:text-teal-300 transition">Partners</a>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-teal-800 dark:text-teal-100 hover:bg-teal-100 dark:hover:bg-teal-800 transition"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
                        </button>
                        <a href="#" className="text-teal-800 dark:text-teal-100 hover:text-teal-600 dark:hover:text-teal-300 transition hidden sm:inline">
                            Log In
                        </a>
                        <button className="px-6 py-2 bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700 text-white rounded-full font-semibold transition">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};