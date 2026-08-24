export type SocialCategory = 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';

export type InstituteType = 
  | 'Rural / Tier-3 Govt College (Priority +15%)' 
  | 'Tier-2 State Public University' 
  | 'Tier-1 Central / Premier Institute' 
  | 'Private Affiliated Institute';

export type IncomeBracket = 
  | 'Below ₹2.5 Lakhs/year (High Affirmative Weightage)' 
  | '₹2.5L - ₹5.0 Lakhs/year (Medium Priority)' 
  | '₹5.0L - ₹8.0 Lakhs/year' 
  | 'Above ₹8.0 Lakhs/year';

export interface StudentProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  gender: 'Female' | 'Male' | 'Other' | 'Prefer not to say';
  socialCategory: SocialCategory;
  annualIncome: IncomeBracket;
  state: string;
  district: string;
  isAspirationalDistrict: boolean;
  isFirstGeneration: boolean;
  instituteName: string;
  instituteType: InstituteType;
  degree: string;
  branch: string;
  cgpa: number;
  graduationYear: number;
  skills: string[];
  resumeFileName: string;
  resumeFileSize: string;
  resumeExtractSample: string;
  credibilityIndex: number; // 0-100 anti-fluff score
}

export interface ProcessingStage {
  id: number;
  name: string;
  description: string;
  techLabel: string;
  status: 'waiting' | 'active' | 'done';
  progress: number;
  logs: string[];
  metricLabel?: string;
  metricValue?: string;
  badge?: string;
}

export interface ScoreBreakdown {
  overallScore: number; // 0 - 100
  demographicScore: number; // max 25
  academicScore: number; // max 25
  skillMatchScore: number; // max 25
  authenticityScore: number; // max 25
  rankTier: 'Tier 1 - Direct Allocation Pool' | 'Tier 2 - High Affinity' | 'Tier 3 - Skill Bridging Recommended';
  percentileRank: number;
  affirmativeBonusPoints: number;
  topStrengths: string[];
  keyGapAreas: string[];
  allocationNotes: string;
}

export interface PMInternship {
  id: string;
  companyName: string;
  companyCategory: 'Fortune India 500' | 'Top PSU / Navratna' | 'Leading Enterprise Partner';
  roleTitle: string;
  domain: 'AI & Data Science' | 'Core Engineering & EV' | 'Finance & Supply Chain' | 'Digital Governance' | 'Green Tech & Renewable';
  location: string;
  stipendGovt: number; // Standard ₹5,000 Direct DBT
  stipendCompany: number; // ₹500 to ₹3,000 company contribution
  matchScore: number;
  requiredSkills: string[];
  affirmativeActionMatch: boolean;
  openings: number;
  description: string;
  locationPreferenceMatch: boolean;
  mentorAssigned: string;
}

export interface SkillQuest {
  id: string;
  title: string;
  category: 'AI & Data' | 'Cloud & Systems' | 'Core Engineering' | 'Finance & Analytics' | 'Communication & Soft Skills';
  icon: string;
  duration: string;
  level: 'Fast Sprint (2 Days)' | 'Essential (5 Days)' | 'Deep Dive (10 Days)';
  eligibilityBoost: number; // e.g. 8 for +8%
  description: string;
  syllabus: string[];
  sponsorCompany: string;
  isAccepted: boolean;
  isCompleted: boolean;
  xpReward: number;
  badgeName: string;
}

export interface StudentPersona {
  id: string;
  name: string;
  tagline: string;
  avatarSeed: string;
  profile: StudentProfile;
  initialEligibilityScore: number;
}
