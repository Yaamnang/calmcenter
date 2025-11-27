'use client';

import { useState } from 'react';
import UserNavbar from '@/components/shared/UserNavbar';
import { Send, Paperclip, Smile, MoreVertical, Phone, Video } from 'lucide-react';
import ChatBot from '@/components/ChatBot';

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'therapist',
      text: 'Hello! Welcome to Calm. I\'m Dr. Tashi, and I\'m here to listen and support you. Feel free to share what\'s on your mind.',
      time: '2:30 PM'
    },
    {
      id: 2,
      sender: 'user',
      text: 'Hi, thank you for being here. I\'ve been feeling really anxious lately.',
      time: '2:32 PM'
    },
    {
      id: 3,
      sender: 'therapist',
      text: 'Thank you for sharing that with me. Anxiety can be really challenging. Can you tell me more about when you notice these feelings?',
      time: '2:33 PM'
    }
  ]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'user',
        text: message,
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');

      // Simulate therapist typing and response
      setTimeout(() => {
        const therapistResponse = {
          id: messages.length + 2,
          sender: 'therapist',
          text: 'I understand. Let\'s explore that together. Take your time.',
          time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
        };
        setMessages(prev => [...prev, therapistResponse]);
      }, 2000);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-white flex flex-col">
      <UserNavbar />
    <ChatBot />

      <div className="flex-1 flex flex-col pt-20">
        {/* Chat Header */}
        <div className="bg-white/80 backdrop-blur-lg border-b border-dark/10 px-6 py-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-accent font-bold text-lg">DT</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-dark">Dr. Tashi Dorji</h2>
                <p className="text-sm text-dark/60">Anxiety & Depression Specialist</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full bg-accent/10 hover:bg-accent/20 flex items-center justify-center transition-colors">
                <Phone className="w-5 h-5 text-accent" />
              </button>
              <button className="w-10 h-10 rounded-full bg-accent/10 hover:bg-accent/20 flex items-center justify-center transition-colors">
                <Video className="w-5 h-5 text-accent" />
              </button>
              <button className="w-10 h-10 rounded-full bg-accent/10 hover:bg-accent/20 flex items-center justify-center transition-colors">
                <MoreVertical className="w-5 h-5 text-accent" />
              </button>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-6 py-8 max-w-4xl">
            {/* Privacy Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-center">
              <p className="text-sm text-blue-800">
                🔒 This conversation is encrypted and completely anonymous. Your privacy is protected.
              </p>
            </div>

            {/* Messages */}
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        msg.sender === 'user'
                          ? 'bg-accent text-white rounded-br-none'
                          : 'bg-white border border-dark/10 text-dark rounded-bl-none'
                      }`}
                    >
                      <p className="text-base leading-relaxed">{msg.text}</p>
                    </div>
                    <p className={`text-xs text-dark/50 mt-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Typing indicator */}
            <div className="flex justify-start mt-4">
              <div className="bg-white border border-dark/10 rounded-2xl rounded-bl-none px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-dark/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-dark/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-dark/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="bg-white border-t border-dark/10 px-6 py-4">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-end gap-3">
              <button className="w-10 h-10 rounded-full bg-accent/10 hover:bg-accent/20 flex items-center justify-center transition-colors flex-shrink-0">
                <Paperclip className="w-5 h-5 text-accent" />
              </button>

              <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-3 flex items-center gap-2">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent outline-none resize-none text-dark placeholder-dark/50"
                  rows={1}
                  style={{ maxHeight: '120px' }}
                />
                <button className="text-dark/40 hover:text-dark/60 transition-colors">
                  <Smile className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: message.trim() ? '#FF8700' : '#e0e0e0',
                  boxShadow: message.trim() ? '0 4px 15px rgba(255, 135, 0, 0.3)' : 'none'
                }}
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>

            <p className="text-xs text-dark/40 text-center mt-3">
              Press Enter to send, Shift + Enter for new line
            </p>
          </div>
        </div>
      </div>
    </main>
    
  );
}
