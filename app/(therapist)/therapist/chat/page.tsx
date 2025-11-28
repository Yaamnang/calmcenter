'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TherapistNavbar from '@/components/therapist/TherapistNavbar';
import Image from 'next/image';
import {
  Send,
  MoreVertical,
  Clock,
  FileText,
  Zap,
  CheckCircle2,
  Calendar,
  User,
  X,
  Paperclip,
  Image as ImageIcon,
  History,
  Archive,
  ChevronDown
} from 'lucide-react';

// --- TYPE DEFINITIONS ---
interface Session {
  id: string;
  userNickname: string;
  status: 'active' | 'waiting' | 'completed';
  context: string;
  therapistNotes: string;
  // Optional properties depending on status
  startTime?: string;
  requestedDate?: string;
  requestedTime?: string;
  endedTime?: string;
}

interface ChatMessage {
  id: number;
  sender: 'user' | 'therapist';
  type: 'text' | 'file';
  text: string;
  fileUrl?: string;
  fileType?: 'image' | 'doc';
}

// --- MOCK DATA ---

const MOCK_CHAT_HISTORY: Record<string, ChatMessage[]> = {
  'S_ACTIVE': [
    { id: 1, sender: 'user', type: 'text', text: "Hi doctor, I'm feeling really low today." },
    { id: 2, sender: 'user', type: 'text', text: "I can't seem to find any motivation." }
  ],
  'S_WAITING': [], 
  'S_PAST_1': [
    { id: 10, sender: 'user', type: 'text', text: "Thanks for the session last week." },
    { id: 11, sender: 'therapist', type: 'text', text: "You're welcome, Dorji. Keep practicing." }
  ],
  'S_PAST_2': [
    { id: 20, sender: 'user', type: 'text', text: "I'm feeling much better about the situation." },
    { id: 21, sender: 'therapist', type: 'text', text: "That is wonderful to hear, Sangay." }
  ],
  'S_PAST_3': [
    { id: 30, sender: 'user', type: 'text', text: "The breathing techniques really helped." },
    { id: 31, sender: 'therapist', type: 'text', text: "I'm glad, Wangmo. Remember to use them daily." }
  ],
  'S_PAST_4': [
    { id: 40, sender: 'user', type: 'text', text: "I think I'm ready to close this chapter." }
  ]
};

const INITIAL_SESSIONS: Session[] = [
  // --- ACTIVE / WAITING ---
  { 
    id: 'S_ACTIVE', 
    userNickname: 'Silent Monkey', 
    status: 'active', 
    context: 'Grief & Loss', 
    startTime: new Date().toISOString(), 
    therapistNotes: 'Patient is struggling with recent loss.',
  },
  { 
    id: 'S_WAITING', 
    userNickname: 'Anonymous Butterfly', 
    status: 'waiting', 
    context: 'Anxiety Check-in', 
    requestedDate: 'Dec 15, 2024',
    requestedTime: '10:00 AM', 
    therapistNotes: '' 
  },
  // --- PAST APPOINTMENTS ---
  {
    id: 'S_PAST_1',
    userNickname: 'Dorji',
    status: 'completed',
    context: 'Stress Management',
    endedTime: 'Dec 10, 2024',
    therapistNotes: 'Significant improvement shown.'
  },
  {
    id: 'S_PAST_2',
    userNickname: 'Sangay',
    status: 'completed',
    context: 'Career Counseling',
    endedTime: 'Dec 05, 2024',
    therapistNotes: 'Goals set for next year.'
  },
  {
    id: 'S_PAST_3',
    userNickname: 'Wangmo',
    status: 'completed',
    context: 'Family Therapy',
    endedTime: 'Nov 28, 2024',
    therapistNotes: 'Family dynamics improving.'
  },
  {
    id: 'S_PAST_4',
    userNickname: 'Tenzin',
    status: 'completed',
    context: 'Insomnia',
    endedTime: 'Nov 15, 2024',
    therapistNotes: 'Sleep schedule regulated.'
  }
];

const GRIEF_MESSAGES = [
  "It feels heavier today than yesterday.",
  "I tried to go out, but I just couldn't.",
  "Everything reminds me of that day.",
  "I don't know how to move forward.",
  "Is this feeling ever going to go away?",
];

