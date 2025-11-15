import React from 'react';

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
    <div className="min-h-screen bg-white dark:bg-dark-green-content text-gray-900 dark:text-text-light font-display">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-bright-accent/50 to-white dark:from-energetic-green/10 dark:to-dark-green-bg -z-10"></div>
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-6xl font-extrabold text-dark-green dark:text-text-light tracking-tighter leading-tight">
            Find Natural Remedies, Instantly.
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-700 dark:text-text-muted">
            Describe your symptoms and let our AI discover personalized, natural solutions for your well-being.
          </p>

          {/* Search Input */}
          <form onSubmit={handleSubmit} className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-text-muted/50">
                healing
              </span>
              <input
                type="text"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g., 'sore throat and cough'"
                className="w-full pl-12 pr-32 py-4 text-lg bg-white dark:bg-dark-green-content border-2 border-bright-accent dark:border-dark-green-bg rounded-full shadow-lg focus:ring-2 focus:ring-energetic-green focus:border-energetic-green transition-shadow duration-300 placeholder:text-gray-400 dark:placeholder:text-text-light/40 text-gray-900 dark:text-text-light"
                disabled={isLoading}
                aria-label="Enter symptoms"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-dark-green text-white dark:text-dark-green-bg font-bold px-6 py-3 rounded-full hover:bg-opacity-90 transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading || !symptoms.trim()}
                aria-label="Find remedies"
              >
                Find Remedy
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Process Section */}
      <section id="how-it-works" className="py-20 lg:py-24 bg-white dark:bg-dark-green-content">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-energetic-green font-semibold">THE PROCESS</span>
            <h3 className="mt-2 text-3xl md:text-4xl font-bold text-dark-green dark:text-text-light tracking-tight">
              Your Path to Natural Wellness in 3 Steps
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8 bg-background-light dark:bg-dark-green-bg/50 rounded-2xl shadow-sm">
              <div className="inline-flex items-center justify-center size-16 bg-bright-accent dark:bg-energetic-green/10 text-dark-green dark:text-energetic-green rounded-full mb-4">
                <span className="material-symbols-outlined text-4xl">edit_note</span>
              </div>
              <h4 className="text-xl font-bold text-dark-green dark:text-text-light">1. Describe Your Symptoms</h4>
              <p className="mt-2 text-gray-700 dark:text-text-muted">
                Enter what you're feeling in simple terms. The more detail, the better our AI can assist you.
              </p>
            </div>

            <div className="p-8 bg-background-light dark:bg-dark-green-bg/50 rounded-2xl shadow-sm">
              <div className="inline-flex items-center justify-center size-16 bg-bright-accent dark:bg-energetic-green/10 text-dark-green dark:text-energetic-green rounded-full mb-4">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
                  model_training
                </span>
              </div>
              <h4 className="text-xl font-bold text-dark-green dark:text-text-light">2. AI Analyzes</h4>
              <p className="mt-2 text-gray-700 dark:text-text-muted">
                Our system cross-references your symptoms with a vast database of traditional and scientific knowledge.
              </p>
            </div>

            <div className="p-8 bg-background-light dark:bg-dark-green-bg/50 rounded-2xl shadow-sm">
              <div className="inline-flex items-center justify-center size-16 bg-bright-accent dark:bg-energetic-green/10 text-dark-green dark:text-energetic-green rounded-full mb-4">
                <span className="material-symbols-outlined text-4xl">local_florist</span>
              </div>
              <h4 className="text-xl font-bold text-dark-green dark:text-text-light">3. Get Recommendations</h4>
              <p className="mt-2 text-gray-700 dark:text-text-muted">
                Receive a curated list of natural remedies, complete with instructions and effectiveness ratings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section id="our-science" className="py-20 lg:py-24 bg-white dark:bg-dark-green-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <span className="text-energetic-green font-semibold">TRUSTED &amp; RELIABLE</span>
              <h3 className="mt-2 text-3xl md:text-4xl font-bold text-dark-green dark:text-text-light tracking-tight">
                Powered by Science, Guided by Nature
              </h3>
              <p className="mt-4 text-lg text-gray-700 dark:text-text-muted">
                We blend cutting-edge AI with centuries of natural wisdom to provide you with safe and effective recommendations.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 size-8 text-energetic-green">
                  <span className="material-symbols-outlined text-4xl">verified</span>
                </div>
                <div>
                  <h4 className="font-bold text-dark-green dark:text-text-light">High Accuracy AI</h4>
                  <p className="text-gray-700 dark:text-text-muted">
                    Our model is trained on peer-reviewed studies and verified sources for trustworthy results.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 size-8 text-energetic-green">
                  <span className="material-symbols-outlined text-4xl">library_books</span>
                </div>
                <div>
                  <h4 className="font-bold text-dark-green dark:text-text-light">Vast Remedy Database</h4>
                  <p className="text-gray-700 dark:text-text-muted">
                    Access thousands of remedies, from herbal solutions to lifestyle adjustments, all in one place.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 size-8 text-energetic-green">
                  <span className="material-symbols-outlined text-4xl">group_work</span>
                </div>
                <div>
                  <h4 className="font-bold text-dark-green dark:text-text-light">Partner Endorsements</h4>
                  <p className="text-gray-700 dark:text-text-muted">
                    Trusted by leading wellness experts and naturopathic practitioners.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="p-8 bg-gradient-to-br from-dark-green to-green-900 dark:from-dark-green-content dark:to-dark-green-bg rounded-3xl text-white dark:text-text-light shadow-2xl">
            <div className="aspect-[4/3] bg-green-950/50 dark:bg-dark-green-bg/50 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-3/4 h-3/4 text-white dark:text-energetic-green opacity-20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2H8C4.69 2 2 4.69 2 8v13h2V8c0-2.21 1.79-4 4-4h8c2.21 0 4 1.79 4 4v8c0 2.21-1.79 4-4 4h-3v2h3c3.31 0 6-2.69 6-6V8c0-3.31-2.69-6-6-6m-5 5c.83 0 1.5.67 1.5 1.5S11.83 10 11 10s-1.5-.67-1.5-1.5S10.17 7 11 7m3.5-2.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5M11 12c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S9.5 14.33 9.5 13.5S10.17 12 11 12m-3.5 1c.83 0 1.5.67 1.5 1.5S8.33 16 7.5 16S6 15.33 6 14.5S6.67 13 7.5 13m4.5-5c.83 0 1.5.67 1.5 1.5S12.83 11 12 11s-1.5-.67-1.5-1.5S11.17 8 12 8m1.5 6.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5Z" fill="currentColor"></path>
              </svg>
            </div>
            <p className="text-xl font-medium leading-relaxed">
              "RemedyAI is revolutionizing how we access natural health information. It's an indispensable tool for my practice."
            </p>
            <p className="mt-4 text-bright-accent/80 dark:text-text-dark/80">- Dr. Evelyn Reed, Naturopathic Doctor</p>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-20 lg:py-24 bg-white dark:bg-dark-green-content">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-energetic-green font-semibold">OUR PARTNERS</span>
          <h3 className="mt-2 text-3xl md:text-4xl font-bold text-dark-green dark:text-text-light tracking-tight mb-12">
            Trusted by Leading Wellness Organizations
          </h3>
          <p className="text-lg text-gray-700 dark:text-text-muted max-w-3xl mx-auto">
            RemedyAI partners with leading wellness experts, naturopathic practitioners, and health organizations to ensure our recommendations are backed by science and decades of natural health wisdom.
          </p>
        </div>
      </section>
    </div>
  );
};
