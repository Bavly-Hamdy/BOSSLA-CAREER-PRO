'use client';

import React from 'react';
import { CareerProgression } from '@/types/analysis';
import { Rocket, DollarSign, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';

interface TabCareerPathProps {
  careerProgression: CareerProgression;
}

export const TabCareerPath: React.FC<TabCareerPathProps> = ({ careerProgression }) => {
  const { lang } = useThemeLanguage();

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="surface-matte p-6 rounded-[24px] space-y-2">
        <div className="flex items-center justify-between">
          <span className="tracking-[0.2em] text-[11px] font-bold uppercase text-[var(--text-muted)] flex items-center gap-2">
            <Rocket className="h-3.5 w-3.5 text-[var(--fg-page)]" />
            {lang === 'ar' ? '٠١ // تقدير مسارات الترقية والرواتب' : '01 // CAREER TRAJECTORY & SALARY BENCHMARKS'}
          </span>
          <span className="text-[10px] font-mono text-[var(--text-muted)]">
            {lang === 'ar' ? 'تحليل السوق المستقبلي' : 'PROJECTION MODEL'}
          </span>
        </div>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed font-sans">
          {lang === 'ar'
            ? 'توقع ٣ أدوار وظيفية قادمة بناءً على سيرتك الذاتية الحالية مع تقدير نطاق الرواتب وإطار الإعداد الزمني والمهارات المطلوبة.'
            : 'Predicts your next 3 promotion tiers based on your current skill set, estimated compensation ranges, and skill acquisition roadmaps.'}
        </p>
      </div>

      {/* Recommended Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {careerProgression.nextRoles.map((role, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.08 }}
            className="surface-matte p-6 rounded-[24px] space-y-4 flex flex-col justify-between shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[var(--text-muted)]">
                  {lang === 'ar' ? `المسار #${idx + 1}` : `TIER #${idx + 1}`}
                </span>
                <span className="px-2 py-0.5 rounded-full surface-inner text-[10px] font-mono text-[var(--fg-page)]">
                  {role.timeframe}
                </span>
              </div>

              <h4 className="text-base font-bold text-[var(--fg-page)] tracking-[-0.02em]">{role.title}</h4>

              <div className="p-3 rounded-xl surface-inner space-y-1">
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase font-bold flex items-center gap-1">
                  <DollarSign className="h-3 w-3 text-[var(--fg-page)]" />
                  {lang === 'ar' ? 'نطاق الراتب المتوقع' : 'ESTIMATED SALARY RANGE'}
                </span>
                <p className="text-sm font-mono font-extrabold text-[var(--fg-page)]">{role.estimatedSalaryRange}</p>
              </div>

              {/* Required Skill Gaps */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase font-bold">
                  {lang === 'ar' ? 'المهارات المطلوبة للترقية' : 'REQUIRED SKILL GAPS'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {role.requiredSkillGaps.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-full surface-inner text-[10px] font-mono text-[var(--fg-page)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
