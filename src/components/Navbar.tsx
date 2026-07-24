'use client';

import React from 'react';
import { Compass, RefreshCw, Sun, Moon, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';

interface NavbarProps {
  onReset?: () => void;
  hasAnalysis?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onReset, hasAnalysis }) => {
  const { theme, lang, toggleTheme, toggleLang } = useThemeLanguage();

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--bg-page)]/90 backdrop-blur-md border-b border-[var(--border-subtle)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={onReset}>
          <div className="h-9 w-9 rounded-full surface-inner flex items-center justify-center group-hover:bg-[var(--fg-page)] group-hover:text-[var(--bg-page)] transition-colors duration-200">
            <Compass className="h-4 w-4 text-[var(--fg-page)] group-hover:text-[var(--bg-page)] transition-colors duration-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-[-0.03em] text-[var(--fg-page)]">
                {lang === 'ar' ? 'بوصلة الكاريير' : 'BOSSLA CAREER'}
                <span className="text-[var(--text-muted)] font-normal ml-1">
                  {lang === 'ar' ? 'الاحترافية' : 'PRO'}
                </span>
              </span>
              <span className="px-2 py-0.5 tracking-[0.15em] text-[10px] font-bold uppercase surface-inner rounded-full">
                {lang === 'ar' ? 'إصدار ذكي' : 'PRO'}
              </span>
            </div>
            <p className="text-[10px] tracking-[0.15em] uppercase font-bold text-[var(--text-muted)] hidden sm:block">
              {lang === 'ar' ? 'المساعد التفاعلي لتحليل السير الذاتية والمهن' : 'TACTILE CAREER CO-PILOT'}
            </p>
          </div>
        </div>

        {/* Actions & Toggles */}
        <div className="flex items-center gap-2.5">
          {hasAnalysis && (
            <motion.button
              whileTap={{ scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={onReset}
              className="btn-pill-secondary flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-full shadow-sm"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{lang === 'ar' ? 'تحليل جديد' : 'New Analysis'}</span>
            </motion.button>
          )}

          {/* Theme Toggle (Light / Dark) */}
          <motion.button
            whileTap={{ scale: 0.985 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={toggleTheme}
            className="btn-pill-secondary h-9 w-9 rounded-full flex items-center justify-center"
            title={lang === 'ar' ? 'تبديل المظهر الداكن / الفاتح' : 'Toggle Light / Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-[var(--fg-page)]" />}
          </motion.button>

          {/* Language Toggle (EN / AR) */}
          <motion.button
            whileTap={{ scale: 0.985 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={toggleLang}
            className="btn-pill-secondary px-3.5 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5"
            title={lang === 'ar' ? 'التحويل للغة الإنجليزية' : 'Switch to Arabic'}
          >
            <Globe className="h-3.5 w-3.5" />
            <span>{lang === 'en' ? 'عربي' : 'EN'}</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
};
