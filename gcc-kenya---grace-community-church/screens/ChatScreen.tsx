
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/gemini';
import { Message } from '../types';

/**
 * ChatScreen Module
 * Full-screen implementation of the Grace Guide AI assistant.
 */
const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Shalom! I am your Grace Guide. How can I help you today regarding Grace Community Church Kenya?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await geminiService.chat(input, history);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', text: responseText, timestamp: new Date() }]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] animate-in fade-in slide-in-from-right-4 duration-300">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950"
      >
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-3xl text-sm ${
              m.role === 'user' 
                ? 'bg-primary-600 text-white rounded-tr-none' 
                : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700 shadow-sm'
            }`}>
              {m.text}
              <p className={`text-[9px] mt-1 opacity-60 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl rounded-tl-none border border-slate-200 dark:border-slate-800">
              <div className="flex space-x-1.5">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse delay-75"></div>
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <form onSubmit={handleSend} className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-slate-800 dark:text-slate-200 py-2"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="ml-2 w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-lg disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatScreen;
