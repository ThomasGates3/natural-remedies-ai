import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-green-bg text-text-light/80">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a className="flex items-center gap-3" href="#">
              <div className="size-8 text-energetic-green">
                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"></path>
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white">RemedyAI</h1>
            </a>
            <p className="mt-4 text-sm">AI-powered natural remedies for a healthier you.</p>
          </div>

          {/* Product */}
          <div>
            <h5 className="font-bold text-white tracking-wide">Product</h5>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a className="hover:text-white transition-colors" href="#">Features</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Pricing</a></li>
              <li><a className="hover:text-white transition-colors" href="#">FAQ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="font-bold text-white tracking-wide">Company</h5>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a className="hover:text-white transition-colors" href="#">About Us</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Blog</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 className="font-bold text-white tracking-wide">Legal</h5>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a className="hover:text-white transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Terms of Service</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-energetic-green/20 pt-8 text-center text-sm">
          <p>&copy; 2024 RemedyAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
