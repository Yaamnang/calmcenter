'use client';

import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import ChatBot from '@/components/ChatBot';
import { GraduationCap, Languages, Clock, MessageCircle } from 'lucide-react';

export default function TherapistPage() {
  const therapists = [
    {
      name: "Dr. Tashi Dorji",
      specialty: "Anxiety & Depression",
      experience: "12 years",
      languages: "Dzongkha, English",
      available: true
    },
    {
      name: "Dr. Pema Choden",
      specialty: "Relationship Counseling",
      experience: "8 years",
      languages: "Dzongkha, English, Hindi",
      available: true
    },
    {
      name: "Dr. Karma Wangchuk",
      specialty: "Stress Management",
      experience: "10 years",
      languages: "Dzongkha, English",
      available: false
    },
    {
      name: "Dr. Deki Yangzom",
      specialty: "Family Therapy",
      experience: "15 years",
      languages: "Dzongkha, English",
      available: true
    }
  ];

  return (
    <main className="min-h-screen relative overflow-hidden bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-dark leading-tight mb-6">
            Our Therapists
          </h1>
          <p className="text-xl text-dark/70 mb-8">
            Meet our team of licensed mental health professionals dedicated to supporting you
          </p>
        </div>
      </section>

      {/* Qualifications Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-dark">
            Why Our Therapists?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-[#f17e65]" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Licensed Professionals</h3>
              <p className="text-dark/70">
                All our therapists hold valid licenses and certifications in mental health counseling
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Languages className="w-8 h-8 text-[#f17e65]" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Multilingual Support</h3>
              <p className="text-dark/70">
                Communicate in your preferred language - Dzongkha, English, or Hindi
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-[#f17e65]" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Flexible Hours</h3>
              <p className="text-dark/70">
                Available during evenings and weekends to fit your schedule
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Therapists List */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-dark">
            Available Therapists
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {therapists.map((therapist, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-dark/5 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-dark mb-1">{therapist.name}</h3>
                    <p className="text-accent font-semibold">{therapist.specialty}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    therapist.available
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {therapist.available ? 'Available' : 'Busy'}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-dark/70">
                    <GraduationCap className="w-5 h-5" />
                    <span>{therapist.experience} of experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-dark/70">
                    <Languages className="w-5 h-5" />
                    <span>{therapist.languages}</span>
                  </div>
                </div>

                {therapist.available ? (
                  <button
                    className="w-full py-3 text-white font-semibold transition-all duration-300 shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    style={{
                      background: '#FF8700',
                      borderRadius: '0 1rem 0 1rem',
                      boxShadow: '0 4px 15px rgba(255, 135, 0, 0.3)'
                    }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    Start Chat
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full py-3 bg-gray-200 text-gray-500 font-semibold rounded-xl cursor-not-allowed"
                  >
                    Currently Unavailable
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-12 border border-dark/5">
          <h2 className="text-4xl font-bold text-dark mb-8 text-center">
            How Therapy Sessions Work
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-accent font-bold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-dark mb-2">Choose Your Therapist</h3>
                <p className="text-dark/70">
                  Browse our available therapists and select one based on their specialty and availability.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-accent font-bold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-dark mb-2">Start Chatting</h3>
                <p className="text-dark/70">
                  Begin your conversation in a secure, encrypted chat room. Everything is completely anonymous.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-accent font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-dark mb-2">Get Professional Support</h3>
                <p className="text-dark/70">
                  Receive guidance, coping strategies, and professional support tailored to your needs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-accent font-bold">4</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-dark mb-2">Continue at Your Pace</h3>
                <p className="text-dark/70">
                  Schedule follow-up sessions or chat whenever you need support. No pressure, no rush.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatBot />
    </main>
  );
}
