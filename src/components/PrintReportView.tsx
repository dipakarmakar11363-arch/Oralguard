import React from 'react';
import { RiskAssessmentResult, PhotoAnalysisResult } from '../types';

interface PrintReportViewProps {
  riskResult: RiskAssessmentResult;
  photoAnalysis?: PhotoAnalysisResult | null;
}

export const PrintReportView: React.FC<PrintReportViewProps> = ({ riskResult, photoAnalysis }) => {
  const { answers } = riskResult;
  const isHigh = riskResult.level === 'High';
  const isMod = riskResult.level === 'Moderate';

  return (
    <div className="hidden print-only p-8 max-w-4xl mx-auto bg-white text-slate-900 font-sans leading-normal">
      {/* Clinic / Document Header */}
      <div className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
            OralGuard · Clinical Screening Summary
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            AI-Assisted Oral Cancer Risk Stratification & Patient Triage Referral Form
          </p>
        </div>
        <div className="text-right text-xs font-mono">
          <div>Report Date: {new Date().toLocaleDateString('en-US')}</div>
          <div>Document Ref: OG-{Date.now().toString().slice(-8)}</div>
          <div className="text-teal-700 font-semibold">Status: Non-Diagnostic Triage</div>
        </div>
      </div>

      {/* Primary Risk Triage Box */}
      <div className="border border-slate-300 rounded-lg p-4 mb-6 bg-slate-50">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
            Assessed Risk Category
          </span>
          <span
            className={`text-xs px-2.5 py-0.5 rounded font-bold uppercase ${
              isHigh ? 'bg-red-200 text-red-900' : isMod ? 'bg-amber-200 text-amber-900' : 'bg-emerald-200 text-emerald-900'
            }`}
          >
            {riskResult.level} Risk ({riskResult.score}/100)
          </span>
        </div>
        <h2 className="text-lg font-bold text-slate-900">{riskResult.headline}</h2>
        <p className="text-xs text-slate-700 mt-1">{riskResult.summary}</p>
        <div className="mt-3 text-xs font-semibold text-slate-800">
          Recommended Action Window: <span className="underline">{riskResult.recommendedActionWindow}</span>
        </div>
      </div>

      {/* Urgent Red Flag Symptoms */}
      {riskResult.urgentFlags.length > 0 && (
        <div className="border border-red-300 bg-red-50 rounded-lg p-3.5 mb-6 text-xs text-red-950">
          <div className="font-bold uppercase tracking-wider text-red-900 mb-1">
            Urgent Clinical Symptom Alerts Reported:
          </div>
          <ul className="list-disc list-inside space-y-0.5">
            {riskResult.urgentFlags.map((flag, idx) => (
              <li key={idx} className="font-medium">{flag}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Patient Questionnaire Audit Grid */}
      <div className="mb-6">
        <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 border-b pb-1 mb-3">
          1. Patient Symptom & Exposure Audit
        </h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
          <div><strong>Age Bracket:</strong> {answers.ageGroup}</div>
          <div><strong>Gender:</strong> {answers.gender}</div>
          <div><strong>Tobacco Category:</strong> {answers.tobaccoUse.replace('_', ' ')} {answers.tobaccoYears ? `(${answers.tobaccoYears} yrs)` : ''}</div>
          <div><strong>Alcohol Intake:</strong> {answers.alcoholIntake}</div>
          <div><strong>Non-healing Ulcer (&gt; 14 days):</strong> {answers.hasPersistentUlcer ? 'YES (High Risk)' : 'No'}</div>
          <div><strong>Adherent Patches (Red/White):</strong> {answers.hasPatches ? `YES (${answers.patchType})` : 'No'}</div>
          <div><strong>Palpable Induration / Lump:</strong> {answers.hasLumpOrThickening ? 'YES (High Risk)' : 'No'}</div>
          <div><strong>Dysphagia / Throat Pain:</strong> {answers.hasSwallowingDifficulty ? 'YES' : 'No'}</div>
          <div><strong>Numbness / Referred Pain:</strong> {answers.hasNumbnessOrPain ? 'YES' : 'No'}</div>
          <div><strong>Unexplained Loose Teeth:</strong> {answers.hasLooseTeeth ? 'YES' : 'No'}</div>
          <div><strong>HPV Vaccinated:</strong> {answers.hpvVaccinated}</div>
          <div><strong>Family Head/Neck Cancer:</strong> {answers.familyOralCancer ? 'YES' : 'No'}</div>
          <div><strong>Dental Checkup Interval:</strong> {answers.dentalVisitFrequency.replace('_', ' ')}</div>
          <div><strong>Lip Sun Exposure:</strong> {answers.sunLipExposure}</div>
        </div>
      </div>

      {/* Photo AI Findings if attached */}
      {photoAnalysis && (
        <div className="mb-6">
          <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 border-b pb-1 mb-2">
            2. Intraoral Computer Vision Screening Observations
          </h3>
          <div className="text-xs space-y-1">
            <div><strong>Image File Analyzed:</strong> {photoAnalysis.imageName}</div>
            <div><strong>Model Confidence Index:</strong> {photoAnalysis.confidenceOverall}%</div>
            <div><strong>Primary Morphological Observation:</strong> {photoAnalysis.primaryObservation}</div>
            <div><strong>Colorimetry Metrics:</strong> Erythema: {photoAnalysis.colorimetry.erythemaLevel} | Leukoplakia Risk: {photoAnalysis.colorimetry.leukoplakiaRisk}</div>
            <div><strong>AI Recommended Urgency:</strong> {photoAnalysis.clinicalRecommendation}</div>
          </div>
        </div>
      )}

      {/* Action Protocol for Examining Clinician */}
      <div className="mb-6">
        <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 border-b pb-1 mb-2">
          3. Recommended Protocol For Examining Clinician
        </h3>
        <ol className="list-decimal list-inside text-xs space-y-1 text-slate-800">
          {riskResult.recommendations.map((rec, i) => (
            <li key={i}>{rec}</li>
          ))}
        </ol>
      </div>

      {/* Doctor Signature & Legal Disclaimer */}
      <div className="border-t border-slate-300 pt-4 mt-8 text-[11px] text-slate-500 space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <div>Examining Clinician Signature: ___________________________________</div>
            <div className="mt-1">License / NPI Number: ________________________ Date: ____________</div>
          </div>
        </div>

        <p className="italic text-[10px] leading-tight">
          DISCLAIMER: OralGuard is an educational risk assessment and screening support tool. It does not provide medical diagnosis or replace a comprehensive oral cancer examination by a licensed dental professional or oral maxillofacial pathologist. Any mucosal lesion persisting beyond 14 days warrants histological biopsy.
        </p>
      </div>
    </div>
  );
};
