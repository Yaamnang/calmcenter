'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { users } from '@/data/login';

export default function LoginPage() {
  const router = useRouter();
  const [emailOrNickname, setEmailOrNickname] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!emailOrNickname.trim()) {
      setError('Please enter your email or nickname');
      return;
    }

    setIsLoading(true);

    // Simulate API call and validate against preset data
    setTimeout(() => {
      const user = users.find(u =>
        (u.email === emailOrNickname || u.nickname === emailOrNickname) &&
        u.password === password
      );

      if (user) {
        router.push('/userId/home');
      } else {
        setError('Invalid email/nickname or password');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center" style={{
      background: 'radial-gradient(circle at top right, #f17e65 0%, rgba(241, 126, 101, 0.4) 25%, rgba(241, 126, 101, 0.1) 50%, transparent 75%)'
    }}>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10 animate-float"
            style={{
              width: Math.random() * 100 + 50 + 'px',
              height: Math.random() * 100 + 50 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 10 + 10 + 's',
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Calm Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Card with glass effect */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 animate-slide-up">
          <h1 className="text-4xl font-bold text-dark mb-2 text-center">Welcome Back</h1>
          <p className="text-dark/60 text-center mb-8">Sign in to continue your journey</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email or Nickname Input */}
            <div className="relative group">
              <label className="block text-sm font-semibold text-dark mb-2">Email or Nickname</label>
              <div className="relative">
                <input
                  type="text"
                  value={emailOrNickname}
                  onChange={(e) => setEmailOrNickname(e.target.value)}
                  className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-[#f17e65] focus:outline-none transition-all duration-300 text-dark"
                  placeholder="your@email.com or nickname"
                  required
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#f17e65]/20 to-[#FF8700]/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative group">
              <label className="block text-sm font-semibold text-dark mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-[#f17e65] focus:outline-none transition-all duration-300 text-dark pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark/40 hover:text-dark transition-colors"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#f17e65]/20 to-[#FF8700]/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#f17e65] focus:ring-[#f17e65]" />
                <span className="text-dark/70 group-hover:text-dark transition-colors">Remember me</span>
              </label>
              <Link href="#" className="text-[#f17e65] hover:text-[#FF8700] font-semibold transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 text-white font-semibold transition-all duration-300 shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #f17e65 0%, #FF8700 100%)',
                borderRadius: '0 1.5rem 0 1.5rem',
                boxShadow: '0 4px 15px rgba(241, 126, 101, 0.3)'
              }}
            >
              <span className="relative z-10">
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing in...
                  </span>
                ) : 'Sign In'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF8700] to-[#f17e65] opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderRadius: '0 1.5rem 0 1.5rem' }} />
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center mt-8 text-dark/70">
            Don't have an account?{' '}
            <Link href="/signup" className="text-[#f17e65] hover:text-[#FF8700] font-semibold transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
      `}</style>
    </main>
  );
}
