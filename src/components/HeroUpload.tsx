'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, ChevronDown, ChevronUp, AlertCircle, Loader2, ArrowUpRight, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';

interface HeroUploadProps {
  onAnalyze: (file: File, jobDescription: string) => Promise<void>;
  isLoading: boolean;
  loadingStep: string;
}

export const HeroUpload: React.FC<HeroUploadProps> = ({ onAnalyze, isLoading, loadingStep }) => {
  const { lang } = useThemeLanguage();

  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>('');
  const [showJd, setShowJd] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (selectedFile: File | null) => {
    setErrorMessage(null);
    if (!selectedFile) return;

    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ];
    const isExtensionValid =
      selectedFile.name.endsWith('.pdf') ||
      selectedFile.name.endsWith('.docx') ||
      selectedFile.name.endsWith('.txt');

    if (!validTypes.includes(selectedFile.type) && !isExtensionValid) {
      setErrorMessage(
        lang === 'ar'
          ? 'صيغة الملف غير مدعومة. يرجى رفع ملف PDF أو DOCX.'
          : 'Unsupported file format. Please upload a .PDF or .DOCX file.'
      );
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setErrorMessage(
        lang === 'ar'
          ? 'حجم الملف يتجاوز الحد الأقصى (5 ميجابايت).'
          : 'File size exceeds 5MB limit.'
      );
      return;
    }

    setFile(selectedFile);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setErrorMessage(
        lang === 'ar' ? 'يرجى اختيار ملف السيرة الذاتية للتحليل.' : 'Please select a resume file to analyze.'
      );
      return;
    }
    onAnalyze(file, jobDescription);
  };

  return (
    <div className="max-w-4xl mx-auto py-14 px-4 sm:px-6">
      {/* Hero Header */}
      <div className="text-center mb-12 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full surface-inner text-[var(--text-muted)]"
        >
          <Compass className="h-3.5 w-3.5 text-[var(--fg-page)]" />
          <span className="tracking-[0.2em] text-[11px] font-bold uppercase">
            {lang === 'ar' ? 'منصة بوصلة الكاريير الذكية' : 'TACTILE MINIMALIST CAREER SUITE'}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-[-0.03em] text-[var(--fg-page)] leading-tight"
        >
          {lang === 'ar' ? (
            <>
              حوّل سيرتك الذاتية إلى <br />
              <span className="italic font-normal text-[var(--text-muted)]">فرص عمل حقيقية</span>
            </>
          ) : (
            <>
              Turn Your Resume Into <br />
              <span className="italic font-normal text-[var(--text-muted)]">
                High-Converting Job Offers
              </span>
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-sm sm:text-base text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed font-sans"
        >
          {lang === 'ar'
            ? 'فحص توافق الـ ATS، إعادة صياغة النقاط وفق معيار جوجل X-Y-Z، اكتشاف الكلمات المفتاحية المفقودة والتوجيه المهني الذكي.'
            : 'Forensic ATS readability audits, Google X-Y-Z formula bullet rewrites, keyword gap detection, and interactive career navigation.'}
        </motion.p>
      </div>

      {/* Main Upload Box (Surface Matte) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="surface-matte rounded-[24px] p-6 sm:p-10 shadow-2xl relative"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Micro-heading */}
          <div className="flex items-center justify-between">
            <span className="tracking-[0.2em] text-[11px] font-bold uppercase text-[var(--text-muted)]">
              {lang === 'ar' ? '٠١ // رفع السيرة الذاتية' : '01 // DOCUMENT INGESTION'}
            </span>
            <span className="text-[10px] text-[var(--text-muted)] font-mono">
              {lang === 'ar' ? 'ملفات PDF أو DOCX (الحد الأقصى ٥ ميجابايت)' : 'PDF, DOCX (MAX 5MB)'}
            </span>
          </div>

          {/* Drag & Drop zone */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
              dragActive
                ? 'border-[var(--fg-page)] bg-[var(--bg-surface-inner)] scale-[1.005]'
                : file
                ? 'border-[var(--fg-page)] bg-[var(--bg-surface-inner)]'
                : 'border-[var(--border-subtle)] hover:border-[var(--fg-page)] bg-[var(--bg-page)] hover:bg-[var(--bg-surface-inner)]'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt"
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
            />

            {file ? (
              <div className="flex items-center justify-between p-4 surface-inner rounded-xl max-w-md mx-auto">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="h-10 w-10 rounded-lg surface-matte flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-[var(--fg-page)]" />
                  </div>
                  <div className="rtl:text-right ltr:text-left overflow-hidden">
                    <p className="text-xs font-bold text-[var(--fg-page)] truncate">{file.name}</p>
                    <p className="text-[11px] font-mono text-[var(--text-muted)]">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB • {lang === 'ar' ? 'جاهز للتحليل' : 'READY'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[var(--fg-page)] shrink-0" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    className="text-xs text-[var(--text-muted)] hover:text-[var(--fg-page)] underline px-2 py-1"
                  >
                    {lang === 'ar' ? 'تغيير' : 'Change'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="h-12 w-12 rounded-full surface-inner flex items-center justify-center mx-auto text-[var(--fg-page)]">
                  <UploadCloud className="h-6 w-6 animate-bounce" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--fg-page)]">
                    {lang === 'ar' ? 'اسحب ملفك هنا، أو ' : 'Drag & drop your resume here, or '}
                    <span className="underline text-[var(--fg-page)] font-extrabold">
                      {lang === 'ar' ? 'تصفح الملفات' : 'browse files'}
                    </span>
                  </p>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1">
                    {lang === 'ar' ? 'صيغ مدعومة: PDF, DOCX, TXT (حد أقصى ٥ ميجابايت)' : 'PDF, DOCX, TXT (Max 5MB)'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {errorMessage && (
            <div className="p-3 surface-inner border-rose-500/50 rounded-xl text-rose-500 text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Optional Job Description */}
          <div className="border border-[var(--border-subtle)] rounded-2xl bg-[var(--bg-page)] overflow-hidden">
            <button
              type="button"
              onClick={() => setShowJd(!showJd)}
              className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-[var(--bg-surface-inner)] transition"
            >
              <div className="flex items-center gap-2">
                <span className="tracking-[0.2em] text-[11px] font-bold uppercase text-[var(--text-muted)]">
                  {lang === 'ar' ? '٠٢ // الوصف الوظيفي المستهدف' : '02 // TARGET JOB DESCRIPTION'}
                </span>
                <span className="text-[10px] text-[var(--text-muted)] font-mono">
                  {lang === 'ar' ? '(اختياري)' : '(OPTIONAL)'}
                </span>
              </div>
              {showJd ? <ChevronUp className="h-4 w-4 text-[var(--text-muted)]" /> : <ChevronDown className="h-4 w-4 text-[var(--text-muted)]" />}
            </button>

            <AnimatePresence>
              {showJd && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-5 pb-5 pt-1"
                >
                  <textarea
                    rows={4}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder={
                      lang === 'ar'
                        ? 'الصق الوصف الوظيفي هنا لحساب نسبة التطابق واكتشاف المهارات المفقودة...'
                        : 'Paste the target Job Description to unlock role matching score & keyword gap analysis...'
                    }
                    className="w-full p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs text-[var(--fg-page)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--fg-page)] font-mono resize-y"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Primary Action Button */}
          <motion.button
            whileTap={{ scale: 0.985 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            type="submit"
            disabled={isLoading || !file}
            className={`w-full py-4 px-6 rounded-full font-bold text-xs tracking-[0.15em] uppercase flex items-center justify-center gap-2 shadow-sm ${
              isLoading || !file
                ? 'surface-inner text-[var(--text-muted)] cursor-not-allowed'
                : 'btn-pill-primary'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{loadingStep || (lang === 'ar' ? 'جاري التحليل...' : 'ANALYZING DOCUMENT...')}</span>
              </div>
            ) : (
              <>
                <span>{lang === 'ar' ? 'بدء فحص السيرة الذاتية' : 'RUN FORENSIC ANALYSIS'}</span>
                <ArrowUpRight className="h-4 w-4" />
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
