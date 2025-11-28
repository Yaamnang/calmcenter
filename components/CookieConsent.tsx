'use client';

import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Show banner after 2 seconds on every page reload
    const timer = setTimeout(() => {
      setShowBanner(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleAcceptAll = () => {
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    setShowBanner(false);
  };

  const handleClose = () => {
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slide-up">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="relative p-6 md:p-8">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-dark/40 hover:text-dark transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#f17e65] to-[#FF8700] flex items-center justify-center">
                <Cookie className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-dark mb-2">We value your privacy</h3>
              <p className="text-dark/70 text-sm leading-relaxed">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={handleRejectAll}
                className="px-6 py-3 bg-gray-100 text-dark font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300 whitespace-nowrap"
              >
                Reject All
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-3 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
                style={{
                  background: 'linear-gradient(135deg, #f17e65 0%, #FF8700 100%)',
                }}
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}