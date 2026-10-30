import { EducationalGuide } from '../types';

export interface AnatomicalZone {
  id: string;
  name: string;
  medicalName: string;
  cancerIncidence: string;
  riskWeight: 'High' | 'Moderate' | 'Low';
  description: string;
  examinationTechnique: string;
  warningSigns: string[];
  normalAppearance: string;
}

export const ANATOMICAL_ZONES: AnatomicalZone[] = [
  {
    id: 'lateral-tongue',
    name: 'Lateral Tongue Borders',
    medicalName: 'Margines Laterales Linguae',
    cancerIncidence: '35% - 40% of all oral SCC cases',
    riskWeight: 'High',
    description: 'The sides of the tongue are the most frequent site for oral squamous cell carcinoma due to pooled saliva, carcinogen concentration, and friction.',
    examinationTechnique: 'Extend tongue forward, grasp the tip with a dry gauze/tissue, and gently pull to the left and right to inspect the posterolateral borders all the way to the tonsillar pillar.',
    warningSigns: [
      'Firm white patch (leukoplakia) that does not wipe off',
      'Velvety red area (erythroplakia) with or without pain',
      'Painless ulcer with elevated or rolled borders lasting > 14 days',
      'Localized firmness or induration under normal-looking surface',
    ],
    normalAppearance: 'Smooth, moist pink mucosa with small foliate papillae (vertical folds) at the posterior base.',
  },
  {
    id: 'floor-of-mouth',
    name: 'Floor of the Mouth & Under Tongue',
    medicalName: 'Venter Linguae & Cavum Sublinguale',
    cancerIncidence: '25% - 30% of oral squamous carcinomas',
    riskWeight: 'High',
    description: 'The horseshoe-shaped area beneath the tongue possesses thin, non-keratinized epithelium that readily absorbs tobacco nitrosamines and alcohol carcinogens.',
    examinationTechnique: 'Touch the tip of the tongue to the roof of your mouth. In good lighting, inspect the sublingual glands, frenulum, and lingual sulcus on both sides.',
    warningSigns: [
      'Red velvety patch (erythroplakia)',
      'Asymmetric hard knot or lump beneath salivary tissue',
      'Sublingual ulcer that bleeds on slight touch',
      'Restricted tongue mobility or tethering to floor of mouth (ankyloglossia)',
    ],
    normalAppearance: 'Thin, translucent pink mucosa with visible blue lingual veins and bilateral sublingual salivary folds.',
  },
  {
    id: 'buccal-mucosa',
    name: 'Cheek Lining (Buccal Mucosa)',
    medicalName: 'Mucosa Buccalis',
    cancerIncidence: '10% - 15% of cases (higher in betel/chew users)',
    riskWeight: 'Moderate',
    description: 'The inside lining of the cheeks from the corner of the lips to the back molars. High risk in users of smokeless tobacco, gutkha, or snuff.',
    examinationTechnique: 'Use your fingers or a clean spoon handle to gently pull the cheek outward. Inspect from the anterior commissure back to the wisdom tooth region.',
    warningSigns: [
      'Rough, corrugated white plaques (tobacco pouch keratosis)',
      'Loss of elasticity or fibrous banding preventing wide mouth opening (OSMF)',
      'Persistent cratered ulceration near molar bite lines',
      'Unexplained dark pigmentation or speckled red-white lesions',
    ],
    normalAppearance: 'Even coral pink, smooth and pliable, with the parotid Stensen duct papilla visible opposite upper second molars.',
  },
  {
    id: 'palate-oropharynx',
    name: 'Soft Palate & Tonsillar Pillars',
    medicalName: 'Palatum Molle & Isthmus Faucium',
    cancerIncidence: '15% - 20% (increasingly HPV-16 related)',
    riskWeight: 'High',
    description: 'The back roof of the mouth and the throat arches. Oropharyngeal cancers here are strongly associated with Human Papillomavirus (HPV-16/18).',
    examinationTechnique: 'Tilt head back, open wide, depress tongue gently, and say "Ahhh". Inspect the uvula, tonsillar pillars, and soft palate arch.',
    warningSigns: [
      'Unilateral enlargement of one tonsil without acute infection',
      'Persistent dull sore throat or foreign-body swallowing sensation',
      'Unilateral referred ear pain (otalgia) with no ear infection',
      'Red patch or lump on the soft palate arch',
    ],
    normalAppearance: 'Symmetric arched mucosal folds, lighter pink than anterior mouth, with symmetric soft palate elevation when phonating.',
  },
  {
    id: 'gums-alveolar',
    name: 'Gums & Alveolar Ridge',
    medicalName: 'Gingiva & Processus Alveolaris',
    cancerIncidence: '5% - 10% of cases',
    riskWeight: 'Moderate',
    description: 'The firm mucosal tissue surrounding the teeth and tooth-supporting bone.',
    examinationTechnique: 'Pull upper and lower lips away to visually check anterior and posterior gums, both on the facial and lingual/palatal sides.',
    warningSigns: [
      'Painless ulcer or red growth mimicking common gum disease (epulis)',
      'Unexplained loosening of adjacent teeth with bone loss on X-ray',
      'Extraction socket that fails to heal after tooth removal',
      'Persistent bleeding spot refractory to regular flossing',
    ],
    normalAppearance: 'Pale pink, stippled ("orange-peel" texture), knife-edged gingival margins hugging teeth tightly.',
  },
  {
    id: 'lower-lip',
    name: 'Lower Lip Vermilion Border',
    medicalName: 'Labium Inferius',
    cancerIncidence: '5% - 8% of cases (primarily UV related)',
    riskWeight: 'Moderate',
    description: 'The junction between the outer skin and intraoral mucosa. Chronic ultraviolet solar radiation is the primary driver.',
    examinationTechnique: 'Look closely at the lip border in a mirror; palpate between thumb and index finger for nodules or loss of crisp vermilion border.',
    warningSigns: [
      'Crusted, dry scaly lesion (actinic cheilitis) that bleeds and fails to heal',
      'Indurated nodule or ulcer with raised border',
      'Blurring of the sharp white line separating skin from lip',
    ],
    normalAppearance: 'Hydrated, continuous crisp vermilion border without flaking or firm nodules.',
  },
];

