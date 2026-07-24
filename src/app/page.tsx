'use client';

import React, { useState } from 'react';
import { ThemeLanguageProvider, useThemeLanguage } from '@/context/ThemeLanguageContext';
import { Navbar } from '@/components/Navbar';
import { HeroUpload } from '@/components/HeroUpload';
import { DemoPreview } from '@/components/DemoPreview';
import { BentoFeatures } from '@/components/BentoFeatures';
import { WorkflowSection } from '@/components/WorkflowSection';
import { AnalysisDashboard } from '@/components/AnalysisDashboard';
import { AnalysisData } from '@/types/analysis';

function MainApp() {
  const { lang } = useThemeLanguage();
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [rawText, setRawText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('');

  const handleAnalyze = async (file: File, jobDescription: string) => {
    setIsLoading(true);

    try {
      setLoadingStep(lang === 'ar' ? 'جاري استخراج النص...' : 'EXTRACTING DOCUMENT TEXT...');
      await new Promise((resolve) => setTimeout(resolve, 800));

      setLoadingStep(lang === 'ar' ? 'جاري تدقيق معايير الـ ATS...' : 'AUDITING ATS FORMATTING RULES...');
      await new Promise((resolve) => setTimeout(resolve, 800));

      setLoadingStep(lang === 'ar' ? 'جاري حساب الكلمات المفتاحية...' : 'EVALUATING KEYWORD ALIGNMENT...');

      const formData = new FormData();
      formData.append('file', file);
      formData.append('jobDescription', jobDescription);

      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      setLoadingStep(lang === 'ar' ? 'جاري إعداد التقرير...' : 'GENERATING BOSSLA CAREER REPORT...');
      const json = await res.json();

      if (json.success && json.data) {
        setAnalysis(json.data);
        setRawText(json.rawText || '');
      } else {
        alert('Failed to analyze document: ' + (json.error || 'Unknown error'));
      }
    } catch (err: unknown) {
      console.error('Upload Error:', err);
      alert('An unexpected error occurred during document upload.');
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setRawText('');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--fg-page)] flex flex-col font-sans transition-colors duration-200">
      <Navbar onReset={handleReset} hasAnalysis={!!analysis} />

      <main className="flex-1">
        {!analysis ? (
          <>
            {/* Hero Section & File Upload */}
            <HeroUpload onAnalyze={handleAnalyze} isLoading={isLoading} loadingStep={loadingStep} />

            {/* Interactive Demo Preview */}
            <div className="px-4 sm:px-6">
              <DemoPreview />
            </div>

            {/* Bento Grid Features */}
            <BentoFeatures />

            {/* Step-by-Step Workflow & Metrics */}
            <WorkflowSection />
          </>
        ) : (
          <AnalysisDashboard data={analysis} rawText={rawText} />
        )}
      </main>

      <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-8 text-center text-xs text-[var(--text-muted)] font-mono transition-colors duration-200">
        <p>© {new Date().getFullYear()} BOSSLA CAREER • TACTILE MINIMALIST CAREER SUITE • POWERED BY GEMINI 2.5</p>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <ThemeLanguageProvider>
      <MainApp />
    </ThemeLanguageProvider>
  );
}