function ChatInterface() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State with explicit Session[] type
  const [sessions, setSessions] = useState<Session[]>(INITIAL_SESSIONS);
  const [currentSession, setCurrentSession] = useState<Session>(sessions[0]);
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHAT_HISTORY['S_ACTIVE']);
  
  const [inputValue, setInputValue] = useState('');
  const [sessionNotes, setSessionNotes] = useState(sessions[0].therapistNotes);
  const [isTyping, setIsTyping] = useState(false);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, currentSession]);

  // Load Session Data when switching
  useEffect(() => {
    if (currentSession) {
      setSessionNotes(currentSession.therapistNotes || '');
      // Load specific chat history for this user
      setMessages(MOCK_CHAT_HISTORY[currentSession.id] || []);
    }
  }, [currentSession]);

  // --- SIMULATION LOGIC ---
  useEffect(() => {
    if (!currentSession || currentSession.status !== 'active') return;

    const lastMsg = messages[messages.length - 1];
    
    if (lastMsg && lastMsg.sender === 'therapist') {
      setIsTyping(true);
      
      const randomDelay = Math.floor(Math.random() * 2000) + 1500;
      const randomGrief = GRIEF_MESSAGES[Math.floor(Math.random() * GRIEF_MESSAGES.length)];

      const timeout = setTimeout(() => {
        const griefMsg: ChatMessage = {
          id: Date.now(),
          sender: 'user',
          type: 'text',
          text: randomGrief
        };
        setMessages(prev => [...prev, griefMsg]);
        setIsTyping(false);
      }, randomDelay);

      return () => clearTimeout(timeout);
    }
  }, [messages, currentSession]);


  // --- HANDLERS ---

  const handleSendMessage = () => {
    if (!inputValue.trim() || !currentSession) return;

    const newMsg: ChatMessage = {
      id: Date.now(),
      sender: 'therapist',
      type: 'text',
      text: inputValue
    };

    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && currentSession) {
      const isImage = file.type.startsWith('image/');
      const fileUrl = URL.createObjectURL(file); 

      const newFileMsg: ChatMessage = {
        id: Date.now(),
        sender: 'therapist',
        type: 'file',
        text: file.name,
        fileUrl: fileUrl,
        fileType: isImage ? 'image' : 'doc'
      };

      setMessages((prev) => [...prev, newFileMsg]);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePaperclipClick = () => {
    fileInputRef.current?.click();
  };

  const handleEndSession = () => {
    if (!currentSession) return;

    const confirm = window.confirm(`Are you sure you want to END the session with ${currentSession.userNickname}?`);
    
    if (confirm) {
      // Move to completed
      const updatedSessions = sessions.map(s => 
        s.id === currentSession.id 
          ? { ...s, status: 'completed', endedTime: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) } as Session
          : s
      );
      setSessions(updatedSessions);
      
      const nextActive = updatedSessions.find(s => s.status === 'active' || s.status === 'waiting');
      if (nextActive) {
        setCurrentSession(nextActive);
      } else {
        // If no active sessions left, show the just-completed session in read-only mode
        setCurrentSession({ ...currentSession, status: 'completed', endedTime: 'Just now' });
      }
    }
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSessionNotes(e.target.value);
    const updatedSessions = sessions.map(s => 
      s.id === currentSession.id ? { ...s, therapistNotes: e.target.value } : s
    );
    setSessions(updatedSessions);
  };


  // --- FILTERED LISTS ---
  const activeSessions = sessions.filter(s => s.status === 'active' || s.status === 'waiting');
  const pastSessions = sessions.filter(s => s.status === 'completed');


  return (
    <div className="flex h-[calc(100vh-80px)] bg-[#FDF5E6]">
      
      {/* --- 1. SPLIT LEFT SIDEBAR (w-96) --- */}
      <div className="w-96 bg-white border-r border-orange-100 flex flex-col shadow-sm z-10 flex-shrink-0 h-full">
        
        {/* TOP HALF (50% Height): Active / Waiting */}
        <div className="h-1/2 flex flex-col border-b-2 border-orange-100">
          <div className="p-5 border-b border-orange-50 bg-gradient-to-r from-orange-50/50 to-transparent flex-shrink-0">
            <h2 className="text-lg font-bold text-dark flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#FF8700]" /> Active Queue
            </h2>
            <p className="text-[10px] text-dark/40 uppercase tracking-wider mt-1">Current & Upcoming</p>
          </div>
          
          <div className="flex-1 overflow-y-auto min-h-0">
            {activeSessions.map((session) => (
              <button
                key={session.id}
                onClick={() => setCurrentSession(session)}
                className={`w-full p-4 border-b border-gray-50 hover:bg-orange-50/50 transition-all text-left relative group ${
                  currentSession?.id === session.id ? 'bg-orange-50 border-l-4 border-l-[#FF8700]' : 'border-l-4 border-l-transparent'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ${
                    session.status === 'active' 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                      : 'bg-gradient-to-br from-yellow-400 to-orange-400'
                  }`}>
                    {session.userNickname.charAt(0)}
                    <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${
                       session.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                    }`}></span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <h3 className="font-bold text-dark text-sm">{session.userNickname}</h3>
                    </div>
                    <p className="text-xs text-dark/60 truncate font-medium">{session.context}</p>
                    <p className="text-[10px] text-dark/40 mt-1 uppercase font-bold tracking-wide">
                      {session.status === 'active' ? 'Live' : 'Waiting'}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* BOTTOM HALF (50% Height): Past Appointments */}
        <div className="h-1/2 flex flex-col bg-gray-50/30">
          <div className="p-4 border-b border-gray-100 flex-shrink-0 bg-gray-50">
            <h2 className="text-sm font-bold text-dark/70 flex items-center gap-2">
              <History className="w-4 h-4" /> History
            </h2>
            <p className="text-[10px] text-dark/40 uppercase tracking-wider mt-1">Completed Sessions</p>
          </div>
          
          <div className="flex-1 overflow-y-auto min-h-0">
            {pastSessions.map((session) => (
              <button
                key={session.id}
                onClick={() => setCurrentSession(session)}
                className={`w-full p-4 border-b border-gray-100 hover:bg-gray-100 transition-all text-left group ${
                  currentSession?.id === session.id ? 'bg-white border-l-4 border-l-gray-400 shadow-inner' : 'border-l-4 border-l-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    {session.userNickname.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-dark/70 text-sm">{session.userNickname}</h3>
                    <p className="text-[10px] text-dark/40 flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-green-500" /> Ended: {session.endedTime}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* --- 2. MIDDLE CHAT AREA --- */}
      <div className="flex-1 flex flex-col bg-white/50 relative min-w-0">
        {currentSession ? (
          <>
            {/* Header */}
            <div className="h-20 bg-white border-b border-orange-100 flex items-center justify-between px-8 shadow-sm z-20">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                   currentSession.status === 'active' ? 'bg-blue-600' : 
                   currentSession.status === 'waiting' ? 'bg-yellow-500' : 'bg-gray-400'
                }`}>
                  {currentSession.userNickname.charAt(0)}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-dark">{currentSession.userNickname}</h2>
                  <div className="flex items-center gap-2 text-xs font-medium">
                    {currentSession.status === 'active' ? (
                      <span className="text-blue-600 flex items-center gap-1">
                        <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span> In Session
                      </span>
                    ) : currentSession.status === 'waiting' ? (
                      <span className="text-yellow-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Waiting
                      </span>
                    ) : (
                      <span className="text-gray-500 flex items-center gap-1">
                        <Archive className="w-3 h-3" /> Archived • {currentSession.endedTime}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-orange-50 rounded-full text-dark/40 transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 relative overflow-hidden flex flex-col">
              
              {/* --- SCENARIO A: WAITING --- */}
              {currentSession.status === 'waiting' && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-md z-10 flex flex-col items-center justify-center">
                  <div className="bg-white border border-orange-100 p-10 rounded-3xl shadow-xl text-center max-w-md w-full mx-4">
                    <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Calendar className="w-10 h-10 text-[#FF8700]" />
                    </div>
                    <h3 className="text-2xl font-bold text-dark mb-2">Session Scheduled</h3>
                    <div className="bg-[#FDF5E6] rounded-2xl p-4 border border-orange-100 inline-block px-8 mt-4">
                      <div className="text-xl font-bold text-[#FF8700]">{currentSession.requestedDate}</div>
                      <div className="text-sm font-medium text-dark/70">{currentSession.requestedTime}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- SCENARIO B: MESSAGES (Active & Past) --- */}
              <div className={`flex-1 overflow-y-auto p-8 space-y-6 ${currentSession.status === 'waiting' ? 'filter blur-sm' : ''}`}>
                
                {currentSession.status === 'completed' && (
                  <div className="flex justify-center mb-6">
                    <div className="bg-gray-100 text-gray-500 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-gray-200 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Session Completed
                    </div>
                  </div>
                )}

                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'therapist' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] px-5 py-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.sender === 'therapist' 
                        ? 'bg-[#FF8700] text-white rounded-br-none' 
                        : 'bg-white border border-gray-100 text-dark rounded-bl-none'
                    }`}>
                      {msg.type === 'file' ? (
                        msg.fileType === 'image' ? (
                          <div className="space-y-2">
                            <img src={msg.fileUrl} alt="Attachment" className="rounded-lg max-h-60 object-cover border border-white/20" />
                            <p className="text-xs opacity-90 italic flex items-center gap-1">
                              <ImageIcon className="w-3 h-3" /> {msg.text}
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3 bg-black/10 p-3 rounded-lg">
                            <FileText className="w-6 h-6" />
                            <span className="underline font-medium">{msg.text}</span>
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
                    <div className="bg-white border border-gray-100 px-6 py-4 rounded-2xl rounded-bl-none shadow-sm flex gap-1.5">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area (Only for ACTIVE) */}
              {currentSession.status === 'active' && (
                <div className="bg-white border-t border-gray-200 p-6 z-20">
                  <div className="max-w-4xl mx-auto flex items-end gap-3">
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileSelect} 
                      className="hidden" 
                      accept="image/*,.pdf,.doc,.docx"
                    />
                    <button 
                      onClick={handlePaperclipClick}
                      className="p-4 bg-gray-100 rounded-2xl text-dark/60 hover:text-[#FF8700] hover:bg-orange-50 transition-colors"
                    >
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <div className="flex-1 bg-[#FDF5E6] rounded-2xl px-5 py-4 border border-transparent focus-within:border-orange-200 focus-within:bg-white transition-all">
                      <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                        placeholder="Type your message..."
                        className="w-full bg-transparent outline-none resize-none text-sm text-dark placeholder-dark/40 max-h-32"
                        rows={1}
                      />
                    </div>
                    <button 
                      onClick={handleSendMessage} 
                      disabled={!inputValue.trim()} 
                      className="p-4 bg-[#FF8700] text-white rounded-2xl hover:bg-[#e67a00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
              
              {/* Read Only Banner for Completed */}
              {currentSession.status === 'completed' && (
                <div className="bg-gray-50 border-t border-gray-200 p-4 text-center text-xs text-dark/40 font-medium uppercase tracking-wider">
                  This conversation is archived and read-only
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-dark/30">
            Select a session to view details
          </div>
        )}
      </div>

      {/* --- 3. RIGHT SIDEBAR (User Details & Notes) --- */}
      {currentSession && (
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col z-10 flex-shrink-0">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-dark flex items-center gap-2">
              <User className="w-5 h-5 text-[#FF8700]" /> Patient Details
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {/* Context Card */}
            <div>
              <h4 className="text-xs font-bold text-dark/40 uppercase tracking-wider mb-3">Presenting Issue</h4>
              <div className="bg-[#FDF5E6] p-4 rounded-xl border border-orange-100 text-dark/80 text-sm font-medium">
                {currentSession.context}
              </div>
            </div>

            {/* Private Notes */}
            <div className="flex-1 flex flex-col">
              <h4 className="text-xs font-bold text-dark/40 uppercase tracking-wider mb-3 flex items-center gap-2">
                <FileText className="w-3 h-3" /> Clinical Notes
              </h4>
              <textarea
                value={sessionNotes}
                onChange={handleNoteChange}
                placeholder="Enter private session notes..."
                className="w-full h-64 p-4 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF8700]/20 focus:border-[#FF8700] resize-none bg-gray-50/50 leading-relaxed"
              />
              <p className="text-[10px] text-dark/30 mt-2 text-right italic">Auto-saving...</p>
            </div>
          </div>

          {/* End Session Button (Only for Active) */}
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            {currentSession.status === 'active' && (
              <button
                onClick={handleEndSession}
                className="w-full py-4 bg-white border-2 border-red-100 text-red-500 rounded-xl text-sm font-bold hover:bg-red-50 hover:border-red-200 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <X className="w-5 h-5" /> End Session
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default function TherapistChatPage() {
  return (
    <main className="min-h-screen bg-[#FDF5E6]">
      <TherapistNavbar />
      <Suspense fallback={<div className="p-10 text-center text-dark/50">Loading...</div>}>
        <ChatInterface />
      </Suspense>
    </main>
  );
}