import React from 'react';
import { ListIcon, BrainIcon, CheckCircleIcon } from './icons/ActionIcons';
import { TrendingRemediesCarousel } from './TrendingRemediesCarousel';

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
      <section className="py-16 md:py-24 lg:py-32 px-4 bg-gradient-to-b from-teal-50 to-white dark:from-teal-950 dark:to-teal-900 animate-fadeIn">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700 dark:from-teal-100 dark:via-teal-200 dark:to-teal-100 bg-clip-text text-transparent mb-4 animate-slideDown">
            Find Natural Remedies, Instantly.
          </h1>
          <p className="text-lg md:text-xl text-teal-700 dark:text-teal-100 mb-8">
            Describe your symptoms and let our AI discover personalized, natural solutions for your well-being.
          </p>

          {/* Search Input */}
          <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto mb-8 animate-slideUp">
            <div className="flex gap-2">
              <input
                type="text"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="E.g., 'sore throat and cough'"
                className="flex-1 px-6 py-4 rounded-full border-2 border-teal-200 dark:border-teal-700 bg-white dark:bg-teal-950 text-teal-900 dark:text-white placeholder:text-teal-500 dark:placeholder:text-teal-400 focus:border-teal-500 dark:focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-300 transition"
                disabled={isLoading}
                aria-label="Enter symptoms"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-teal-700 to-teal-600 hover:from-teal-800 hover:to-teal-700 dark:from-teal-600 dark:to-teal-500 dark:hover:from-teal-700 dark:hover:to-teal-600 text-white font-semibold rounded-full transition transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                disabled={isLoading || !symptoms.trim()}
                aria-label="Find remedies"
              >
                Find Remedy
              </button>
            </div>
          </form>

          {/* Trending Remedies Carousel */}
          <TrendingRemediesCarousel onSearch={onSearch} />
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 px-4 bg-teal-50 dark:bg-teal-950/30 animate-fadeIn">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slideDown">
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
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="bg-white dark:bg-teal-900/40 rounded-lg p-8 text-center hover:shadow-xl hover:scale-105 transition transform duration-300 border border-teal-100 dark:border-teal-800 hover:border-teal-300 dark:hover:border-teal-600 animate-slideUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="inline-block mb-6 p-4 bg-gradient-to-br from-teal-100 to-teal-50 dark:from-teal-700 dark:to-teal-800 rounded-full group-hover:scale-110 transition transform">
                    <Icon className="w-8 h-8 text-teal-700 dark:text-teal-100" />
                  </div>
                  <h3 className="text-2xl font-bold text-teal-900 dark:text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-teal-700 dark:text-teal-200 leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-teal-50 via-teal-100 dark:from-teal-950 dark:via-teal-900 dark:to-teal-950 to-teal-200 animate-fadeIn">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slideUp">
              <p className="text-teal-600 dark:text-teal-400 font-semibold uppercase tracking-wide mb-2">
                Trusted & Reliable
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-teal-900 dark:text-white mb-8">
                Powered by Science, Guided by Nature
              </h2>
              <p className="text-lg text-teal-700 dark:text-teal-200 mb-8 leading-relaxed">
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
                ].map((item, index) => (
                  <div key={item.title} className="flex gap-4 hover:translate-x-2 transition transform duration-300 animate-slideUp" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-teal-700 to-teal-600 dark:from-teal-500 dark:to-teal-400 flex items-center justify-center flex-none">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-teal-900 dark:text-white">{item.title}</h3>
                      <p className="text-teal-700 dark:text-teal-200 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial Card */}
            <div className="bg-gradient-to-br from-teal-700 to-teal-800 dark:from-teal-800 dark:to-teal-900 rounded-2xl p-8 md:p-12 text-white shadow-xl hover:shadow-2xl transition transform hover:scale-105 animate-slideUp" style={{ animationDelay: '0.2s' }}>
              <div className="mb-8">
                <div className="inline-block p-4 bg-teal-800/50 dark:bg-teal-700/50 rounded-full backdrop-blur">
                  <svg
                    className="w-12 h-12 text-teal-100 opacity-80"
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
