'use client';

import React, { useState } from 'react';
import { AnalysisData } from '@/types/analysis';
import { Compass, CheckCircle2, ShieldCheck, Wand2, Mail, Rocket, FileText, Download, Printer, Loader2, Sparkles } from 'lucide-react';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';

interface PrintableReportProps {
  data: AnalysisData;
  onClose: () => void;
}

export const PrintableReport: React.FC<PrintableReportProps> = ({ data, onClose }) => {
  const { lang } = useThemeLanguage();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const html2pdf = (await import('html2pdf.js')).default as any;
      const element = document.getElementById('bossla-pdf-document');

      if (!element) return;

      const opt = {
        margin: [10, 12, 10, 12] as [number, number, number, number],
        filename: `Bossla_Career_Executive_Report_${Date.now()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onclone: (clonedDoc: any) => {
            const pdfEl = clonedDoc.getElementById('bossla-pdf-document');
            if (pdfEl) {
              const allEls = pdfEl.getElementsByTagName('*');
              for (let i = 0; i < allEls.length; i++) {
                const el = allEls[i] as HTMLElement;
                const computed = clonedDoc.defaultView.getComputedStyle(el);
                if (computed.backgroundColor && (computed.backgroundColor.includes('lab') || computed.backgroundColor.includes('oklch'))) {
                  el.style.backgroundColor = '#ffffff';
                }
                if (computed.color && (computed.color.includes('lab') || computed.color.includes('oklch'))) {
                  el.style.color = '#111111';
                }
                if (computed.borderColor && (computed.borderColor.includes('lab') || computed.borderColor.includes('oklch'))) {
                  el.style.borderColor = '#e4e4e7';
                }
              }
            }
          },
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('PDF Generation Error:', err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="printable-wrapper fixed inset-0 z-[100] overflow-y-auto bg-black/85 backdrop-blur-md flex flex-col items-center justify-start p-4 sm:p-8 no-print-backdrop">
      {/* Modal Toolbar (Hidden during print) */}
      <div className="no-print sticky top-4 z-10 w-full max-w-4xl bg-[#171717] border border-[#333333] text-white rounded-full px-6 py-3 flex items-center justify-between shadow-2xl mb-6">
        <div className="flex items-center gap-3">
          <Compass className="h-5 w-5 text-white animate-spin-slow" />
          <div>
            <h3 className="text-xs font-bold font-mono">
              {lang === 'ar' ? 'تصدير التقرير التنفيذي PDF' : 'EXECUTIVE PDF REPORT'}
            </h3>
            <p className="text-[10px] text-neutral-400 font-mono">
              {lang === 'ar' ? 'تنسيق A4 احترافي وحساب دقيق للمسافات' : 'A4 Format • Justified Typography • Vector Clean'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Direct Download Button */}
          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="px-5 py-2 rounded-full bg-white text-black text-xs font-bold font-mono hover:bg-neutral-200 transition shadow-md flex items-center gap-2"
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{lang === 'ar' ? 'جاري تجهيز الـ PDF...' : 'GENERATING PDF...'}</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                <span>{lang === 'ar' ? 'تحميل PDF مباشرة' : 'DOWNLOAD PDF FILE'}</span>
              </>
            )}
          </button>

          {/* Browser Vector Print Button */}
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-full bg-[#262626] hover:bg-[#333333] text-neutral-200 text-xs font-bold font-mono transition flex items-center gap-1.5"
            title="Print via Browser Printer"
          >
            <Printer className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{lang === 'ar' ? 'طباعة المتصفح' : 'Print Dialog'}</span>
          </button>

          {/* Close Modal */}
          <button
            onClick={onClose}
            className="px-3.5 py-2 rounded-full bg-[#262626] hover:bg-[#333333] text-neutral-400 hover:text-white text-xs font-bold font-mono transition"
          >
            {lang === 'ar' ? 'إغلاق' : 'CLOSE'}
          </button>
        </div>
      </div>

      {/* A4 Printable Document Container */}
      <div
        id="bossla-pdf-document"
        className="printable-area w-full max-w-4xl bg-[#ffffff] text-[#111111] rounded-[16px] p-8 sm:p-12 shadow-2xl space-y-8 font-sans border border-[#e4e4e7] transition-all"
        style={{ backgroundColor: '#ffffff', color: '#111111' }}
      >
        {/* Document Corporate Header */}
        <div className="border-b-2 border-[#111111] pb-6 flex items-start justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-[#111111] text-white flex items-center justify-center font-bold">
                <Compass className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tighter text-[#111111]">
                  BOSSLA CAREER <span className="text-[#666666] font-normal">PRO</span>
                </span>
                <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#666666]">
                  EXECUTIVE RESUME FORENSIC SUITE
                </p>
              </div>
            </div>
          </div>

          <div className="text-right font-mono text-[10px] space-y-1 text-[#666666]">
            <p className="font-bold text-[#111111]">{new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}</p>
            <p>AUDIT VERDICT ID: #{Math.floor(100000 + Math.random() * 900000)}</p>
            <p className="text-[#047857] font-bold flex items-center justify-end gap-1">
              <Sparkles className="h-3 w-3 text-[#047857]" />
              <span>GEMINI 2.5 REAL-TIME FORENSIC</span>
            </p>
          </div>
        </div>

        {/* Section 1: Executive Overview & Scores */}
        <div className="print-avoid-break space-y-4">
          <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-2">
            <h2 className="text-sm font-black uppercase tracking-wider text-[#111111] flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#111111]" />
              {lang === 'ar' ? '٠١ // المؤشرات العامة والتقييم الشامل' : '01 // EXECUTIVE SCORE CARD'}
            </h2>
            <span className="text-[10px] font-mono text-[#666666]">AUDIT SUMMARY</span>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-[#f9f9f9] rounded-xl border border-[#e4e4e7] space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#666666] uppercase">
                {lang === 'ar' ? 'الدرجة العامة' : 'OVERALL QUALITY'}
              </span>
              <p className="text-3xl font-black font-mono text-[#111111]">{data.overallScore}/100</p>
            </div>
            <div className="p-4 bg-[#f9f9f9] rounded-xl border border-[#e4e4e7] space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#666666] uppercase">
                {lang === 'ar' ? 'توافق الـ ATS' : 'ATS READABILITY'}
              </span>
              <p className="text-3xl font-black font-mono text-[#111111]">{data.atsScore}/100</p>
            </div>
            <div className="p-4 bg-[#f9f9f9] rounded-xl border border-[#e4e4e7] space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#666666] uppercase">
                {lang === 'ar' ? 'نسبة التطابق' : 'ROLE MATCH'}
              </span>
              <p className="text-3xl font-black font-mono text-[#111111]">{data.matchPercentage}/100</p>
            </div>
          </div>

          <div className="p-5 bg-[#f9f9f9] rounded-xl border border-[#e4e4e7] space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase text-[#666666]">
              {lang === 'ar' ? 'الملخص التنفيذي' : 'EXECUTIVE VERDICT SUMMARY'}
            </span>
            <p className="text-xs text-[#111111] leading-relaxed text-justify text-justify-custom font-serif italic">
              "{data.executiveSummary}"
            </p>
          </div>
        </div>

        {/* Section 2: Key Strengths & Critical Weaknesses */}
        <div className="print-avoid-break grid grid-cols-2 gap-6">
          <div className="p-5 bg-[#f9f9f9] rounded-xl border border-[#e4e4e7] space-y-3">
            <span className="text-[10px] font-mono font-bold uppercase text-[#047857] flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#047857]" />
              {lang === 'ar' ? 'أبرز نقاط القوة المكتشفة' : 'KEY STRENGTHS'}
            </span>
            <ul className="space-y-2 text-xs text-[#111111]">
              {data.strengths.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-bold font-mono text-[#047857]">✓</span>
                  <span className="text-justify text-justify-custom">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 bg-[#f9f9f9] rounded-xl border border-[#e4e4e7] space-y-3">
            <span className="text-[10px] font-mono font-bold uppercase text-[#b45309] flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#b45309]" />
              {lang === 'ar' ? 'النقاط المستهدفة للتحسين' : 'CRITICAL FLAWS'}
            </span>
            <ul className="space-y-2 text-xs text-[#111111]">
              {data.criticalWeaknesses.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-bold font-mono text-[#b45309]">!</span>
                  <span className="text-justify text-justify-custom">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 3: Missing Keywords Gap Analysis */}
        <div className="print-avoid-break space-y-3">
          <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-2">
            <h2 className="text-sm font-black uppercase tracking-wider text-[#111111] flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-[#111111]" />
              {lang === 'ar' ? '٠٢ // تحليل الكلمات المفتاحية المفقودة' : '02 // MISSING KEYWORD GAPS'}
            </h2>
            <span className="text-[10px] font-mono text-[#666666]">ATS SKILL GAP</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {data.missingKeywords.map((kw, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 bg-[#f4f4f5] border border-[#e4e4e7] rounded-full text-xs font-mono font-bold text-[#111111]"
              >
                + {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Section 4: Actionable Google X-Y-Z Rewrites */}
        <div className="print-avoid-break space-y-4">
          <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-2">
            <h2 className="text-sm font-black uppercase tracking-wider text-[#111111] flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-[#111111]" />
              {lang === 'ar' ? '٠٣ // النقاط المعادة صياغتها (معيار جوجل X-Y-Z)' : '03 // GOOGLE X-Y-Z BULLET REWRITES'}
            </h2>
            <span className="text-[10px] font-mono text-[#666666]">IMPACT METRICS</span>
          </div>

          <div className="space-y-4">
            {data.actionableImprovements.map((item, idx) => (
              <div key={idx} className="p-5 bg-[#f9f9f9] rounded-xl border border-[#e4e4e7] space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#666666] font-bold uppercase">
                  <span>{lang === 'ar' ? `التوصية #${idx + 1}` : `REWRITE REASONING #${idx + 1}`}</span>
                  <span>{item.reasoning}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-[#ffffff] border border-[#e4e4e7] rounded-lg">
                    <span className="text-[9px] font-mono font-bold uppercase text-[#666666] block mb-1">
                      {lang === 'ar' ? 'النص الأصلي بالسيرة الذاتية:' : 'ORIGINAL BULLET:'}
                    </span>
                    <p className="italic text-[#666666] font-serif text-justify text-justify-custom">"{item.originalText}"</p>
                  </div>

                  <div className="p-3.5 bg-[#111111] text-[#ffffff] rounded-lg border border-[#111111]">
                    <span className="text-[9px] font-mono font-bold uppercase text-[#a3a3a3] block mb-1">
                      {lang === 'ar' ? 'النص المحسّن (Google X-Y-Z):' : 'GOOGLE X-Y-Z IMPROVED:'}
                    </span>
                    <p className="font-medium text-justify text-justify-custom text-[#ffffff]">"{item.improvedText}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Tailored Cover Letter */}
        <div className="print-page-break print-avoid-break space-y-4">
          <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-2">
            <h2 className="text-sm font-black uppercase tracking-wider text-[#111111] flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#111111]" />
              {lang === 'ar' ? '٠٤ // خطاب التغطية الذكي المخصص' : '04 // TAILORED COVER LETTER'}
            </h2>
            <span className="text-[10px] font-mono text-[#666666]">3 PARAGRAPHS</span>
          </div>

          <div className="p-6 bg-[#f9f9f9] rounded-xl border border-[#e4e4e7] space-y-3 text-xs leading-relaxed text-[#111111] text-justify text-justify-custom">
            <p className="font-bold text-sm">{data.coverLetter.salutation}</p>
            <p className="whitespace-pre-line">{data.coverLetter.opening}</p>
            <p className="whitespace-pre-line">{data.coverLetter.bodyParagraph}</p>
            <p className="whitespace-pre-line">{data.coverLetter.closing}</p>
          </div>
        </div>

        {/* Section 6: Career Progression & Salary Benchmarks */}
        <div className="print-avoid-break space-y-4">
          <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-2">
            <h2 className="text-sm font-black uppercase tracking-wider text-[#111111] flex items-center gap-2">
              <Rocket className="h-4 w-4 text-[#111111]" />
              {lang === 'ar' ? '٠٥ // تقدير الترقية والرواتب المستقبليّة' : '05 // CAREER TRAJECTORY & SALARY BENCHMARKS'}
            </h2>
            <span className="text-[10px] font-mono text-[#666666]">PROJECTION</span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {data.careerProgression.nextRoles.map((role, idx) => (
              <div key={idx} className="p-4 bg-[#f9f9f9] rounded-xl border border-[#e4e4e7] space-y-2 text-xs">
                <span className="text-[9px] font-mono font-bold text-[#666666] uppercase">
                  {lang === 'ar' ? `المسار #${idx + 1}` : `ROLE #${idx + 1}`}
                </span>
                <h4 className="font-bold text-[#111111]">{role.title}</h4>
                <p className="font-mono text-sm font-black text-[#111111]">{role.estimatedSalaryRange}</p>
                <p className="text-[10px] text-[#666666] font-mono">Timeframe: {role.timeframe}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 7: Rebuilt 100% ATS-Compliant Resume */}
        <div className="print-page-break print-avoid-break space-y-4">
          <div className="flex items-center justify-between border-b-2 border-[#111111] pb-2">
            <h2 className="text-base font-black uppercase tracking-wider text-[#111111] flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#111111]" />
              {lang === 'ar' ? '٠٦ // السيرة الذاتية المعادة صياغتها بالكامل (معيار ATS)' : '06 // REBUILT 100% ATS-COMPLIANT RESUME'}
            </h2>
            <span className="text-[10px] font-mono text-[#666666] font-bold">READY TO SUBMIT</span>
          </div>

          <div className="p-6 bg-[#ffffff] border border-[#e4e4e7] rounded-xl font-mono text-xs text-[#111111] leading-relaxed whitespace-pre-wrap text-justify text-justify-custom">
            {data.rebuiltResumeMarkdown}
          </div>
        </div>

        {/* Document Footer */}
        <div className="border-t border-[#e4e4e7] pt-4 text-center font-mono text-[9px] text-[#666666]">
          <p>© {new Date().getFullYear()} BOSSLA CAREER PRO • TACTILE MINIMALIST CAREER SUITE • POWERED BY GEMINI 2.5</p>
        </div>
      </div>
    </div>
  );
};
