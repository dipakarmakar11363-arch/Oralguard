/**
 * Core type definitions for OralGuard application
 */

export type RiskLevel = 'Low' | 'Moderate' | 'High';

export interface QuestionnaireAnswers {
  // Step 1: Demographics & Lifestyle
  ageGroup: string; // '<30', '30-44', '45-59', '60+'
  gender: string;
  tobaccoUse: 'never' | 'former' | 'cigarette_light' | 'cigarette_heavy' | 'chewing_gutkha_snuff' | 'vape_only';
  tobaccoYears?: number;
  alcoholIntake: 'none' | 'light' | 'moderate' | 'heavy'; // heavy = 3+ drinks/day
  
  // Step 2: Symptoms & Oral Signs
  hasPersistentUlcer: boolean; // ulcer > 14 days
  ulcerDurationDays?: number;
  hasPatches: boolean; // white or red patches
  patchType?: 'white' | 'red' | 'mixed_speckled' | 'none';
  hasLumpOrThickening: boolean; // lump in cheek, tongue, neck, jaw
  hasSwallowingDifficulty: boolean; // dysphagia or chronic foreign body sensation
  hasUnexplainedBleeding: boolean;
  hasNumbnessOrPain: boolean; // numbness in mouth or unilateral ear/throat pain
  hasLooseTeeth: boolean; // loose teeth without periodontal disease
  
  // Step 3: Health History & Preventive habits
  hpvVaccinated: 'yes' | 'no' | 'unknown';
  familyOralCancer: boolean;
  sunLipExposure: 'low' | 'moderate' | 'high';
  dentalVisitFrequency: 'regular_6mo' | 'yearly' | 'rarely' | 'never';
  brushFlossHabit: 'daily' | 'irregular';
}

export interface RiskFactorItem {
  title: string;
  category: 'Lifestyle' | 'Symptom' | 'History';
  severity: 'low' | 'medium' | 'high' | 'critical';
  impactDescription: string;
}

export interface RiskAssessmentResult {
  score: number; // 0 - 100
  level: RiskLevel;
  headline: string;
  summary: string;
  keyFactors: RiskFactorItem[];
  urgentFlags: string[];
  recommendations: string[];
  recommendedActionWindow: string; // e.g. "Within 1-3 days", "Within 2-3 weeks", "Next routine checkup (6 months)"
  answers: QuestionnaireAnswers;
}

export interface BoundingBox {
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  width: number; // percentage
  height: number; // percentage
  label: string;
  confidence: number;
  severity: 'benign' | 'observation' | 'suspicious';
  notes: string;
}

export interface PhotoAnalysisResult {
  imageUrl: string;
  imageName: string;
  timestamp: string;
  confidenceOverall: number;
  primaryObservation: string;
  secondaryObservations: string[];
  boundingBoxes: BoundingBox[];
  tissueTypeDetected: string;
  colorimetry: {
    erythemaLevel: 'normal' | 'slight' | 'elevated' | 'severe';
    leukoplakiaRisk: 'none' | 'possible' | 'prominent';
    symmetryScore: number; // 0 - 100
  };
  clinicalRecommendation: string;
  urgency: 'routine' | 'monitor' | 'prompt_evaluation';
}

export interface ScreeningRecord {
  id: string;
  createdAt: string;
  riskResult: RiskAssessmentResult;
  photoAnalysis?: PhotoAnalysisResult;
  userNotes?: string;
  status: 'Completed' | 'Pending Review' | 'Follow-up Needed';
}

export interface Specialist {
  id: string;
  name: string;
  credentials: string;
  specialty: 'Oral & Maxillofacial Surgeon' | 'Oral Medicine & Pathologist' | 'General Dentist' | 'Head & Neck Oncologist';
  clinic: string;
  address: string;
  city: string;
  distanceMiles: number;
  rating: number;
  reviewCount: number;
  phone: string;
  availability: string;
  acceptsReferrals: boolean;
  insuranceAccepted: string[];
}

export interface EducationalGuide {
  id: string;
  title: string;
  subtitle: string;
  category: 'Signs' | 'Self-Exam' | 'Risk Factors' | 'Action Guide';
  readTime: string;
  summary: string;
  content: string[];
  keyTakeaway: string;
  checklist?: string[];
}
