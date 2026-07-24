'use client';

import React from 'react';
import { UploadCloud, Cpu, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';

export const WorkflowSection: React.FC = () => {
  const { lang } = useThemeLanguage();

  const steps = [
    {
      number: lang === 'ar' ? '٠١' : '01',
      title: lang === 'ar' ? 'رفع السيرة الذاتية والوصف الوظيفي' : 'Upload Resume & Target JD',
      desc:
        lang === 'ar'
          ? 'اسحب ملف PDF أو DOCX واكتشف التحليلات المباشرة فوراً.'
          : 'Drag and drop your PDF or DOCX file (up to 5MB) and optionally paste your target job description.',
      icon: UploadCloud,
    },
    {
      number: lang === 'ar' ? '٠٢' : '02',
      title: lang === 'ar' ? 'فحص Gemini 2.5 الجنائي' : 'Forensic Gemini 2.5 Audit',
      desc:
        lang === 'ar'
          ? 'يقوم محرك الذكاء الاصطناعي بتقييم 30+ معياراً وحساب التوافق مع أنظمة الـ ATS.'
          : 'Our AI engine evaluates 30+ ATS formatting rules, missing keywords, and calculates your 4-dimension radar score.',
      icon: Cpu,
    },
    {
      number: lang === 'ar' ? '٠٣' : '03',
      title: lang === 'ar' ? 'نسخ النقاط وتصدير المستند' : 'Copy Rewrites & Export Resume',
      desc:
        lang === 'ar'
          ? 'احصل على نقاط محسنة بأسلوب Google X-Y-Z وخطاب تغطية مخصص ومستند كامل جاهز للتصدير.'
          : 'Get side-by-side Google X-Y-Z bullet rewrites, a custom 3-paragraph Cover Letter, and a 100% ATS-compliant rebuilt resume.',
      icon: Award,
    },
  ];

  return (
    <div className="py-16 border-t border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-3">
          <span className="tracking-[0.2em] text-[11px] font-bold uppercase text-[var(--text-muted)]">
            {lang === 'ar' ? 'دورة فحص السيرة الذاتية في ٣ خطوات' : '3-STEP AUDIT WORKFLOW'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[var(--fg-page)]">
            {lang === 'ar' ? (
              <>
                كيف تعمل منصة <span className="italic font-normal text-[var(--text-muted)]">بوصلة الكاريير</span>
              </>
            ) : (
              <>
                How Bossla Career <span className="italic font-normal text-[var(--text-muted)]">Transforms Your Application</span>
              </>
            )}
          </h2>
        </div>

        {/* Workflow Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                key={idx}
                className="surface-matte p-6 rounded-[24px] space-y-4 relative flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-extrabold font-mono text-[var(--text-muted)]">{s.number}</span>
                    <div className="h-8 w-8 rounded-full surface-inner flex items-center justify-center text-[var(--fg-page)]">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[var(--fg-page)] tracking-[-0.02em]">{s.title}</h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed font-sans">{s.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Metrics Counter */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="surface-matte p-6 rounded-[24px] text-center space-y-1"
          >
            <p className="text-3xl font-extrabold text-[var(--fg-page)] font-mono">95%+</p>
            <p className="text-[11px] text-[var(--text-muted)] uppercase font-mono tracking-wider">
              {lang === 'ar' ? 'نسبة توافق الـ ATS' : 'ATS PARSING COMPLIANCE'}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="surface-matte p-6 rounded-[24px] text-center space-y-1"
          >
            <p className="text-3xl font-extrabold text-[var(--fg-page)] font-mono">2.5X</p>
            <p className="text-[11px] text-[var(--text-muted)] uppercase font-mono tracking-wider">
              {lang === 'ar' ? 'معدل استدعاء المقابلات' : 'INTERVIEW CALLBACK RATE'}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="surface-matte p-6 rounded-[24px] text-center space-y-1"
          >
            <p className="text-3xl font-extrabold text-[var(--fg-page)] font-mono">500+</p>
            <p className="text-[11px] text-[var(--text-muted)] uppercase font-mono tracking-wider">
              {lang === 'ar' ? 'سيرة ذاتية تم فحصها' : 'RESUMES AUDITED'}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
