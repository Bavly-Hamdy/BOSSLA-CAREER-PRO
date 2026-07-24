'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Bot, User, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';

interface TabChatProps {
  resumeText: string;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

export const TabChat: React.FC<TabChatProps> = ({ resumeText }) => {
  const { lang } = useThemeLanguage();

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text:
        lang === 'ar'
          ? 'مرحباً بك! أنا مساعدك الذكي في بوصلة الكاريير. لقد قمت بتحليل سيرتك الذاتية. يمكنك سؤالي عن أي شيء: كيف تحضر لمقابلة معينة، أو كيف تصيغ خبرة معينة بشكل أقوى!'
          : 'Hello! I am your Bossla Career Co-Pilot. I have ingested your full resume context. Ask me anything about tailoring your application or practicing role answers!',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { sender: 'user', text: userMsg }],
          resumeText,
        }),
      });

      const data = await res.json();
      if (data.success && data.reply) {
        setMessages((prev) => [...prev, { sender: 'ai', text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: lang === 'ar' ? 'عذراً، حدث خطأ أثناء الاتصال بالمساعد الذكي.' : 'Apologies, I encountered an error processing your query.',
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: lang === 'ar' ? 'عذراً، تعذر الاتصال بالخادم.' : 'Sorry, failed to connect to the assistant API.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="surface-matte rounded-[24px] overflow-hidden flex flex-col h-[560px] shadow-xl border border-[var(--border-subtle)]">
      {/* Chat Header */}
      <div className="p-4 surface-inner border-b border-[var(--border-subtle)] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full btn-pill-primary flex items-center justify-center">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[var(--fg-page)]">
              {lang === 'ar' ? 'المساعد المهني المباشر' : 'BOSSLA CAREER CO-PILOT'}
            </h4>
            <p className="text-[10px] text-[var(--text-muted)] font-mono">
              {lang === 'ar' ? 'سياق السيرة الذاتية محمّل بالكامل' : 'RESUME CONTEXT ACTIVE'}
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono surface-matte px-2 py-0.5 rounded text-[var(--fg-page)]">
          GEMINI 2.5 FLASH
        </span>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-xs">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 ${
                msg.sender === 'user'
                  ? 'btn-pill-primary'
                  : 'surface-inner'
              }`}
            >
              {msg.sender === 'user' ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5 text-[var(--fg-page)]" />}
            </div>

            <div
              className={`max-w-[80%] p-3.5 rounded-2xl leading-relaxed ${
                msg.sender === 'user'
                  ? 'btn-pill-primary text-xs font-medium'
                  : 'surface-inner border border-[var(--border-subtle)] text-[var(--fg-page)]'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-[var(--text-muted)] italic text-xs p-2">
            <Loader2 className="h-4 w-4 animate-spin text-[var(--fg-page)]" />
            <span>{lang === 'ar' ? 'جاري الصياغة والتفكير...' : 'Thinking and drafting response...'}</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="p-3 surface-inner border-t border-[var(--border-subtle)] flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            lang === 'ar'
              ? 'اسأل المساعد الذكي أي سؤال حول سيرتك الذاتية أو المقابلة...'
              : 'Ask Bossla Co-Pilot anything about your resume or interview prep...'
          }
          className="flex-1 bg-[var(--bg-page)] border border-[var(--border-subtle)] rounded-full px-4 py-2.5 text-xs text-[var(--fg-page)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--fg-page)] font-sans"
        />
        <motion.button
          whileTap={{ scale: 0.985 }}
          type="submit"
          disabled={!input.trim() || loading}
          className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${
            !input.trim() || loading ? 'surface-matte text-[var(--text-muted)] cursor-not-allowed' : 'btn-pill-primary'
          }`}
        >
          <Send className="h-4 w-4 rtl:rotate-180" />
        </motion.button>
      </form>
    </div>
  );
};
