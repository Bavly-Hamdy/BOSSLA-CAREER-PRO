'use client';

import React, { useState } from 'react';
import { CoverLetter } from '@/types/analysis';
import { Mail, Copy, Check, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';

interface TabCoverLetterProps {
  coverLetter: CoverLetter;
}

export const TabCoverLetter: React.FC<TabCoverLetterProps> = ({ coverLetter }) => {
  const { lang } = useThemeLanguage();
  const [copied, setCopied] = useState(false);

  const fullLetterText = coverLetter.fullText || `${coverLetter.salutation}\n\n${coverLetter.opening}\n\n${coverLetter.bodyParagraph}\n\n${coverLetter.closing}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullLetterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="surface-matte p-6 rounded-[24px] flex items-center justify-between shadow-sm">
        <div className="space-y-1">
          <span className="tracking-[0.2em] text-[11px] font-bold uppercase text-[var(--text-muted)] flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-[var(--fg-page)]" />
            {lang === 'ar' ? '٠١ // خطاب التغطية الذكي المخصص' : '01 // TAILORED COVER LETTER'}
          </span>
          <h3 className="text-sm font-bold text-[var(--fg-page)]">
            {lang === 'ar' ? 'مصمم ومخصص وفق متطلبات الوصف الوظيفي' : 'Matched 100% to Your Target Job Role'}
          </h3>
        </div>

        <motion.button
          whileTap={{ scale: 0.985 }}
          onClick={handleCopy}
          className="btn-pill-primary px-4 py-2 rounded-full text-xs font-mono font-bold flex items-center gap-2"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-400" />
              <span>{lang === 'ar' ? 'تم النسخ!' : 'COPIED TO CLIPBOARD'}</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>{lang === 'ar' ? 'نسخ خطاب التغطية' : 'COPY COVER LETTER'}</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Document View */}
      <div className="surface-matte p-8 sm:p-10 rounded-[24px] space-y-6 shadow-xl font-sans text-xs text-[var(--fg-page)] leading-relaxed">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 text-[10px] font-mono text-[var(--text-muted)]">
          <span>{lang === 'ar' ? 'صيغة تنفيذيّة قياسية (٣ فقرات)' : 'EXECUTIVE FORMAL FORMAT (3 PARAGRAPHS)'}</span>
          <span className="flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-[var(--fg-page)]" />
            <span>GEMINI 2.5 GENERATED</span>
          </span>
        </div>

        <div className="space-y-4">
          <p className="font-bold text-sm text-[var(--fg-page)]">{coverLetter.salutation}</p>
          <p className="whitespace-pre-line">{coverLetter.opening}</p>
          <p className="whitespace-pre-line">{coverLetter.bodyParagraph}</p>
          <p className="whitespace-pre-line">{coverLetter.closing}</p>
        </div>
      </div>
    </div>
  );
};
