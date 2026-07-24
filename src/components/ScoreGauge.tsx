'use client';

import React from 'react';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';

interface ScoreGaugeProps {
  score: number;
  label: string;
  subtitle?: string;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, label, subtitle }) => {
  const { lang } = useThemeLanguage();
  const normalizedScore = Math.max(0, Math.min(100, score));
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  return (
    <div className="surface-matte p-6 rounded-[24px] flex items-center justify-between shadow-sm">
      <div className="space-y-1">
        <span className="tracking-[0.2em] text-[10px] font-bold uppercase text-[var(--text-muted)]">
          {lang === 'ar' ? 'مؤشر تقييم القياس' : 'INDEX METRIC'}
        </span>
        <h4 className="text-sm font-bold text-[var(--fg-page)] tracking-[-0.02em]">{label}</h4>
        {subtitle && <p className="text-xs text-[var(--text-muted)]">{subtitle}</p>}
      </div>

      {/* SVG Circle Gauge */}
      <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="text-[var(--border-subtle)]"
            strokeWidth="7"
            stroke="currentColor"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="text-[var(--fg-page)] transition-all duration-1000 ease-out"
            strokeWidth="7"
            stroke="currentColor"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-lg font-extrabold text-[var(--fg-page)] tracking-[-0.03em] font-mono">
            {normalizedScore}
          </span>
          <span className="text-[9px] font-mono text-[var(--text-muted)]">/100</span>
        </div>
      </div>
    </div>
  );
};
