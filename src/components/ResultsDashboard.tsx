import React, { useState } from 'react';
import { RiskAssessmentResult, PhotoAnalysisResult } from '../types';
import { ShieldCheck, AlertTriangle, AlertCircle, Calendar, Download, Printer, UserCheck, MapPin, CheckCircle, Clock, ChevronRight } from 'lucide-react';

interface ResultsDashboardProps {
  riskResult: RiskAssessmentResult;
  photoAnalysis?: PhotoAnalysisResult | null;
  onFindSpecialist: () => void;
  onSetReminder: () => void;
  onSaveHistory: () => void;
  isSaved?: boolean;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  riskResult,
  photoAnalysis,
  onFindSpecialist,
  onSetReminder,
  onSaveHistory,
  isSaved = false,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const isHighRisk = riskResult.level === 'High';
  const isModerateRisk = riskResult.level === 'Moderate';
  const isLowRisk = riskResult.level === 'Low';

  const handlePrintOrDownload = () => {
    window.print();
  };

  const handleDownloadTextSummary = () => {
    const textReport = `
=================================================================
ORALGUARD CLINICAL SCREENING SUMMARY REPORT
Generated on: ${new Date().toLocaleString()}
Risk Level: ${riskResult.level.toUpperCase()} (Score: ${riskResult.score}/100)
Action Window: ${riskResult.recommendedActionWindow}
=================================================================

SUMMARY:
${riskResult.summary}

URGENT CLINICAL FLAGS:
${riskResult.urgentFlags.length > 0 ? riskResult.urgentFlags.map((f) => `- ${f}`).join('\n') : 'No urgent symptom red flags reported.'}

KEY CONTRIBUTING FACTORS:
${riskResult.keyFactors.map((k) => `[${k.severity.toUpperCase()}] ${k.title}: ${k.impactDescription}`).join('\n')}

PHOTO ANALYSIS FINDINGS:
${photoAnalysis ? `- Primary: ${photoAnalysis.primaryObservation}\n- Recommendation: ${photoAnalysis.clinicalRecommendation}` : 'No photo uploaded with this evaluation.'}

RECOMMENDED ACTION PROTOCOL:
${riskResult.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}

-----------------------------------------------------------------
DISCLAIMER:
OralGuard is an educational risk assessment and screening support tool.
It does not provide medical diagnosis or replace a comprehensive oral cancer
examination by a licensed dental professional or oral maxillofacial pathologist.
=================================================================
    `.trim();

    const blob = new Blob([textReport], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `OralGuard_Screening_Report_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-950 min-h-[calc(100vh-4rem)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Assessment Results & Action Plan</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Your Oral Risk Stratification Summary
            </h1>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0 no-print">
            <button
              onClick={handlePrintOrDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
              title="Print official clinical referral sheet"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={handleDownloadTextSummary}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloadSuccess ? 'Downloaded!' : 'Export Text'}</span>
            </button>

            <button
              onClick={onSaveHistory}
              disabled={isSaved}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg shadow-xs transition-colors ${
                isSaved
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-teal-600 hover:bg-teal-700 text-white'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{isSaved ? 'Saved to Records' : 'Save Record'}</span>
            </button>
          </div>
        </div>

        {/* Primary Result Banner Card */}
        <div
          className={`rounded-2xl p-6 sm:p-8 border shadow-sm transition-all ${
            isHighRisk
              ? 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/60'
              : isModerateRisk
              ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/60'
              : 'bg-teal-50/70 dark:bg-teal-950/30 border-teal-200 dark:border-teal-900/60'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Risk Gauge Score */}
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
                Calculated Risk Score
              </span>
              <div className="text-5xl font-black font-mono my-2 tabular-nums">
                <span
                  className={
                    isHighRisk
                      ? 'text-rose-600 dark:text-rose-400'
                      : isModerateRisk
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-teal-600 dark:text-teal-400'
                  }
                >
                  {riskResult.score}
                </span>
                <span className="text-xl text-slate-400 font-normal"> / 100</span>
              </div>

              {/* Categorical label */}
              <span
                className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                  isHighRisk
                    ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200'
                    : isModerateRisk
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200'
                    : 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-200'
                }`}
              >
                {riskResult.level} Risk Profile
              </span>

              {/* Visual meter bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
                <div
                  style={{ width: `${riskResult.score}%` }}
                  className={`h-full rounded-full transition-all duration-500 ${
                    isHighRisk
                      ? 'bg-rose-600'
                      : isModerateRisk
                      ? 'bg-amber-500'
                      : 'bg-teal-600'
                  }`}
                />
              </div>
            </div>

            {/* Explanation & Action Window */}
            <div className="md:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800">
                <Clock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>Recommended Action Window: <strong>{riskResult.recommendedActionWindow}</strong></span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {riskResult.headline}
              </h2>

              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {riskResult.summary}
              </p>

              {/* Urgent Flags List if any */}
              {riskResult.urgentFlags.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider block mb-1 font-mono">
                    High Priority Clinical Alerts:
                  </span>
                  <div className="space-y-1">
                    {riskResult.urgentFlags.map((flag, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs font-medium text-rose-900 dark:text-rose-200 bg-rose-100/70 dark:bg-rose-950/60 px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900"
                      >
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>{flag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2-Column: Key Contributing Factors & Photo Vision Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Key Risk Drivers */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span>Risk Contributing Factors</span>
              <span className="text-xs font-normal text-slate-500 font-mono">
                {riskResult.keyFactors.length} factors identified
              </span>
            </h3>

            <div className="space-y-2.5">
              {riskResult.keyFactors.map((factor, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {factor.title}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-semibold ${
                        factor.severity === 'critical'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                          : factor.severity === 'high'
                          ? 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300'
                          : factor.severity === 'medium'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {factor.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
                    {factor.impactDescription}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Photo Analysis Card or Prompt to upload */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                Intraoral Photo Analysis
              </h3>

              {photoAnalysis ? (
                <div className="space-y-3">
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                    <img
                      src={photoAnalysis.imageUrl}
                      alt="Analyzed oral area"
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute bottom-2 left-2 right-2 bg-slate-900/90 backdrop-blur-xs p-2 rounded-lg text-white text-[11px] flex justify-between items-center font-mono">
                      <span>Model Confidence: {photoAnalysis.confidenceOverall}%</span>
                      <span className="text-teal-400 capitalize">{photoAnalysis.urgency.replace('_', ' ')}</span>
                    </div>
                  </div>

                  <div className="text-xs space-y-1">
                    <strong className="block text-slate-800 dark:text-slate-200">Vision Finding:</strong>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {photoAnalysis.primaryObservation}
                    </p>
                  </div>

                  <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-xl border border-teal-200 dark:border-teal-900/60 text-xs text-teal-900 dark:text-teal-200">
                    <strong>Photo Follow-Up:</strong> {photoAnalysis.clinicalRecommendation}
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    No Photo Attached Yet
                  </h4>
                  <p className="text-xs text-slate-500">
                    You can pair this questionnaire with an intraoral photo for simulated computer vision screening.
                  </p>
                </div>
              )}
            </div>

            {/* Specialist CTA Card */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={onFindSpecialist}
                className="w-full flex items-center justify-between p-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-xs transition-colors"
              >
                <div className="flex items-center gap-2.5 text-left">
                  <MapPin className="w-5 h-5 text-teal-200" />
                  <div>
                    <div className="text-xs font-bold">Find a Specialist Near You</div>
                    <div className="text-[11px] text-teal-100">Oral surgeons, pathologists & dentists</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Actionable Next Steps Protocol Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Recommended Clinical Next Steps
            </h3>
            <button
              onClick={onSetReminder}
              className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Set Monthly Checkup Reminder</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {riskResult.recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800"
              >
                <span className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-normal">
                  {rec}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
