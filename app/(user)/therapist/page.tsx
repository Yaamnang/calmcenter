'use client';

import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import ChatBot from '@/components/ChatBot';
import Link from 'next/link';
import Image from 'next/image';
import therapist1 from '@/assets/therapist1.jpg';
import therapist2 from '@/assets/therapist2.jpg';
import therapist3 from '@/assets/therapist3.jpg';
import { GraduationCap, Languages, Clock } from 'lucide-react';

export default function TherapistPage() {
  const therapists = [
    {
      id: "T001",
      name: "Dr. Pema Choden",
      specialty: "Anxiety & Depression",
      experience: "12 years",
      image: therapist1
    },
    {
      id: "T002",
      name: "Dr. Tashi Dorji ",
      specialty: "Relationship Counseling",
      experience: "8 years",
      image: therapist2
    },
    {
      id: "T003",
      name: "Dr. Tshering Dema",
      specialty: "Stress Management",
      experience: "10 years",
      image: therapist3
    }
  ];

  return (
    <main className="min-h-screen relative overflow-hidden bg-white">
      <Navbar />

      {/* Hero Section */}
    
      {/* Therapists Section */}
      <section className="relative z-10 container mx-auto px-6 py-20 mt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-dark">
            Meet Our Therapists
          </h2>

          <div className="flex justify-center items-center gap-12 md:gap-20 flex-wrap">
            {therapists.map((therapist) => (
              <Link
                key={therapist.id}
                href={`/therapist/${therapist.id}`}
                className="group cursor-pointer"
              >
                <div className="relative">
                  {/* Circular Image Container */}
                  <div className="relative w-48 h-48 md:w-56 md:h-56">
                    {/* Animated Ring */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f17e65] via-[#FF8700] to-[#f17e65] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin-slow"></div>

                    {/* Image Container with padding for ring effect */}
                    <div className="absolute inset-2 rounded-full overflow-hidden border-4 border-white shadow-2xl group-hover:shadow-[#f17e65]/50 transition-all duration-300 group-hover:scale-105">
                      <Image
                        src={therapist.image}
                        alt={therapist.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        width={224}
                        height={224}
                      />
                    </div>

                    {/* Pulse Effect on Hover */}
                    <div className="absolute inset-0 rounded-full bg-[#f17e65] opacity-0 group-hover:opacity-20 group-hover:animate-ping"></div>
                  </div>

                  {/* Therapist Info */}
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-dark group-hover:text-[#f17e65] transition-colors duration-300">
                      {therapist.name}
                    </h3>
                    <p className="text-dark/70 mt-1">{therapist.specialty}</p>
                    <p className="text-sm text-dark/50 mt-1">{therapist.experience} experience</p>

                    {/* Click to view details */}
                    <div className="mt-3 text-[#f17e65] font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Click to view profile →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
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

      

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>

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
