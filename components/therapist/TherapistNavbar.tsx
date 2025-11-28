'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, User } from 'lucide-react';

export default function TherapistNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/therapist/dashboard" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Calm Logo" width={40} height={40} className="rounded-xl" />
            <div>
              
              <p className="text-xs text-dark/50">Therapist Portal</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/therapist/dashboard"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/therapist/dashboard')
                  ? 'bg-accent text-white'
                  : 'text-dark/70 hover:bg-primary hover:text-dark'
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/therapist/sessions"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/therapist/sessions')
                  ? 'bg-accent text-white'
                  : 'text-dark/70 hover:bg-primary hover:text-dark'
              }`}
            >
              Sessions
            </Link>
            <Link
              href="/therapist/chat"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/therapist/chat')
                  ? 'bg-accent text-white'
                  : 'text-dark/70 hover:bg-primary hover:text-dark'
              }`}
            >
              Chat
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
       

            <Link
              href="/therapist/profile"
              className="flex items-center gap-2 p-2 text-dark/60 hover:text-dark hover:bg-gray-100 rounded-lg transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
