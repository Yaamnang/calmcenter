'use client';

import { useRef } from 'react';
import Navbar from '@/components/shared/UserNavbar';
import Footer from '@/components/shared/Footer';
import ChatBot from '@/components/ChatBot';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Heart, Shield } from 'lucide-react';

export default function AboutPage() {
  const containerRef = useRef(null);
  
  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 80%"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map progress to path length (0 to 1)
  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);

  // SVG Path Definition: Left -> Right -> Center Bottom
  const pathString = "M 200,100 C 600,100 400,700 800,700 S 500,1400 500,1400";

  return (
    <main className="bg-white min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Intro */}
      <section className="pt-32 pb-10 px-6 mx-auto max-w-6xl">
        <h1 className="text-5xl font-bold text-dark mb-4">About Us</h1>
        <p className="text-xl text-dark/70 max-w-4xl leading-relaxed">
          At Calm, we believe that no one should face mental health challenges alone.
          Our platform provides secure, anonymous, and culturally sensitive support for Bhutanese users, offering access to licensed therapists, guided chat, and a library of resources in English.
        </p>
      </section>

      {/* --- START: SCROLL ANIMATION SECTION --- */}
      {/* Reduced Height to 1500px */}
      <div ref={containerRef} className="relative w-full h-[1500px] my-10">
        
        {/* The SVG Background Layer */}
        <div className="absolute inset-0 w-full h-full">
          <svg 
            viewBox="0 0 1000 1500" 
            className="w-full h-full" 
            preserveAspectRatio="none" 
          >
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background Path Trace */}
            <path 
              d={pathString}
              fill="none"
              stroke="#EFA690" 
              strokeWidth="3"
              strokeLinecap="round"
              strokeOpacity="0.2"
            />

            {/* Moving Fill Line */}
            <motion.path 
              d={pathString}
              fill="none"
              stroke="#EFA690"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength: smoothProgress }} 
            />

       

            {/* STATIC DOTS */}
            {/* 1. Start (Left) */}
            <circle cx="200" cy="100" r="10" fill="#A060FF" stroke="#FDF5E6" strokeWidth="4" />
            
            {/* 2. Middle (Right) */}
            <circle cx="800" cy="700" r="10" fill="#A060FF" stroke="#FDF5E6" strokeWidth="4" />
            
            {/* 3. End (Center Bottom) */}
            <circle cx="500" cy="1400" r="10" fill="#A060FF" stroke="#FDF5E6" strokeWidth="4" />
          </svg>
        </div>

        {/* --- TEXT CONTENT --- */}
        <div className="relative w-full h-full max-w-6xl mx-auto pointer-events-none">
          
          {/* Section 1: Right next to Dot 1 */}
          <div className="absolute top-[150px] right-[600px] pointer-events-auto max-w-md">
            <div className="flex flex-row gap-6 items-start">
              {/* Gray Number in front */}
              <span className="text-6xl font-bold text-gray-300 leading-none mt-1">01</span>
              <div>
                <h3 className="text-3xl font-bold text-dark mb-3">Our Aim</h3>
                <p className="text-dark/70 text-lg leading-relaxed">
                  To provide a safe, anonymous, and culturally sensitive digital space for mental health support in Bhutan, where individuals can seek guidance, connect with licensed therapists, and access helpful resources without fear of judgment or exposure.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Left of Dot 2 (Aligned Right) */}
          <div className="absolute top-[680px] right-[250px] md:right-[300px] pointer-events-auto max-w-md text-right">
             <div className="flex flex-row-reverse gap-6 items-start">
              {/* Gray Number in front (Reversed for right alignment) */}
              <span className="text-6xl font-bold text-gray-300 leading-none mt-1">02</span>
              <div>
                <h3 className="text-3xl font-bold text-dark mb-3">Our Value</h3>
                <p className="text-dark/70 text-lg leading-relaxed">
                  We prioritize privacy, empathy, and accessibility, offering safe, anonymous, and culturally sensitive mental-health support for all. Our platform is guided by ethics, transparency, and compassion, helping users seek help without fear or judgment.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Directly BELOW Dot 3 (Center) */}
          <div className="absolute top-[1180px] right-1/4 -translate-x-1/3 pointer-events-auto max-w-7xl text-left">
             <div className="flex flex-row items-center gap-10 justify-between mb-4">
              {/* Gray Number centered above title or inline? Let's do inline centered */}
             
              <div className='flex flex-col'>
                  <h3 className="text-3xl font-bold text-dark">Our Story</h3>
              <p className="text-dark/70 text-lg leading-relaxed">
                ChatGPT said:

MindfulCare began as a simple university project to create a safe, stigma-free space for mental-health support in Bhutan. It’s now a trusted platform offering anonymous access to therapists, secure chats, and helpful resources—all built with privacy, empathy, and accessibility at its core.</p>
              </div>
               <div className="flex flex-row gap-10 items-center justify-between">
                <span className="text-6xl font-bold text-gray-300 leading-none">03</span>
                
              </div>
            
            </div>
          </div>

        </div>
      </div>
      {/* --- END: SCROLL ANIMATION SECTION --- */}


      {/* Principles Section */}
      <section className="relative z-10 container mx-auto px-6 py-20 bg-white/50">
        <h2 className="text-4xl font-bold text-center mb-16 text-dark">
          Why Choose Calm?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100">
            <Shield className="w-10 h-10 text-[#f17e65] mb-4" />
            <h3 className="text-xl font-bold mb-2">Privacy First</h3>
            <p className="text-dark/60">Your identity is completely protected. We prioritize anonymity.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100">
            <Heart className="w-10 h-10 text-[#f17e65] mb-4" />
            <h3 className="text-xl font-bold mb-2">Compassionate Care</h3>
            <p className="text-dark/60">Empathetic support from licensed professionals who understand.</p>
          </div>
        </div>
      </section>

      <Footer />
      <ChatBot />
    </main>
  );
}