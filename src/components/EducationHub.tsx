import React, { useState } from 'react';
import { EDUCATIONAL_GUIDES, SELF_EXAM_STEPS } from '../data/educationData';
import { BookOpen, CheckCircle, AlertTriangle, ChevronRight, ChevronLeft, Shield, Clock, Flame, Info } from 'lucide-react';

export const EducationHub: React.FC = () => {
  const [selectedGuideId, setSelectedGuideId] = useState<string>(EDUCATIONAL_GUIDES[0].id);
  const [activeExamStep, setActiveExamStep] = useState<number>(1);
  const [synergyCigarettes, setSynergyCigarettes] = useState<number>(10);
  const [synergyDrinks, setSynergyDrinks] = useState<number>(2);

  const selectedGuide = EDUCATIONAL_GUIDES.find((g) => g.id === selectedGuideId) || EDUCATIONAL_GUIDES[0];
  const currentExamStep = SELF_EXAM_STEPS.find((s) => s.step === activeExamStep) || SELF_EXAM_STEPS[0];

  // Calculate relative synergistic multiplier for visualizer
  const cigaretteFactor = synergyCigarettes === 0 ? 1 : 1 + (synergyCigarettes / 5);
  const alcoholFactor = synergyDrinks === 0 ? 1 : 1 + (synergyDrinks * 1.5);
  // Synergy multiplier exceeds simple addition
  const synergyMultiplier = Math.round(cigaretteFactor * alcoholFactor * (synergyCigarettes > 0 && synergyDrinks > 0 ? 1.4 : 1.0));

  return (
    <div className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-950 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hub Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Oral Oncology Clinical Knowledge Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Education, Self-Examination & Prevention
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
            Grounded in scientific literature from the National Cancer Institute (NCI) and American Dental Association (ADA). Learn how to perform an effective monthly examination and recognize subtle signs.
          </p>
        </div>

        {/* Feature 1: The 2-Minute Oral Self-Exam Interactive Guide */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-mono font-semibold uppercase text-teal-600 dark:text-teal-400">
                Interactive Protocol · Step {activeExamStep} of {SELF_EXAM_STEPS.length}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                The 2-Minute Monthly Oral Self-Exam
              </h2>
            </div>

            {/* Stepper controls */}
            <div className="flex items-center gap-2">
              <button
                disabled={activeExamStep === 1}
                onClick={() => setActiveExamStep((s) => Math.max(1, s - 1))}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Previous step"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-semibold px-2">
                {activeExamStep} / {SELF_EXAM_STEPS.length}
              </span>
              <button
                disabled={activeExamStep === SELF_EXAM_STEPS.length}
                onClick={() => setActiveExamStep((s) => Math.min(SELF_EXAM_STEPS.length, s + 1))}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Next step"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Step Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-teal-600/10 dark:bg-teal-400/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-3">
                <Clock className="w-8 h-8" />
              </div>
              <span className="text-xs uppercase font-mono text-slate-400">Duration</span>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                {currentExamStep.duration}
              </div>
              <div className="mt-3 text-xs text-slate-500">
                Step {currentExamStep.step} of 6 Protocol
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {currentExamStep.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentExamStep.instruction}
              </p>

              <div className="p-4 bg-teal-50/60 dark:bg-teal-950/40 rounded-xl border border-teal-200/80 dark:border-teal-900/60 space-y-2">
                <span className="text-xs font-semibold uppercase font-mono tracking-wider text-teal-800 dark:text-teal-300">
                  Inspection Checkpoints:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {currentExamStep.checkPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 mt-0.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Step Pill Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-2">
            {SELF_EXAM_STEPS.map((s) => (
              <button
                key={s.step}
                onClick={() => setActiveExamStep(s.step)}
                className={`py-2 px-2 text-xs font-medium rounded-lg text-center transition-all ${
                  activeExamStep === s.step
                    ? 'bg-teal-600 text-white shadow-xs font-bold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Step {s.step}: {s.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Feature 2: Interactive Tobacco & Alcohol Multiplier Simulator */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase text-rose-600 dark:text-rose-400">
              <Flame className="w-3.5 h-3.5" />
              <span>Toxicological Synergy Calculator</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              The Tobacco + Alcohol Multiplier Effect
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
              Smoking and drinking do not just add risk—they multiply it. Alcohol dehydrates intraoral mucosa and acts as an organic solvent, enabling carcinogenic polycyclic aromatic hydrocarbons to penetrate deep into epithelial stem cells.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            {/* Sliders */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span>Cigarettes Per Day:</span>
                  <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">{synergyCigarettes} cigs/day</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={synergyCigarettes}
                  onChange={(e) => setSynergyCigarettes(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>0 (Non-smoker)</span>
                  <span>20 (1 pack)</span>
                  <span>40 (2 packs)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span>Alcohol Drinks Per Day:</span>
                  <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">{synergyDrinks} drinks/day</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  value={synergyDrinks}
                  onChange={(e) => setSynergyDrinks(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>0 (None)</span>
                  <span>4 (Heavy)</span>
                  <span>8+ (Excessive)</span>
                </div>
              </div>
            </div>

            {/* Calculated Risk Multiplier Display */}
            <div className="md:col-span-5 text-center p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
                Estimated Relative Cancer Risk
              </span>
              <div className="text-4xl sm:text-5xl font-black font-mono tabular-nums text-rose-600 dark:text-rose-400">
                ~{synergyMultiplier}x
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                {synergyMultiplier <= 2
                  ? 'Baseline to minimal elevated risk profile.'
                  : synergyMultiplier < 10
                  ? 'Noticeably increased risk for mucosal dysplasia.'
                  : 'High synergistic magnification. Cessation produces profound risk reduction.'}
              </p>
            </div>
          </div>
        </div>

        {/* Feature 3: Deep Dive Educational Guides */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Guide list sidebar */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-semibold uppercase text-slate-400 font-mono tracking-wider block mb-2">
              Select In-Depth Article
            </span>
            {EDUCATIONAL_GUIDES.map((guide) => {
              const isSelected = selectedGuideId === guide.id;
              return (
                <button
                  key={guide.id}
                  onClick={() => setSelectedGuideId(guide.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-teal-600 bg-white dark:bg-slate-900 dark:border-teal-400 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-white dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
                    <span>{guide.category}</span>
                    <span>{guide.readTime}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {guide.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Guide Content Display */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-teal-600 dark:text-teal-400">
                <span>{selectedGuide.category}</span>
                <span>·</span>
                <span>{selectedGuide.readTime}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {selectedGuide.title}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {selectedGuide.subtitle}
              </p>
            </div>

            <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
              {selectedGuide.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Checklist if present */}
            {selectedGuide.checklist && (
              <div className="p-4 bg-amber-50/60 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/60 space-y-2">
                <span className="text-xs font-bold uppercase font-mono text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Clinical Evaluation Checklist</span>
                </span>
                <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                  {selectedGuide.checklist.map((c, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Takeaway Callout */}
            <div className="p-4 bg-teal-50 dark:bg-teal-950/40 rounded-xl border border-teal-200 dark:border-teal-900/60 text-xs text-teal-950 dark:text-teal-100 flex items-start gap-3">
              <Info className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Key Clinical Takeaway:</strong>
                <span>{selectedGuide.keyTakeaway}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
