'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';
import { privacyPolicy, termsAndConditions } from '@/data/legal';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [step, setStep] = useState(1);
  const [showTermsOverlay, setShowTermsOverlay] = useState(false);
  const [showPrivacyOverlay, setShowPrivacyOverlay] = useState(false);
  const [hasScrolledTerms, setHasScrolledTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const termsScrollRef = useRef<HTMLDivElement>(null);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
  };

  const handlePasswordChange = (password: string) => {
    setFormData({ ...formData, password });
    setPasswordStrength(calculatePasswordStrength(password));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(3); // Success step
    }, 2000);
  };

  const getStrengthColor = () => {
    if (passwordStrength === 0) return '#e0e0e0';
    if (passwordStrength <= 1) return '#ff4444';
    if (passwordStrength <= 2) return '#ffbb33';
    if (passwordStrength <= 3) return '#00C851';
    return '#007E33';
  };

  const getStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 2) return 'Fair';
    if (passwordStrength <= 3) return 'Good';
    return 'Strong';
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
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center py-12" style={{
      background: 'radial-gradient(circle at top left, #f17e65 0%, rgba(241, 126, 101, 0.4) 25%, rgba(241, 126, 101, 0.1) 50%, transparent 75%)'
    }}>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: Math.random() * 80 + 40 + 'px',
              height: Math.random() * 80 + 40 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              background: `radial-gradient(circle, rgba(255, 255, 255, ${Math.random() * 0.15 + 0.05}) 0%, transparent 70%)`,
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 10 + 15 + 's',
            }}
          />
        ))}
      </div>

      {/* Signup Card */}
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

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mb-6 animate-fade-in">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: step >= s ? '60px' : '30px',
                background: step >= s
                  ? 'linear-gradient(135deg, #f17e65 0%, #FF8700 100%)'
                  : 'rgba(255, 255, 255, 0.3)'
              }}
            />
          ))}
        </div>

        {/* Card with glass effect */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 animate-slide-up">
          {step === 3 ? (
            // Success Step
            <div className="text-center py-8 animate-fade-in">
              <div className="text-6xl mb-4 animate-bounce-slow">🎉</div>
              <h1 className="text-4xl font-bold text-dark mb-4">Welcome to Calm!</h1>
              <p className="text-dark/60 mb-8">
                Your account has been created successfully. You're now part of a safe, supportive community.
              </p>
              <Link href="/dashboard">
                <button
                  className="w-full py-4 text-white font-semibold transition-all duration-300 shadow-lg hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(135deg, #f17e65 0%, #FF8700 100%)',
                    borderRadius: '0 1.5rem 0 1.5rem',
                    boxShadow: '0 4px 15px rgba(241, 126, 101, 0.3)'
                  }}
                >
                  Get Started
                </button>
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-dark mb-2 text-center">Create Account</h1>
              <p className="text-dark/60 text-center mb-8">
                {step === 1 ? 'Choose your anonymous identity' : 'Set up your secure access'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <>
                    {/* Nickname Input with suggestions */}
                    <div className="relative group">
                      <label className="block text-sm font-semibold text-dark mb-2">
                        Nickname (Anonymous) <span className="text-[#f17e65]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.nickname}
                          onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                          className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-[#f17e65] focus:outline-none transition-all duration-300 text-dark"
                          placeholder="e.g., HappyPanda, CalmButterfly"
                          required
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#f17e65]/20 to-[#FF8700]/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                      <p className="text-xs text-dark/50 mt-2">
                        💡 Tip: Choose a fun name - no personal info needed!
                      </p>
                    </div>

                    {/* Nickname suggestions */}
                    <div className="flex flex-wrap gap-2">
                      {['SilentStorm', 'GentleWave', 'QuietMoon', 'PeacefulDove'].map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => setFormData({ ...formData, nickname: suggestion })}
                          className="px-3 py-1.5 text-sm bg-white/40 hover:bg-white/60 border border-gray-200 rounded-full transition-all duration-300 text-dark/70 hover:text-dark"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => formData.nickname && setStep(2)}
                      disabled={!formData.nickname}
                      className="w-full py-4 text-white font-semibold transition-all duration-300 shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: 'linear-gradient(135deg, #f17e65 0%, #FF8700 100%)',
                        borderRadius: '0 1.5rem 0 1.5rem',
                        boxShadow: '0 4px 15px rgba(241, 126, 101, 0.3)'
                      }}
                    >
                      Continue
                    </button>
                  </>
                )}

                {step === 2 && (
                  <>
                    {/* Email Input */}
                    <div className="relative group">
                      <label className="block text-sm font-semibold text-dark mb-2">
                        Email (Optional - for account recovery)
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-[#f17e65] focus:outline-none transition-all duration-300 text-dark"
                          placeholder="your@email.com (optional)"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#f17e65]/20 to-[#FF8700]/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                    </div>

                    {/* Password Input with strength meter */}
                    <div className="relative group">
                      <label className="block text-sm font-semibold text-dark mb-2">
                        Password <span className="text-[#f17e65]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => handlePasswordChange(e.target.value)}
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
                      {/* Password strength meter */}
                      {formData.password && (
                        <div className="mt-2">
                          <div className="flex gap-1 mb-1">
                            {[1, 2, 3, 4].map((level) => (
                              <div
                                key={level}
                                className="h-1.5 flex-1 rounded-full transition-all duration-300"
                                style={{
                                  background: passwordStrength >= level ? getStrengthColor() : '#e0e0e0'
                                }}
                              />
                            ))}
                          </div>
                          <p className="text-xs" style={{ color: getStrengthColor() }}>
                            {getStrengthText()}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div className="relative group">
                      <label className="block text-sm font-semibold text-dark mb-2">
                        Confirm Password <span className="text-[#f17e65]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-[#f17e65] focus:outline-none transition-all duration-300 text-dark"
                          placeholder="••••••••"
                          required
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#f17e65]/20 to-[#FF8700]/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                      {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                        <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                      )}
                    </div>

                    {/* Terms & Privacy */}
                    <div className="space-y-3">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          required
                          checked={termsAccepted}
                          onChange={handleTermsCheckboxClick}
                          className="mt-1 w-4 h-4 rounded border-gray-300 text-[#f17e65] focus:ring-[#f17e65]"
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
                            className="text-[#f17e65] hover:underline font-medium"
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
                            className="text-[#f17e65] hover:underline font-medium"
                          >
                            Privacy Policy
                          </button>
                        </span>
                      </label>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 py-4 bg-white/50 border-2 border-gray-200 text-dark font-semibold rounded-xl hover:bg-white/70 transition-all duration-300"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading || formData.password !== formData.confirmPassword}
                        className="flex-1 py-4 text-white font-semibold transition-all duration-300 shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
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
                              Creating...
                            </span>
                          ) : 'Create Account'}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FF8700] to-[#f17e65] opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderRadius: '0 1.5rem 0 1.5rem' }} />
                      </button>
                    </div>
                  </>
                )}
              </form>
            </>
          )}

          {/* Sign In Link */}
          {step !== 3 && (
            <p className="text-center mt-8 text-dark/70">
              Already have an account?{' '}
              <Link href="/login" className="text-[#f17e65] hover:text-[#FF8700] font-semibold transition-colors">
                Sign in
              </Link>
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          33% { transform: translateY(-15px) translateX(15px) rotate(5deg); }
          66% { transform: translateY(10px) translateX(-10px) rotate(-5deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
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
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>

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
