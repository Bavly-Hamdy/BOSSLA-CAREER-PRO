'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, KeyRound, Wand2, Mail, Rocket, ArrowRight } from 'lucide-react';
import { mockAnalysisData } from '@/lib/mockData';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';

export const DemoPreview: React.FC = () => {
  const { lang } = useThemeLanguage();
  const [activeDemoTab, setActiveDemoTab] = useState<'scores' | 'rewrites' | 'keywords' | 'cover' | 'career'>('rewrites');

  return (
    <div className="surface-matte rounded-[24px] overflow-hidden border border-[var(--border-subtle)] shadow-2xl space-y-0 max-w-5xl mx-auto my-12 transition-colors duration-200">
      {/* Mock Browser Header */}
      <div className="surface-inner px-5 py-3 flex items-center justify-between border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[var(--border-subtle)]" />
          <div className="h-3 w-3 rounded-full bg-[var(--border-subtle)]" />
          <div className="h-3 w-3 rounded-full bg-[var(--border-subtle)]" />
          <span className="text-[10px] font-mono text-[var(--text-muted)] ml-2">
            {lang === 'ar' ? 'بوصلة-الكاريير.ذكاء / معاينة-حية' : 'bosslacareer.ai / live-demo-preview'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--fg-page)] animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-[var(--fg-page)] uppercase tracking-wider">
            {lang === 'ar' ? 'معاينة تفاعلية حية' : 'INTERACTIVE DEMO'}
          </span>
        </div>
      </div>

      {/* Demo Navigation Bar */}
      <div className="bg-[var(--bg-page)] border-b border-[var(--border-subtle)] p-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'rewrites', label: lang === 'ar' ? 'إعادة صياغة النقاط' : 'X-Y-Z Rewrites', icon: Wand2 },
          { id: 'scores', label: lang === 'ar' ? 'التقييم الشامل' : 'Scores & Radar', icon: BarChart3 },
          { id: 'keywords', label: lang === 'ar' ? 'الكلمات المفتاحية' : 'ATS Keywords', icon: KeyRound },
          { id: 'cover', label: lang === 'ar' ? 'خطاب التغطية' : 'Cover Letter', icon: Mail },
          { id: 'career', label: lang === 'ar' ? 'تقدير الرواتب' : 'Salary Benchmarks', icon: Rocket },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeDemoTab === tab.id;
          return (
            <motion.button
              whileTap={{ scale: 0.985 }}
              key={tab.id}
              onClick={() => setActiveDemoTab(tab.id as typeof activeDemoTab)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'btn-pill-primary'
                  : 'btn-pill-secondary'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Demo Display Content */}
      <div className="p-6 sm:p-8 bg-[var(--bg-surface)] min-h-[340px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {activeDemoTab === 'rewrites' && (
            <motion.div
              key="rewrites"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="tracking-[0.2em] text-[10px] font-bold uppercase text-[var(--text-muted)]">
                  {lang === 'ar' ? 'عيّنة إعادة الصياغة الذكية // الخبرات العملية' : 'SAMPLE AI REWRITE // WORK EXPERIENCE'}
                </span>
                <span className="text-[10px] font-mono surface-inner px-2 py-0.5 rounded text-[var(--fg-page)]">
                  {lang === 'ar' ? 'معيار جوجل X-Y-Z القياسي' : 'Google X-Y-Z Standard'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[var(--bg-page)] border border-[var(--border-subtle)] space-y-2">
                  <span className="text-[9px] font-bold uppercase text-[var(--text-muted)] font-mono">
                    {lang === 'ar' ? 'قبل التحسين (النص الأصلي في السيرة الذاتية)' : 'BEFORE (ORIGINAL RESUME)'}
                  </span>
                  <p className="text-xs text-[var(--text-muted)] italic font-mono surface-inner p-3 rounded-xl">
                    "{mockAnalysisData.actionableImprovements[0].originalText}"
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--bg-page)] border border-[var(--fg-page)] space-y-2">
                  <span className="text-[9px] font-bold uppercase text-[var(--fg-page)] font-mono flex items-center gap-1">
                    <span>{lang === 'ar' ? 'بعد تحسين بوصلة الكاريير' : 'AFTER (BOSSLA AI IMPROVED)'}</span>
                    <ArrowRight className="h-3 w-3 rtl:rotate-180" />
                  </span>
                  <p className="text-xs text-[var(--fg-page)] font-medium surface-inner p-3 rounded-xl">
                    "{mockAnalysisData.actionableImprovements[0].improvedText}"
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeDemoTab === 'scores' && (
            <motion.div
              key="scores"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              <div className="p-5 rounded-2xl bg-[var(--bg-page)] border border-[var(--border-subtle)] text-center space-y-2">
                <span className="text-[10px] font-mono text-[var(--text-muted)] font-bold uppercase">
                  {lang === 'ar' ? 'الدرجة العامة' : 'OVERALL QUALITY'}
                </span>
                <p className="text-3xl font-extrabold text-[var(--fg-page)] font-mono">82/100</p>
                <p className="text-[11px] text-[var(--text-muted)]">
                  {lang === 'ar' ? 'أعلى 15% في المجال' : 'Top 15% Percentile'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[var(--bg-page)] border border-[var(--border-subtle)] text-center space-y-2">
                <span className="text-[10px] font-mono text-[var(--text-muted)] font-bold uppercase">
                  {lang === 'ar' ? 'مؤشر الـ ATS' : 'ATS READABILITY'}
                </span>
                <p className="text-3xl font-extrabold text-[var(--fg-page)] font-mono">88/100</p>
                <p className="text-[11px] text-[var(--text-muted)]">
                  {lang === 'ar' ? 'يتوافق مع جميع الأنظمة' : 'Passes Standard Headers'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[var(--bg-page)] border border-[var(--border-subtle)] text-center space-y-2">
                <span className="text-[10px] font-mono text-[var(--text-muted)] font-bold uppercase">
                  {lang === 'ar' ? 'التطابق الوظيفي' : 'JOB ROLE MATCH'}
                </span>
                <p className="text-3xl font-extrabold text-[var(--fg-page)] font-mono">78/100</p>
                <p className="text-[11px] text-[var(--text-muted)]">
                  {lang === 'ar' ? 'متطابق مع الوصف الوظيفي' : 'Target JD Aligned'}
                </p>
              </div>
            </motion.div>
          )}

          {activeDemoTab === 'keywords' && (
            <motion.div
              key="keywords"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <span className="tracking-[0.2em] text-[10px] font-bold uppercase text-[var(--text-muted)]">
                {lang === 'ar' ? 'المهارات والكلمات المفتاحية المكتشفة' : 'SAMPLE MISSING KEYWORDS DETECTED'}
              </span>

              <div className="flex flex-wrap gap-2">
                {mockAnalysisData.missingKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 rounded-full surface-inner text-xs font-mono font-bold text-[var(--fg-page)] flex items-center gap-1.5"
                  >
                    <span className="text-[var(--text-muted)]">+</span> {kw}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {activeDemoTab === 'cover' && (
            <motion.div
              key="cover"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="tracking-[0.2em] text-[10px] font-bold uppercase text-[var(--text-muted)]">
                  {lang === 'ar' ? 'عيّنة خطاب التغطية المخصص' : 'SAMPLE TAILORED COVER LETTER'}
                </span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">
                  {lang === 'ar' ? '٣ فقرات تنفيذيّة' : '3 PARAGRAPHS'}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--bg-page)] border border-[var(--border-subtle)] text-xs text-[var(--fg-page)] font-sans leading-relaxed space-y-2">
                <p className="font-bold text-[var(--fg-page)]">{mockAnalysisData.coverLetter.salutation}</p>
                <p>{mockAnalysisData.coverLetter.opening}</p>
              </div>
            </motion.div>
          )}

          {activeDemoTab === 'career' && (
            <motion.div
              key="career"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <span className="tracking-[0.2em] text-[10px] font-bold uppercase text-[var(--text-muted)]">
                {lang === 'ar' ? 'تقدير نطاق الرواتب والترقية' : 'SAMPLE SALARY BENCHMARKING'}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mockAnalysisData.careerProgression.nextRoles.slice(0, 2).map((role, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[var(--bg-page)] border border-[var(--border-subtle)] space-y-1">
                    <p className="text-xs font-bold text-[var(--fg-page)]">{role.title}</p>
                    <p className="text-sm font-mono font-extrabold text-[var(--fg-page)]">{role.estimatedSalaryRange}</p>
                    <p className="text-[10px] text-[var(--text-muted)] font-mono">
                      {lang === 'ar' ? `المطبخ الزمني: ${role.timeframe}` : `Timeframe: ${role.timeframe}`}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
