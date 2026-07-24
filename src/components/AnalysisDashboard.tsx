'use client';

import React, { useState } from 'react';
import { AnalysisData } from '@/types/analysis';
import { ScoreGauge } from './ScoreGauge';
import { TabOverview } from './TabOverview';
import { TabKeywords } from './TabKeywords';
import { TabRewrites } from './TabRewrites';
import { TabChat } from './TabChat';
import { TabInterview } from './TabInterview';
import { TabCoverLetter } from './TabCoverLetter';
import { TabCareerPath } from './TabCareerPath';
import { TabFullResume } from './TabFullResume';
import { PrintableReport } from './PrintableReport';
import { BarChart3, KeyRound, Wand2, MessageSquare, HelpCircle, CheckCircle2, Mail, Rocket, FileText, Globe, Printer } from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';

interface AnalysisDashboardProps {
  data: AnalysisData;
  rawText: string;
}

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ data, rawText }) => {
  const { lang, setLang } = useThemeLanguage();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'keywords' | 'rewrites' | 'chat' | 'interview' | 'coverLetter' | 'careerPath' | 'fullResume'
  >('overview');

  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  const tabs = [
    { id: 'overview', label: lang === 'ar' ? 'نظرة عامة والتقييم' : 'Overview', icon: BarChart3 },
    { id: 'keywords', label: lang === 'ar' ? 'تحليل الكلمات المفتاحية' : 'ATS Audit', icon: KeyRound, count: data.missingKeywords.length },
    { id: 'rewrites', label: lang === 'ar' ? 'إعادة صياغة النقاط' : 'X-Y-Z Rewrites', icon: Wand2, count: data.actionableImprovements.length },
    { id: 'coverLetter', label: lang === 'ar' ? 'خطاب التغطية' : 'Cover Letter', icon: Mail },
    { id: 'careerPath', label: lang === 'ar' ? 'المسار المهني والرواتب' : 'Career Trajectory', icon: Rocket },
    { id: 'fullResume', label: lang === 'ar' ? 'السيرة الذاتية المحسنة' : 'Rebuilt ATS Resume', icon: FileText },
    { id: 'chat', label: lang === 'ar' ? 'المساعد الذكي' : 'AI Assistant', icon: MessageSquare, badge: 'LIVE' },
    { id: 'interview', label: lang === 'ar' ? 'أسئلة المقابلات' : 'Interview Prep', icon: HelpCircle, count: data.interviewQuestions.length },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Top Banner Status & Export PDF / Language Selector */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="surface-matte p-4 rounded-[24px] flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--fg-page)] gap-4 shadow-sm"
      >
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[var(--fg-page)] shrink-0" />
          <span className="font-sans">
            {lang === 'ar'
              ? 'تم فحص السيرة الذاتية بنجاح وتقييم أكثر من 30 معياراً لـ ATS!'
              : 'Forensic Audit Complete — 30+ ATS Rules & Impact Metrics Evaluated.'}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* PDF Export Button */}
          <motion.button
            whileTap={{ scale: 0.985 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={() => setShowPrintModal(true)}
            className="btn-pill-primary px-4 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-2 shadow-sm"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>{lang === 'ar' ? 'تصدير تقرير PDF احترافي' : 'EXPORT PDF REPORT'}</span>
          </motion.button>

          {/* Language Toggle */}
          <div className="flex items-center gap-1 surface-inner p-1 rounded-full">
            <Globe className="h-3.5 w-3.5 text-[var(--text-muted)] ml-1.5" />
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-0.5 rounded-full text-[10px] font-mono font-bold transition-colors ${
                lang === 'en' ? 'btn-pill-primary' : 'text-[var(--text-muted)] hover:text-[var(--fg-page)]'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('ar')}
              className={`px-3 py-0.5 rounded-full text-[10px] font-mono font-bold transition-colors ${
                lang === 'ar' ? 'btn-pill-primary' : 'text-[var(--text-muted)] hover:text-[var(--fg-page)]'
              }`}
            >
              عربي
            </button>
          </div>
        </div>
      </motion.div>

      {/* Score Overview Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ScoreGauge
          score={data.overallScore}
          label={lang === 'ar' ? 'درجة الجودة العامة' : 'Overall Quality Index'}
          subtitle={lang === 'ar' ? 'التقييم الشامل للخبرة والتأثير' : 'Combined ATS & Impact Rating'}
        />
        <ScoreGauge
          score={data.atsScore}
          label={lang === 'ar' ? 'توافق أنظمة ATS' : 'ATS Compliance'}
          subtitle={lang === 'ar' ? 'مؤشر الهيكلة وتنسيق النصوص' : 'Structure & Parsing Index'}
        />
        <ScoreGauge
          score={data.matchPercentage}
          label={lang === 'ar' ? 'نسبة التطابق الوظيفي' : 'Role Match Index'}
          subtitle={
            data.matchPercentage > 0
              ? lang === 'ar'
                ? 'التطابق مع الوصف الوظيفي'
                : 'Target JD Alignment'
              : lang === 'ar'
              ? 'التطابق مع معايير المجال'
              : 'General Industry Match'
          }
        />
      </div>

      {/* Tactile Tab Controls Bar */}
      <div className="border-b border-[var(--border-subtle)] pb-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                whileTap={{ scale: 0.985 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'btn-pill-primary shadow-sm'
                    : 'btn-pill-secondary'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="tracking-[-0.01em]">{tab.label}</span>

                {tab.count !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[9px] font-mono ${
                      isActive ? 'bg-[var(--bg-page)] text-[var(--fg-page)]' : 'surface-inner'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}

                {tab.badge && (
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono surface-inner">
                    {tab.badge}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Display */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {activeTab === 'overview' && <TabOverview data={data} />}
        {activeTab === 'keywords' && <TabKeywords data={data} />}
        {activeTab === 'rewrites' && <TabRewrites data={data} />}
        {activeTab === 'coverLetter' && <TabCoverLetter coverLetter={data.coverLetter} />}
        {activeTab === 'careerPath' && <TabCareerPath careerProgression={data.careerProgression} />}
        {activeTab === 'fullResume' && <TabFullResume rebuiltResumeMarkdown={data.rebuiltResumeMarkdown} />}
        {activeTab === 'chat' && <TabChat resumeText={rawText} />}
        {activeTab === 'interview' && <TabInterview data={data} />}
      </motion.div>

      {/* Printable Report Modal */}
      {showPrintModal && (
        <PrintableReport data={data} onClose={() => setShowPrintModal(false)} />
      )}
    </div>
  );
};
