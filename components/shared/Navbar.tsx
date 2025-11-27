'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-20 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo.png" 
            alt="Calm Logo" 
            width={80} 
            height={80}
            className="object-contain"
          />
       
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/about" className="text-dark hover:text-accent transition-colors">
            About
          </Link>
          <Link href="/therapist" className="text-dark hover:text-accent transition-colors">
            Therapist
          </Link>
          <Link href="/chat" className="text-dark hover:text-accent transition-colors">
            Chat
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-dark hover:text-accent transition-colors font-medium">
            Login
          </Link>
          <Link href="/signup">
            <button className="btn btn-primary">
              Join
            </button>
          </Link>

          
        </div>
      </div>
    </nav>
  );
}