'use client';

import Link from 'next/link';
import Navbar from '@/components/shared/Navbar';
import ChatBot from '@/components/ChatBot';
import { LogIn } from 'lucide-react';
import nochat from '@/assets/nochat.png';
import Image from 'next/image';

export default function ChatPage() {
  return (
    <main className="min-h-screen relative bg-white flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        {/* Image */}
        <div className="w-120 h-120 mb-6 relative animate-fade-in-up">
          {/* Assuming the image is in public/assets/nochat.png */}
          <Image 
            src={nochat} 
            alt="No chat active" 
            className="w-full h-full object-contain opacity-90" 
          />
        </div>

        {/* Text */}
        <h2 className="text-3xl font-bold text-dark mb-3">
          Ready to Talk?
        </h2>
        <p className="text-lg text-dark/60 mb-8 max-w-md leading-relaxed">
          Please log in to access your secure, anonymous space and start chatting with a therapist.
        </p>

        {/* Action Button */}
        <Link href="/login">
          <button
            className="group flex items-center gap-3 px-10 py-4 text-white text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            style={{
              background: '#FF8700',
              borderRadius: '0 1.5rem 0 1.5rem', // Matching your brand style
              boxShadow: '0 4px 15px rgba(255, 135, 0, 0.3)'
            }}
          >
            <span>I want to chat</span>
            <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>

      <ChatBot />
    </main>
  );
}