import { PhotoAnalysisResult } from '../types';

export interface SampleCase {
  id: string;
  name: string;
  category: 'Normal' | 'Observation' | 'High Suspicion';
  description: string;
  thumbnailSvg: string;
  analysis: PhotoAnalysisResult;
}

// SVG data URI generators for clinical representations
function generateCaseSvg(type: 'leukoplakia' | 'erythroplakia' | 'healthy' | 'aphthous'): string {
  if (type === 'leukoplakia') {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <defs>
        <radialGradient id="tongueBg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="%23e87a90"/>
          <stop offset="70%" stop-color="%23d45d79"/>
          <stop offset="100%" stop-color="%23a03350"/>
        </radialGradient>
        <filter id="plaqueTexture">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
          <feColorMatrix type="matrix" values="1 0 0 0 0.95  0 1 0 0 0.95  0 0 1 0 0.95  0 0 0 0.85 0"/>
        </filter>
      </defs>
      <rect width="600" height="400" fill="%232b131b"/>
      <!-- Tongue surface -->
      <path d="M 50,220 C 120,110 320,100 520,160 C 580,240 540,360 380,380 C 200,400 80,320 50,220 Z" fill="url(%23tongueBg)"/>
      <!-- Foliate papillae folds -->
      <path d="M 460,190 Q 480,220 470,250" stroke="%239c2743" stroke-width="3" fill="none" opacity="0.6"/>
      <path d="M 480,200 Q 500,230 490,260" stroke="%239c2743" stroke-width="3" fill="none" opacity="0.6"/>
      <!-- Leukoplakia white plaque on lateral border -->
      <path d="M 390,190 C 440,180 475,205 460,250 C 430,270 380,255 375,225 C 370,205 380,195 390,190 Z" fill="%23f8fafc" opacity="0.94" stroke="%23e2e8f0" stroke-width="2"/>
      <path d="M 400,205 C 430,195 450,215 440,240 C 415,255 390,240 395,220 Z" fill="%23ffffff" opacity="0.7"/>
      <!-- Clinical text indicator -->
      <text x="30" y="45" fill="%23f1f5f9" font-family="monospace" font-size="14" font-weight="600">CLINICAL PRESET: LATERAL TONGUE LESION</text>
      <text x="30" y="70" fill="%23cbd5e1" font-family="sans-serif" font-size="12">Persistent adherent white patch (Leukoplakia candidate)</text>
    </svg>`;
  }

  if (type === 'erythroplakia') {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <defs>
        <radialGradient id="floorBg" cx="50%" cy="60%" r="65%">
          <stop offset="0%" stop-color="%23f497a9"/>
          <stop offset="60%" stop-color="%23e06680"/>
          <stop offset="100%" stop-color="%236e1c31"/>
        </radialGradient>
      </defs>
      <rect width="600" height="400" fill="%231e0b12"/>
      <!-- Sublingual floor of mouth -->
      <ellipse cx="300" cy="240" rx="250" ry="140" fill="url(%23floorBg)"/>
      <!-- Lingual frenulum -->
      <path d="M 300,120 L 300,260" stroke="%23e87a90" stroke-width="8" stroke-linecap="round"/>
      <!-- Lingual veins -->
      <path d="M 230,170 Q 210,210 190,240" stroke="%234338ca" stroke-width="3" fill="none" opacity="0.45"/>
      <path d="M 370,170 Q 390,210 410,240" stroke="%234338ca" stroke-width="3" fill="none" opacity="0.45"/>
      <!-- Erythroplakia fiery red velvety patch with slight ulceration -->
      <ellipse cx="230" cy="250" rx="42" ry="32" fill="%23be123c" opacity="0.95" stroke="%23881337" stroke-width="2"/>
      <ellipse cx="230" cy="250" rx="24" ry="18" fill="%239f1239"/>
      <circle cx="230" cy="250" r="10" fill="%23ffe4e6" opacity="0.85"/>
      <!-- Annotation text -->
      <text x="30" y="45" fill="%23f1f5f9" font-family="monospace" font-size="14" font-weight="600">CLINICAL PRESET: SUB-LINGUAL ERYTHROPLAKIA</text>
      <text x="30" y="70" fill="%23fda4af" font-family="sans-serif" font-size="12">Fiery red velvety patch with central mucosal erosion</text>
    </svg>`;
  }

  if (type === 'aphthous') {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <defs>
        <radialGradient id="labialBg" cx="45%" cy="50%" r="60%">
          <stop offset="0%" stop-color="%23f898ab"/>
          <stop offset="70%" stop-color="%23e26b84"/>
          <stop offset="100%" stop-color="%238a243e"/>
        </radialGradient>
      </defs>
      <rect width="600" height="400" fill="%231a0e13"/>
      <!-- Lower labial mucosa -->
      <ellipse cx="300" cy="230" rx="260" ry="130" fill="url(%23labialBg)"/>
      <!-- Teeth silhouette top -->
      <rect x="230" y="80" width="65" height="50" rx="8" fill="%23f8fafc" opacity="0.9"/>
      <rect x="305" y="80" width="65" height="50" rx="8" fill="%23f8fafc" opacity="0.9"/>
      <!-- Benign canker sore (aphthous ulcer) with sharp erythematous halo and grey fibrin base -->
      <ellipse cx="280" cy="250" rx="25" ry="20" fill="%23e11d48" opacity="0.85"/>
      <ellipse cx="280" cy="250" rx="17" ry="13" fill="%23fef08a" opacity="0.92"/>
      <ellipse cx="280" cy="250" rx="14" ry="10" fill="%23f3f4f6"/>
      <!-- Text -->
      <text x="30" y="45" fill="%23f1f5f9" font-family="monospace" font-size="14" font-weight="600">CLINICAL PRESET: BENIGN APHTHOUS ULCER</text>
      <text x="30" y="70" fill="%23cbd5e1" font-family="sans-serif" font-size="12">Circumscribed fibrin center with thin erythematous halo (5-day duration)</text>
    </svg>`;
  }

  // Healthy
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <defs>
      <radialGradient id="healthyBg" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="%23fca5b9"/>
        <stop offset="60%" stop-color="%23f47290"/>
        <stop offset="100%" stop-color="%239e2443"/>
      </radialGradient>
    </defs>
    <rect width="600" height="400" fill="%231a0b12"/>
    <ellipse cx="300" cy="210" rx="270" ry="140" fill="url(%23healthyBg)"/>
    <!-- Parotid Stensen papilla -->
    <circle cx="210" cy="180" r="6" fill="%23fb7185"/>
    <circle cx="210" cy="180" r="3" fill="%23be123c"/>
    <text x="30" y="45" fill="%23f1f5f9" font-family="monospace" font-size="14" font-weight="600">CLINICAL PRESET: HEALTHY BUCCAL MUCOSA</text>
    <text x="30" y="70" fill="%2334d399" font-family="sans-serif" font-size="12">Uniform pink coloration, normal vascularity, zero lesions</text>
  </svg>`;
}

export const SAMPLE_CASES: SampleCase[] = [
  {
    id: 'case-leukoplakia',
    name: 'Lateral Tongue White Plaque',
    category: 'High Suspicion',
    description: '48mm non-scrapable, homogeneous white plaque situated on the middle-third lateral tongue margin.',
    thumbnailSvg: generateCaseSvg('leukoplakia'),
    analysis: {
      imageUrl: generateCaseSvg('leukoplakia'),
      imageName: 'Preset_Lateral_Tongue_Plaque.svg',
      timestamp: new Date().toISOString(),
      confidenceOverall: 91,
      primaryObservation: 'Adherent, hyperkeratotic homogeneous white plaque with irregular demarcated margins consistent with clinical Leukoplakia.',
      secondaryObservations: [
        'Absence of acute erythematous satellite halo typical of fungal candidiasis.',
        'Lesion located in primary high-risk anatomical zone (lateral lingual margin).',
        'Surface exhibits mild corrugated/fissured architecture requiring histologic staging.',
      ],
      boundingBoxes: [
        {
          x: 62,
          y: 44,
          width: 22,
          height: 24,
          label: 'Region of Interest: Suspect Leukoplakia',
          confidence: 91,
          severity: 'suspicious',
          notes: 'Adherent white hyperkeratinization. Lesion cannot be mechanically wiped away.',
        },
        {
          x: 77,
          y: 48,
          width: 12,
          height: 18,
          label: 'Anatomical Anchor: Foliate Fold',
          confidence: 96,
          severity: 'benign',
          notes: 'Normal anatomical lingual foliate fold without neoplastic architecture.',
        },
      ],
      tissueTypeDetected: 'Non-keratinized stratified squamous epithelium (Lingual margin)',
      colorimetry: {
        erythemaLevel: 'slight',
        leukoplakiaRisk: 'prominent',
        symmetryScore: 42,
      },
      clinicalRecommendation: 'Schedule an expedited soft-tissue evaluation and scalpel biopsy with an Oral & Maxillofacial Surgeon or Oral Pathologist. Avoid caustic topical treatments.',
      urgency: 'prompt_evaluation',
    },
  },
  {
    id: 'case-erythroplakia',
    name: 'Floor of Mouth Erythematous Erosion',
    category: 'High Suspicion',
    description: 'Deep red velvety mucosal lesion with central micro-ulceration in the sublingual sulcus.',
    thumbnailSvg: generateCaseSvg('erythroplakia'),
    analysis: {
      imageUrl: generateCaseSvg('erythroplakia'),
      imageName: 'Preset_Sublingual_Erythroplakia.svg',
      timestamp: new Date().toISOString(),
      confidenceOverall: 94,
      primaryObservation: 'Circumscribed intense velvety red patch with shallow central epithelial erosion, highly suspicious for Erythroplakia or In-Situ Carcinoma.',
      secondaryObservations: [
        'High-risk anatomical floor-of-mouth region (thin vascularized bed).',
        'Asymmetric color density gradient with prominent local micro-vascular dilation.',
        'Central cratering indicates loss of full-thickness epithelial integrity.',
      ],
      boundingBoxes: [
        {
          x: 32,
          y: 54,
          width: 22,
          height: 20,
          label: 'Critical Region: Erythroplakia / Erosion',
          confidence: 94,
          severity: 'suspicious',
          notes: 'High histologic malignancy transformation rate (>80%). Urgent surgical consult indicated.',
        },
        {
          x: 48,
          y: 35,
          width: 8,
          height: 35,
          label: 'Anatomy: Lingual Frenulum',
          confidence: 98,
          severity: 'benign',
          notes: 'Normal midline sublingual attachment cord.',
        },
      ],
      tissueTypeDetected: 'Sublingual oral floor mucosa',
      colorimetry: {
        erythemaLevel: 'severe',
        leukoplakiaRisk: 'none',
        symmetryScore: 31,
      },
      clinicalRecommendation: 'Urgent priority referral to Head & Neck Oncology or Oral Maxillofacial Surgery within 7-10 days for diagnostic biopsy and lymph node assessment.',
      urgency: 'prompt_evaluation',
    },
  },
  {
    id: 'case-aphthous',
    name: 'Acute Labial Aphthous Ulcer',
    category: 'Observation',
    description: 'Minor canker sore on lower inner lip showing characteristic yellowish-gray fibrinous slough with red halo.',
    thumbnailSvg: generateCaseSvg('aphthous'),
    analysis: {
      imageUrl: generateCaseSvg('aphthous'),
      imageName: 'Preset_Benign_Aphthous_Ulcer.svg',
      timestamp: new Date().toISOString(),
      confidenceOverall: 88,
      primaryObservation: 'Circumscribed superficial ulceration with uniform circular borders and inflammatory halo, classic for Benign Minor Recurrent Aphthous Stomatitis.',
      secondaryObservations: [
        'Absence of rolled, everted, or indurated borders.',
        'Symmetric inflammatory erythema collar.',
        'Lesion typically resolves spontaneously within 7-10 days.',
      ],
      boundingBoxes: [
        {
          x: 42,
          y: 56,
          width: 14,
          height: 14,
          label: 'Benign Aphthous Ulceration',
          confidence: 88,
          severity: 'observation',
          notes: 'Superficial ulcer with erythematous halo. Re-evaluate in 10-14 days; if persistent, seek biopsy.',
        },
      ],
      tissueTypeDetected: 'Labial non-keratinized mucosa',
      colorimetry: {
        erythemaLevel: 'elevated',
        leukoplakiaRisk: 'none',
        symmetryScore: 78,
      },
      clinicalRecommendation: 'Supportive oral hygiene and symptomatic relief. If the ulcer fails to completely heal after 14 days, consult a dental professional to rule out atypical pathology.',
      urgency: 'monitor',
    },
  },
  {
    id: 'case-healthy',
    name: 'Normal Healthy Buccal Mucosa',
    category: 'Normal',
    description: 'Smooth, pink, vascularized inner cheek lining with normal anatomical landmarks.',
    thumbnailSvg: generateCaseSvg('healthy'),
    analysis: {
      imageUrl: generateCaseSvg('healthy'),
      imageName: 'Preset_Healthy_Buccal_Tissue.svg',
      timestamp: new Date().toISOString(),
      confidenceOverall: 97,
      primaryObservation: 'Uniform mucosal architecture with healthy vascular tone, absence of hyperkeratosis, ulceration, or suspicious pigment alterations.',
      secondaryObservations: [
        'Even color distribution across observed quadrant.',
        'No induration, plaque formation, or abnormal vascular friability.',
        'Normal anatomical parotid papilla present.',
      ],
      boundingBoxes: [
        {
          x: 32,
          y: 42,
          width: 10,
          height: 10,
          label: 'Normal: Parotid Duct Papilla',
          confidence: 97,
          severity: 'benign',
          notes: 'Normal salivary gland orifice (Stensen duct).',
        },
      ],
      tissueTypeDetected: 'Healthy buccal mucosal epithelium',
      colorimetry: {
        erythemaLevel: 'normal',
        leukoplakiaRisk: 'none',
        symmetryScore: 92,
      },
      clinicalRecommendation: 'Tissue appears healthy. Maintain regular bi-annual dental hygiene checkups and perform monthly 2-minute oral self-examinations.',
      urgency: 'routine',
    },
  },
];
