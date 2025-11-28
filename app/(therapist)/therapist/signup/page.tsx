'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Shield, User, Mail, Lock, FileCheck, Eye, EyeOff, CheckCircle, X } from 'lucide-react';
import { privacyPolicy, termsAndConditions } from '@/data/legal';

export default function TherapistSignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    licenseNo: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showTermsOverlay, setShowTermsOverlay] = useState(false);
  const [showPrivacyOverlay, setShowPrivacyOverlay] = useState(false);
  const [hasScrolledTerms, setHasScrolledTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const termsScrollRef = useRef<HTMLDivElement>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email format';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!/[a-z]/.test(formData.password) || !/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain both uppercase and lowercase letters';
    }
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.licenseNo.trim()) newErrors.licenseNo = 'License number is required';
    if (!/^\d{4}-\d{4}-\d{3}$/.test(formData.licenseNo)) {
      newErrors.licenseNo = 'License number must be 11 digits (format: XXXX-XXXX-XXX)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push('/therapist/dashboard');
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Special handling for license number - only numbers with automatic formatting
    if (name === 'licenseNo') {
      // Remove all non-digit characters
      const digitsOnly = value.replace(/\D/g, '');

      // Limit to 11 digits (4 + 4 + 3)
      const limitedDigits = digitsOnly.slice(0, 11);

      // Format: XXXX-XXXX-XXX
      let formatted = '';
      if (limitedDigits.length > 0) {
        formatted = limitedDigits.slice(0, 4);
      }
      if (limitedDigits.length > 4) {
        formatted += '-' + limitedDigits.slice(4, 8);
      }
      if (limitedDigits.length > 8) {
        formatted += '-' + limitedDigits.slice(8, 11);
      }

      setFormData({ ...formData, licenseNo: formatted });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleTermsScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 50;
    if (isAtBottom && !hasScrolledTerms) {
      setHasScrolledTerms(true);
    }
  };

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setShowTermsOverlay(false);
  };

  const handleTermsCheckboxClick = () => {
    if (!termsAccepted) {
      setShowTermsOverlay(true);
      setHasScrolledTerms(false);
    } else {
      setTermsAccepted(false);
    }
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
                <h1 className="text-3xl font-bold text-dark">Calm</h1>
                <p className="text-sm text-dark/60">Therapist Portal</p>
              </div>
            </div>

            <h2 className="text-4xl font-bold text-dark mb-4">
              Join Calm as a Therapist
            </h2>
            <p className="text-lg text-dark/70 mb-8">
              Help Bhutanese users find peace and support through professional mental health care.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-dark">Verified Credentials</h3>
                  <p className="text-sm text-dark/60">Your license is verified for user safety</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-dark">Secure Platform</h3>
                  <p className="text-sm text-dark/60">End-to-end encrypted sessions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-dark">Flexible Schedule</h3>
                  <p className="text-sm text-dark/60">Manage your availability your way</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-gray-100">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-dark mb-2">Create Account</h2>
            <p className="text-dark/60">Register as a licensed therapist</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-dark mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-3 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all`}
                  placeholder="Dr. Tashi Dorji"
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

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
                  className={`w-full pl-11 pr-4 py-3 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all`}
                  placeholder="your.email@calm.bt"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* License Number */}
            <div>
              <label className="block text-sm font-medium text-dark mb-2">
                License Number
              </label>
              <div className="relative">
                <FileCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
                <input
                  type="text"
                  name="licenseNo"
                  value={formData.licenseNo}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-3 border ${errors.licenseNo ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all font-mono tracking-wider`}
                  placeholder="1234-5678-901"
                  maxLength={13}
                />
              </div>
              {errors.licenseNo && <p className="text-red-500 text-sm mt-1">{errors.licenseNo}</p>}
        
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
                  className={`w-full pl-11 pr-12 py-3 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark/40 hover:text-dark/60"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-dark mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-3 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all`}
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Terms & Conditions */}
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  required
                  checked={termsAccepted}
                  onChange={handleTermsCheckboxClick}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent"
                />
                <span className="text-sm text-dark/70 group-hover:text-dark transition-colors">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowTermsOverlay(true);
                      setHasScrolledTerms(false);
                    }}
                    className="text-accent hover:underline font-medium"
                  >
                    Terms & Conditions
                  </button>
                  {' '}and{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPrivacyOverlay(true);
                    }}
                    className="text-accent hover:underline font-medium"
                  >
                    Privacy Policy
                  </button>
                </span>
              </label>
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
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-dark/60">
              Already have an account?{' '}
              <Link href="/therapist/login" className="text-accent hover:text-accent/80 font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Terms & Conditions Overlay */}
      {showTermsOverlay && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-dark">Terms & Conditions</h2>
              <button
                onClick={() => setShowTermsOverlay(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-dark/60" />
              </button>
            </div>
            <div
              ref={termsScrollRef}
              onScroll={handleTermsScroll}
              className="p-6 overflow-y-auto max-h-[calc(80vh-180px)] prose prose-sm max-w-none"
            >
              <div
                className="text-dark/80 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: termsAndConditions
                    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-dark mt-6 mb-4">$1</h1>')
                    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold text-dark mt-5 mb-3">$1</h2>')
                    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold text-dark mt-4 mb-2">$1</h3>')
                    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-dark">$1</strong>')
                    .replace(/^- (.+)$/gm, '<li class="ml-6 mb-2">$1</li>')
                    .replace(/\n\n/g, '<br/><br/>')
                }}
              />
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={handleAcceptTerms}
                disabled={!hasScrolledTerms}
                className="px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {hasScrolledTerms ? 'Accept & Continue' : 'Scroll to Continue'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Overlay */}
      {showPrivacyOverlay && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-dark">Privacy Policy</h2>
              <button
                onClick={() => setShowPrivacyOverlay(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-dark/60" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)] prose prose-sm max-w-none">
              <div
                className="text-dark/80 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: privacyPolicy
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
    </main>
  );
}
