import React, { useState, useEffect, useRef } from 'react';
import { MicrophoneIcon, SearchIcon } from './icons/ActionIcons';

interface SymptomInputProps {
    onSearch: (symptoms: string) => void;
    isLoading: boolean;
}

// Check for SpeechRecognition API
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const isSpeechRecognitionSupported = !!SpeechRecognition;

export const SymptomInput: React.FC<SymptomInputProps> = ({ onSearch, isLoading }) => {
    const [symptoms, setSymptoms] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [speechError, setSpeechError] = useState<string | null>(null);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if (!isSpeechRecognitionSupported) return;

        recognitionRef.current = new SpeechRecognition();
        const recognition = recognitionRef.current;
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setSymptoms(transcript);
            setIsListening(false);
            onSearch(transcript);
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
            let errorMessage = 'An unexpected error occurred during speech recognition.';
            switch (event.error) {
                case 'network':
                    errorMessage = 'Speech recognition requires an internet connection. Please check your connection and try again.';
                    break;
                case 'no-speech':
                    errorMessage = 'No speech was detected. Please try again.';
                    break;
                case 'not-allowed':
                case 'service-not-allowed':
                    errorMessage = 'Microphone access was denied. Please allow microphone access in your browser settings.';
                    break;
                case 'aborted':
                    // This can happen if the user manually stops it, so we don't show an error.
                    errorMessage = '';
                    break;
            }
            if (errorMessage) {
                setSpeechError(errorMessage);
            }
            setIsListening(false);
        };

        recognition.onend = () => {
             setIsListening(false);
        };
        
        return () => {
            recognition.stop();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(symptoms);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSymptoms(e.target.value);
        if (speechError) {
            setSpeechError(null);
        }
    };

    const toggleListening = () => {
        if (speechError) {
            setSpeechError(null);
        }

        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            recognitionRef.current?.start();
        }
        setIsListening(!isListening);
    };

    return (
        <div className="max-w-2xl mx-auto mb-6">
            <form onSubmit={handleSubmit} className="relative">
                <input
                    type="text"
                    value={symptoms}
                    onChange={handleInputChange}
                    placeholder="E.g., headache, sore throat, insomnia..."
                    className="w-full pl-4 pr-24 py-4 text-lg border-2 border-slate-300 dark:border-slate-600 rounded-full bg-card-light dark:bg-card-dark text-text-onCard-light dark:text-text-dark placeholder:text-subtle-onCard-light dark:placeholder:text-subtle-dark focus:ring-2 focus:ring-primary-light focus:border-primary-light transition duration-300"
                    disabled={isLoading}
                />
                <div className="absolute inset-y-0 right-2 flex items-center space-x-1">
                    {isSpeechRecognitionSupported && (
                        <button
                            type="button"
                            onClick={toggleListening}
                            className={`p-3 rounded-full transition-colors duration-300 ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-subtle-onCard-light dark:text-subtle-dark hover:bg-slate-200/10 dark:hover:bg-slate-700'}`}
                            disabled={isLoading}
                            aria-label="Use voice input"
                        >
                            <MicrophoneIcon className="h-6 w-6" />
                        </button>
                    )}
                    <button
                        type="submit"
                        className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-colors duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center"
                        disabled={isLoading || !symptoms.trim()}
                        aria-label="Search for remedies"
                    >
                       <SearchIcon className="h-5 w-5 mr-2"/>
                       <span>Search</span>
                    </button>
                </div>
            </form>
            {speechError && (
                <p className="text-red-500 dark:text-red-400 text-sm text-center mt-2" role="alert">
                    {speechError}
                </p>
            )}
        </div>
    );
};