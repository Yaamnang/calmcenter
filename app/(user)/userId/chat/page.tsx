'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
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
  FileText
} from 'lucide-react';

// Assets
import therapist1 from '@/assets/therapist1.jpg'; 
import therapist2 from '@/assets/therapist2.jpg';
import therapist3 from '@/assets/therapist3.jpg';

export default function ChatPage() {
  // --- MOCK DATA ---
  const therapists = [
    {
      id: 't1',
      name: 'Dr. Tashi Dorji',
      image: therapist1,
      status: 'in_session', // Blue
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
      status: 'fixed', // Green
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
      status: 'waiting', // Yellow
      statusLabel: 'Waiting for Confirmation',
      lastMessage: 'Request sent. Waiting for approval.',
      time: 'Yesterday',
      color: 'bg-yellow-500',
      lightColor: 'bg-yellow-50',
    },
    {
      id: 't4',
      name: 'Dr. Sangay',
      image: therapist1,
      status: 'rejected', // Red
      statusLabel: 'Request Rejected',
      lastMessage: 'Unable to accept new patients.',
      time: 'Mon',
      color: 'bg-red-500',
      lightColor: 'bg-red-50',
    }
  ];

  const [selectedTherapist, setSelectedTherapist] = useState(therapists[0]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false); // New state for typing effect
  
  // Hidden File Input Ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [messages, setMessages] = useState<any[]>([
    { id: 1, sender: 'user', type: 'text', text: 'Hi doctor, I need some help.' },
    { id: 2, sender: 'therapist', type: 'text', text: 'Hello, I am here for you.' },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message or when typing starts
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // --- HANDLERS ---

  // 1. Trigger Auto Reply with Typing Effect
  const triggerAutoReply = () => {
    if (selectedTherapist.status === 'in_session') {
      // Start typing immediately
      setIsTyping(true);

      // Wait 1.5 seconds, then stop typing and send message
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev, 
          { id: Date.now() + 1, sender: 'therapist', type: 'text', text: 'ok' }
        ]);
      }, 1500);
    }
  };

  // 2. Send Text Message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMsg = { id: Date.now(), sender: 'user', type: 'text', text: inputValue };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue('');
    triggerAutoReply();
  };

  // 3. Handle File Selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isImage = file.type.startsWith('image/');
      const fileUrl = URL.createObjectURL(file); 

      const newFileMsg = {
        id: Date.now(),
        sender: 'user',
        type: 'file',
        text: file.name,
        fileUrl: fileUrl,
        fileType: isImage ? 'image' : 'doc'
      };

      setMessages((prev) => [...prev, newFileMsg]);
      triggerAutoReply(); 
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePaperclipClick = () => {
    fileInputRef.current?.click();
  };

  const handleTherapistClick = (therapist: any) => {
    setSelectedTherapist(therapist);
    setIsTyping(false);
    setMessages([
        { id: 1, sender: 'user', type: 'text', text: 'Hi doctor.' },
        { id: 2, sender: 'therapist', type: 'text', text: 'Hello.' },
    ]);
  };

  return (
    <main className="h-screen flex flex-col bg-white overflow-hidden">
      <Navbar />

      <div className="flex-1 flex pt-20 h-full">
        
        {/* --- LEFT SIDEBAR (Made Wider: w-96) --- */}
        <div className="w-96 border-r border-gray-200 flex flex-col bg-gray-50/50 flex-shrink-0">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-dark">Messages</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {therapists.map((therapist) => (
              <button
                key={therapist.id}
                onClick={() => handleTherapistClick(therapist)}
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
                  <p className="text-xs text-dark/60 truncate max-w-[180px]">{therapist.lastMessage}</p>
                  
                  <span className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider ${therapist.lightColor} ${therapist.color.replace('bg-', 'text-')}`}>
                    {therapist.statusLabel}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>


        {/* --- RIGHT CHAT AREA --- */}
        <div className="flex-1 flex flex-col relative bg-white min-w-0">
          
          {/* 1. TOP BAR */}
          <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white z-20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image src={selectedTherapist.image} alt={selectedTherapist.name} className="w-full h-full object-cover" width={40} height={40} />
                </div>
                <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${selectedTherapist.color}`}></div>
              </div>
              <div>
                <h2 className="font-bold text-dark">{selectedTherapist.name}</h2>
                <p className={`text-xs ${selectedTherapist.color.replace('bg-', 'text-')}`}>
                  {selectedTherapist.statusLabel}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {selectedTherapist.status === 'in_session' && (
                <>
                  <button className="p-2 hover:bg-gray-100 rounded-full text-accent transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full text-accent transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                </>
              )}
              <button className="p-2 hover:bg-gray-100 rounded-full text-dark/60 transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>


          {/* 2. MAIN CONTENT AREA */}
          <div className="flex-1 relative overflow-hidden flex flex-col">
            
            {/* SCENARIO 1: IN SESSION (BLUE) */}
            {selectedTherapist.status === 'in_session' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                <div className="flex justify-center mb-4">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                    Session Started
                  </span>
                </div>
                
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] rounded-2xl p-3 ${
                        msg.sender === 'user' ? 'bg-accent text-white rounded-br-none' : 'bg-white border text-dark rounded-bl-none shadow-sm'
                      }`}>
                        
                        {/* Render File or Text */}
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

                {/* --- TYPING INDICATOR --- */}
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
            )}

            {/* SCENARIO 2: APPOINTMENT FIXED (GREEN) */}
            {selectedTherapist.status === 'fixed' && (
              <>
                {/* Background (Messages visible but blurred context) */}
                <div className="absolute inset-0 p-6 space-y-4 filter blur-sm opacity-50 bg-gray-50 z-0 pointer-events-none overflow-hidden">
                   {messages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.type === 'text' ? (
                          <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                            msg.sender === 'user' ? 'bg-accent text-white' : 'bg-white border text-dark'
                          }`}>
                            {msg.text}
                          </div>
                        ) : (
                           <div className="h-32 w-48 bg-gray-200 rounded-2xl"></div>
                        )}
                      </div>
                   ))}
                </div>

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
              </>
            )}

            {/* SCENARIO 3: WAITING (YELLOW) */}
            {selectedTherapist.status === 'waiting' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 bg-white">
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

            {/* SCENARIO 4: REJECTED (RED) */}
            {selectedTherapist.status === 'rejected' && (
              <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-center p-8">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Ban className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-dark mb-2">Request Declined</h3>
                <p className="text-dark/60 max-w-sm">
                  Unfortunately, {selectedTherapist.name} cannot accept your request.
                </p>
              </div>
            )}
          </div>


          {/* 3. MESSAGE INPUT BAR */}
          {(selectedTherapist.status === 'in_session' || selectedTherapist.status === 'fixed') && (
            <div className="bg-white border-t border-gray-200 p-4 z-20">
              <div className="flex items-end gap-3 max-w-4xl mx-auto">
                
                {/* Hidden File Input */}
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
          
        </div>
      </div>
      
      <ChatBot />
    </main>
  );
}