// Global TypeScript types for InternSetu v2.0 — Ministry of AYUSH Platform

export type UserRole = 'STUDENT' | 'COMPANY' | 'INSTITUTION';

export type AYUSHDomain =
  | 'Ayurveda'
  | 'Yoga & Naturopathy'
  | 'Unani Medicine'
  | 'Siddha'
  | 'Homeopathy'
  | 'Herbal Pharmaceuticals'
  | 'Biotechnology & Bioinformatics'
  | 'Pharmacovigilance'
  | 'Digital Healthcare'
  | 'Traditional Medicine Research';

export interface User {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  role: UserRole | null;
  is_onboarded: boolean;
  github_token?: string;       // GitHub OAuth access token
  github_username?: string;
}

export interface StudentProfile {
  uid: string;
  institution: string;
  degree: string;
  branch: string;
  cgpa: number;
  graduation_year: number;
  skills: string[];
  primary_domain: AYUSHDomain;
}

export interface JRIBreakdown {
  uid: string;
  overall_jri: number;       // 0–100
  s_assess: number;          // 35% weight
  s_proj: number;            // 30% weight
  s_resume: number;          // 20% weight
  s_acad: number;            // 15% weight
  tier: 'QUEST_MODE' | 'ALLOCATION_MODE';
  top_strengths: string[];
  skill_gaps: string[];
  percentile: number;
  computed_at?: string;
}

export interface GitHubRepo {
  name: string;
  description?: string;
  language?: string;
  stars: number;
  forks: number;
  topics: string[];
  has_readme: boolean;
  has_ci: boolean;
  has_dockerfile: boolean;
  commit_count: number;
}

export interface GitHubSnapshot {
  username: string;
  total_repos: number;
  primary_languages: Record<string, number>;
  repos: GitHubRepo[];
  commit_velocity: number;
  s_proj_score: number;
  scored_at?: string;
}

export interface SkillRequirement {
  skill: string;
  weight: number;
}

export interface Internship {
  id: string;
  company_name: string;
  company_type: string;
  role_title: string;
  domain: AYUSHDomain;
  location: string;
  stipend_monthly: number;
  duration_months: number;
  available_seats: number;
  required_skills: SkillRequirement[];
  description: string;
  min_jri: number;
}

export interface InternshipMatch {
  internship: Internship;
  match_score: number;
  ilp_rank: number;
  semantic_explanation: string;
}

export interface SkillQuest {
  id: string;
  title: string;
  domain: AYUSHDomain;
  category: string;
  description: string;
  syllabus: string[];
  duration_days: number;
  xp_reward: number;
  jri_boost_percent: number;
  sponsor_company: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'AVAILABLE' | 'ACCEPTED' | 'COMPLETED';
}


export interface CohortSkillGap {
  skill: string;
  demand: number;
  supply: number;
  gap: number;
}

export type AppView =
  | 'login'
  | 'onboarding'
  | 'student-dashboard'
  | 'student-profile'
  | 'student-quests'
  | 'student-allocation'
  | 'company-dashboard'
  | 'institution-dashboard';
