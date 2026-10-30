# OralGuard · AI-Assisted Oral Cancer Screening & Education Platform

OralGuard is an evidence-based clinical risk screening, computer vision simulation, and patient education web application designed to reduce diagnostic delay in oral and oropharyngeal cancers.

---

## 🌟 Core Features

1. **Structured Risk Stratification Questionnaire**
   - Multi-step questionnaire covering demographics, detailed tobacco modalities (cigarettes, vaping, chewing tobacco, gutkha, paan), alcohol consumption, clinical symptoms, and medical history.
   - Evidence-based scoring engine calibrated against National Institute of Dental & Craniofacial Research (NIDCR) and American Dental Association (ADA) oncological metrics.
   - Explicit **Low**, **Moderate**, and **High** risk categorization with detailed risk driver breakdown and recommended clinical action timeframes.

2. **Intraoral Photo Screening & Computer Vision Simulation**
   - Camera capture or photo upload of intraoral lesions (lateral tongue, floor of mouth, cheek mucosa).
   - Multi-stage simulated scanning pipeline: Illumination calibration, tissue architecture segmentation, chromatic & erythema heatmapping, and morphological risk synthesis.
   - Interactive image canvas with toggleable views: **Regions of Interest (ROI) with bounding boxes**, **Erythema Heatmap**, and **Raw Image**.
   - Preset clinical scenarios (Lateral Tongue Leukoplakia, Sublingual Erythroplakia Erosion, Benign Aphthous Ulcer, and Healthy Buccal Mucosa) for instant exploration without requiring a live patient photo.

3. **Interactive Oral Cavity Inspection Map**
   - Clickable anatomical model displaying primary inspection zones: Lateral Tongue, Floor of Mouth, Buccal Mucosa, Soft Palate, Gums, and Lower Lip.
   - Site-specific cancer incidence statistics, examination techniques, and warning signs.

4. **Actionable Clinical Results Dashboard**
   - Unified risk gauge and score calculation.
   - High-priority clinical alerts banner (e.g. sores lasting >14 days, induration, velvety red lesions).
   - One-click clinical referral report generation (print-optimized vector PDF with physician signature fields) and text export.

5. **Specialist & Surgeon Finder**
   - Locator for board-certified Oral & Maxillofacial Surgeons, Oral Medicine Specialists/Pathologists, and Preventive General Dentists.
   - Simulated appointment booking modal with triage referral summary attachment.

6. **Patient Education Hub**
   - **The 2-Minute Oral Self-Exam Guide**: Interactive 6-step protocol with timed visual instructions.
   - **Tobacco + Alcohol Synergy Calculator**: Demonstrates the exponential molecular multiplier effect of dual carcinogen exposure.
   - In-depth oncological guides and emergency red-flag checklists.

7. **Local Privacy & Longitudinal Screening Log**
   - 100% client-side privacy — zero protected health information (PHI) transmitted to remote tracking servers.
   - LocalStorage history log with JSON export and trend tracking.
   - Recurring monthly self-check calendar reminder generator (`.ics` download for Apple Calendar, Google Calendar, Outlook).

---

## 🚀 Quickstart & Setup

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/oralguard.git
cd oralguard

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 with dark mode variant
- **Typography**: Plus Jakarta Sans (UI) & JetBrains Mono (Data & Telemetry)
- **Icons**: Lucide React
- **Animations & Micro-interactions**: Tailwind transitions & Canvas-driven computer vision simulations

---

## ⚕️ Responsible Medical Disclaimer
OralGuard is an educational risk assessment and screening support tool. It does not provide medical diagnosis or replace a comprehensive oral cancer examination by a licensed dental professional or oral maxillofacial pathologist. Any oral lesion persisting beyond 14 days warrants professional histological evaluation.
