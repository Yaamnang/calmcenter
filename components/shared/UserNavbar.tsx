'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { User } from 'lucide-react';

export default function UserNavbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-20 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/userId/home" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Calm Logo" width={80} height={80} className="object-contain" />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/userId/chat"
            className="text-dark hover:text-accent transition-colors"
          >
            Chat
          </Link>
          <Link
            href="/userId/therapist"
            className="text-dark hover:text-accent transition-colors"
          >
            Therapists
          </Link>
          <Link
            href="/userId/about"
            className="text-dark hover:text-accent transition-colors"
          >
            About
          </Link>
        </div>

        {/* Profile Button */}
        <div className="flex items-center gap-4">
          <Link
            href="/userId/profile"
            className="text-dark hover:text-accent transition-colors font-medium flex items-center gap-2"
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
