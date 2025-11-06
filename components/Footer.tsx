import React from 'react';
import { BookIcon } from './icons/LeafIcon';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-900 dark:bg-teal-950 text-white py-12 md:py-16 border-t border-teal-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 animate-fadeIn">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <button className="flex items-center gap-2 mb-4 hover:opacity-80 transition focus:outline-none focus:ring-2 focus:ring-teal-500 rounded px-2 py-1">
              <BookIcon className="h-6 w-6 text-teal-300" />
              <span className="text-xl font-bold">RemedyAI</span>
            </button>
            <p className="text-teal-200 text-sm leading-relaxed">
              Discover natural remedies powered by AI.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-teal-100">Product</h3>
            <ul className="space-y-3 text-teal-200 text-sm">
              <li><a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-teal-500 rounded px-2 py-1">Features</a></li>
              <li><a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-teal-500 rounded px-2 py-1">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-teal-500 rounded px-2 py-1">API</a></li>
              <li><a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-teal-500 rounded px-2 py-1">Docs</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-teal-100">Company</h3>
            <ul className="space-y-3 text-teal-200 text-sm">
              <li><a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-teal-500 rounded px-2 py-1">About</a></li>
              <li><a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-teal-500 rounded px-2 py-1">Blog</a></li>
              <li><a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-teal-500 rounded px-2 py-1">Careers</a></li>
              <li><a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-teal-500 rounded px-2 py-1">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-teal-100">Legal</h3>
            <ul className="space-y-3 text-teal-200 text-sm">
              <li><a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-teal-500 rounded px-2 py-1">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-teal-500 rounded px-2 py-1">Terms</a></li>
              <li><a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-teal-500 rounded px-2 py-1">Disclaimer</a></li>
              <li><a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-teal-500 rounded px-2 py-1">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-teal-800 pt-8 text-center text-teal-300 text-sm">
          <p>&copy; {new Date().getFullYear()} RemedyAI. For informational purposes only.</p>
        </div>
      </div>
    </footer>
  );
};
