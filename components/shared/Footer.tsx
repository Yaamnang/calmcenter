'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';
import { privacyPolicy, termsAndConditions, footerText } from '@/data/legal';

export default function Footer() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayContent, setOverlayContent] = useState('');
  const [overlayTitle, setOverlayTitle] = useState('');

  const showPrivacy = () => {
    setOverlayTitle('Privacy Policy');
    setOverlayContent(privacyPolicy);
    setShowOverlay(true);
  };

  const showTerms = () => {
    setOverlayTitle('Terms and Conditions');
    setOverlayContent(termsAndConditions);
    setShowOverlay(true);
  };

  return (
    <>
      <footer className="relative z-10 bg-white/70 backdrop-blur-lg border-t border-gray-200 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Image
                  src="/logo.png"
                  alt="Calm Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </Link>
              <p className="text-lg text-dark/80 mb-3 font-medium">
                {footerText.tagline}
              </p>
              <p className="text-dark/60 mb-4">
                {footerText.description}
              </p>
              <div className="space-y-1 text-sm text-dark/60">
                <p>{footerText.contact.email}</p>
                <p className="text-accent font-semibold">{footerText.contact.helpline}</p>
              </div>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-semibold text-dark mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={showPrivacy}
                    className="text-dark/70 hover:text-accent transition-colors text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={showTerms}
                    className="text-dark/70 hover:text-accent transition-colors text-left"
                  >
                    Terms & Conditions
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright - Centered */}
          <div className="text-center mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-dark/50">
              {footerText.copyright}
            </p>
          </div>
        </div>
      </footer>

      {/* Overlay */}
      {showOverlay && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-dark">{overlayTitle}</h2>
              <button
                onClick={() => setShowOverlay(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-dark/60" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)] prose prose-sm max-w-none">
              <div
                className="text-dark/80 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: overlayContent
                    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-dark mt-6 mb-4">$1</h1>')
                    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold text-dark mt-5 mb-3">$1</h2>')
                    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold text-dark mt-4 mb-2">$1</h3>')
                    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-dark">$1</strong>')
                    .replace(/^- (.+)$/gm, '<li class="ml-6 mb-2">$1</li>')
                    .replace(/\n\n/g, '<br/><br/>')
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
