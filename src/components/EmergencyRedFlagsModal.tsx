import React from 'react';
import { AlertOctagon, X, Phone, ArrowRight, ShieldAlert, Check } from 'lucide-react';

interface EmergencyRedFlagsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFindSpecialist: () => void;
}

export const EmergencyRedFlagsModal: React.FC<EmergencyRedFlagsModalProps> = ({
  isOpen,
  onClose,
  onFindSpecialist,
}) => {
  if (!isOpen) return null;

  const redFlags = [
    {
      symptom: 'Sore or ulcer lasting > 14 days without healing',
      urgency: 'High Urgency',
      guidance: 'Benign traumatic lesions heal within 10–14 days. Non-healing ulcers require diagnostic scalpel biopsy.',
    },
    {
      symptom: 'Velvety fiery red patch (Erythroplakia) or red-white speckled patch',
      urgency: 'Immediate Biopsy Required',
      guidance: 'Over 85% of true erythroplakic mucosal lesions demonstrate severe dysplasia or carcinoma in situ.',
    },
    {
      symptom: 'Painless firm lump or induration in tongue, cheek, or neck',
      urgency: 'High Urgency',
      guidance: 'Cancer cells proliferate invasively, causing firm tissue hardness (induration) that does not compress softly.',
    },
    {
      symptom: 'Difficulty swallowing (dysphagia) or feeling of food stuck in throat',
      urgency: 'Expedited Triage',
      guidance: 'Often associated with base-of-tongue, hypopharyngeal, or tonsillar lesions (common in HPV-associated disease).',
    },
    {
      symptom: 'Unexplained numbness in tongue, lower lip, or jaw paresthesia',
      urgency: 'Neurological Mucosal Alert',
      guidance: 'Suggests potential perineural invasion of the lingual or inferior alveolar nerve bundle.',
    },
    {
      symptom: 'Persistent hoarseness or voice changes lasting longer than 3 weeks',
      urgency: 'Laryngeal / Oropharyngeal Alert',
      guidance: 'Requires direct fiberoptic laryngoscopy by an Ear, Nose & Throat (ENT) specialist.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-rose-200 dark:border-rose-900/60 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <AlertOctagon className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs font-mono font-semibold uppercase text-rose-600 dark:text-rose-400 tracking-wider">
              Urgent Clinical Triage Guide
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Emergency Oral Red-Flag Symptoms
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          If you or a patient experience any of the symptoms below for longer than two weeks, do not delay or attempt over-the-counter home treatments. Early detection before regional lymph node involvement raises survival rates past 84%.
        </p>

        {/* Symptoms checklist */}
        <div className="space-y-2.5">
          {redFlags.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-rose-100 dark:border-rose-950/70 bg-rose-50/50 dark:bg-rose-950/20 space-y-1"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0" />
                  {item.symptom}
                </span>
                <span className="text-[10px] uppercase font-mono font-bold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/60 px-2 py-0.5 rounded shrink-0">
                  {item.urgency}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 pl-4">
                {item.guidance}
              </p>
            </div>
          ))}
        </div>

        {/* Action Callout */}
        <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-teal-400">
            <ShieldAlert className="w-4 h-4" />
            <span>Recommended Next Move</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Contact an <strong>Oral & Maxillofacial Surgeon</strong>, an <strong>Oral Pathologist</strong>, or visit an urgent dental care clinic for soft-tissue biopsy and clinical palpation.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
          >
            Close Guide
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onFindSpecialist();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-xs"
          >
            <span>Find Nearby Oral Specialists</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
