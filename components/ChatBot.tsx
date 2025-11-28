import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { ChatbotService } from '@/services/chatbotService';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Welcome to CalmCenter. I\'m here to listen and support you. How are you feeling today?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [canSend, setCanSend] = useState(true);
  const [currentPreQuestions, setCurrentPreQuestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatbotService = new ChatbotService();

  // Pre-defined question sets for mental health
  const preQuestionSets = {
    initial: [
      "I'm feeling anxious today",
      "I've been feeling really down",
      "I'm having trouble sleeping",
      "I'm feeling overwhelmed"
    ],
    followUp1: [
      "What can I do when I feel anxious?",
      "How can I improve my mood?",
      "Any tips for better sleep?",
      "How to handle stress better?"
    ],
    followUp2: [
      "I need immediate coping strategies",
      "Should I seek professional help?",
      "How to practice mindfulness?",
      "I'm feeling lonely and isolated"
    ],
    general: [
      "Tell me about grounding techniques",
      "How can I practice self-care?",
      "What are some breathing exercises?",
      "How to build a support system?"
    ]
  };

  // Initialize with first set of questions from the beginning
  useEffect(() => {
    setCurrentPreQuestions(preQuestionSets.initial);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const simulateTyping = (callback: () => void) => {
    setIsTyping(true);
    setCanSend(false);
    setTimeout(() => {
      setIsTyping(false);
      setCanSend(true);
      callback();
    }, 1500 + Math.random() * 1000);
  };

  const getNextQuestionSet = (currentSet: string[]): string[] => {
    if (currentSet === preQuestionSets.initial) return preQuestionSets.followUp1;
    if (currentSet === preQuestionSets.followUp1) return preQuestionSets.followUp2;
    if (currentSet === preQuestionSets.followUp2) return preQuestionSets.general;
    return preQuestionSets.general; // Default to general if we run out
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '' || !canSend) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setCanSend(false);

    simulateTyping(() => {
      const botResponse = chatbotService.getResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      
      // Load next set of pre-questions after bot responds
      setCurrentPreQuestions(getNextQuestionSet(currentPreQuestions));
    });
  };

  const handlePreQuestionClick = (question: string) => {
    if (!canSend) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setCanSend(false);

    simulateTyping(() => {
      const botResponse = chatbotService.getResponse(question);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      
      // Load next set of pre-questions after bot responds
      setCurrentPreQuestions(getNextQuestionSet(currentPreQuestions));
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && canSend) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, #f97316, #ea580c)',
          }}
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="bg-white rounded-2xl shadow-xl w-96 h-[600px] flex flex-col border border-orange-200"
          style={{
            background: 'linear-gradient(to bottom, #ffffff, #fff7ed)',
          }}
        >
          {/* Header */}
          <div className="bg-orange-500 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <span className="font-semibold">CalmCenter Support</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-orange-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.isUser
                        ? 'bg-orange-500 text-white rounded-br-none'
                        : 'bg-orange-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.isUser ? 'text-orange-200' : 'text-orange-400'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-orange-100 text-gray-800 rounded-2xl rounded-bl-none px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Pre-questions - Show from the beginning and always when not typing */}
          {currentPreQuestions.length > 0 && !isTyping && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
              <div className="grid grid-cols-2 gap-2">
                {currentPreQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handlePreQuestionClick(question)}
                    disabled={!canSend}
                    className="bg-orange-50 hover:bg-orange-100 disabled:bg-gray-100 disabled:text-gray-400 text-orange-700 text-xs p-2 rounded-lg transition-colors border border-orange-200 text-left disabled:cursor-not-allowed"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-orange-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={canSend ? "Share what's on your mind..." : "Please wait for response..."}
                disabled={!canSend}
                className="flex-1 border border-orange-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === '' || !canSend}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white p-2 rounded-full transition-colors disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;