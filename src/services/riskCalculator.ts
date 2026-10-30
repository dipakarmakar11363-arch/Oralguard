import { QuestionnaireAnswers, RiskAssessmentResult, RiskFactorItem, RiskLevel } from '../types';

export function calculateOralCancerRisk(answers: QuestionnaireAnswers): RiskAssessmentResult {
  let score = 5; // Base baseline population risk
  const keyFactors: RiskFactorItem[] = [];
  const urgentFlags: string[] = [];
  const recommendations: string[] = [];

  // 1. Age Factor
  if (answers.ageGroup === '60+') {
    score += 12;
    keyFactors.push({
      title: 'Age 60+',
      category: 'Lifestyle',
      severity: 'medium',
      impactDescription: 'Incidence of oral squamous cell carcinoma rises notably after age 50-60 due to cumulative cellular exposure.',
    });
  } else if (answers.ageGroup === '45-59') {
    score += 8;
  } else if (answers.ageGroup === '30-44') {
    score += 3;
  }

  // 2. Tobacco Use Factor
  if (answers.tobaccoUse === 'chewing_gutkha_snuff') {
    score += 32;
    keyFactors.push({
      title: 'Smokeless Tobacco / Betel Quid / Snuff',
      category: 'Lifestyle',
      severity: 'high',
      impactDescription: 'Direct mucosal contact with nitrosamines causes severe mechanical and chemical dysplasia (oral submucous fibrosis & leukoplakia).',
    });
  } else if (answers.tobaccoUse === 'cigarette_heavy') {
    score += 26;
    keyFactors.push({
      title: 'Heavy Cigarette/Cigar Smoking',
      category: 'Lifestyle',
      severity: 'high',
      impactDescription: 'Cigarette smoke contains over 70 established carcinogens that repeatedly damage the oral and mucosal epithelial lining.',
    });
  } else if (answers.tobaccoUse === 'cigarette_light') {
    score += 14;
    keyFactors.push({
      title: 'Active Smoking',
      category: 'Lifestyle',
      severity: 'medium',
      impactDescription: 'Regular smoking substantially increases mutagenic stress on intraoral tissues.',
    });
  } else if (answers.tobaccoUse === 'former') {
    score += 6;
  }

  // 3. Alcohol Factor & Synergy
  if (answers.alcoholIntake === 'heavy') {
    score += 18;
    keyFactors.push({
      title: 'Heavy Alcohol Consumption',
      category: 'Lifestyle',
      severity: 'high',
      impactDescription: 'Ethanol acts as an organic solvent, dehydrating mucosa and increasing mucosal permeability to carcinogens.',
    });

    // Synergistic Multiplier
    if (answers.tobaccoUse === 'cigarette_heavy' || answers.tobaccoUse === 'chewing_gutkha_snuff') {
      score += 15;
      keyFactors.push({
        title: 'Tobacco + Alcohol Synergy Effect',
        category: 'Lifestyle',
        severity: 'critical',
        impactDescription: 'Combined heavy tobacco and alcohol use acts multiplicatively rather than additively, amplifying oral cancer risk up to 30-fold.',
      });
    }
  } else if (answers.alcoholIntake === 'moderate') {
    score += 6;
  }

  // 4. Critical Clinical Symptoms
  if (answers.hasPersistentUlcer) {
    score += 35;
    urgentFlags.push('Non-healing intraoral ulcer lasting longer than 14 days');
    keyFactors.push({
      title: 'Non-Healing Ulcer (> 14 Days)',
      category: 'Symptom',
      severity: 'critical',
      impactDescription: 'Benign traumatic or aphthous ulcers typically re-epithelialize within 10-14 days. Any persistent ulcer demands urgent clinical evaluation.',
    });
  }

  if (answers.hasPatches) {
    if (answers.patchType === 'red' || answers.patchType === 'mixed_speckled') {
      score += 38;
      urgentFlags.push('Erythroplakia (red velvety) or speckled leukoerythroplakia patch detected');
      keyFactors.push({
        title: 'Erythroplakia / Speckled Mucosal Patch',
        category: 'Symptom',
        severity: 'critical',
        impactDescription: 'Erythroplakia exhibits histological dysplasia or carcinoma in situ in over 85% of biopsy cases.',
      });
    } else if (answers.patchType === 'white') {
      score += 22;
      urgentFlags.push('Persistent white plaque (leukoplakia) that cannot be rubbed off');
      keyFactors.push({
        title: 'Leukoplakia-like White Patch',
        category: 'Symptom',
        severity: 'high',
        impactDescription: 'Homogeneous leukoplakias carry a 5-15% transformation rate and require regular clinical surveillance.',
      });
    }
  }

  if (answers.hasLumpOrThickening) {
    score += 28;
    urgentFlags.push('Palpable painless mass, induration, or thickening in mouth or neck');
    keyFactors.push({
      title: 'Tissue Induration or Palpable Lump',
      category: 'Symptom',
      severity: 'high',
      impactDescription: 'Firmness on palpation (induration) is a hallmark clinical sign of submucosal invasion.',
    });
  }

  if (answers.hasSwallowingDifficulty) {
    score += 20;
    urgentFlags.push('Chronic dysphagia (difficulty swallowing) or persistent globus sensation');
    keyFactors.push({
      title: 'Difficulty Swallowing or Chronic Throat Pain',
      category: 'Symptom',
      severity: 'high',
      impactDescription: 'May indicate lesions in the base of tongue, tonsillar fossa, or hypopharynx.',
    });
  }

  if (answers.hasNumbnessOrPain) {
    score += 15;
    urgentFlags.push('Unexplained sensory numbness (paresthesia) or referred ear pain (otalgia)');
    keyFactors.push({
      title: 'Unexplained Numbness or Referred Otalgia',
      category: 'Symptom',
      severity: 'medium',
      impactDescription: 'Perineural involvement of the lingual or alveolar nerves can cause localized sensory deficits.',
    });
  }

  if (answers.hasLooseTeeth) {
    score += 12;
    keyFactors.push({
      title: 'Unexplained Loose Teeth',
      category: 'Symptom',
      severity: 'medium',
      impactDescription: 'Rapid alveolar bone resorption or unexplained tooth mobility without deep chronic periodontitis.',
    });
  }

  if (answers.hasUnexplainedBleeding) {
    score += 14;
    keyFactors.push({
      title: 'Spontaneous Mucosal Bleeding',
      category: 'Symptom',
      severity: 'medium',
      impactDescription: 'Friable dysplastic mucosal tissue bleeds readily upon minimal contact.',
    });
  }

  // 5. Health History
  if (answers.familyOralCancer) {
    score += 8;
    keyFactors.push({
      title: 'Family History of Head & Neck Cancer',
      category: 'History',
      severity: 'medium',
      impactDescription: 'Genetic polymorphisms in DNA repair enzymes may slightly raise individual susceptibility.',
    });
  }

  if (answers.dentalVisitFrequency === 'never' || answers.dentalVisitFrequency === 'rarely') {
    score += 6;
  }

  // Cap score between 0 and 100
  score = Math.min(100, Math.max(5, score));

  // Determine Categorization
  let level: RiskLevel = 'Low';
  let headline = 'Low Oral Cancer Risk';
  let summary = 'Your reported lifestyle factors and symptom profile indicate a low risk profile. Maintaining regular oral hygiene and routine dental checkups remains your best protection.';
  let recommendedActionWindow = 'Routine 6-Month Dental Examination';

  if (score >= 60 || urgentFlags.length >= 2 || (answers.hasPersistentUlcer && answers.hasPatches)) {
    level = 'High';
    headline = 'Elevated Risk Profile — Prompt Clinical Examination Advised';
    summary = 'You have reported high-priority warning signs or compounding risk factors (such as persistent non-healing sores, abnormal mucosal patches, or high-risk tobacco habits). An in-person clinical oral examination and potential biopsy evaluation by an oral surgeon or dentist is strongly recommended.';
    recommendedActionWindow = 'Within 1 to 2 Weeks (Prompt Evaluation)';
    
    recommendations.push('Schedule an in-person diagnostic appointment with an Oral & Maxillofacial Surgeon or Dentist.');
    recommendations.push('Do NOT apply over-the-counter caustic ulcer ointments or scrapings onto abnormal patches.');
    recommendations.push('Monitor and document any changes with clear intraoral photos weekly.');
    if (answers.tobaccoUse !== 'never') {
      recommendations.push('Immediately cease tobacco and alcohol consumption to arrest mucosal irritation.');
    }
    recommendations.push('Request a vital tissue staining (toluidine blue / autofluorescence) or scalpel biopsy if the lesion persists.');
  } else if (score >= 28 || urgentFlags.length === 1) {
    level = 'Moderate';
    headline = 'Moderate Risk Profile — Vigilance & Follow-Up Recommended';
    summary = 'While you do not exhibit all classic high-risk indicators, you report specific lifestyle habits or mild symptoms that warrant deliberate professional surveillance and structured monthly self-checks.';
    recommendedActionWindow = 'Within 2 to 4 Weeks for Re-evaluation';

    recommendations.push('Book a comprehensive soft-tissue oral screening during your next dental visit.');
    recommendations.push('Re-check any irritated oral spots in 14 days. If not completely healed, seek specialist examination.');
    recommendations.push('Perform a monthly structured 2-minute oral self-exam following the OralGuard step-by-step guide.');
    if (answers.alcoholIntake === 'heavy' || answers.tobaccoUse !== 'never') {
      recommendations.push('Consider tobacco cessation programs and moderate alcohol intake to lower long-term tissue stress.');
    }
  } else {
    recommendations.push('Continue routine bi-annual dental visits with complete soft-tissue mucosal screening.');
    recommendations.push('Perform a monthly 2-minute oral self-examination checking your tongue, cheeks, and floor of mouth.');
    recommendations.push('Maintain a balanced diet rich in leafy green vegetables, citrus, and antioxidants.');
    recommendations.push('Use UV-blocking lip balm (SPF 30+) when outdoors to protect lip vermilion.');
  }

  return {
    score,
    level,
    headline,
    summary,
    keyFactors,
    urgentFlags,
    recommendations,
    recommendedActionWindow,
    answers,
  };
}
