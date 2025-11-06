import React from 'react';
import { ListIcon, BrainIcon, CheckCircleIcon } from './icons/ActionIcons';

interface LandingPageProps {
  onSearch: (symptoms: string) => void;
  isLoading: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSearch, isLoading }) => {
  const [symptoms, setSymptoms] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symptoms.trim()) {
      onSearch(symptoms);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 lg:py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-teal-900 dark:text-white mb-4">
            Find Natural Remedies, Instantly.
          </h1>
          <p className="text-lg md:text-xl text-teal-700 dark:text-teal-100 mb-8">
            Describe your symptoms and let our AI discover personalized, natural solutions for your well-being.
          </p>

          {/* Search Input */}
          <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto mb-8">
            <div className="flex gap-2">
              <input
                type="text"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="E.g., 'sore throat and cough'"
                className="flex-1 px-6 py-4 rounded-full border-2 border-teal-200 dark:border-teal-700 bg-white dark:bg-teal-950 text-teal-900 dark:text-white placeholder:text-teal-500 dark:placeholder:text-teal-400 focus:border-teal-500 dark:focus:border-teal-400 focus:outline-none transition"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="px-8 py-4 bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700 text-white font-semibold rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading || !symptoms.trim()}
              >
                Find Remedy
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 px-4 bg-teal-50 dark:bg-teal-950/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-teal-600 dark:text-teal-400 font-semibold uppercase tracking-wide mb-2">
              The Process
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-teal-900 dark:text-white">
              Your Path to Natural Wellness in 3 Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: '1',
                title: 'Describe Your Symptoms',
                description: 'Enter what you\'re feeling in simple terms. The more detail, the better our AI can assist you.',
                icon: ListIcon,
              },
              {
                number: '2',
                title: 'AI Analyzes',
                description: 'Our system cross-references your symptoms with a vast database of traditional and scientific knowledge.',
                icon: BrainIcon,
              },
              {
                number: '3',
                title: 'Get Recommendations',
                description: 'Receive a curated list of natural remedies, complete with instructions and effectiveness ratings.',
                icon: CheckCircleIcon,
              },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="bg-white dark:bg-teal-900/40 rounded-lg p-8 text-center hover:shadow-lg transition"
                >
                  <div className="inline-block mb-6 p-4 bg-teal-100 dark:bg-teal-700 rounded-full">
                    <Icon className="w-8 h-8 text-teal-700 dark:text-teal-100" />
                  </div>
                  <h3 className="text-2xl font-bold text-teal-900 dark:text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-teal-700 dark:text-teal-200">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-teal-600 dark:text-teal-400 font-semibold uppercase tracking-wide mb-2">
                Trusted & Reliable
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-teal-900 dark:text-white mb-8">
                Powered by Science, Guided by Nature
              </h2>
              <p className="text-lg text-teal-700 dark:text-teal-200 mb-8">
                We blend cutting-edge AI with centuries of natural wisdom to provide you with safe and effective recommendations.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: 'High Accuracy AI',
                    description: 'Our model is trained on peer-reviewed studies and verified sources for trustworthy results.',
                  },
                  {
                    title: 'Vast Remedy Database',
                    description: 'Access thousands of remedies, from herbal solutions to lifestyle adjustments, all in one place.',
                  },
                  {
                    title: 'Partner Endorsements',
                    description: 'Trusted by leading wellness experts and naturopathic practitioners.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-700 dark:bg-teal-500 flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-teal-900 dark:text-white">{item.title}</h3>
                      <p className="text-teal-700 dark:text-teal-200">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial Card */}
            <div className="bg-teal-700 dark:bg-teal-800 rounded-2xl p-8 md:p-12 text-white shadow-xl">
              <div className="mb-8">
                <div className="inline-block p-4 bg-teal-800 dark:bg-teal-700 rounded-full">
                  <svg
                    className="w-12 h-12"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-4.716-5-7-5-2.302 0-7 3.926-7 8v10c0 1.077.896 3 7 3z" />
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-4.716-5-7-5-2.302 0-7 3.926-7 8v10c0 1.077.896 3 7 3z" />
                  </svg>
                </div>
              </div>
              <p className="text-lg md:text-xl mb-6 leading-relaxed">
                "RemedyAI is revolutionizing how we access natural health information. It's an indispensable tool for my practice."
              </p>
              <p className="font-semibold">— Dr. Evelyn Reed, Naturopathic Doctor</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
