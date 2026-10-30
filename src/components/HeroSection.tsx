import React from 'react';
import { ArrowRight, ShieldCheck, Camera, Sparkles, AlertTriangle, Activity, HeartPulse } from 'lucide-react';

interface HeroSectionProps {
  onStartScreening: () => void;
  onOpenPhotoAI: () => void;
  onOpenEducation: () => void;
  onViewEmergency: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartScreening,
  onOpenPhotoAI,
  onOpenEducation,
  onViewEmergency,
}) => {
  return (
    <div className="relative overflow-hidden pt-6 pb-12 lg:pt-10 lg:pb-16 bg-gradient-to-b from-teal-50/50 via-slate-50 to-white dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950">
      {/* Background soft ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-200/20 dark:bg-teal-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-teal-300/15 dark:bg-cyan-900/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Emergency Alert Ribbon if user has urgent symptoms */}
        <div className="mb-6 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </span>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200">
              <strong className="font-semibold text-amber-900 dark:text-amber-200">Have a sore or ulcer lasting more than 14 days?</strong> Any non-healing oral lesion or firm lump warrants prompt clinical examination.
            </p>
          </div>
          <button
            onClick={onViewEmergency}
            className="text-xs font-semibold text-amber-800 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 underline underline-offset-2 shrink-0 transition-colors"
          >
            Review Red-Flag Checklist →
          </button>
        </div>

        {/* 2-Column Desktop Grid Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline and Call-to-actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-teal-800 dark:text-teal-300 bg-teal-100/70 dark:bg-teal-950/70 px-3 py-1 rounded-full border border-teal-200 dark:border-teal-800">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Evidence-Based Clinical Risk Stratification</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]" style={{ textWrap: 'balance' }}>
              Early Detection Saves Lives. <br className="hidden sm:inline" />
              <span className="text-teal-600 dark:text-teal-400">Screen Your Oral Health in Minutes.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Oral cancer is over 80% treatable when detected early, yet more than half of cases are diagnosed at late stages. OralGuard provides free risk assessment, AI-assisted lesion observation, and clear specialist guidance.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onStartScreening}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <span>Start Risk Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenPhotoAI}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-medium text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs transition-colors"
              >
                <Camera className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Upload Photo for AI Review</span>
              </button>
            </div>

            {/* Trust and Clinical Source Badges */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Privacy-First (No Data Stored Remotely)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>NIDCR & ADA Guidelines</span>
              </span>
              <span className="flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Physician & Dentist Referral Support</span>
              </span>
            </div>
          </div>

          {/* Right Column: High-fidelity 3D Illustration Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/20 dark:border-slate-800 shadow-xl group">
              <img
                src="/src/assets/images/hero_oral_guard_1793353575880.jpg"
                alt="OralGuard medical shield illustration representing early oral cancer detection and protective screening"
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-teal-400" />
                  <span className="text-xs uppercase tracking-wider font-mono text-teal-300">Intraoral Vision Engine</span>
                </div>
                <h3 className="text-sm font-semibold text-white">Advanced Mucosal Pattern Observation</h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  Simulated multi-stage chromatic segmentation detecting hyperkeratosis, erythroplakia, and irregular margin density.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 3-Metric Proof Strip below Hero */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 border-y border-slate-200 dark:border-slate-800 py-6">
          <div className="flex flex-col">
            <span className="text-xs uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500">Survival Disparity</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-teal-600 dark:text-teal-400 font-mono tabular-nums">84% vs 39%</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              5-year survival for localized early diagnosis vs late metastatic regional spread (SEER Cancer Stat Facts).
            </p>
          </div>

          <div className="flex flex-col">
            <span className="text-xs uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500">Self-Exam Window</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">14 Days</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              The clinical threshold: Any oral sore, patch, or ulcer lasting over two weeks requires professional evaluation.
            </p>
          </div>

          <div className="flex flex-col">
            <span className="text-xs uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500">Self-Screening Time</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-teal-600 dark:text-teal-400 font-mono tabular-nums">2 Minutes</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Structured monthly oral self-examination covers tongue borders, floor of mouth, and cheek lining.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
