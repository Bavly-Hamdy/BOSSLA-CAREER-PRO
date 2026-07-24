'use client';

import React from 'react';
import { AnalysisData } from '@/types/analysis';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { CheckCircle2, AlertCircle, FileText, Activity } from 'lucide-react';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';

interface TabOverviewProps {
  data: AnalysisData;
}

export const TabOverview: React.FC<TabOverviewProps> = ({ data }) => {
  const { theme, lang } = useThemeLanguage();
  const isDark = theme === 'dark';

  const radarData = [
    {
      subject: lang === 'ar' ? 'التأثير والأرقام' : 'Impact & Metrics',
      score: data.categoryScores.impactAndMetrics,
      fullMark: 100,
    },
    {
      subject: lang === 'ar' ? 'التوافق التقني' : 'Tech Alignment',
      score: data.categoryScores.technicalSkillsAlignment,
      fullMark: 100,
    },
    {
      subject: lang === 'ar' ? 'الإيجاز ووضوح النص' : 'Brevity & Clarity',
      score: data.categoryScores.brevityAndClarity,
      fullMark: 100,
    },
    {
      subject: lang === 'ar' ? 'الهيكلة والتنسيق' : 'Structure & Format',
      score: data.categoryScores.structureAndFormatting,
      fullMark: 100,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Executive Summary Card (Bento Box) */}
      <div className="surface-matte p-6 rounded-[24px] space-y-3">
        <div className="flex items-center justify-between">
          <span className="tracking-[0.2em] text-[11px] font-bold uppercase text-[var(--text-muted)] flex items-center gap-2">
            <FileText className="h-3.5 w-3.5 text-[var(--fg-page)]" />
            {lang === 'ar' ? '٠١ // الملخص التنفيذي الذكي' : '01 // EXECUTIVE SUMMARY'}
          </span>
          <span className="text-[10px] font-mono text-[var(--text-muted)]">
            {lang === 'ar' ? 'تقرير التقييم النهائي' : 'AI FORENSIC VERDICT'}
          </span>
        </div>
        <p className="text-xs text-[var(--fg-page)] leading-relaxed font-sans">{data.executiveSummary}</p>
      </div>

      {/* Grid: Radar Chart & Strengths/Weaknesses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart Card */}
        <div className="surface-matte p-6 rounded-[24px] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="tracking-[0.2em] text-[11px] font-bold uppercase text-[var(--text-muted)] flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-[var(--fg-page)]" />
              {lang === 'ar' ? '٠٢ // محاور التقييم الأربعة' : '02 // RADAR DIMENSIONS'}
            </span>
            <span className="text-[10px] font-mono text-[var(--text-muted)]">
              {lang === 'ar' ? '٤ أبعاد رئيسية' : '4 AXES'}
            </span>
          </div>

          <div className="h-64 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke={isDark ? '#262626' : '#e4e4e7'} />
                <PolarAngleAxis dataKey="subject" stroke={isDark ? '#a3a3a3' : '#666666'} tick={{ fill: isDark ? '#d4d4d4' : '#111111', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke={isDark ? '#404040' : '#cccccc'} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke={isDark ? '#ffffff' : '#111111'}
                  fill={isDark ? '#ffffff' : '#111111'}
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] pt-3 border-t border-[var(--border-subtle)] font-mono">
            <div className="flex items-center justify-between text-[var(--text-muted)]">
              <span>{lang === 'ar' ? 'التأثير والأرقام:' : 'Impact & Metrics:'}</span>
              <span className="font-bold text-[var(--fg-page)]">{data.categoryScores.impactAndMetrics}%</span>
            </div>
            <div className="flex items-center justify-between text-[var(--text-muted)]">
              <span>{lang === 'ar' ? 'التوافق التقني:' : 'Tech Alignment:'}</span>
              <span className="font-bold text-[var(--fg-page)]">{data.categoryScores.technicalSkillsAlignment}%</span>
            </div>
            <div className="flex items-center justify-between text-[var(--text-muted)]">
              <span>{lang === 'ar' ? 'الإيجاز والوضوح:' : 'Brevity & Clarity:'}</span>
              <span className="font-bold text-[var(--fg-page)]">{data.categoryScores.brevityAndClarity}%</span>
            </div>
            <div className="flex items-center justify-between text-[var(--text-muted)]">
              <span>{lang === 'ar' ? 'الهيكلة والتنسيق:' : 'Structure & Format:'}</span>
              <span className="font-bold text-[var(--fg-page)]">{data.categoryScores.structureAndFormatting}%</span>
            </div>
          </div>
        </div>

        {/* Strengths & Weaknesses Column */}
        <div className="space-y-6">
          {/* Key Strengths */}
          <div className="surface-matte p-6 rounded-[24px] space-y-3">
            <span className="tracking-[0.2em] text-[11px] font-bold uppercase text-[var(--fg-page)] flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-[var(--fg-page)]" />
              {lang === 'ar' ? '٠٣ // نقاط القوة المكتشفة' : '03 // KEY STRENGTHS'}
            </span>
            <ul className="space-y-2.5">
              {data.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs text-[var(--fg-page)]">
                  <span className="h-4 w-4 rounded-full btn-pill-primary flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">
                    ✓
                  </span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Critical Weaknesses */}
          <div className="surface-matte p-6 rounded-[24px] space-y-3">
            <span className="tracking-[0.2em] text-[11px] font-bold uppercase text-[var(--text-muted)] flex items-center gap-2">
              <AlertCircle className="h-3.5 w-3.5 text-[var(--text-muted)]" />
              {lang === 'ar' ? '٠٤ // النقاط التي تطلب التحسين' : '04 // CRITICAL FLAWS'}
            </span>
            <ul className="space-y-2.5">
              {data.criticalWeaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs text-[var(--text-muted)]">
                  <span className="h-4 w-4 rounded-full surface-inner flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">
                    !
                  </span>
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
