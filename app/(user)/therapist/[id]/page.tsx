'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import UserNavbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import ChatBot from '@/components/ChatBot';
import Image from 'next/image';
import therapist1 from '@/assets/therapist1.jpg';
import therapist2 from '@/assets/therapist2.jpg';
import therapist3 from '@/assets/therapist3.jpg';
import { ArrowLeft, GraduationCap, Briefcase, Clock, MapPin, Phone, Mail, Calendar, Award, Languages, X, LogIn } from 'lucide-react';

export default function TherapistDetailPage() {
  const params = useParams();
  const router = useRouter();
  const therapistId = params.id as string;
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleBookSession = () => {
    setShowLoginModal(true);
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  // Mock therapist data - replace with actual data fetching
  const therapistData: Record<string, any> = {
    T001: {
      id: 'T001',
      name: 'Dr. Tashi Dorji',
      image: therapist1,
      specialty: 'Anxiety & Depression',
      title: 'Licensed Clinical Psychologist',
      experience: '12 years',
      education: [
        'Ph.D. in Clinical Psychology - Royal University of Bhutan (2012)',
        'M.A. in Counseling Psychology - University of Delhi (2008)',
        'B.A. in Psychology - Sherubtse College (2005)'
      ],
      certifications: [
        'Licensed Clinical Psychologist - Bhutan Medical & Health Council',
        'Cognitive Behavioral Therapy (CBT) Certification',
        'Trauma-Focused Therapy Specialist'
      ],
      schedule: {
        monday: '9:00 AM - 5:00 PM',
        tuesday: '9:00 AM - 5:00 PM',
        wednesday: '9:00 AM - 5:00 PM',
        thursday: '9:00 AM - 5:00 PM',
        friday: '9:00 AM - 5:00 PM',
        saturday: 'By Appointment',
        sunday: 'Closed'
      },
      clinic: {
        name: 'Calm Mental Health Center',
        address: 'Norzin Lam, Thimphu, Bhutan',
        phone: '+975-2-123456',
        email: 'tashi.dorji@calm.bt'
      },
      languages: ['Dzongkha', 'English', 'Hindi'],
      specializations: ['Anxiety Disorders', 'Depression', 'PTSD', 'Stress Management'],
      approach: 'I believe in creating a safe, non-judgmental space where clients can explore their thoughts and feelings. My approach combines evidence-based practices with cultural sensitivity, ensuring that therapy is both effective and respectful of Bhutanese values.'
    },
    T002: {
      id: 'T002',
      name: 'Dr. Pema Choden',
      image: therapist2,
      specialty: 'Relationship Counseling',
      title: 'Licensed Marriage & Family Therapist',
      experience: '8 years',
      education: [
        'M.S. in Marriage & Family Therapy - Tribhuvan University (2015)',
        'B.A. in Social Work - Gaeddu College (2012)'
      ],
      certifications: [
        'Licensed Marriage & Family Therapist',
        'Emotionally Focused Therapy (EFT) Certification',
        'Family Systems Therapy Specialist'
      ],
      schedule: {
        monday: '10:00 AM - 6:00 PM',
        tuesday: '10:00 AM - 6:00 PM',
        wednesday: '10:00 AM - 6:00 PM',
        thursday: '10:00 AM - 6:00 PM',
        friday: '10:00 AM - 6:00 PM',
        saturday: '10:00 AM - 2:00 PM',
        sunday: 'Closed'
      },
      clinic: {
        name: 'Calm Mental Health Center',
        address: 'Norzin Lam, Thimphu, Bhutan',
        phone: '+975-2-123457',
        email: 'pema.choden@calm.bt'
      },
      languages: ['Dzongkha', 'English', 'Hindi', 'Nepali'],
      specializations: ['Couples Therapy', 'Family Counseling', 'Communication Issues', 'Conflict Resolution'],
      approach: 'I work with couples and families to strengthen their relationships through improved communication and understanding. My culturally-adapted approach respects traditional Bhutanese family values while incorporating modern therapeutic techniques.'
    },
    T003: {
      id: 'T003',
      name: 'Dr. Karma Wangchuk',
      image: therapist3,
      specialty: 'Stress Management',
      title: 'Licensed Mental Health Counselor',
      experience: '10 years',
      education: [
        'M.A. in Clinical Mental Health Counseling - Paro College of Education (2013)',
        'B.Sc. in Psychology - Royal Thimphu College (2010)'
      ],
      certifications: [
        'Licensed Mental Health Counselor',
        'Mindfulness-Based Stress Reduction (MBSR) Certification',
        'Burnout Prevention Specialist'
      ],
      schedule: {
        monday: '8:00 AM - 4:00 PM',
        tuesday: '8:00 AM - 4:00 PM',
        wednesday: '8:00 AM - 4:00 PM',
        thursday: '8:00 AM - 4:00 PM',
        friday: '8:00 AM - 4:00 PM',
        saturday: 'Closed',
        sunday: 'Closed'
      },
      clinic: {
        name: 'Calm Mental Health Center',
        address: 'Norzin Lam, Thimphu, Bhutan',
        phone: '+975-2-123458',
        email: 'karma.wangchuk@calm.bt'
      },
      languages: ['Dzongkha', 'English'],
      specializations: ['Work-Related Stress', 'Burnout', 'Life Transitions', 'Mindfulness'],
      approach: 'I integrate mindfulness practices with modern stress management techniques to help clients find balance in their lives. My approach is practical and solution-focused, designed to provide immediate relief while building long-term resilience.'
    }
  };

  const therapist = therapistData[therapistId];

  if (!therapist) {
    return (
      <main className="min-h-screen bg-white">
        <UserNavbar />
        <div className="container mx-auto px-6 pt-32 text-center">
          <h1 className="text-3xl font-bold text-dark">Therapist not found</h1>
          <button
            onClick={() => router.back()}
            className="mt-6 px-6 py-3 bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors"
          >
            Go Back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-orange-50/30">
      <UserNavbar />
      <ChatBot />

      <div className="container mx-auto px-6 pt-32 pb-20">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-dark/70 hover:text-[#f17e65] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Therapists</span>
        </button>

        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#f17e65] shadow-2xl">
                <Image
                  src={therapist.image}
                  alt={therapist.name}
                  className="w-full h-full object-cover"
                  width={192}
                  height={192}
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-dark mb-2">{therapist.name}</h1>
              <p className="text-xl text-[#f17e65] font-semibold mb-3">{therapist.title}</p>
              <p className="text-lg text-dark/70 mb-4">{therapist.specialty}</p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full">
                  <Briefcase className="w-4 h-4 text-[#f17e65]" />
                  <span className="text-sm font-medium text-dark">{therapist.experience} Experience</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full">
                  <Languages className="w-4 h-4 text-[#f17e65]" />
                  <span className="text-sm font-medium text-dark">{therapist.languages.join(', ')}</span>
                </div>
              </div>

              <button
                onClick={handleBookSession}
                className="px-8 py-3 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #f17e65 0%, #FF8700 100%)',
                }}
              >
                Book a Session
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-dark mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-[#f17e65]" />
                About Me
              </h2>
              <p className="text-dark/70 leading-relaxed">{therapist.approach}</p>
            </div>

            {/* Education */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-dark mb-6 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-[#f17e65]" />
                Education
              </h2>
              <div className="space-y-3">
                {therapist.education.map((edu: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#f17e65] mt-2"></div>
                    <p className="text-dark/80">{edu}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-dark mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-[#f17e65]" />
                Certifications & Licenses
              </h2>
              <div className="space-y-3">
                {therapist.certifications.map((cert: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#f17e65] mt-2"></div>
                    <p className="text-dark/80">{cert}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Specializations */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-dark mb-6">Areas of Expertise</h2>
              <div className="flex flex-wrap gap-3">
                {therapist.specializations.map((spec: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-[#f17e65]/10 to-[#FF8700]/10 border border-[#f17e65]/20 rounded-full text-dark font-medium"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Schedule */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100  top-24">
              <h2 className="text-2xl font-bold text-dark mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-[#f17e65]" />
                Schedule
              </h2>
              <div className="space-y-3">
                {Object.entries(therapist.schedule).map(([day, time]) => (
                  <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span className="font-medium text-dark capitalize">{day}</span>
                    <span className="text-dark/70 text-sm">{time as string}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinic Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-dark mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-[#f17e65]" />
                Clinic Information
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-dark mb-1">{therapist.clinic.name}</p>
                  <p className="text-dark/70 text-sm">{therapist.clinic.address}</p>
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <div className="flex items-center gap-3 text-dark/70">
                    <Phone className="w-4 h-4 text-[#f17e65]" />
                    <a href={`tel:${therapist.clinic.phone}`} className="hover:text-[#f17e65] transition-colors">
                      {therapist.clinic.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-dark/70">
                    <Mail className="w-4 h-4 text-[#f17e65]" />
                    <a href={`mailto:${therapist.clinic.email}`} className="hover:text-[#f17e65] transition-colors">
                      {therapist.clinic.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-slide-up">
            {/* Close button */}
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-dark/40 hover:text-dark transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#f17e65] to-[#FF8700] flex items-center justify-center">
                <LogIn className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Content */}
            <h2 className="text-3xl font-bold text-dark text-center mb-3">
              Please Log In
            </h2>
            <p className="text-dark/70 text-center mb-8">
              You need to be logged in to book a session with our therapists. Please log in or create an account to continue.
            </p>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleLogin}
                className="w-full py-4 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #f17e65 0%, #FF8700 100%)',
                }}
              >
                Log In
              </button>
              <button
                onClick={handleSignup}
                className="w-full py-4 bg-gray-100 text-dark font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
