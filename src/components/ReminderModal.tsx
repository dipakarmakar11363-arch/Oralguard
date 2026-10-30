import React, { useState } from 'react';
import { Calendar, Check, X, Bell, Download, ShieldCheck } from 'lucide-react';

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReminderModal: React.FC<ReminderModalProps> = ({ isOpen, onClose }) => {
  const [frequency, setFrequency] = useState<'monthly' | 'bi-monthly' | 'quarterly'>('monthly');
  const [reminderTime, setReminderTime] = useState<string>('09:00');
  const [isGenerated, setIsGenerated] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDownloadCalendarFile = () => {
    // Generate .ics calendar invite
    const nextDate = new Date();
    if (frequency === 'monthly') nextDate.setMonth(nextDate.getMonth() + 1);
    else if (frequency === 'bi-monthly') nextDate.setMonth(nextDate.getMonth() + 2);
    else nextDate.setMonth(nextDate.getMonth() + 3);

    const year = nextDate.getFullYear();
    const month = String(nextDate.getMonth() + 1).padStart(2, '0');
    const day = String(nextDate.getDate()).padStart(2, '0');
    const [hours, minutes] = reminderTime.split(':');
    const dateFormatted = `${year}${month}${day}T${hours || '09'}${minutes || '00'}00`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//OralGuard//Monthly Oral Cancer Self-Examination//EN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@oralguard.health`,
      `DTSTAMP:${dateFormatted}Z`,
      `DTSTART:${dateFormatted}`,
      `DTEND:${dateFormatted}`,
      'RRULE:FREQ=MONTHLY;INTERVAL=1',
      'SUMMARY:OralGuard 2-Minute Oral Self-Exam',
      'DESCRIPTION:Time for your monthly 2-minute oral self-examination. Inspect lateral tongue borders, floor of the mouth, cheeks, and neck for sores, red/white patches, or firm lumps.',
      'LOCATION:At home (mirror with good lighting)',
      'BEGIN:VALARM',
      'TRIGGER:-PT15M',
      'ACTION:DISPLAY',
      'DESCRIPTION:Reminder: OralGuard Self-Examination',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'OralGuard_Self_Exam_Reminder.ics';
    a.click();
    URL.revokeObjectURL(url);
    setIsGenerated(true);
    setTimeout(() => {
      setIsGenerated(false);
      onClose();
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-2xl relative space-y-5">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/70 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Schedule Self-Check Reminder
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Never forget your vital 2-minute monthly oral inspection
            </p>
          </div>
        </div>

        {isGenerated ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Calendar Invitation Downloaded!
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs mx-auto">
              Open the downloaded <code>.ics</code> file to add recurring self-exam alerts directly to Apple Calendar, Google Calendar, or Outlook.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Recommended Recurrence
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'monthly', label: 'Every Month (Standard)' },
                  { id: 'bi-monthly', label: 'Every 2 Months' },
                  { id: 'quarterly', label: 'Every 3 Months' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setFrequency(item.id as any)}
                    className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                      frequency === item.id
                        ? 'border-teal-600 bg-teal-50 text-teal-900 dark:bg-teal-950 dark:border-teal-400 dark:text-teal-200 font-semibold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Preferred Alert Time
              </label>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>Creates a standardized calendar event (.ics) with step-by-step oral self-check instructions included in the notes.</span>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDownloadCalendarFile}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Calendar Invite</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
