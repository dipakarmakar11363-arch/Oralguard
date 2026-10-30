import React from 'react';
import { Shield, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenEmergency: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenEmergency }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand & Purpose */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500 text-white flex items-center justify-center font-bold">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">OralGuard</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              An evidence-based digital health screening initiative dedicated to reducing the diagnostic delay in oral and oropharyngeal squamous cell carcinomas through patient education and early specialist referral.
            </p>
            <div className="text-xs text-teal-400 flex items-center gap-1 font-mono">
              <span>● Client-Side Confidential · No Sensitive PHI Transmitted</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <span className="font-semibold text-white uppercase font-mono tracking-wider block mb-2">
              OralGuard Tools
            </span>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onNavigate('assessment')}
                  className="hover:text-white transition-colors"
                >
                  Risk Assessment Questionnaire
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('photo-ai')}
                  className="hover:text-white transition-colors"
                >
                  Intraoral Photo Vision AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('specialists')}
                  className="hover:text-white transition-colors"
                >
                  Specialist & Surgeon Finder
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('education')}
                  className="hover:text-white transition-colors"
                >
                  2-Minute Self-Exam Guide
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenEmergency}
                  className="text-rose-400 hover:text-rose-300 transition-colors font-medium"
                >
                  Emergency Red-Flag Symptoms
                </button>
              </li>
            </ul>
          </div>

          {/* Clinical Resources & References */}
          <div className="md:col-span-4 space-y-2 text-xs">
            <span className="font-semibold text-white uppercase font-mono tracking-wider block mb-2">
              Clinical References & Support
            </span>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <a
                  href="https://www.cancer.gov/types/head-and-neck"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-400 flex items-center gap-1 transition-colors"
                >
                  <span>National Cancer Institute (NCI)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.ada.org/resources/research/science-and-research-institute/oral-health-topics/cancer-head-and-neck"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-400 flex items-center gap-1 transition-colors"
                >
                  <span>American Dental Association (ADA) Guidelines</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://oralcancerfoundation.org"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-400 flex items-center gap-1 transition-colors"
                >
                  <span>Oral Cancer Foundation (OCF)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.nidcr.nih.gov/health-info/oral-cancer"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-400 flex items-center gap-1 transition-colors"
                >
                  <span>National Institute of Dental & Craniofacial Research (NIDCR)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Responsible Medical Disclaimer */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 leading-relaxed space-y-1">
          <strong className="block text-slate-200 uppercase font-mono tracking-wider">
            Medical Disclaimer & Limitation of Liability:
          </strong>
          <p>
            OralGuard is an informational screening and patient education application designed to promote self-awareness and timely dental checkups. It is not an FDA-cleared diagnostic device and does NOT provide a definitive diagnosis of oral dysplasia, squamous cell carcinoma, or other benign/malignant conditions. Screening algorithms and simulated computer vision observations cannot replace an in-person clinical oral examination, palpation, and scalpel biopsy performed by a licensed dentist, oral and maxillofacial surgeon, or head and neck oncologist. If you have an oral lesion, sore, or swelling persisting longer than 14 days, consult a qualified healthcare provider immediately.
          </p>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-800 gap-2">
          <div>
            © {new Date().getFullYear()} OralGuard Health Technologies. Built for community health & early detection.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Designed with clinical care & precision</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
