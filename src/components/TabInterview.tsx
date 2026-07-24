'use client';

import React from 'react';
import { AnalysisData } from '@/types/analysis';
import { HelpCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';

interface TabInterviewProps {
  data: AnalysisData;
}

export const TabInterview: React.FC<TabInterviewProps> = ({ data }) => {
  const { lang } = useThemeLanguage();

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="surface-matte p-6 rounded-[24px] space-y-2">
        <div className="flex items-center justify-between">
          <span className="tracking-[0.2em] text-[11px] font-bold uppercase text-[var(--text-muted)] flex items-center gap-2">
            <HelpCircle className="h-3.5 w-3.5 text-[var(--fg-page)]" />
            {lang === 'ar' ? '٠١ // الأسئلة المخصصة للمقابلات ونموذج STAR' : '01 // TAILORED INTERVIEW PREPARATION & STAR STRATEGY'}
          </span>
          <span className="text-[10px] font-mono text-[var(--text-muted)]">
            {lang === 'ar' ? `${data.interviewQuestions.length} أسئلة متوقعة` : `${data.interviewQuestions.length} QUESTIONS`}
          </span>
        </div>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed font-sans">
          {lang === 'ar'
            ? 'تم إعداد هذه الأسئلة بناءً على الثغرات والمهارات المذكورة في سيرتك الذاتية لمساعدتك على صياغة إجابات احترافية باستخدام نموذج STAR (Situation, Task, Action, Result).'
            : 'Questions generated specifically around your resume vulnerabilities and technical skills. Apply the STAR method (Situation, Task, Action, Result) for high impact.'}
        </p>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {data.interviewQuestions.map((q, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="surface-matte p-6 rounded-[24px] space-y-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase font-bold">
                  {lang === 'ar' ? `سؤال المقابلة #${idx + 1}` : `INTERVIEW QUESTION #${idx + 1}`}
                </span>
                <h4 className="text-sm font-bold text-[var(--fg-page)]">{q.question}</h4>
              </div>

              <span className="px-3 py-1 rounded-full surface-inner text-[10px] font-mono font-bold text-[var(--fg-page)] shrink-0">
                {lang === 'ar' ? 'نموذج STAR' : 'STAR METHOD'}
              </span>
            </div>

            <div className="p-4 rounded-2xl surface-inner space-y-2 border border-[var(--border-subtle)]">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[var(--fg-page)] uppercase">
                <Sparkles className="h-3 w-3 text-[var(--fg-page)]" />
                <span>{lang === 'ar' ? 'الإستراتيجية المقترحة للإجابة' : 'RECOMMENDED RESPONSE STRATEGY'}</span>
              </div>
              <p className="text-xs text-[var(--fg-page)] font-sans leading-relaxed">{q.suggestedStrategy}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
