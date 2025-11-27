'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TherapistNavbar from '@/components/therapist/TherapistNavbar';
import {
  Send,
  MoreVertical,
  Clock,
  FileText,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { sessions, chatMessages, quickReplies, ChatMessage } from '@/data/therapistData';

export default function TherapistChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session');

  const [currentSession, setCurrentSession] = useState<any>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [sessionNotes, setSessionNotes] = useState('');
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [activeSessions, setActiveSessions] = useState(sessions);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load session
    if (sessionId) {
      const session = sessions.find((s) => s.id === sessionId);
      if (session) {
        setCurrentSession(session);
        setSessionStartTime(new Date(session.startTime));
        setSessionNotes(session.therapistNotes || '');

        // Load messages for this session
        const sessionMessages = chatMessages.filter((m) => m.sessionId === sessionId);
        setMessages(sessionMessages);
      }
    } else if (sessions.length > 0) {
      // Default to first active session
      const firstActive = sessions.find((s) => s.status === 'active');
      if (firstActive) {
        setCurrentSession(firstActive);
        setSessionStartTime(new Date(firstActive.startTime));
        const sessionMessages = chatMessages.filter((m) => m.sessionId === firstActive.id);
        setMessages(sessionMessages);
      }
    }
  }, [router, sessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '' || !currentSession) return;

    const newMessage: ChatMessage = {
      id: `MSG${Date.now()}`,
      sessionId: currentSession.id,
      sender: 'therapist',
      message: inputValue,
      timestamp: new Date().toISOString(),
      read: false
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
    setShowQuickReplies(false);

    // Simulate user typing and response
    setIsTyping(true);
    setTimeout(() => {
      const userResponse: ChatMessage = {
        id: `MSG${Date.now() + 1}`,
        sessionId: currentSession.id,
        sender: 'user',
        message: 'Thank you for your support. That really helps.',
        timestamp: new Date().toISOString(),
        read: false
      };
      setMessages((prev) => [...prev, userResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    setShowQuickReplies(false);
  };

  const handleEndSession = () => {
    if (!currentSession) return;

    const updatedSessions = activeSessions.map((s) =>
      s.id === currentSession.id
        ? { ...s, status: 'completed' as const, endTime: new Date().toISOString(), therapistNotes: sessionNotes }
        : s
    );
    setActiveSessions(updatedSessions);

    alert('Session ended and notes saved successfully!');
    router.push('/therapist/dashboard');
  };

  const getSessionDuration = () => {
    if (!sessionStartTime) return '0:00';
    const now = new Date();
    const diff = now.getTime() - sessionStartTime.getTime();
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentSession) {
    return (
      <main className="min-h-screen bg-gray-50">
        <TherapistNavbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-dark/60">Loading session...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <TherapistNavbar />

      <div className="flex h-[calc(100vh-80px)]">
      {/* Left Sidebar - Active Sessions */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-dark">Active Sessions</h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeSessions
            .filter((s) => s.status === 'active' || s.status === 'waiting')
            .map((session) => (
              <button
                key={session.id}
                onClick={() => {
                  setCurrentSession(session);
                  const sessionMessages = chatMessages.filter((m) => m.sessionId === session.id);
                  setMessages(sessionMessages);
                }}
                className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left ${
                  currentSession.id === session.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {session.userNickname.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">{session.userNickname}</h3>
                    <p className="text-sm text-gray-600 truncate">{session.context}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          session.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {session.status}
                      </span>
                      {messages.filter((m) => m.sessionId === session.id && !m.read && m.sender === 'user').length >
                        0 && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                {currentSession.userNickname.charAt(0)}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">{currentSession.userNickname}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span>Active Session</span>
                  <span>•</span>
                  <Clock className="w-4 h-4" />
                  <span>{getSessionDuration()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-blue-50 border-b border-blue-100 px-6 py-3">
          <p className="text-sm text-blue-800 text-center">
            🔒 This conversation is encrypted. All user identities remain anonymous.
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white p-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'therapist' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${message.sender === 'therapist' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.sender === 'therapist'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none'
                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.message}</p>
                  </div>
                  <p
                    className={`text-xs text-gray-500 mt-1 ${
                      message.sender === 'therapist' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {new Date(message.timestamp).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Quick Replies */}
        {showQuickReplies && (
          <div className="bg-white border-t border-gray-200 px-6 py-3">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-gray-700">Quick Replies</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 text-sm rounded-lg transition-colors border border-purple-200"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end gap-3">
              <button
                onClick={() => setShowQuickReplies(!showQuickReplies)}
                className={`p-3 rounded-xl transition-all ${
                  showQuickReplies
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                }`}
              >
                <Zap className="w-5 h-5" />
              </button>

              <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-3">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                  className="w-full bg-transparent outline-none resize-none text-gray-800 placeholder-gray-500"
                  rows={2}
                  style={{ maxHeight: '120px' }}
                />
              </div>

              <button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === ''}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-2">
              Press Enter to send • Shift + Enter for new line
            </p>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Session Info */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">Session Details</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* User Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">User Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Nickname:</span>
                <span className="font-medium text-gray-800">{currentSession.userNickname}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Session ID:</span>
                <span className="font-mono text-xs text-gray-800">{currentSession.id}</span>
              </div>
            </div>
          </div>

          {/* Session Context */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Session Context</h3>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
              <p className="text-sm text-gray-700">{currentSession.context}</p>
            </div>
          </div>

          {/* Session Notes */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Private Notes</h3>
            <textarea
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              placeholder="Add your private session notes here..."
              className="w-full h-32 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
            />
            <p className="text-xs text-gray-500 mt-2">Only visible to you</p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleEndSession}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
            >
              <CheckCircle2 className="w-5 h-5" />
              End Session
            </button>

            <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all">
              <FileText className="w-5 h-5" />
              View History
            </button>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
}
