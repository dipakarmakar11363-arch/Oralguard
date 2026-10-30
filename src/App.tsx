import React, { useState, useEffect } from 'react';
import { RiskAssessmentResult, PhotoAnalysisResult, ScreeningRecord } from './types';
import { calculateOralCancerRisk } from './services/riskCalculator';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { OralCavityInteractiveExplorer } from './components/OralCavityInteractiveExplorer';
import { ScreeningQuestionnaire } from './components/ScreeningQuestionnaire';
import { PhotoAnalysisSection } from './components/PhotoAnalysisSection';
import { ResultsDashboard } from './components/ResultsDashboard';
import { SpecialistFinder } from './components/SpecialistFinder';
import { EducationHub } from './components/EducationHub';
import { ScreeningHistoryView } from './components/ScreeningHistoryView';
import { ReminderModal } from './components/ReminderModal';
import { EmergencyRedFlagsModal } from './components/EmergencyRedFlagsModal';
import { PrintReportView } from './components/PrintReportView';
import { Footer } from './components/Footer';

const STORAGE_KEY_RECORDS = 'oralguard_records_v1';
const STORAGE_KEY_THEME = 'oralguard_theme_v1';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_THEME);
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [activeRiskResult, setActiveRiskResult] = useState<RiskAssessmentResult | null>(null);
  const [activePhotoAnalysis, setActivePhotoAnalysis] = useState<PhotoAnalysisResult | null>(null);
  const [records, setRecords] = useState<ScreeningRecord[]>([]);
  const [isCurrentRecordSaved, setIsCurrentRecordSaved] = useState<boolean>(false);

  // Modals
  const [isReminderOpen, setIsReminderOpen] = useState<boolean>(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState<boolean>(false);

  // Synchronize dark class on document.documentElement
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(STORAGE_KEY_THEME, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(STORAGE_KEY_THEME, 'light');
    }
  }, [isDark]);

  // Load records from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_RECORDS);
      if (stored) {
        setRecords(JSON.parse(stored));
      }
    } catch {
      // Fallback if parsing fails
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleAssessmentComplete = (result: RiskAssessmentResult) => {
    setActiveRiskResult(result);
    setIsCurrentRecordSaved(false);
    setCurrentTab('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePhotoAnalysisSaved = (analysis: PhotoAnalysisResult) => {
    setActivePhotoAnalysis(analysis);
  };

  const handleSaveCurrentRecord = () => {
    if (!activeRiskResult) return;
    const newRecord: ScreeningRecord = {
      id: `og-rec-${Date.now()}`,
      createdAt: new Date().toISOString(),
      riskResult: activeRiskResult,
      photoAnalysis: activePhotoAnalysis || undefined,
      status: activeRiskResult.level === 'High' ? 'Follow-up Needed' : 'Completed',
    };

    const updated = [newRecord, ...records];
    setRecords(updated);
    try {
      localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(updated));
    } catch {
      // Error handling
    }
    setIsCurrentRecordSaved(true);
  };

  const handleDeleteRecord = (id: string) => {
    const updated = records.filter((r) => r.id !== id);
    setRecords(updated);
    try {
      localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(updated));
    } catch {
      // Storage error
    }
  };

  const handleSelectRecordFromHistory = (rec: ScreeningRecord) => {
    setActiveRiskResult(rec.riskResult);
    setActivePhotoAnalysis(rec.photoAnalysis || null);
    setIsCurrentRecordSaved(true);
    setCurrentTab('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartNewScreening = () => {
    setActiveRiskResult(null);
    setActivePhotoAnalysis(null);
    setIsCurrentRecordSaved(false);
    setCurrentTab('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Bar Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        historyCount={records.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 no-print">
        {currentTab === 'home' && (
          <>
            <HeroSection
              onStartScreening={() => setCurrentTab('assessment')}
              onOpenPhotoAI={() => setCurrentTab('photo-ai')}
              onOpenEducation={() => setCurrentTab('education')}
              onViewEmergency={() => setIsEmergencyOpen(true)}
            />
            <OralCavityInteractiveExplorer />
          </>
        )}

        {currentTab === 'assessment' && (
          <ScreeningQuestionnaire
            onComplete={handleAssessmentComplete}
            onCancel={() => setCurrentTab('home')}
          />
        )}

        {currentTab === 'photo-ai' && (
          <PhotoAnalysisSection
            onSaveToReport={handlePhotoAnalysisSaved}
            onProceedToDashboard={() => {
              if (activeRiskResult) {
                setCurrentTab('results');
              } else {
                // If user did photo without questionnaire yet, prompt or compute base result
                const baselineAnswers = {
                  ageGroup: '30-44',
                  gender: 'unspecified',
                  tobaccoUse: 'never' as const,
                  alcoholIntake: 'light' as const,
                  hasPersistentUlcer: activePhotoAnalysis?.urgency === 'prompt_evaluation',
                  hasPatches: activePhotoAnalysis?.colorimetry.leukoplakiaRisk === 'prominent',
                  patchType: 'white' as const,
                  hasLumpOrThickening: false,
                  hasSwallowingDifficulty: false,
                  hasUnexplainedBleeding: false,
                  hasNumbnessOrPain: false,
                  hasLooseTeeth: false,
                  hpvVaccinated: 'unknown' as const,
                  familyOralCancer: false,
                  sunLipExposure: 'low' as const,
                  dentalVisitFrequency: 'yearly' as const,
                  brushFlossHabit: 'daily' as const,
                };
                const baselineResult = calculateOralCancerRisk(baselineAnswers);
                setActiveRiskResult(baselineResult);
                setCurrentTab('results');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'results' && activeRiskResult && (
          <ResultsDashboard
            riskResult={activeRiskResult}
            photoAnalysis={activePhotoAnalysis}
            onFindSpecialist={() => {
              setCurrentTab('specialists');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSetReminder={() => setIsReminderOpen(true)}
            onSaveHistory={handleSaveCurrentRecord}
            isSaved={isCurrentRecordSaved}
          />
        )}

        {currentTab === 'specialists' && (
          <SpecialistFinder
            onBackToResults={activeRiskResult ? () => setCurrentTab('results') : undefined}
          />
        )}

        {currentTab === 'education' && <EducationHub />}

        {currentTab === 'history' && (
          <ScreeningHistoryView
            records={records}
            onSelectRecord={handleSelectRecordFromHistory}
            onDeleteRecord={handleDeleteRecord}
            onNewScreening={handleStartNewScreening}
          />
        )}
      </main>

      {/* Print-Only Clinical Referral Sheet View (Vector sharp for native PDF download) */}
      {activeRiskResult && (
        <PrintReportView
          riskResult={activeRiskResult}
          photoAnalysis={activePhotoAnalysis}
        />
      )}

      {/* Footer */}
      <Footer
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
      />

      {/* Modals */}
      <ReminderModal
        isOpen={isReminderOpen}
        onClose={() => setIsReminderOpen(false)}
      />

      <EmergencyRedFlagsModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        onFindSpecialist={() => {
          setCurrentTab('specialists');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