export const SELF_EXAM_STEPS = [
  {
    step: 1,
    title: 'Visual Check of Lips & Face',
    duration: '20 seconds',
    instruction: 'Look closely in a mirror under bright natural or LED light. Inspect outer lips, lip corners, and the front teeth margins.',
    checkPoints: ['Look for persistent dry, peeling cracks or sores', 'Check for color differences between upper and lower lip', 'Look for any asymmetric swelling in the lower face'],
  },
  {
    step: 2,
    title: 'Feel & Look Inside Upper & Lower Lips',
    duration: '20 seconds',
    instruction: 'Gently pull your lower lip down and look inside at the pink gum and mucosal trough. Do the same by lifting your upper lip.',
    checkPoints: ['Check for red or white patches', 'Use your index finger and thumb to gently roll the lip tissue to feel for lumps or thickening', 'Ensure tissue feels soft and pliable'],
  },
  {
    step: 3,
    title: 'Examine Inside Cheeks (Buccal Mucosa)',
    duration: '25 seconds',
    instruction: 'Using clean fingers or a clean spoon handle, pull your left cheek outward, then your right cheek.',
    checkPoints: ['Look for any red or white patches', 'Look along the line where your upper and lower teeth meet for rough spots or chew marks', 'Check for localized persistent ulcers or rough sandpaper texture'],
  },
  {
    step: 4,
    title: 'Grasp & Inspect Tongue Sides & Top',
    duration: '30 seconds',
    instruction: 'Stick your tongue out straight. Grasp the tip with a dry cloth or clean tissue. Gently move it to the right to see the left side, then to the left to see the right side.',
    checkPoints: ['Pay close attention to the side edges (highest risk zone)', 'Look for non-healing ulcers, firm white patches, or red velvety spots', 'Feel along the sides with your clean finger for hidden firm knots'],
  },
  {
    step: 5,
    title: 'Inspect Floor of Mouth & Roof of Mouth',
    duration: '15 seconds',
    instruction: 'Touch your tongue tip to the roof of your mouth. Check under your tongue and the floor of your mouth. Tilt head backward to view your palate.',
    checkPoints: ['Examine the floor beneath the tongue for unexplained redness or firm knots', 'Check the roof of your mouth for color asymmetry or rough bumps'],
  },
  {
    step: 6,
    title: 'Palpate Neck & Jaw Lymph Nodes',
    duration: '20 seconds',
    instruction: 'Use the pads of your fingers to gently press along both sides of your neck, beneath your jawline, and under your chin.',
    checkPoints: ['Feel for firm, non-tender, fixed bumps or enlarged lymph nodes', 'Check for asymmetry where one side feels distinctly larger than the other'],
  },
];

