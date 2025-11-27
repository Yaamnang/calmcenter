'use client';

import Navbar from '@/components/shared/Navbar';
import ScribbleCanvas from '@/components/animations/ScribbleCanvas';
import ChatBot from '@/components/ChatBot';
import Link from 'next/link';
import { useState } from 'react';
import { UserCircle, MessageCircle, BookOpen, Sparkles } from 'lucide-react';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is a mental health consultant?",
      answer: "A mental health consultant is a trained professional who listens, guides, and supports you through emotional or mental challenges. They provide a safe, confidential space to discuss your feelings, help you understand your emotions, and suggest strategies to cope with stress, anxiety, or difficult situations."
    },
    {
      question: "Who will I be talking to?",
      answer: "You'll be connected with licensed mental health professionals who are experienced in providing support and understand Bhutanese culture. All therapists are verified and trained to help with various mental health concerns."
    },
    {
      question: "What kind of support can I get here?",
      answer: "We offer confidential chat sessions where you can discuss stress, anxiety, relationships, work pressure, or any emotional challenges. Our therapists provide guidance, coping strategies, and a non-judgmental space to express yourself."
    },
    {
      question: "Do I need to pay or sign up with my personal information?",
      answer: "No! Our service is completely free and anonymous. You only need to choose a nickname - no real name, email, or phone number required. Your privacy is fully protected."
    }
  ];

  return (
    <main className="min-h-screen relative overflow-hidden" style={{
      background: 'radial-gradient(ellipse 200% 120% at top left, rgba(238, 164, 54, 0.15) 0%, rgba(250, 204, 152, 0.08) 30%, transparent 60%)'
    }}>
      <ScribbleCanvas />
      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-32 pt-32 pb-20 flex items-center min-h-screen">
        <div className="max-w-4xl animate-fade-in">
          <h1 className="text-5xl font-bold text-dark leading-tight mb-6">
            Speak freely, heal gently,
            <br />
            and get support
            <br />
            without fear or judgment.
          </h1>

          <p className="text-xl text-dark/70 mb-8">
            A gentle space for honest conversations
          </p>

          <div className="flex gap-4 mb-12">
            <Link href="/register">
              <button
                className="text-lg px-16 py-4 mt-2 text-white font-semibold transition-all duration-300 shadow-lg hover:-translate-y-0.5"
                style={{
                  background: '#FF8700',
                  borderRadius: '0 1.5rem 0 1.5rem',
                  boxShadow: '0 4px 15px rgba(255, 135, 0, 0.3)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 135, 0, 0.4)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 135, 0, 0.3)'}
              >
                Explore
              </button>
            </Link>
          </div>
        </div>
      </section>
      {/* above how it works */}
      <div className="relative z-10 flex justify-center mb-16">
        <div className="relative">
          {/* Oval radial gradient background - horizontally stretched, vertically compressed */}
          <div
            className="absolute inset-0 -mx-20 -my-4"
            style={{
              background: 'radial-gradient(ellipse 1000px 100px at center, rgba(241, 164, 101, 0.65) 0%, rgba(241, 126, 101, 0.15) 40%, transparent 70%)',
              filter: 'blur(7px)',
            }}
          />
          <div className="relative flex items-center gap-3 px-8 py-4">
           
            <p className='text-center text-lg font-medium text-dark/80 italic'>
              "Sometimes the bravest scene is the one where you ask for support"
            </p>
            
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        
        <h2 className="text-5xl font-bold text-center mb-6 text-dark">
          How it Works?
        </h2>
        <p className="text-center text-dark/70 max-w-2xl mx-auto mb-16">
          Sometimes we carry lines in our hearts we never speak out loud.
          <br />
          But sharing even a few words can change the story. Let someone listen it's safe here
        </p>

        <div className="max-w-3xl mx-auto space-y-12">
          {/* Step 1 */}
          <div className="grid grid-cols-3 gap-6 items-center">
            <div className="col-span-1 flex justify-center">
              <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center">
                <UserCircle className="w-7 h-7 text-[#f17e65]" />
              </div>
            </div>
            <div className="col-span-2 text-left">
              <h3 className="text-xl font-bold text-dark mb-1">Enter Anonymously</h3>
              <p className="text-dark/70 text-base">
                Choose a nickname and a unique password.
                No real name or phone number required.
                Your privacy is fully protected.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid grid-cols-3 gap-6 items-center">
            <div className="col-span-1 flex justify-center">
              <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center">
                <MessageCircle className="w-7 h-7 text-[#f17e65]" />
              </div>
            </div>
            <div className="col-span-2 text-left">
              <h3 className="text-xl font-bold text-dark mb-1">Start a Conversation</h3>
              <p className="text-dark/70 text-base">
                Chat with a caring therapist.
                Share your thoughts and feelings safely.
                Take your time, no rush, no judgment.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid grid-cols-3 gap-6 items-center">
            <div className="col-span-1 flex justify-center">
              <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-[#f17e65]" />
              </div>
            </div>
            <div className="col-span-2 text-left">
              <h3 className="text-xl font-bold text-dark mb-1">Explore Resources</h3>
              <p className="text-dark/70 text-base">
                Access articles and uplifting quotes.
                Save helpful tips for later or continue your conversation anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* above faq */}
      <div className="relative z-10 flex justify-center mb-16">
        <div className="relative">
          {/* Oval radial gradient background - horizontally stretched, vertically compressed */}
          <div
            className="absolute inset-0 -mx-20 -my-4"
            style={{
              background: 'radial-gradient(ellipse 600px 60px at center, rgba(241, 126, 101, 0.3) 0%, rgba(241, 126, 101, 0.15) 40%, transparent 70%)',
              filter: 'blur(8px)',
            }}
          />
          <div className="relative flex items-center gap-3 px-8 py-4">
            
            <p className='text-center text-lg font-medium text-dark/80 italic'>
              "Even the heaviest scene can have a moment of light"
            </p>
            
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        
        
        <h2 className="text-4xl font-bold text-center mb-16 text-dark max-w-4xl mx-auto">
          Navigating Mental Health Consultation Commonly Asked Questions
        </h2>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white/60 backdrop-blur-sm rounded-2xl border border-dark/5 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/40 transition-colors"
              >
                <span className="text-lg font-semibold text-dark pr-4">
                  {faq.question}
                </span>
                <svg 
                  className={`w-6 h-6 text-dark transition-transform duration-300 flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-96' : 'max-h-0'}`}
              >
                <div className="px-8 pb-6">
                  <p className="text-dark/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ChatBot />
    </main>
  );
}