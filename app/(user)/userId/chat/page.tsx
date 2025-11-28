'use client';

import { useState, useEffect, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import Navbar from '@/components/shared/UserNavbar';
import ChatBot from '@/components/ChatBot';
import { 
  Phone, 
  Video, 
  MoreVertical, 
  Send, 
  Paperclip, 
  Smile, 
  Clock, 
  Calendar,
  Ban,
  FileText,
  Image as ImageIcon,
  History,
  CheckCircle2,
  Archive
} from 'lucide-react';

// Assets
import therapist1 from '@/assets/therapist1.jpeg'; 
import therapist2 from '@/assets/therapist2.jpeg';
import therapist3 from '@/assets/therapist3.jpeg';

// --- TYPE DEFINITIONS ---
interface ChatMessage {
  id: number;
  sender: 'user' | 'therapist';
  type: 'text' | 'file';
  text: string;
  fileUrl?: string;
  fileType?: 'image' | 'doc';
}

interface Therapist {
  id: string;
  name: string;
  image: StaticImageData;
  status: string;
  statusLabel: string;
  lastMessage: string;
  time: string;
  color: string;
  lightColor: string;
  appointmentDate?: string;
  appointmentTime?: string;
  endedTime?: string;
}

// --- MOCK DATA ---

const MOCK_CHAT_HISTORY: Record<string, ChatMessage[]> = {
  't1': [ 
    { id: 1, sender: 'user', type: 'text', text: "Hi doctor, I need some help." },
    { id: 2, sender: 'therapist', type: 'text', text: "Hello, I am here for you." }
  ],
  't2': [], 
  't3': [], 
  't4': [], 
  't5': [ 
    { id: 10, sender: 'therapist', type: 'text', text: "It was great speaking with you." },
    { id: 11, sender: 'user', type: 'text', text: "Thank you for the advice." }
  ],
  't6': [ 
    { id: 20, sender: 'user', type: 'text', text: "I feel much better now." },
    { id: 21, sender: 'therapist', type: 'text', text: "Glad to hear that. Take care." }
  ]
};

const INITIAL_THERAPISTS: Therapist[] = [
  // --- ACTIVE / WAITING / FIXED ---
  {
    id: 't1',
    name: 'Dr. Tashi Dorji',
    image: therapist1,
    status: 'in_session', 
    statusLabel: 'In Session',
    lastMessage: 'Let\'s explore that feeling further.',
    time: 'Now',
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
  },
  {
    id: 't2',
    name: 'Dr. Pema Choden',
    image: therapist2,
    status: 'fixed', 
    statusLabel: 'Appointment Fixed',
    appointmentDate: 'Dec 15, 2024',
    appointmentTime: '10:00 AM',
    lastMessage: 'Appointment confirmed for Dec 15.',
    time: '10:30 AM',
    color: 'bg-green-500',
    lightColor: 'bg-green-50',
  },
  {
    id: 't3',
    name: 'Dr. Karma Wangchuk',
    image: therapist3,
    status: 'waiting', 
    statusLabel: 'Waiting for Confirmation',
    lastMessage: 'Request sent. Waiting for approval.',
    time: 'Yesterday',
    color: 'bg-yellow-500',
    lightColor: 'bg-yellow-50',
  },
  // --- PAST APPOINTMENTS (Completed & Rejected) ---
  {
    id: 't4',
    name: 'Dr. Sangay',
    image: therapist1,
    status: 'rejected', 
    statusLabel: 'Request Rejected',
    lastMessage: 'Unable to accept new patients.',
    time: 'Mon',
    color: 'bg-red-500',
    lightColor: 'bg-red-50',
    endedTime: 'Dec 12, 2024'
  },
  {
    id: 't5',
    name: 'Dr. Wangchuk',
    image: therapist2,
    status: 'completed',
    statusLabel: 'Completed',
    lastMessage: 'Session ended successfully.',
    time: 'Dec 10',
    color: 'bg-gray-500',
    lightColor: 'bg-gray-100',
    endedTime: 'Dec 10, 2024'
  },
  {
    id: 't6',
    name: 'Dr. Lhamo',
    image: therapist3,
    status: 'completed',
    statusLabel: 'Completed',
    lastMessage: 'Take care.',
    time: 'Nov 28',
    color: 'bg-gray-500',
    lightColor: 'bg-gray-100',
    endedTime: 'Nov 28, 2024'
  }
];

export default function ChatPage() {
  // State typed explicitly with Therapist interface
  const [therapists, setTherapists] = useState<Therapist[]>(INITIAL_THERAPISTS);
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist>(INITIAL_THERAPISTS[0]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userMessageCount, setUserMessageCount] = useState(0); 
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHAT_HISTORY['t1']);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, selectedTherapist]);

  // Load chat history
  useEffect(() => {
    if (selectedTherapist) {
      setMessages(MOCK_CHAT_HISTORY[selectedTherapist.id] || []);
      setUserMessageCount(0); 
    }
  }, [selectedTherapist]);

  // --- HANDLERS ---

  const endSessionAutomatically = () => {
    setIsTyping(true);
    
    // 1. Therapist sends final message
    setTimeout(() => {
      setIsTyping(false);
      const finalMsg: ChatMessage = { 
        id: Date.now(), 
        sender: 'therapist', 
        type: 'text', 
        text: "I can only help you this much, sorry." 
      };
      setMessages((prev) => [...prev, finalMsg]);

      // 2. Show Prompt & Move to History
      setTimeout(() => {
        alert("Session Ended. This chat has been moved to your history.");
        
        // Update status to completed
        const updatedTherapists = therapists.map(t => 
          t.id === selectedTherapist.id 
            ? { ...t, status: 'completed', statusLabel: 'Completed', endedTime: 'Just now', color: 'bg-gray-500', lightColor: 'bg-gray-100' }
            : t
        );
        setTherapists(updatedTherapists);
        
        // Update current view to reflect change
        setSelectedTherapist(prev => ({ 
          ...prev, 
          status: 'completed', 
          statusLabel: 'Completed',
          endedTime: 'Just now',
          color: 'bg-gray-500',
          lightColor: 'bg-gray-100'
        }));

      }, 2000); 
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add User Message
    const newUserMsg: ChatMessage = { id: Date.now(), sender: 'user', type: 'text', text: inputValue };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue('');
    
    const newCount = userMessageCount + 1;
    setUserMessageCount(newCount);

    if (selectedTherapist.status === 'in_session') {
      if (newCount >= 5) {
        endSessionAutomatically();
      } else {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          const replyMsg: ChatMessage = { id: Date.now() + 1, sender: 'therapist', type: 'text', text: 'ok' };
          setMessages((prev) => [...prev, replyMsg]);
        }, 1000);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isImage = file.type.startsWith('image/');
      const fileUrl = URL.createObjectURL(file); 

      const newFileMsg: ChatMessage = {
        id: Date.now(),
        sender: 'user',
        type: 'file',
        text: file.name,
        fileUrl: fileUrl,
        fileType: isImage ? 'image' : 'doc'
      };

      setMessages((prev) => [...prev, newFileMsg]);
      
      const newCount = userMessageCount + 1;
      setUserMessageCount(newCount);

      if (selectedTherapist.status === 'in_session') {
        if (newCount >= 5) {
          endSessionAutomatically();
        } else {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            const replyMsg: ChatMessage = { id: Date.now() + 1, sender: 'therapist', type: 'text', text: 'ok' };
            setMessages((prev) => [...prev, replyMsg]);
          }, 1000);
        }
      }
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePaperclipClick = () => {
    fileInputRef.current?.click();
  };

  // --- FILTERED LISTS ---
  const activeList = therapists.filter(t => ['in_session', 'waiting', 'fixed'].includes(t.status));
  const pastList = therapists.filter(t => ['completed', 'rejected'].includes(t.status));

  return (
    <main className="h-screen flex flex-col bg-white overflow-hidden">
      <Navbar />

      <div className="flex-1 flex pt-20 h-full">
        
        {/* --- 1. SPLIT LEFT SIDEBAR (w-96) --- */}
        <div className="w-96 border-r border-gray-200 flex flex-col bg-gray-50/50 flex-shrink-0 h-full">
          
          {/* TOP HALF: Active Conversations */}
          <div className="h-1/2 flex flex-col border-b-2 border-gray-100">
            <div className="p-4 border-b border-gray-200 bg-white">
              <h2 className="text-lg font-bold text-dark">Messages</h2>
              <p className="text-xs text-dark/40 mt-1">Active & Upcoming</p>
            </div>
            
            <div className="flex-1 overflow-y-auto min-h-0">
              {activeList.map((therapist) => (
                <button
                  key={therapist.id}
                  onClick={() => setSelectedTherapist(therapist)}
                  className={`w-full p-4 flex items-center gap-3 hover:bg-white transition-all border-b border-gray-100 ${
                    selectedTherapist.id === therapist.id ? 'bg-white border-l-4 border-l-accent shadow-sm' : 'border-l-4 border-l-transparent'
                  }`}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
                      <Image src={therapist.image} alt={therapist.name} className="w-full h-full object-cover" width={48} height={48} />
                    </div>
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${therapist.color}`}></div>
                  </div>

                  <div className="flex-1 text-left">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold text-dark text-sm">{therapist.name}</h3>
                      <span className="text-xs text-dark/40">{therapist.time}</span>
                    </div>
                    <p className="text-xs text-dark/60 truncate max-w-[140px]">{therapist.lastMessage}</p>
                    <span className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider ${therapist.lightColor} ${therapist.color.replace('bg-', 'text-')}`}>
                      {therapist.statusLabel}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* BOTTOM HALF: Past Appointments */}
          <div className="h-1/2 flex flex-col bg-gray-100/50">
            <div className="p-4 border-b border-gray-200 border-t border-gray-300 bg-gray-200/30">
              <h2 className="text-sm font-bold text-dark/70 flex items-center gap-2">
                <History className="w-4 h-4" /> History
              </h2>
              <p className="text-[10px] text-dark/40 uppercase tracking-wider mt-1">Past Consultations</p>
            </div>
            
            <div className="flex-1 overflow-y-auto min-h-0">
              {pastList.map((therapist) => (
                <button
                  key={therapist.id}
                  onClick={() => setSelectedTherapist(therapist)}
                  className={`w-full p-4 border-b border-gray-200 hover:bg-gray-100 transition-all text-left group ${
                    selectedTherapist.id === therapist.id ? 'bg-white border-l-4 border-l-gray-400' : 'border-l-4 border-l-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full overflow-hidden border border-gray-300 ${therapist.status === 'completed' || therapist.status === 'rejected' ? 'filter grayscale' : ''}`}>
                      <Image src={therapist.image} alt={therapist.name} className="w-full h-full object-cover" width={40} height={40} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-dark/70 text-sm">{therapist.name}</h3>
                      <p className="text-[10px] text-dark/40 flex items-center gap-1 mt-1">
                        {therapist.status === 'completed' ? (
                          <><CheckCircle2 className="w-3 h-3 text-green-600" /> Ended: {therapist.endedTime}</>
                        ) : (
                          <><Ban className="w-3 h-3 text-red-500" /> Rejected: {therapist.endedTime}</>
                        )}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>


        {/* --- RIGHT CHAT AREA --- */}
        <div className="flex-1 flex flex-col relative bg-white min-w-0">
          
          {/* 1. TOP BAR */}
          <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white z-20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className={`w-10 h-10 rounded-full overflow-hidden ${selectedTherapist.status === 'completed' || selectedTherapist.status === 'rejected' ? 'filter grayscale' : ''}`}>
                  <Image src={selectedTherapist.image} alt={selectedTherapist.name} className="w-full h-full object-cover" width={40} height={40} />
                </div>
                <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${selectedTherapist.color}`}></div>
              </div>
              <div>
                <h2 className="font-bold text-dark">{selectedTherapist.name}</h2>
                <div className="flex items-center gap-2 text-xs font-medium">
                  {selectedTherapist.status === 'in_session' ? (
                    <span className="text-blue-600 flex items-center gap-1">
                      <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span> In Session
                    </span>
                  ) : selectedTherapist.status === 'completed' ? (
                    <span className="text-gray-500 flex items-center gap-1">
                      <Archive className="w-3 h-3" /> Archived • {selectedTherapist.endedTime}
                    </span>
                  ) : selectedTherapist.status === 'rejected' ? (
                    <span className="text-red-500 flex items-center gap-1">
                      <Ban className="w-3 h-3" /> Request Rejected
                    </span>
                  ) : (
                    <span className={`flex items-center gap-1 ${selectedTherapist.color.replace('bg-', 'text-')}`}>
                      {selectedTherapist.statusLabel}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {selectedTherapist.status === 'in_session' && (
                <>
                  <button className="p-2 hover:bg-gray-100 rounded-full text-accent transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                 
                </>
              )}
   
            </div>
          </div>


          {/* 2. MAIN CONTENT AREA */}
          <div className="flex-1 relative overflow-hidden flex flex-col">
            
            {/* --- SCENARIO A: WAITING --- */}
            {selectedTherapist.status === 'waiting' && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-md z-10 flex flex-col items-center justify-center p-6">
                  <div className="bg-white border border-yellow-200 p-8 rounded-3xl shadow-lg text-center max-w-md w-full">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <Clock className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h3 className="text-xl font-bold text-dark mb-2">Waiting for Confirmation</h3>
                    <p className="text-dark/60">
                      We have sent your request to {selectedTherapist.name}. Waiting for approval.
                    </p>
                  </div>
              </div>
            )}

            {/* --- SCENARIO B: REJECTED --- */}
            {selectedTherapist.status === 'rejected' && (
              <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-center p-8">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Ban className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-dark mb-2">Request Declined</h3>
                <p className="text-dark/60 max-w-sm">
                  Unfortunately, {selectedTherapist.name} cannot accept your request.
                </p>
                <p className="text-xs text-gray-400 mt-4">Rejected on {selectedTherapist.endedTime}</p>
              </div>
            )}

            {/* --- SCENARIO C: MESSAGES (Active, Fixed, Completed) --- */}
            {(selectedTherapist.status === 'in_session' || selectedTherapist.status === 'fixed' || selectedTherapist.status === 'completed') && (
              <>
                <div className={`flex-1 overflow-y-auto p-6 space-y-4 ${
                  selectedTherapist.status === 'fixed' ? 'filter blur-sm opacity-50 pointer-events-none' : 'bg-gray-50'
                }`}>
                  
                  {selectedTherapist.status === 'in_session' && (
                    <div className="flex justify-center mb-4">
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                        Session Started
                      </span>
                    </div>
                  )}

                  {selectedTherapist.status === 'completed' && (
                    <div className="flex justify-center mb-6">
                      <div className="bg-gray-100 text-gray-500 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-gray-200 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Session Completed
                      </div>
                    </div>
                  )}
                  
                  {messages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] rounded-2xl p-3 ${
                          msg.sender === 'user' ? 'bg-accent text-white rounded-br-none' : 'bg-white border text-dark rounded-bl-none shadow-sm'
                        }`}>
                          {msg.type === 'file' ? (
                            msg.fileType === 'image' ? (
                              <div className="space-y-1">
                                <img src={msg.fileUrl} alt="Uploaded" className="rounded-lg max-h-48 object-cover border border-white/20" />
                                <p className="text-xs opacity-80">{msg.text}</p>
                              </div>
                            ) : (
                              <div className="flex items-center gap-3 bg-black/10 p-2 rounded-lg">
                                <FileText className="w-5 h-5" />
                                <span className="text-sm underline break-all">{msg.text}</span>
                              </div>
                            )
                          ) : (
                            msg.text
                          )}
                        </div>
                      </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border text-dark rounded-2xl rounded-bl-none p-3 shadow-sm flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Fixed Appt Overlay */}
                {selectedTherapist.status === 'fixed' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <div className="bg-white/90 backdrop-blur-md border border-green-200 p-8 rounded-3xl shadow-xl text-center max-w-md">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-dark mb-2">Appointment Confirmed</h3>
                      <p className="text-dark/60 mb-6">
                        Your session with {selectedTherapist.name} is scheduled for:
                      </p>
                      <div className="bg-green-50 rounded-xl p-4 border border-green-100 mb-6">
                        <div className="text-2xl font-bold text-green-700">{selectedTherapist.appointmentDate}</div>
                        <div className="text-lg font-medium text-green-600">{selectedTherapist.appointmentTime}</div>
                      </div>
                      <p className="text-xs text-dark/40">
                        You can send messages, but the doctor may only reply during the session.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>


          {/* 3. MESSAGE INPUT BAR (Only for Active/Fixed) */}
          {(selectedTherapist.status === 'in_session' || selectedTherapist.status === 'fixed') && (
            <div className="bg-white border-t border-gray-200 p-4 z-20">
              <div className="flex items-end gap-3 max-w-4xl mx-auto">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileSelect} 
                  className="hidden" 
                  accept="image/*,.pdf,.doc,.docx"
                />
                <button 
                  onClick={handlePaperclipClick}
                  className="p-3 bg-gray-100 rounded-full text-dark/60 hover:text-accent transition-colors"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-3 flex items-center gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent outline-none text-dark placeholder-dark/40"
                  />
                  <button className="text-dark/40 hover:text-dark/60">
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className={`p-3 rounded-full transition-all shadow-md ${
                    inputValue.trim() ? 'bg-accent text-white hover:scale-105' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
          
          {/* Read Only Banner for Completed */}
          {selectedTherapist.status === 'completed' && (
            <div className="bg-gray-50 border-t border-gray-200 p-4 text-center text-xs text-dark/40 font-medium uppercase tracking-wider">
              This conversation is archived and read-only
            </div>
          )}

        </div>
      </div>
      
      <ChatBot />
    </main>
  );
}