export const EDUCATIONAL_GUIDES: EducationalGuide[] = [
  {
    id: 'early-signs-guide',
    title: 'The 5 Critical Warning Signs of Oral Cancer',
    subtitle: 'Understanding high-risk mucosal changes before they advance',
    category: 'Signs',
    readTime: '3 min read',
    summary: 'Oral cancer is over 80% curable when discovered early. Learn the subtle physical changes that require professional evaluation.',
    content: [
      '1. Persistent Ulceration: Any intraoral sore, aphthous-like lesion, or erosion that does not heal completely within 14 days is the #1 classic clinical indicator.',
      '2. Erythroplakia (Velvety Red Patches): Smooth or granular intense red patches on oral mucosa. Unlike harmless inflammation, erythroplakia carries a 75% to 90% rate of severe dysplasia or malignancy upon biopsy.',
      '3. Leukoplakia (Adherent White Patches): Thickened white plaques that cannot be scraped off with a gauze. Homogeneous vs. speckled leukoplakia carry varying degrees of neoplastic potential.',
      '4. Induration & Submucosal Hardness: Cancerous lesions grow with infiltrative margins, creating a firm, indurated feel upon palpation, often described as feeling like an embedded frozen pea or pencil eraser.',
      '5. Regional Lymphadenopathy: A painless, firm, or non-tender swelling in the upper neck or submandibular triangle, frequently present before intraoral oropharyngeal lesions become symptomatic.',
    ],
    keyTakeaway: 'The golden rule: If any sore, lump, or discolored patch in your mouth lasts longer than 2 weeks, see an oral surgeon or dentist immediately.',
    checklist: [
      'Does the spot last > 14 days?',
      'Is it velvety red or persistent white?',
      'Does it feel firm or hard to the touch?',
      'Has it grown or bled without injury?',
    ],
  },
  {
    id: 'risk-factors-guide',
    title: 'Risk Factors: Lifestyle, Genetics & HPV',
    subtitle: 'The molecular synergy between tobacco, alcohol, and oncogenic viruses',
    category: 'Risk Factors',
    readTime: '4 min read',
    summary: 'Discover how combined exposures exponentially elevate cellular mutation risks and practical protective steps.',
    content: [
      'Tobacco in all forms is the greatest preventable cause of oral cancer. Cigarettes, cigars, pipes, and smokeless chewing tobacco (gutkha, khaini, snuff) release tobacco-specific nitrosamines (TSNAs) that directly adduct to epithelial DNA.',
      'Alcohol Synergism: While moderate alcohol alone carries modest risk, consuming alcohol together with tobacco produces a lethal multiplier. Ethanol acts as a lipid-dissolving solvent that breaks down the protective epithelial barrier, allowing carcinogens in tobacco to penetrate deep into basal stem cells.',
      'Human Papillomavirus (HPV-16 & 18): High-risk HPV strains are responsible for a dramatic surge in base-of-tongue and tonsillar oropharyngeal cancers, particularly in younger, non-smoking adults. HPV oncoproteins E6 and E7 inactivate p53 and Rb tumor suppressor genes.',
      'Dietary & Mechanical Factors: Diets low in cruciferous vegetables, chronic trauma from jagged teeth or ill-fitting dentures, and excessive UV sunlight on the lips also contribute.',
    ],
    keyTakeaway: 'Quitting tobacco and moderating alcohol produces measurable mucosal recovery within 1-5 years, drastically lowering your cancer trajectory.',
  },
  {
    id: 'when-to-seek-help',
    title: 'Clinical Triage: When to Seek Immediate Care',
    subtitle: 'Distinguishing benign canker sores from urgent oncological referrals',
    category: 'Action Guide',
    readTime: '2 min read',
    summary: 'A clear guide on who to call, what to ask for, and what to expect during a professional biopsy or tissue examination.',
    content: [
      'Do NOT wait for pain. Early oral squamous cell carcinoma is notoriously painless. Discomfort often only arises once a tumor has invaded deeper musculature or nerve sheaths.',
      'Who to consult: Schedule an appointment with an Oral & Maxillofacial Surgeon, an Oral Medicine Pathologist, or an experienced General Dentist.',
      'What to request: Ask explicitly for a "Comprehensive soft-tissue oral cancer screening and vital tissue examination." If a suspicious lesion has been present for >14 days, request a diagnostic scalpel or brush biopsy.',
      'What NOT to do: Do not apply silver nitrate, hydrogen peroxide rinses, or burn the tissue with over-the-counter creams, as this alters tissue architecture and delays definitive histology.',
    ],
    keyTakeaway: 'Biopsy is a simple, quick 10-minute in-office procedure that provides definitive peace of mind. Never delay out of fear.',
  },
];
