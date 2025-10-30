import React from 'react';
import { AlertIcon } from './icons/ActionIcons';

export const Disclaimer: React.FC = () => {
    return (
        <div className="fixed bottom-4 right-4 z-50 w-full max-w-xs sm:max-w-sm p-3 bg-amber-50 dark:bg-amber-900/60 backdrop-blur-sm border border-amber-500/40 rounded-lg shadow-xl">
            <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                    <AlertIcon className="h-5 w-5 text-amber-500" />
                </div>
                <div className="ml-2">
                    <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300">Medical Disclaimer</h3>
                    <div className="mt-1 text-xs text-amber-700 dark:text-amber-200">
                        <p>
                            Information is for educational purposes only and not a substitute for professional medical advice. Always consult a healthcare provider with any health concerns.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
