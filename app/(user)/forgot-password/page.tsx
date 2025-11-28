'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail, Lock, Shield, Eye, EyeOff } from 'lucide-react';
import { users } from '@/data/login';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Countdown timer for OTP
  useEffect(() => {
    if (step === 2 && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, step]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Check if email exists in users
    const userExists = users.find(u => u.email === email);

    setTimeout(() => {
      setIsLoading(false);
      if (userExists) {
        setStep(2);
        setCountdown(60);
        setCanResend(false);
      } else {
        setError('Email not found. Please check and try again.');
      }
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const otpValue = otp.join('');

    if (otpValue.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    if (otpValue === '000000') {
      setStep(3);
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleResendOtp = () => {
    setCountdown(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate password contains both uppercase and lowercase
    if (!/[a-z]/.test(newPassword) || !/[A-Z]/.test(newPassword)) {
      setError('Password must contain both uppercase and lowercase letters');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    // Simulate password reset
    setTimeout(() => {
      setIsLoading(false);
      // Show success alert
      alert('Password changed successfully! You can now login with your new password.');
      router.push('/login');
    }, 1500);
  };

  return (
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center py-12" style={{
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

      {/* Main Card */}
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
          {/* Back to Login */}
          <Link
            href="/login"
            className="flex items-center gap-2 text-dark/60 hover:text-[#f17e65] transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Back to Login</span>
          </Link>

          <h1 className="text-4xl font-bold text-dark mb-2 text-center">Reset Password</h1>
          <p className="text-dark/60 text-center mb-8">
            {step === 1 && "Enter your email to receive a reset code"}
            {step === 2 && "Enter the OTP sent to your email"}
            {step === 3 && "Create your new password"}
          </p>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  step >= s
                    ? 'bg-gradient-to-br from-[#f17e65] to-[#FF8700] text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={`w-12 h-1 mx-1 transition-all duration-300 ${
                    step > s ? 'bg-gradient-to-r from-[#f17e65] to-[#FF8700]' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Step 1: Email */}
          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="relative group">
                <label className="block text-sm font-semibold text-dark mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-[#f17e65] focus:outline-none transition-all duration-300 text-dark"
                    placeholder="your@email.com"
                    required
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#f17e65]/20 to-[#FF8700]/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              </div>

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
                      Verifying...
                    </span>
                  ) : 'Continue'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF8700] to-[#f17e65] opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderRadius: '0 1.5rem 0 1.5rem' }} />
              </button>
            </form>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <p className="text-sm text-dark/70 text-center mb-4">
                  We've sent a 6-digit code to <strong>{email}</strong>
                </p>
                <div className="flex gap-2 justify-center mb-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-[#f17e65] focus:outline-none transition-all duration-300"
                    />
                  ))}
                </div>
                <div className="text-center">
                  {countdown > 0 ? (
                    <p className="text-sm text-dark/60">
                      Resend code in <span className="font-semibold text-[#f17e65]">{countdown}s</span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-sm text-[#f17e65] hover:text-[#FF8700] font-semibold transition-colors"
                    >
                      Resend Code
                    </button>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 text-white font-semibold transition-all duration-300 shadow-lg hover:-translate-y-0.5 relative overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, #f17e65 0%, #FF8700 100%)',
                  borderRadius: '0 1.5rem 0 1.5rem',
                  boxShadow: '0 4px 15px rgba(241, 126, 101, 0.3)'
                }}
              >
                <span className="relative z-10">Verify OTP</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF8700] to-[#f17e65] opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderRadius: '0 1.5rem 0 1.5rem' }} />
              </button>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="relative group">
                <label className="block text-sm font-semibold text-dark mb-2">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-[#f17e65] focus:outline-none transition-all duration-300 text-dark"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-dark/40 hover:text-dark transition-colors"
                  >
                    {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#f17e65]/20 to-[#FF8700]/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
                <p className="text-xs text-dark/50 mt-2">
                  Must be at least 8 characters with uppercase and lowercase letters
                </p>
              </div>

              <div className="relative group">
                <label className="block text-sm font-semibold text-dark mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-[#f17e65] focus:outline-none transition-all duration-300 text-dark"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-dark/40 hover:text-dark transition-colors"
                  >
                    {showConfirmPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#f17e65]/20 to-[#FF8700]/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              </div>

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
                      Resetting...
                    </span>
                  ) : 'Reset Password'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF8700] to-[#f17e65] opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderRadius: '0 1.5rem 0 1.5rem' }} />
              </button>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </main>
  );
}
