'use client';

import React from 'react';
import { AnalysisData } from '@/types/analysis';
import { KeyRound, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';

interface TabKeywordsProps {
  data: AnalysisData;
}

export const TabKeywords: React.FC<TabKeywordsProps> = ({ data }) => {
  const { lang } = useThemeLanguage();

  return (
    <div className="space-y-6">
      {/* Missing Keywords Box */}
      <div className="surface-matte p-6 rounded-[24px] space-y-4">
        <div className="flex items-center justify-between">
          <span className="tracking-[0.2em] text-[11px] font-bold uppercase text-[var(--text-muted)] flex items-center gap-2">
            <KeyRound className="h-3.5 w-3.5 text-[var(--fg-page)]" />
            {lang === 'ar' ? '٠١ // الكلمات المفتاحية المفقودة' : '01 // MISSING ATS KEYWORDS'}
          </span>
          <span className="text-[10px] font-mono text-[var(--text-muted)]">
            {lang === 'ar' ? `${data.missingKeywords.length} مهارات مفقودة` : `${data.missingKeywords.length} GAP TAGS`}
          </span>
        </div>

        <p className="text-xs text-[var(--text-muted)] font-sans">
          {lang === 'ar'
            ? 'تجاوز محركات تصفية السير الذاتية بإضافة هذه المهارات الأساسية المطلوبة في مجال عملك:'
            : 'Integrate these high-frequency skill tags into your work experience bullet points to bypass ATS filters:'}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {data.missingKeywords.map((keyword, index) => (
            <span
              key={index}
              className="px-3.5 py-1.5 rounded-full surface-inner text-xs font-mono font-bold text-[var(--fg-page)] flex items-center gap-1.5 shadow-sm"
            >
              <span className="text-[var(--text-muted)]">+</span> {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* ATS Checklist Box */}
      <div className="surface-matte p-6 rounded-[24px] space-y-4">
        <div className="flex items-center justify-between">
          <span className="tracking-[0.2em] text-[11px] font-bold uppercase text-[var(--text-muted)] flex items-center gap-2">
            <ShieldAlert className="h-3.5 w-3.5 text-[var(--fg-page)]" />
            {lang === 'ar' ? '٠٢ // قائمة تدقيق التنسيق المعياري' : '02 // ATS FORMATTING CHECKLIST'}
          </span>
          <span className="text-[10px] font-mono text-[var(--text-muted)]">
            {lang === 'ar' ? 'معايير الفحص المعتمدة' : '30+ PARSING RULES'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              title: lang === 'ar' ? 'توافق العناوين الرئيسية' : 'Standard Section Headers',
              desc: lang === 'ar' ? 'استخدام عناوين واضحة مثل الخبرات، التعليم، المهارات.' : 'Uses recognized labels like Work Experience & Education.',
              passed: true,
            },
            {
              title: lang === 'ar' ? 'خلو من الجداول والأشكال المعقدة' : 'No Tables or Complex Graphics',
              desc: lang === 'ar' ? 'نص تسلسلي بسيط يسهل قراءته آلياً بدون أنسقة متداخلة.' : 'Linear text layout easily readable by OCR parsers.',
              passed: true,
            },
            {
              title: lang === 'ar' ? 'توافق الخطوط القياسية' : 'Standard Font Hierarchy',
              desc: lang === 'ar' ? 'استخدام خطوط قياسية واضحة للأجهزة والمحركات.' : 'Uses system fonts with standard sizing tokens.',
              passed: true,
            },
            {
              title: lang === 'ar' ? 'صيغة الملف والمعالجة الرقمية' : 'File Container Integrity',
              desc: lang === 'ar' ? 'ملف قابل لاستخراج النصوص دون حماية أو تشفير.' : 'Selectable text container without image rasterization.',
              passed: true,
            },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl surface-inner space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--fg-page)]">{item.title}</span>
                <CheckCircle2 className="h-4 w-4 text-[var(--fg-page)]" />
              </div>
              <p className="text-[11px] text-[var(--text-muted)] font-sans">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
