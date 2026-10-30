import React, { useState } from 'react';
import { ANATOMICAL_ZONES, AnatomicalZone } from '../data/educationData';
import { CheckCircle2, AlertCircle, Info, Eye } from 'lucide-react';

export const OralCavityInteractiveExplorer: React.FC = () => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('lateral-tongue');

  const selectedZone = ANATOMICAL_ZONES.find((z) => z.id === selectedZoneId) || ANATOMICAL_ZONES[0];

  return (
    <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-2 font-mono">
            Interactive Anatomy & High-Risk Zones
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Explore the Oral Cavity Inspection Map
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
            Oral cancer does not occur randomly. Over 65% of all intraoral malignancies originate in two specific regions: the lateral borders of the tongue and the floor of the mouth. Click each zone below to learn what to inspect.
          </p>
        </div>

        {/* 2-Column interactive layout: SVG Anatomy Map on Left, Detailed Clinical Panel on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Diagram */}
          <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-slate-500 uppercase font-mono">Select Inspection Site</span>
              <span className="text-xs text-teal-600 dark:text-teal-400 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>Click any button or region</span>
              </span>
            </div>

            {/* Anatomical stylized SVG diagram */}
            <div className="relative w-full max-w-[340px] aspect-[4/3] bg-slate-900 rounded-xl overflow-hidden shadow-inner flex items-center justify-center p-2">
              <svg viewBox="0 0 400 300" className="w-full h-full select-none">
                {/* Background cavity outline */}
                <path
                  d="M 50,150 C 50,70 140,40 200,40 C 260,40 350,70 350,150 C 350,230 270,270 200,270 C 130,270 50,230 50,150 Z"
                  fill="#1e1520"
                  stroke="#332438"
                  strokeWidth="3"
                />

                {/* Soft Palate & Tonsillar Arch Zone */}
                <path
                  d="M 120,80 Q 200,55 280,80 Q 200,105 120,80 Z"
                  fill={selectedZoneId === 'palate-oropharynx' ? '#0d9488' : '#4a2436'}
                  stroke={selectedZoneId === 'palate-oropharynx' ? '#5eead4' : '#6b3250'}
                  strokeWidth="2"
                  className="cursor-pointer transition-all hover:opacity-90"
                  onClick={() => setSelectedZoneId('palate-oropharynx')}
                />

                {/* Cheek Mucosa (Buccal) Left & Right */}
                <path
                  d="M 65,110 Q 95,150 75,200 Q 55,160 65,110 Z"
                  fill={selectedZoneId === 'buccal-mucosa' ? '#0d9488' : '#572739'}
                  stroke={selectedZoneId === 'buccal-mucosa' ? '#5eead4' : '#77384f'}
                  strokeWidth="2"
                  className="cursor-pointer transition-all hover:opacity-90"
                  onClick={() => setSelectedZoneId('buccal-mucosa')}
                />
                <path
                  d="M 335,110 Q 305,150 325,200 Q 345,160 335,110 Z"
                  fill={selectedZoneId === 'buccal-mucosa' ? '#0d9488' : '#572739'}
                  stroke={selectedZoneId === 'buccal-mucosa' ? '#5eead4' : '#77384f'}
                  strokeWidth="2"
                  className="cursor-pointer transition-all hover:opacity-90"
                  onClick={() => setSelectedZoneId('buccal-mucosa')}
                />

                {/* Floor of the mouth horseshoe */}
                <path
                  d="M 110,210 Q 200,250 290,210 Q 200,230 110,210 Z"
                  fill={selectedZoneId === 'floor-of-mouth' ? '#0d9488' : '#612437'}
                  stroke={selectedZoneId === 'floor-of-mouth' ? '#5eead4' : '#88334d'}
                  strokeWidth="2"
                  className="cursor-pointer transition-all hover:opacity-90"
                  onClick={() => setSelectedZoneId('floor-of-mouth')}
                />

                {/* Tongue center dorsal body */}
                <path
                  d="M 130,120 C 130,95 270,95 270,120 C 275,185 240,215 200,215 C 160,215 125,185 130,120 Z"
                  fill="#c0566e"
                  stroke="#e27c95"
                  strokeWidth="1.5"
                />

                {/* Lateral Tongue Left & Right highlight stripes (Highest Risk) */}
                <path
                  d="M 130,120 C 125,150 140,195 160,210 C 150,190 142,150 145,120 Z"
                  fill={selectedZoneId === 'lateral-tongue' ? '#0d9488' : '#e11d48'}
                  stroke={selectedZoneId === 'lateral-tongue' ? '#5eead4' : '#fda4af'}
                  strokeWidth="2"
                  className="cursor-pointer transition-all hover:opacity-90 animate-pulse"
                  onClick={() => setSelectedZoneId('lateral-tongue')}
                />
                <path
                  d="M 270,120 C 275,150 260,195 240,210 C 250,190 258,150 255,120 Z"
                  fill={selectedZoneId === 'lateral-tongue' ? '#0d9488' : '#e11d48'}
                  stroke={selectedZoneId === 'lateral-tongue' ? '#5eead4' : '#fda4af'}
                  strokeWidth="2"
                  className="cursor-pointer transition-all hover:opacity-90 animate-pulse"
                  onClick={() => setSelectedZoneId('lateral-tongue')}
                />

                {/* Lower Lip Border */}
                <path
                  d="M 120,245 Q 200,265 280,245"
                  stroke={selectedZoneId === 'lower-lip' ? '#0d9488' : '#f43f5e'}
                  strokeWidth={selectedZoneId === 'lower-lip' ? '8' : '5'}
                  strokeLinecap="round"
                  fill="none"
                  className="cursor-pointer transition-all hover:opacity-90"
                  onClick={() => setSelectedZoneId('lower-lip')}
                />

                {/* Interactive Hotspot Indicators */}
                <circle cx="140" cy="165" r="5" fill="#ffffff" className="pointer-events-none" />
                <circle cx="200" cy="225" r="5" fill="#ffffff" className="pointer-events-none" />
                <circle cx="200" cy="75" r="5" fill="#ffffff" className="pointer-events-none" />
                <circle cx="75" cy="155" r="5" fill="#ffffff" className="pointer-events-none" />
              </svg>
            </div>

            {/* Quick zone selector tabs */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
              {ANATOMICAL_ZONES.map((zone) => {
                const isSelected = selectedZoneId === zone.id;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZoneId(zone.id)}
                    className={`px-2.5 py-1.5 text-xs rounded-lg font-medium text-left transition-all ${
                      isSelected
                        ? 'bg-teal-600 text-white shadow-xs font-semibold'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {zone.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Zone Clinical Profile */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono font-medium text-teal-600 dark:text-teal-400">
                  {selectedZone.medicalName}
                </span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                    selectedZone.riskWeight === 'High'
                      ? 'bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900'
                      : 'bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900'
                  }`}
                >
                  Risk Level: {selectedZone.riskWeight} ({selectedZone.cancerIncidence})
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {selectedZone.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                {selectedZone.description}
              </p>
            </div>

            {/* How to inspect this site */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
                <Info className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>How to Inspect This Area</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-normal">
                {selectedZone.examinationTechnique}
              </p>
            </div>

            {/* Warning Signs to Look For */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono mb-2.5 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-500" />
                <span>Specific Warning Signs</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedZone.warningSigns.map((sign, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Normal Healthy Appearance baseline */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-500 dark:text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-700 dark:text-slate-300 font-medium">Healthy Baseline: </strong>
                <span>{selectedZone.normalAppearance}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
