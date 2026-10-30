import React, { useState } from 'react';
import { QuestionnaireAnswers, RiskAssessmentResult } from '../types';
import { calculateOralCancerRisk } from '../services/riskCalculator';
import { Shield, ArrowRight, ArrowLeft, Check, AlertCircle, Sparkles, RotateCcw } from 'lucide-react';

interface ScreeningQuestionnaireProps {
  onComplete: (result: RiskAssessmentResult) => void;
  onCancel?: () => void;
}

const INITIAL_ANSWERS: QuestionnaireAnswers = {
  ageGroup: '30-44',
  gender: 'female',
  tobaccoUse: 'never',
  tobaccoYears: 0,
  alcoholIntake: 'light',
  hasPersistentUlcer: false,
  ulcerDurationDays: 0,
  hasPatches: false,
  patchType: 'none',
  hasLumpOrThickening: false,
  hasSwallowingDifficulty: false,
  hasUnexplainedBleeding: false,
  hasNumbnessOrPain: false,
  hasLooseTeeth: false,
  hpvVaccinated: 'yes',
  familyOralCancer: false,
  sunLipExposure: 'low',
  dentalVisitFrequency: 'regular_6mo',
  brushFlossHabit: 'daily',
};

export const ScreeningQuestionnaire: React.FC<ScreeningQuestionnaireProps> = ({
  onComplete,
  onCancel,
}) => {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<QuestionnaireAnswers>(INITIAL_ANSWERS);

  const updateAnswer = <K extends keyof QuestionnaireAnswers>(key: K, value: QuestionnaireAnswers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const result = calculateOralCancerRisk(answers);
      onComplete(result);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Pre-fill a sample elevated risk profile for testing
  const loadHighRiskDemo = () => {
    setAnswers({
      ageGroup: '60+',
      gender: 'male',
      tobaccoUse: 'chewing_gutkha_snuff',
      tobaccoYears: 18,
      alcoholIntake: 'heavy',
      hasPersistentUlcer: true,
      ulcerDurationDays: 21,
      hasPatches: true,
      patchType: 'mixed_speckled',
      hasLumpOrThickening: true,
      hasSwallowingDifficulty: true,
      hasUnexplainedBleeding: false,
      hasNumbnessOrPain: true,
      hasLooseTeeth: false,
      hpvVaccinated: 'no',
      familyOralCancer: true,
      sunLipExposure: 'high',
      dentalVisitFrequency: 'rarely',
      brushFlossHabit: 'irregular',
    });
  };

  const loadLowRiskDemo = () => {
    setAnswers({ ...INITIAL_ANSWERS });
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-950 min-h-[calc(100vh-4rem)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header & Progress Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono font-medium uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Step {step} of 3 · Clinical Risk Assessment
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {step === 1 && 'Demographics & Lifestyle Exposures'}
                {step === 2 && 'Oral Signs & Symptom Inventory'}
                {step === 3 && 'Health History & Oral Hygiene'}
              </h2>
            </div>

            {/* Quick Demo Fill Buttons for convenience */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={loadHighRiskDemo}
                className="text-xs px-2.5 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 hover:bg-rose-100 transition-colors"
                title="Fill with high risk demonstration inputs"
              >
                Simulate High Risk
              </button>
              <button
                type="button"
                onClick={loadLowRiskDemo}
                className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors flex items-center gap-1"
                title="Reset to clean baseline inputs"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Stepper Progress Indicator */}
          <div className="relative">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                style={{ width: `${(step / 3) * 100}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-600 dark:bg-teal-500 transition-all duration-300"
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className={step >= 1 ? 'font-semibold text-teal-600 dark:text-teal-400' : ''}>1. Lifestyle</span>
              <span className={step >= 2 ? 'font-semibold text-teal-600 dark:text-teal-400' : ''}>2. Symptoms</span>
              <span className={step >= 3 ? 'font-semibold text-teal-600 dark:text-teal-400' : ''}>3. History</span>
            </div>
          </div>
        </div>

        {/* Step 1: Demographics & Lifestyle */}
        {step === 1 && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            {/* Age Group */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                What is your age bracket?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: '<30', label: 'Under 30' },
                  { id: '30-44', label: '30 – 44' },
                  { id: '45-59', label: '45 – 59' },
                  { id: '60+', label: '60+' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => updateAnswer('ageGroup', item.id)}
                    className={`py-3 px-3 rounded-xl text-sm font-medium border text-center transition-all ${
                      answers.ageGroup === item.id
                        ? 'border-teal-600 bg-teal-50 text-teal-900 dark:bg-teal-950/70 dark:border-teal-400 dark:text-teal-200 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tobacco Use */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Do you currently or have you previously used tobacco products?
              </label>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Include cigarettes, cigars, pipes, and smokeless forms (chewing tobacco, betel quid, gutkha, paan, snuff).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'never', label: 'Never used tobacco', sub: 'No history of regular use' },
                  { id: 'former', label: 'Former user', sub: 'Quit more than 12 months ago' },
                  { id: 'cigarette_light', label: 'Cigarettes / Vaping (Light)', sub: '< 10 cigarettes per day or e-cig' },
                  { id: 'cigarette_heavy', label: 'Cigarettes / Cigars (Heavy)', sub: '10+ cigarettes daily or cigars' },
                  { id: 'chewing_gutkha_snuff', label: 'Chewing Tobacco / Betel Quid / Snuff', sub: 'Direct mucosal contact (high risk)' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => updateAnswer('tobaccoUse', item.id as any)}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      answers.tobaccoUse === item.id
                        ? 'border-teal-600 bg-teal-50 dark:bg-teal-950/70 dark:border-teal-400 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-semibold text-sm text-slate-900 dark:text-white">{item.label}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Conditional Tobacco Years if active or former */}
            {answers.tobaccoUse !== 'never' && (
              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <label className="block text-xs font-semibold uppercase font-mono tracking-wider text-slate-700 dark:text-slate-300">
                  Approximate Duration of Tobacco Use: {answers.tobaccoYears || 5} years
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={answers.tobaccoYears || 5}
                  onChange={(e) => updateAnswer('tobaccoYears', Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>1 yr</span>
                  <span>25 yrs</span>
                  <span>50+ yrs</span>
                </div>
              </div>
            )}

            {/* Alcohol Intake */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                How often do you consume alcoholic beverages?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'none', label: 'None', desc: 'Rarely / Never' },
                  { id: 'light', label: 'Light', desc: '1–3 drinks/week' },
                  { id: 'moderate', label: 'Moderate', desc: '1–2 drinks/day' },
                  { id: 'heavy', label: 'Heavy', desc: '3+ drinks/day' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => updateAnswer('alcoholIntake', item.id as any)}
                    className={`p-3 rounded-xl text-center border transition-all ${
                      answers.alcoholIntake === item.id
                        ? 'border-teal-600 bg-teal-50 text-teal-900 dark:bg-teal-950/70 dark:border-teal-400 dark:text-teal-200'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="font-semibold text-sm">{item.label}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Symptoms & Oral Signs */}
        {step === 2 && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900/60 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Please answer accurately based on your mouth, tongue, lips, and neck over the past few weeks.
              </p>
            </div>

            {/* Persistent Ulcers */}
            <div className="space-y-3 pb-5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Do you have an oral sore, ulcer, or canker-like lesion that has lasted MORE than 14 days?
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Normal accidental bites or aphthous ulcers re-epithelialize within 10–14 days.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => updateAnswer('hasPersistentUlcer', true)}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                      answers.hasPersistentUlcer
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => updateAnswer('hasPersistentUlcer', false)}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                      !answers.hasPersistentUlcer
                        ? 'bg-teal-600 text-white border-teal-600'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>

            {/* White or Red Patches */}
            <div className="space-y-3 pb-5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Have you noticed any white, red, or discolored patches inside your mouth that do not rub off?
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Such as leukoplakia (thickened white plaque) or erythroplakia (velvety fiery red spot).
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      updateAnswer('hasPatches', true);
                      if (answers.patchType === 'none') updateAnswer('patchType', 'white');
                    }}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                      answers.hasPatches
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      updateAnswer('hasPatches', false);
                      updateAnswer('patchType', 'none');
                    }}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                      !answers.hasPatches
                        ? 'bg-teal-600 text-white border-teal-600'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Conditional Patch Type */}
              {answers.hasPatches && (
                <div className="mt-3 p-3.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <label className="block text-xs font-semibold uppercase font-mono text-slate-700 dark:text-slate-300">
                    What does the patch look like?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'white', label: 'Persistent White Plaque (Leukoplakia)' },
                      { id: 'red', label: 'Velvety Red Patch (Erythroplakia)' },
                      { id: 'mixed_speckled', label: 'Mixed Red & White Speckled' },
                    ].map((p) => (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => updateAnswer('patchType', p.id as any)}
                        className={`p-2.5 rounded-lg text-xs font-medium text-left border ${
                          answers.patchType === p.id
                            ? 'border-teal-600 bg-teal-50 dark:bg-teal-950/70 dark:border-teal-400 font-semibold text-teal-900 dark:text-teal-200'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Lumps / Induration */}
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Do you feel any unusual lump, bump, or thick firm mass in your cheek, tongue, or neck?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Firmness to the touch (induration) that does not fluctuate like a soft cyst.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => updateAnswer('hasLumpOrThickening', true)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                    answers.hasLumpOrThickening
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => updateAnswer('hasLumpOrThickening', false)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                    !answers.hasLumpOrThickening
                      ? 'bg-teal-600 text-white border-teal-600'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {/* Swallowing or Throat Pain */}
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Have you experienced chronic difficulty swallowing, persistent sore throat, or hoarseness?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  A persistent sensation of something stuck in the back of the throat.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => updateAnswer('hasSwallowingDifficulty', true)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                    answers.hasSwallowingDifficulty
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => updateAnswer('hasSwallowingDifficulty', false)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                    !answers.hasSwallowingDifficulty
                      ? 'bg-teal-600 text-white border-teal-600'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {/* Numbness or Referred Ear Pain */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Any unexplained numbness in the tongue/lip or unilateral pain radiating to the ear?
                </h3>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => updateAnswer('hasNumbnessOrPain', true)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                    answers.hasNumbnessOrPain
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => updateAnswer('hasNumbnessOrPain', false)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                    !answers.hasNumbnessOrPain
                      ? 'bg-teal-600 text-white border-teal-600'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Health History & Oral Hygiene */}
        {step === 3 && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            {/* HPV Vaccination Status */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Have you received the HPV (Human Papillomavirus) vaccine?
              </label>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                HPV-16 is a major driver of oropharyngeal and tonsillar mucosal cancers.
              </p>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'yes', label: 'Yes, Vaccinated' },
                  { id: 'no', label: 'No' },
                  { id: 'unknown', label: 'Unsure / Unknown' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => updateAnswer('hpvVaccinated', item.id as any)}
                    className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-medium border text-center transition-all ${
                      answers.hpvVaccinated === item.id
                        ? 'border-teal-600 bg-teal-50 text-teal-900 dark:bg-teal-950/70 dark:border-teal-400 dark:text-teal-200 font-semibold'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Family History */}
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Has any immediate biological relative had head, neck, or oral cancer?
                </h3>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => updateAnswer('familyOralCancer', true)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                    answers.familyOralCancer
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => updateAnswer('familyOralCancer', false)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                    !answers.familyOralCancer
                      ? 'bg-teal-600 text-white border-teal-600'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {/* Dental Visit Frequency */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                How frequently do you visit a dentist for professional checkups and cleanings?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'regular_6mo', label: 'Every 6 Months' },
                  { id: 'yearly', label: 'Once a Year' },
                  { id: 'rarely', label: 'Only When in Pain' },
                  { id: 'never', label: 'Have Not Visited in 2+ Years' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => updateAnswer('dentalVisitFrequency', item.id as any)}
                    className={`py-3 px-2 text-xs font-medium rounded-xl border text-center transition-all ${
                      answers.dentalVisitFrequency === item.id
                        ? 'border-teal-600 bg-teal-50 text-teal-900 dark:bg-teal-950/70 dark:border-teal-400 dark:text-teal-200 font-semibold'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sun exposure on lips */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Outdoor sun exposure on your lips (UV radiation):
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'low', label: 'Low', desc: 'Mostly indoor / use SPF' },
                  { id: 'moderate', label: 'Moderate', desc: 'Normal outdoor time' },
                  { id: 'high', label: 'High', desc: 'Outdoor worker / high sun' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => updateAnswer('sunLipExposure', item.id as any)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      answers.sunLipExposure === item.id
                        ? 'border-teal-600 bg-teal-50 text-teal-900 dark:bg-teal-950/70 dark:border-teal-400 dark:text-teal-200 font-semibold'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="font-semibold text-xs sm:text-sm">{item.label}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="mt-6 flex items-center justify-between gap-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div>
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="text-sm text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                >
                  Return to Overview
                </button>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 rounded-xl shadow-sm transition-all"
          >
            <span>{step === 3 ? 'Generate Risk Evaluation' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
