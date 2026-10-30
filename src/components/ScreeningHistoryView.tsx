import React from 'react';
import { ScreeningRecord } from '../types';
import { Clock, Trash2, ExternalLink, ShieldCheck, Download, Plus, AlertTriangle } from 'lucide-react';

interface ScreeningHistoryViewProps {
  records: ScreeningRecord[];
  onSelectRecord: (record: ScreeningRecord) => void;
  onDeleteRecord: (id: string) => void;
  onNewScreening: () => void;
}

export const ScreeningHistoryView: React.FC<ScreeningHistoryViewProps> = ({
  records,
  onSelectRecord,
  onDeleteRecord,
  onNewScreening,
}) => {
  const exportAllRecordsJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(records, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `OralGuard_History_${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchorElem.click();
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-950 min-h-[calc(100vh-4rem)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              <Clock className="w-4 h-4" />
              <span>Personal Screening Log</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Your Screening History ({records.length})
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Screening records are stored securely on your local device for privacy and longitudinal risk monitoring.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {records.length > 0 && (
              <button
                onClick={exportAllRecordsJson}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>
            )}

            <button
              onClick={onNewScreening}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Assessment</span>
            </button>
          </div>
        </div>

        {records.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No Past Screenings Recorded
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Complete your first risk assessment questionnaire or photo evaluation to start tracking your oral health over time.
            </p>
            <button
              onClick={onNewScreening}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-xs"
            >
              <span>Take 3-Minute Assessment</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {records.map((rec) => {
              const isHigh = rec.riskResult.level === 'High';
              const isMod = rec.riskResult.level === 'Moderate';
              const formattedDate = new Date(rec.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={rec.id}
                  className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                          isHigh
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200'
                            : isMod
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200'
                            : 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-200'
                        }`}
                      >
                        {rec.riskResult.level} Risk ({rec.riskResult.score}/100)
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {formattedDate}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                      {rec.riskResult.headline}
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Action Window: {rec.riskResult.recommendedActionWindow}
                      {rec.photoAnalysis ? ` · Included Photo Scan (${rec.photoAnalysis.confidenceOverall}% confidence)` : ''}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <button
                      onClick={() => onSelectRecord(rec)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/70 hover:bg-teal-100 rounded-lg transition-colors"
                    >
                      <span>Review Details</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onDeleteRecord(rec.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
