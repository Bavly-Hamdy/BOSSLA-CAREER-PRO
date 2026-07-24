'use client';

import React, { useState } from 'react';
import { FileText, Copy, Download, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';

interface TabFullResumeProps {
  rebuiltResumeMarkdown: string;
}

export const TabFullResume: React.FC<TabFullResumeProps> = ({ rebuiltResumeMarkdown }) => {
  const { lang } = useThemeLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(rebuiltResumeMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([rebuiltResumeMarkdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Bossla_Career_ATS_Optimized_Resume.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header & Action Bar */}
      <div className="surface-matte p-6 rounded-[24px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <span className="tracking-[0.2em] text-[11px] font-bold uppercase text-[var(--text-muted)] flex items-center gap-2">
            <FileText className="h-3.5 w-3.5 text-[var(--fg-page)]" />
            {lang === 'ar' ? '٠١ // السيرة الذاتية المعاد صياغتها بالكامل' : '01 // 100% REBUILT ATS RESUME'}
          </span>
          <h3 className="text-sm font-bold text-[var(--fg-page)]">
            {lang === 'ar' ? 'مستند Markdown قياسي متوافق مع كافة محركات الـ ATS' : '100% Parsable Markdown Container for 1-Click Export'}
          </h3>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <motion.button
            whileTap={{ scale: 0.985 }}
            onClick={handleCopy}
            className="btn-pill-secondary px-3.5 py-2 rounded-full text-xs font-mono font-bold flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                <span>{lang === 'ar' ? 'تم النسخ!' : 'COPIED'}</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>{lang === 'ar' ? 'نسخ المستند' : 'COPY MARKDOWN'}</span>
              </>
            )}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.985 }}
            onClick={handleDownload}
            className="btn-pill-primary px-4 py-2 rounded-full text-xs font-mono font-bold flex items-center gap-2"
          >
            <Download className="h-3.5 w-3.5" />
            <span>{lang === 'ar' ? 'تحميل (.md)' : 'DOWNLOAD (.MD)'}</span>
          </motion.button>
        </div>
      </div>

      {/* Code / Markdown Display */}
      <div className="surface-matte p-6 sm:p-8 rounded-[24px] shadow-xl overflow-x-auto font-mono text-xs text-[var(--fg-page)] leading-relaxed whitespace-pre-wrap">
        {rebuiltResumeMarkdown}
      </div>
    </div>
  );
};
