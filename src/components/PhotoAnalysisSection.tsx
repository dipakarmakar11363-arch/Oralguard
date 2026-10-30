import React, { useState, useRef } from 'react';
import { PhotoAnalysisResult, BoundingBox } from '../types';
import { SAMPLE_CASES, SampleCase } from '../data/sampleClinicalPhotos';
import { analyzeCustomImage, SCAN_STAGES } from '../services/imageAnalysisSimulator';
import { Camera, Upload, Eye, CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw, ZoomIn, Info, Sparkles, Layers } from 'lucide-react';

interface PhotoAnalysisSectionProps {
  onSaveToReport?: (analysis: PhotoAnalysisResult) => void;
  onProceedToDashboard?: () => void;
}

export const PhotoAnalysisSection: React.FC<PhotoAnalysisSectionProps> = ({
  onSaveToReport,
  onProceedToDashboard,
}) => {
  const [selectedCase, setSelectedCase] = useState<SampleCase | null>(SAMPLE_CASES[0]);
  const [currentAnalysis, setCurrentAnalysis] = useState<PhotoAnalysisResult | null>(SAMPLE_CASES[0].analysis);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const [selectedBox, setSelectedBox] = useState<BoundingBox | null>(null);
  const [viewMode, setViewMode] = useState<'boxes' | 'heatmap' | 'raw'>('boxes');
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleSelectPreset = (c: SampleCase) => {
    setSelectedCase(c);
    setCurrentAnalysis(c.analysis);
    setSelectedBox(c.analysis.boundingBoxes[0] || null);
  };

  const processUploadedImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      setIsScanning(true);
      setCurrentStageIdx(0);
      setSelectedCase(null);

      const result = await analyzeCustomImage(dataUrl, file.name, (stageIdx) => {
        setCurrentStageIdx(stageIdx);
      });

      setCurrentAnalysis(result);
      setSelectedBox(result.boundingBoxes[0] || null);
      setIsScanning(false);
      if (onSaveToReport) onSaveToReport(result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadedImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedImageFile(e.target.files[0]);
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-950 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-2 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Computer Vision & Lesion Detection Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Intraoral Photo Screening
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
            Upload a clear, focused photograph of an oral area of concern (tongue, cheek, or floor of mouth) or select a clinical preset below to explore how deep mucosal pattern analysis detects early warnings.
          </p>
        </div>

        {/* Preset Selector Strip */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
              Or Try A Preset Clinical Scenario:
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SAMPLE_CASES.map((preset) => {
              const isSelected = selectedCase?.id === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-teal-600 dark:border-teal-400 bg-teal-50/70 dark:bg-teal-950/60 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                      {preset.name}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${
                        preset.category === 'High Suspicion'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300'
                          : preset.category === 'Observation'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300'
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300'
                      }`}
                    >
                      {preset.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {preset.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 2-Column Working Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image Viewer / Upload Dropzone */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
            {/* Upload Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              {/* View mode toggle */}
              <div className="inline-flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <button
                  onClick={() => setViewMode('boxes')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    viewMode === 'boxes'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Regions of Interest
                </button>
                <button
                  onClick={() => setViewMode('heatmap')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    viewMode === 'heatmap'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Erythema Heatmap
                </button>
                <button
                  onClick={() => setViewMode('raw')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    viewMode === 'raw'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Raw Image
                </button>
              </div>

              {/* Upload actions */}
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                <input
                  type="file"
                  ref={cameraInputRef}
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                <button
                  onClick={() => cameraInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  title="Take photo with device camera"
                >
                  <Camera className="w-3.5 h-3.5 text-teal-600" />
                  <span>Camera</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors shadow-xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload File</span>
                </button>
              </div>
            </div>

            {/* Image Canvas / Viewport */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleFileDrop}
              className={`relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center border-2 transition-all ${
                isDragOver ? 'border-teal-500 bg-teal-950/20' : 'border-slate-800'
              }`}
            >
              {isScanning ? (
                /* Scanning Laser Overlay Animation */
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-950/90 z-20">
                  <div className="w-16 h-16 rounded-full border-4 border-teal-500/30 border-t-teal-400 animate-spin mb-4" />
                  <div className="text-teal-400 font-mono text-xs uppercase tracking-wider mb-1">
                    AI Vision Analysis in Progress
                  </div>
                  <h4 className="text-base font-semibold text-white">
                    {SCAN_STAGES[currentStageIdx]?.label}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm">
                    {SCAN_STAGES[currentStageIdx]?.detail}
                  </p>
                  {/* Scanning beam line */}
                  <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-teal-400/0 via-teal-400 to-teal-400/0 shadow-[0_0_15px_#2dd4bf] animate-bounce" />
                </div>
              ) : null}

              {/* Displayed Image */}
              {currentAnalysis ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={currentAnalysis.imageUrl}
                    alt={currentAnalysis.imageName}
                    className="w-full h-full object-contain"
                  />

                  {/* Heatmap Simulation Filter Overlay */}
                  {viewMode === 'heatmap' && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-rose-600/30 via-transparent to-amber-500/20 mix-blend-color-dodge pointer-events-none" />
                  )}

                  {/* Bounding Box Overlays */}
                  {viewMode === 'boxes' &&
                    currentAnalysis.boundingBoxes.map((box, idx) => {
                      const isSelected = selectedBox?.label === box.label;
                      const isSuspicious = box.severity === 'suspicious';
                      const isObservation = box.severity === 'observation';

                      return (
                        <div
                          key={idx}
                          onClick={() => setSelectedBox(box)}
                          style={{
                            left: `${box.x}%`,
                            top: `${box.y}%`,
                            width: `${box.width}%`,
                            height: `${box.height}%`,
                          }}
                          className={`absolute cursor-pointer transition-all border-2 rounded-md ${
                            isSuspicious
                              ? 'border-rose-500 bg-rose-500/15'
                              : isObservation
                              ? 'border-amber-500 bg-amber-500/15'
                              : 'border-emerald-500 bg-emerald-500/15'
                          } ${isSelected ? 'ring-2 ring-white scale-102 z-10' : 'opacity-85 hover:opacity-100'}`}
                        >
                          <div
                            className={`absolute -top-6 left-0 text-[10px] font-mono px-1.5 py-0.5 rounded whitespace-nowrap shadow-xs ${
                              isSuspicious
                                ? 'bg-rose-600 text-white'
                                : isObservation
                                ? 'bg-amber-600 text-white'
                                : 'bg-emerald-600 text-white'
                            }`}
                          >
                            {box.label.split(':')[0]} ({box.confidence}%)
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-6 text-slate-400">
                  <Upload className="w-10 h-10 mb-2 opacity-50" />
                  <p className="text-sm font-medium">Drag & drop an intraoral photo here</p>
                  <p className="text-xs text-slate-500 mt-1">or choose a sample scenario from above</p>
                </div>
              )}
            </div>

            {/* Drag & Drop Hint */}
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-teal-600" />
                <span>Click any highlighted region on the image to inspect specific clinical notes</span>
              </span>
              <span className="font-mono">{currentAnalysis?.imageName || 'Sample Image'}</span>
            </div>
          </div>

          {/* Right Column: AI Observations & Clinical Synthesis */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-6">
            {currentAnalysis ? (
              <>
                {/* Confidence & Urgency Header */}
                <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <span className="text-xs uppercase font-mono tracking-wider text-slate-500">
                      Overall Model Confidence
                    </span>
                    <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                      {currentAnalysis.confidenceOverall}%
                    </div>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      currentAnalysis.urgency === 'prompt_evaluation'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-200 border border-rose-300 dark:border-rose-800'
                        : currentAnalysis.urgency === 'monitor'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-200 border border-amber-300 dark:border-amber-800'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800'
                    }`}
                  >
                    {currentAnalysis.urgency === 'prompt_evaluation' && 'Prompt Evaluation Advised'}
                    {currentAnalysis.urgency === 'monitor' && '14-Day Surveillance'}
                    {currentAnalysis.urgency === 'routine' && 'Routine Examination'}
                  </span>
                </div>

                {/* Primary Observation */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono mb-1.5">
                    Primary Morphological Observation
                  </h4>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                    {currentAnalysis.primaryObservation}
                  </p>
                </div>

                {/* Selected Region of Interest Details if clicked */}
                {selectedBox && (
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {selectedBox.label}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        Confidence: {selectedBox.confidence}%
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {selectedBox.notes}
                    </p>
                  </div>
                )}

                {/* Secondary Observations */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono mb-2">
                    Key Mucosal Findings
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {currentAnalysis.secondaryObservations.map((obs, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600 dark:bg-teal-400 mt-1.5 shrink-0" />
                        <span>{obs}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Colorimetric Metric Strip */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200 dark:border-slate-800 text-center">
                  <div className="p-2 bg-slate-50 dark:bg-slate-950 rounded-lg">
                    <span className="text-[10px] text-slate-400 uppercase font-mono">Erythema</span>
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 capitalize mt-0.5">
                      {currentAnalysis.colorimetry.erythemaLevel}
                    </div>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-950 rounded-lg">
                    <span className="text-[10px] text-slate-400 uppercase font-mono">Leukoplakia</span>
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 capitalize mt-0.5">
                      {currentAnalysis.colorimetry.leukoplakiaRisk}
                    </div>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-950 rounded-lg">
                    <span className="text-[10px] text-slate-400 uppercase font-mono">Symmetry</span>
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 font-mono mt-0.5">
                      {currentAnalysis.colorimetry.symmetryScore}%
                    </div>
                  </div>
                </div>

                {/* Clinical Recommendation */}
                <div className="p-3.5 bg-teal-50/70 dark:bg-teal-950/40 rounded-xl border border-teal-200 dark:border-teal-900/60 text-xs text-teal-900 dark:text-teal-200 space-y-1">
                  <strong className="block font-semibold">Recommended Clinical Action:</strong>
                  <p>{currentAnalysis.clinicalRecommendation}</p>
                </div>

                {/* Proceed button if callback provided */}
                {onProceedToDashboard && (
                  <button
                    onClick={onProceedToDashboard}
                    className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 rounded-xl shadow-xs transition-colors"
                  >
                    Incorporate Into Full Screening Summary
                  </button>
                )}
              </>
            ) : null}
          </div>
        </div>

        {/* Responsible Medical Disclaimer Notice */}
        <div className="mt-8 p-4 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-3 text-xs text-slate-600 dark:text-slate-400">
          <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-800 dark:text-slate-200 font-semibold">Important Diagnostic Safeguard:</strong> This AI computer vision preview is designed strictly for preliminary triage and patient education. It does not replace a physical examination with clinical palpation, vital dye staining, or scalpel biopsy performed by an oral surgeon or licensed dentist.
          </p>
        </div>
      </div>
    </div>
  );
};
