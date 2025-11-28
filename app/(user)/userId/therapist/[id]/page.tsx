'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import UserNavbar from '@/components/shared/UserNavbar';
import Footer from '@/components/shared/Footer';
import ChatBot from '@/components/ChatBot';
import Image from 'next/image';
import therapist1 from '@/assets/therapist1.jpeg';
import therapist2 from '@/assets/therapist2.jpeg';
import therapist3 from '@/assets/therapist3.jpeg';
import { 
  ArrowLeft, GraduationCap, Briefcase, MapPin, Phone, Mail, 
  Calendar as CalendarIcon, Award, Languages, X, Clock, CheckCircle2,
  ChevronLeft, ChevronRight, Loader2
} from 'lucide-react';

export default function TherapistDetailPage() {
  const params = useParams();
  const router = useRouter();
  const therapistId = params.id as string;

  // --- BOOKING STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date()); // Tracks calendar view
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingReason, setBookingReason] = useState('');
  
  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Mock therapist data
   const therapistData: Record<string, any> = {
    T001: {
      id: 'T001',
      name: 'Dr. Ugyen Dorji ',
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
      name: 'Dr. Tashi Dorji',
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
      name: 'Dr. Sonam Dorji',
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



  const therapist = therapistData[therapistId] || therapistData['T001'];

  // --- CALENDAR HELPERS ---
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return d1.getDate() === d2.getDate() && 
           d1.getMonth() === d2.getMonth() && 
           d1.getFullYear() === d2.getFullYear();
  };

  const isDateInPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handlePrevMonth = () => {
    const today = new Date();
    const prevMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    // Don't go back further than current month/year roughly
    if (prevMonthDate.getMonth() < today.getMonth() && prevMonthDate.getFullYear() === today.getFullYear()) return;
    setCurrentMonth(prevMonthDate);
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // --- DYNAMIC TIME SLOTS ---
  const getAvailableTimeSlots = (date: Date) => {
    const allSlots = [
      { id: 't1', label: '09:00 AM - 11:00 AM' },
      { id: 't2', label: '11:00 AM - 01:00 PM' },
      { id: 't3', label: '02:00 PM - 04:00 PM' },
      { id: 't4', label: '04:00 PM - 06:00 PM' },
    ];

    // Mock Logic: On even numbered days, the morning slots are taken
    // Mock Logic: On days divisible by 5, afternoon slots are taken
    if (date.getDate() % 2 === 0) {
      // Mark first slot as taken
      return allSlots.map(slot => ({
        ...slot,
        available: slot.id !== 't1' // 9-11 taken
      }));
    } else if (date.getDate() % 5 === 0) {
      // Mark last slot as taken
      return allSlots.map(slot => ({
        ...slot,
        available: slot.id !== 't4' // 4-6 taken
      }));
    }

    return allSlots.map(slot => ({ ...slot, available: true }));
  };

  const currentSlots = selectedDate ? getAvailableTimeSlots(selectedDate) : [];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!selectedDate || !selectedTime || !bookingReason) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setIsSuccess(false);
      setSelectedDate(null);
      setSelectedTime(null);
      setBookingReason('');
    }, 300);
  };

  if (!therapist) return null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-orange-50/30">
      <UserNavbar />
      <ChatBot />

      <div className="container mx-auto px-6 pt-32 pb-20">
        {/* Back Button
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-dark/70 hover:text-[#f17e65] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Therapists</span>
        </button> */}

        {/* Profile Header (Same as before) */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
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
                onClick={() => setIsModalOpen(true)}
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

        {/* Info Grid (Left/Right Columns) - Same as before */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-dark mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-[#f17e65]" />
                About Me
              </h2>
              <p className="text-dark/70 leading-relaxed">{therapist.approach}</p>
            </div>

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

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-dark mb-6 flex items-center gap-2">
                <CalendarIcon className="w-6 h-6 text-[#f17e65]" />
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
                    <span className="hover:text-[#f17e65]">{therapist.clinic.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-dark/70">
                    <Mail className="w-4 h-4 text-[#f17e65]" />
                    <span className="hover:text-[#f17e65]">{therapist.clinic.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* --- BOOKING OVERLAY MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-orange-50 to-white flex-shrink-0">
              <div>
                <h2 className="text-2xl font-bold text-dark">
                  {isSuccess ? 'Booking Confirmed' : 'Book a Session'}
                </h2>
                {!isSuccess && <p className="text-sm text-dark/60">with {therapist.name}</p>}
              </div>
              <button 
                onClick={resetModal}
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-sm"
              >
                <X className="w-5 h-5 text-dark" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              
              {/* SUCCESS STATE */}
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center text-center py-10 space-y-6">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce-in">
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-dark mb-2">Request Sent Successfully!</h3>
                    <p className="text-dark/60 max-w-md mx-auto">
                      Your booking request has been sent to {therapist.name}. You will receive a notification once the session is confirmed.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-2xl p-6 w-full max-w-sm text-left space-y-3 border border-gray-100">
                    <div className="flex justify-between">
                      <span className="text-dark/60 text-sm">Date</span>
                      <span className="font-semibold text-dark">{selectedDate?.toDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark/60 text-sm">Time</span>
                      <span className="font-semibold text-dark">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark/60 text-sm">Therapist</span>
                      <span className="font-semibold text-dark">{therapist.name}</span>
                    </div>
                  </div>

                  <button
                    onClick={resetModal}
                    className="px-8 py-3 bg-accent text-white font-bold rounded-xl shadow-lg hover:bg-accent/90 transition-all w-full max-w-sm"
                  >
                    Close & Return
                  </button>
                </div>
              ) : (
                /* FORM STATE */
                <form onSubmit={handleBookingSubmit} className="space-y-8">
                  
                  {/* 1. Reason for Booking */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-dark uppercase tracking-wide flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs">1</span>
                      Reason for Visit
                    </label>
                    <textarea 
                      value={bookingReason}
                      onChange={(e) => setBookingReason(e.target.value)}
                      placeholder="Briefly describe what you'd like to discuss..."
                      className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none h-24 bg-gray-50 focus:bg-white transition-all"
                      required
                    />
                  </div>

                  {/* 2. Calendar */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-dark uppercase tracking-wide flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs">2</span>
                      Select Date
                    </label>
                    
                    {/* Calendar Container */}
                    <div className="border border-gray-200 rounded-xl p-4">
                      {/* Calendar Navigation */}
                      <div className="flex items-center justify-between mb-4">
                        <button 
                          type="button" 
                          onClick={handlePrevMonth}
                          className="p-1 hover:bg-gray-100 rounded-full"
                          disabled={isSameDay(currentMonth, new Date())} // Simple disable logic logic could be better but ok for demo
                        >
                          <ChevronLeft className="w-5 h-5 text-dark/70" />
                        </button>
                        <h3 className="font-bold text-dark text-lg">
                          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </h3>
                        <button type="button" onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded-full">
                          <ChevronRight className="w-5 h-5 text-dark/70" />
                        </button>
                      </div>

                      {/* Calendar Grid */}
                      <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                          <div key={day} className="text-xs font-bold text-dark/50 uppercase">{day}</div>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-7 gap-2">
                        {/* Empty cells for start of month */}
                        {Array.from({ length: getFirstDayOfMonth(currentMonth) }).map((_, i) => (
                          <div key={`empty-${i}`} />
                        ))}

                        {/* Days */}
                        {Array.from({ length: getDaysInMonth(currentMonth) }).map((_, i) => {
                          const day = i + 1;
                          const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                          const isPast = isDateInPast(dateObj);
                          const isSunday = dateObj.getDay() === 0;
                          // Mock fully booked logic: 3rd and 21st of any month
                          const isFullyBooked = day === 3 || day === 21;
                          
                          const isSelected = selectedDate && isSameDay(selectedDate, dateObj);
                          
                          let btnClass = "w-full aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ";
                          let isDisabled = false;

                          if (isPast) {
                            btnClass += "text-gray-300 cursor-not-allowed";
                            isDisabled = true;
                          } else if (isSunday) {
                            btnClass += "bg-red-50 text-red-400 cursor-not-allowed border border-red-100";
                            isDisabled = true;
                          } else if (isFullyBooked) {
                            btnClass += "bg-red-100 text-red-500 cursor-not-allowed border border-red-200 line-through decoration-red-500";
                            isDisabled = true;
                          } else if (isSelected) {
                            btnClass += "bg-accent text-white shadow-md scale-105";
                          } else {
                            btnClass += "bg-green-50 text-green-700 hover:bg-green-100 cursor-pointer border border-green-200";
                          }

                          return (
                            <button
                              key={`day-${day}`}
                              type="button"
                              disabled={isDisabled}
                              onClick={() => {
                                setSelectedDate(dateObj);
                                setSelectedTime(null);
                              }}
                              className={btnClass}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>

                      {/* Legend */}
                      <div className="flex flex-wrap gap-4 mt-4 text-xs justify-center text-dark/60">
                        <div className="flex items-center gap-1"><div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div> Available</div>
                        <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div> Booked/Closed</div>
                        <div className="flex items-center gap-1"><div className="w-3 h-3 bg-white border border-gray-200 text-gray-300 rounded"></div> Past</div>
                      </div>
                    </div>
                  </div>

                  {/* 3. Time Slots */}
                  <div className={`space-y-3 transition-all duration-300 ${selectedDate ? 'opacity-100' : 'opacity-50 pointer-events-none grayscale'}`}>
                    <label className="text-sm font-bold text-dark uppercase tracking-wide flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs">3</span>
                      Select Time Slot
                    </label>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {currentSlots.map(slot => (
                        <button
                          key={slot.id}
                          type="button"
                          disabled={!slot.available}
                          onClick={() => setSelectedTime(slot.label)}
                          className={`p-4 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                            !slot.available 
                              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60' 
                              : selectedTime === slot.label
                                ? 'bg-accent text-white border-accent shadow-lg ring-2 ring-accent/30'
                                : 'bg-white text-dark border-gray-200 hover:border-accent hover:text-accent'
                          }`}
                        >
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {slot.label}
                            {!slot.available && <span className="block text-[10px] uppercase font-bold text-red-400 mt-1">Taken</span>}
                          </span>
                        </button>
                      ))}
                    </div>
                    {selectedDate && currentSlots.some(s => !s.available) && (
                      <p className="text-xs text-red-500 mt-2 text-center">* Some slots are unavailable for this date.</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!selectedDate || !selectedTime || !bookingReason || isSubmitting}
                    className="w-full py-4 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{
                      background: selectedDate && selectedTime ? 'linear-gradient(135deg, #f17e65 0%, #FF8700 100%)' : '#ccc',
                    }}
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Confirm Booking Request
                      </>
                    )}
                  </button>

                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}