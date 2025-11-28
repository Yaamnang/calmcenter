'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Mail, Lock, Eye, EyeOff, Shield, Heart } from 'lucide-react';
import { therapists } from '@/data/login';

export default function TherapistLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const therapist = therapists.find(
        t => t.email === formData.email && t.password === formData.password
      );

      if (therapist) {
        router.push('/therapist/dashboard');
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary via-white to-orange-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden md:block">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-12 shadow-xl border border-accent/20">
            <div className="flex items-center gap-3 mb-6">
              <Image src="/logo.png" alt="Calm Logo" width={56} height={56} className="rounded-2xl" />
              <div>
             
                <p className="text-sm text-dark/60">Therapist Portal</p>
              </div>
            </div>

            <h2 className="text-4xl font-bold text-dark mb-4">
              Welcome Back
            </h2>
            <p className="text-lg text-dark/70 mb-8">
              Continue providing support and care to those who need it most.
            </p>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-primary to-orange-50 rounded-2xl p-6 border border-accent/20">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-6 h-6 text-accent" />
                  <h3 className="font-semibold text-dark">Secure Sessions</h3>
                </div>
                <p className="text-sm text-dark/60">
                  All conversations are encrypted and completely anonymous for user safety.
                </p>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-primary rounded-2xl p-6 border border-accent/20">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="w-6 h-6 text-accent" />
                  <h3 className="font-semibold text-dark">Make a Difference</h3>
                </div>
                <p className="text-sm text-dark/60">
                  Your expertise helps break stigma and brings hope to many lives.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-gray-100">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-dark mb-2">Sign In</h2>
            <p className="text-dark/60">Access your therapist dashboard</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-dark mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  placeholder="your.email@calm.bt"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-dark mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark/40 hover:text-dark/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                />
                <span className="text-sm text-dark/60">Remember me</span>
              </label>
              <Link href="#" className="text-sm text-accent hover:text-accent/80 font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent text-white py-3 rounded-xl font-semibold hover:bg-accent/90 focus:outline-none focus:ring-4 focus:ring-accent/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>


          <div className="mt-6 text-center">
            <p className="text-dark/60">
              New therapist?{' '}
              <Link href="/therapist/signup" className="text-accent hover:text-accent/80 font-semibold">
                Register Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
