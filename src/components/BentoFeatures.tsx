'use client';

import React from 'react';
import { ShieldCheck, Wand2, Mail, Rocket, MessageSquare, FileCode, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';

export const BentoFeatures: React.FC = () => {
  const { lang } = useThemeLanguage();

  const features = [
    {
      step: lang === 'ar' ? '٠١' : '01',
      title: lang === 'ar' ? 'تدقيق توافق الـ ATS' : 'Forensic ATS Readability Audit',
      description:
        lang === 'ar'
          ? 'فحص السيرة الذاتية وفقاً لأكثر من 30 معياراً معتمداً في شركات البرمجيات العالمية.'
          : 'Scans your document against 30+ enterprise HR parsing rules, layout structures, and font compatibility.',
      icon: ShieldCheck,
      colSpan: 'col-span-1 md:col-span-2',
    },
    {
      step: lang === 'ar' ? '٠٢' : '02',
      title: lang === 'ar' ? 'معيار جوجل X-Y-Z' : 'Google X-Y-Z Formula Engine',
      description:
        lang === 'ar'
          ? 'تحويل النقاط الضعيفة إلى إنجازات رقمية مثبتة: أُنجز [X] بمقدار [Y] عن طريق [Z].'
          : 'Transforms weak bullet points into high-converting impact metrics: "Accomplished [X] as measured by [Y], by doing [Z]".',
      icon: Wand2,
      colSpan: 'col-span-1',
    },
    {
      step: lang === 'ar' ? '٠٣' : '03',
      title: lang === 'ar' ? 'خطاب التغطية الذكي' : 'AI Tailored Cover Letter',
      description:
        lang === 'ar'
          ? 'توليد خطاب تغطية مخصص 100% للوظيفة المستهدفة بثلاث فقرات تنفيدية.'
          : 'Generates customized, 3-paragraph executive cover letters matched specifically to the target Job Description.',
      icon: Mail,
      colSpan: 'col-span-1',
    },
    {
      step: lang === 'ar' ? '٠٤' : '04',
      title: lang === 'ar' ? 'تقدير الرواتب والترقية' : 'Salary & Promotion Benchmarks',
      description:
        lang === 'ar'
          ? 'توقع 3 مسارات ترقية مستقبليّة مع تقدير نطاق الرواتب والمهارات المطلوبة.'
          : 'Predicts 3 next-tier career trajectories with market salary ranges (USD/Local) and skill gap mapping.',
      icon: Rocket,
      colSpan: 'col-span-1 md:col-span-2',
    },
    {
      step: lang === 'ar' ? '٠٥' : '05',
      title: lang === 'ar' ? 'المساعد المهني الذكي' : 'Interactive Career Co-Pilot',
      description:
        lang === 'ar'
          ? 'شات مباشر للتحضير للمقابلات وتعديل السيرة الذاتية حسب متطلبات كل دور وظيفي.'
          : 'Context-aware AI chat sidebar to practice interview answers or reword bullet points for specialized roles.',
      icon: MessageSquare,
      colSpan: 'col-span-1 md:col-span-2',
    },
    {
      step: lang === 'ar' ? '٠٦' : '06',
      title: lang === 'ar' ? 'سيرة ذاتية معادة الصياغة' : '100% ATS Rebuilt Resume',
      description:
        lang === 'ar'
          ? 'تجميع كافة التحسينات في مستند Markdown قياسي بنقرة واحدة للتصدير.'
          : 'Compiles all improved bullet points into a clean, 100% ATS-compliant markdown document for 1-click export.',
      icon: FileCode,
      colSpan: 'col-span-1',
    },
  ];

  return (
    <div className="py-16 space-y-8 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center space-y-3">
        <span className="tracking-[0.2em] text-[11px] font-bold uppercase text-[var(--text-muted)]">
          {lang === 'ar' ? 'المعمارية التقنية للمنصة' : 'ENTERPRISE ARCHITECTURE'}
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[var(--fg-page)]">
          {lang === 'ar' ? (
            <>
              مصممة لأعلى <span className="italic font-normal text-[var(--text-muted)]">معدل استدعاء للمقابلات</span>
            </>
          ) : (
            <>
              Engineered for <span className="italic font-normal text-[var(--text-muted)]">Maximum Callback Rate</span>
            </>
          )}
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl mx-auto font-sans leading-relaxed">
          {lang === 'ar'
            ? 'كل مكون مصمم لحل المشكلات الحقيقية التي تواجه المتقدمين وتجاوز أنظمة الفرز الآلي.'
            : 'Every component is designed to solve real-world hiring bottlenecks and optimize your resume for candidate tracking algorithms.'}
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              key={idx}
              className={`surface-matte p-6 sm:p-8 rounded-[24px] space-y-4 flex flex-col justify-between hover:border-[var(--fg-page)] transition-colors duration-200 shadow-xl ${item.colSpan}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-full surface-inner flex items-center justify-center text-[var(--fg-page)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[var(--text-muted)]">
                    {item.step} // {lang === 'ar' ? 'ميزة تفاعلية' : 'FEATURE'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[var(--fg-page)] tracking-[-0.02em]">{item.title}</h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed font-sans">{item.description}</p>
              </div>

              <div className="pt-2 flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-muted)]">
                <CheckCircle2 className="h-3.5 w-3.5 text-[var(--fg-page)]" />
                <span>{lang === 'ar' ? 'مدعوم بـ Gemini 2.5 Flash' : 'Gemini 2.5 Powered'}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
