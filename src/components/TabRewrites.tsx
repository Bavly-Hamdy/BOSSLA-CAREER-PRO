'use client';

import React, { useState } from 'react';
import { AnalysisData } from '@/types/analysis';
import { Wand2, Copy, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';

interface TabRewritesProps {
  data: AnalysisData;
}

export const TabRewrites: React.FC<TabRewritesProps> = ({ data }) => {
  const { lang } = useThemeLanguage();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="surface-matte p-6 rounded-[24px] space-y-2">
        <div className="flex items-center justify-between">
          <span className="tracking-[0.2em] text-[11px] font-bold uppercase text-[var(--text-muted)] flex items-center gap-2">
            <Wand2 className="h-3.5 w-3.5 text-[var(--fg-page)]" />
            {lang === 'ar' ? 'معيار جوجل لإعادة الصياغة X-Y-Z' : 'GOOGLE X-Y-Z FORMULA ENGINE'}
          </span>
          <span className="text-[10px] font-mono text-[var(--text-muted)]">
            {lang === 'ar' ? 'صياغة التأثير المباشر' : 'IMPACT REWRITES'}
          </span>
        </div>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed font-sans">
          {lang === 'ar'
            ? 'صُممت هذه التوصيات بناءً على صيغة جوجل القياسية: "أُنجز [X] بمقدار [Y] من خلال تنفيذ [Z]". يمكنك نسخ النُسخ المحسنة مباشرة بنقرة واحدة.'
            : 'Formulated using Google\'s hiring formula: "Accomplished [X] as measured by [Y], by doing [Z]". Click copy to insert into your master resume.'}
        </p>
      </div>

      {/* Actionable Improvement Cards */}
      <div className="space-y-4">
        {data.actionableImprovements.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="surface-matte p-6 rounded-[24px] space-y-4 shadow-sm"
          >
            {/* Header / Rationale */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase font-bold">
                  {lang === 'ar' ? `توصية التحسين #${index + 1}` : `REWRITE REASONING #${index + 1}`}
                </span>
                <p className="text-xs font-semibold text-[var(--fg-page)]">{item.reasoning}</p>
              </div>

              <motion.button
                whileTap={{ scale: 0.985 }}
                onClick={() => handleCopy(item.improvedText, index)}
                className="btn-pill-secondary px-3 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 shrink-0"
              >
                {copiedIndex === index ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span>{lang === 'ar' ? 'تم النسخ!' : 'COPIED'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>{lang === 'ar' ? 'نسخ النص' : 'COPY REWRITE'}</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Before vs After Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Original */}
              <div className="p-4 rounded-2xl surface-inner space-y-2">
                <span className="text-[9px] font-mono font-bold uppercase text-[var(--text-muted)]">
                  {lang === 'ar' ? 'قبل (النص الحالي بالسيرة الذاتية)' : 'BEFORE (CURRENT BULLET)'}
                </span>
                <p className="text-xs text-[var(--text-muted)] italic font-mono leading-relaxed">
                  "{item.originalText}"
                </p>
              </div>

              {/* Improved */}
              <div className="p-4 rounded-2xl surface-inner border-[var(--fg-page)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono font-bold uppercase text-[var(--fg-page)] flex items-center gap-1">
                    <span>{lang === 'ar' ? 'بعد (معيار جوجل X-Y-Z)' : 'AFTER (GOOGLE X-Y-Z)'}</span>
                    <ArrowRight className="h-3 w-3 rtl:rotate-180 text-[var(--fg-page)]" />
                  </span>
                </div>
                <p className="text-xs text-[var(--fg-page)] font-medium font-sans leading-relaxed">
                  "{item.improvedText}"
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
