import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  IndianRupee, 
  MapPin, 
  ChevronRight, 
  ShieldCheck, 
  BookOpen, 
  ArrowUpRight, 
  Zap, 
  Cpu, 
  Code2, 
  Server, 
  Flame, 
  Check, 
  Download, 
  Filter,
  Layers,
  HelpCircle
} from 'lucide-react';
import { StudentProfile, PMInternship, SkillQuest, ScoreBreakdown } from '../types';

interface ResultDashboardProps {
  profile: StudentProfile;
  scoreBreakdown: ScoreBreakdown;
  internships: PMInternship[];
  skillQuests: SkillQuest[];
  onToggleQuest: (questId: string) => void;
  onApplyInternship: (internship: PMInternship) => void;
  onOpenExplainability: () => void;
  onOpenCertificate: () => void;
  onRetakeIntake: () => void;
}

export const ResultDashboard: React.FC<ResultDashboardProps> = ({
  profile,
  scoreBreakdown,
  internships,
  skillQuests,
  onToggleQuest,
  onApplyInternship,
  onOpenExplainability,
  onOpenCertificate,
  onRetakeIntake,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'all' | 'internships' | 'quests'>('all');
  const [expandedQuestId, setExpandedQuestId] = useState<string | null>(null);

  // Trigger celebration confetti when score increases
  const handleQuestAction = (quest: SkillQuest) => {
    onToggleQuest(quest.id);
    if (!quest.isCompleted) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#f59e0b', '#10b981', '#6366f1']
      });
    }
  };

  const categories = ['All', 'Core Engineering', 'AI & Data', 'Finance & Analytics', 'Cloud & Systems'];

  const filteredQuests = selectedCategory === 'All'
    ? skillQuests
    : skillQuests.filter(q => q.category === selectedCategory);

  const completedQuestsCount = skillQuests.filter(q => q.isCompleted).length;
  const totalBoostEarned = skillQuests
    .filter(q => q.isCompleted)
    .reduce((sum, q) => sum + q.eligibilityBoost, 0);

  // Helper to render icon by name
  const renderQuestIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Code2': return <Code2 className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Server': return <Server className="w-5 h-5" />;
      case 'Award': return <Award className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  // Determine score color
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'from-emerald-500 to-teal-600 text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 70) return 'from-blue-600 to-indigo-600 text-blue-700 bg-blue-50 border-blue-200';
    return 'from-amber-500 to-orange-600 text-amber-700 bg-amber-50 border-amber-200';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* ========================================================================= */}
      {/* TOP SECTION: Gamified 100-Point Eligibility Score & Dynamic Progress Gauge */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-gov-lg overflow-hidden">
        
        {/* Banner strip */}
        <div className="gov-gradient-header px-6 sm:px-8 py-6 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-blue-900">
          <div className="space-y-1">
            <div className="flex items-center space-x-2.5">
              <span className="bg-amber-400 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Allocation Evaluation Complete
              </span>
              <span className="text-xs text-blue-200 font-mono">ID: {profile.id}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Candidate: <span className="text-amber-300">{profile.fullName}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              {profile.instituteName} • {profile.degree} ({profile.socialCategory})
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenCertificate}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>Provisional Allocation Pass</span>
            </button>

            <button
              onClick={onOpenExplainability}
              className="flex items-center space-x-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition-all shadow-md"
            >
              <HelpCircle className="w-4 h-4 text-slate-950" />
              <span>Scoring Rationale</span>
            </button>
          </div>
        </div>

        {/* Score Breakdown & Interactive Progress Container */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Circular / Radial Score Highlight (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-slate-50 to-blue-50/40 rounded-2xl border border-slate-200 text-center relative overflow-hidden">
            
            {/* Ambient subtle glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-amber-500/5 pointer-events-none"></div>

            <div className="relative mb-3">
              {/* SVG Circular Progress Ring */}
              <svg className="w-44 h-44 transform -rotate-90">
                <circle
                  cx="88"
                  cy="88"
                  r="74"
                  className="stroke-slate-200"
                  strokeWidth="14"
                  fill="transparent"
                />
                <circle
                  cx="88"
                  cy="88"
                  r="74"
                  className="stroke-blue-600 transition-all duration-1000 ease-out"
                  strokeWidth="14"
                  strokeDasharray={465}
                  strokeDashoffset={465 - (465 * scoreBreakdown.overallScore) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              {/* Centered Score Display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl sm:text-5xl font-black text-gov-navy tracking-tight">
                  {scoreBreakdown.overallScore}
                </span>
                <span className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">
                  Out of 100
                </span>
              </div>
            </div>

            {/* Placement Tier Badge */}
            <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-sm mb-2">
              <Award className="w-4 h-4 text-emerald-700" />
              <span>{scoreBreakdown.rankTier}</span>
            </div>

            <p className="text-xs text-slate-600 max-w-xs">
              Direct match priority with top enterprise allocations under affirmative MCA guidelines.
            </p>

            {/* Total Boost pill if quests completed */}
            {totalBoostEarned > 0 && (
              <div className="mt-3 inline-flex items-center space-x-1.5 bg-amber-100 text-amber-900 text-xs font-extrabold px-3 py-1 rounded-lg border border-amber-300 animate-bounce-subtle">
                <Flame className="w-4 h-4 text-amber-600" />
                <span>+{totalBoostEarned}% Boost Active from Skill Quests!</span>
              </div>
            )}
          </div>

          {/* Linear Progress & Detailed Sub-Score Breakdown (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Top Linear Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-bold text-slate-800">
                <span className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1.5 text-blue-600" />
                  PM Scheme Overall Eligibility Score
                </span>
                <span className="text-base font-black text-blue-700">
                  {scoreBreakdown.overallScore}% (Top {100 - scoreBreakdown.percentileRank}% Percentile)
                </span>
              </div>

              {/* Progress Track */}
              <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-300 shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 rounded-full transition-all duration-700 ease-out relative"
                  style={{ width: `${scoreBreakdown.overallScore}%` }}
                >
                  <div className="absolute inset-0 bg-white/25 animate-pulse"></div>
                </div>
              </div>

              <div className="flex justify-between text-[11px] text-slate-500 font-semibold pt-0.5">
                <span>0% Entry Level</span>
                <span className="text-amber-600 font-bold">50% Qualified Threshold</span>
                <span className="text-emerald-700 font-bold">75%+ Direct Allocation Pool</span>
                <span className="text-blue-700 font-bold">100% Master</span>
              </div>
            </div>

            {/* 4 Multi-Factor Score Breakdown Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              
              {/* Demographic & Affirmative */}
              <div className="bg-slate-50 hover:bg-blue-50/50 p-3.5 rounded-xl border border-slate-200 transition-colors">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-700 flex items-center">
                    <ShieldCheck className="w-4 h-4 mr-1 text-blue-600" />
                    Affirmative Demographic Equity
                  </span>
                  <span className="text-xs font-black text-blue-700">
                    {scoreBreakdown.demographicScore} / 25
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-1.5">
                  <div 
                    className="h-full bg-blue-600 rounded-full" 
                    style={{ width: `${(scoreBreakdown.demographicScore / 25) * 100}%` }}
                  ></div>
                </div>
                <p className="text-[11px] text-slate-500">
                  Rural Tier-3 College + Income bracket equity bonus applied.
                </p>
              </div>

              {/* Academic Foundation */}
              <div className="bg-slate-50 hover:bg-blue-50/50 p-3.5 rounded-xl border border-slate-200 transition-colors">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-700 flex items-center">
                    <Award className="w-4 h-4 mr-1 text-indigo-600" />
                    Academic Foundation Index
                  </span>
                  <span className="text-xs font-black text-indigo-700">
                    {scoreBreakdown.academicScore} / 25
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-1.5">
                  <div 
                    className="h-full bg-indigo-600 rounded-full" 
                    style={{ width: `${(scoreBreakdown.academicScore / 25) * 100}%` }}
                  ></div>
                </div>
                <p className="text-[11px] text-slate-500">
                  CGPA {profile.cgpa}/10.0 normalized against state university cohorts.
                </p>
              </div>

              {/* Skill Match */}
              <div className="bg-slate-50 hover:bg-blue-50/50 p-3.5 rounded-xl border border-slate-200 transition-colors">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-700 flex items-center">
                    <Zap className="w-4 h-4 mr-1 text-amber-600" />
                    Enterprise Vector Skill Match
                  </span>
                  <span className="text-xs font-black text-amber-700">
                    {scoreBreakdown.skillMatchScore} / 25
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-1.5">
                  <div 
                    className="h-full bg-amber-500 rounded-full" 
                    style={{ width: `${(scoreBreakdown.skillMatchScore / 25) * 100}%` }}
                  ></div>
                </div>
                <p className="text-[11px] text-slate-500">
                  Cosine similarity with 12,400+ live Fortune 500 roles.
                </p>
              </div>

              {/* Credibility & Anti-Fluff */}
              <div className="bg-slate-50 hover:bg-blue-50/50 p-3.5 rounded-xl border border-slate-200 transition-colors">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-700 flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" />
                    Resume Credibility (Anti-Fluff)
                  </span>
                  <span className="text-xs font-black text-emerald-700">
                    {scoreBreakdown.authenticityScore} / 25
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-1.5">
                  <div 
                    className="h-full bg-emerald-600 rounded-full" 
                    style={{ width: `${(scoreBreakdown.authenticityScore / 25) * 100}%` }}
                  ></div>
                </div>
                <p className="text-[11px] text-slate-500">
                  {profile.credibilityIndex}% genuine human project artifacts confirmed.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: Top Matched PM Internship Allocations (Top 500 Corporates)     */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-extrabold text-gov-navy flex items-center">
              <Building2 className="w-5 h-5 mr-2 text-blue-600" />
              High-Affinity PM Internship Allocations
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Matched based on affirmative quota, skill vector embeddings, and regional proximity.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200 self-start">
            Showing {internships.length} Corporate Openings
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.map((internship) => (
            <div
              key={internship.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4 card-hover relative overflow-hidden"
            >
              {/* Match Score Badge on top right */}
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black bg-blue-50 text-blue-700 border border-blue-200 shadow-sm">
                  <Sparkles className="w-3 h-3 mr-1 text-blue-600" />
                  {internship.matchScore}% Match
                </span>
              </div>

              {/* Company & Role */}
              <div className="space-y-2 pr-16">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    {internship.companyCategory}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  {internship.roleTitle}
                </h4>

                <div className="text-xs font-semibold text-blue-900">
                  {internship.companyName}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {internship.description}
              </p>

              {/* Required Skills tags */}
              <div className="space-y-1.5 pt-1 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-500">Core Focus:</span>
                <div className="flex flex-wrap gap-1.5">
                  {internship.requiredSkills.map((sk) => (
                    <span
                      key={sk}
                      className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Location & Stipend info */}
              <div className="bg-slate-50 rounded-xl p-3 space-y-1.5 text-xs text-slate-700 border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-slate-500">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                    Location:
                  </span>
                  <span className="font-semibold text-slate-800 truncate max-w-[140px]">
                    {internship.location}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center text-slate-500">
                    <IndianRupee className="w-3.5 h-3.5 mr-1 text-amber-500" />
                    Monthly Stipend:
                  </span>
                  <span className="font-bold text-emerald-700">
                    ₹{internship.stipendGovt + internship.stipendCompany} / mo (DBT)
                  </span>
                </div>
              </div>

              {/* Apply Action Button */}
              <button
                onClick={() => onApplyInternship(internship)}
                className="w-full flex items-center justify-center space-x-2 bg-gov-navy hover:bg-blue-900 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-sm transition-all hover:shadow"
              >
                <span>Select for Allocation Pass</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM SECTION: Gamified Skill Quests Grid (+X% Eligibility Boost)        */}
      {/* ========================================================================= */}
      <div className="space-y-6 pt-4">
        
        {/* Header with Gamification XP Counters */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 bg-slate-950 text-amber-400 px-3 py-1 rounded-full text-xs font-black uppercase">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Gamified Skill Quest Engine</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Supercharge Your Eligibility Score
              </h3>
              <p className="text-xs sm:text-sm text-slate-900 font-medium max-w-2xl">
                Completing enterprise-sponsored micro-quests closes detected competency gaps and <strong>directly increases your 100-point PM Scheme Allocation score in real time!</strong>
              </p>
            </div>

            {/* Quests Completed Tracker Badge */}
            <div className="bg-slate-950 text-white rounded-2xl p-4 shadow-lg border border-slate-800 flex items-center space-x-4 flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl">
                {completedQuestsCount}
              </div>
              <div>
                <div className="text-xs text-slate-400 font-bold uppercase">Quests Completed</div>
                <div className="text-sm font-extrabold text-amber-300">
                  +{totalBoostEarned}% Eligibility Boost
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 pt-4 border-t border-amber-600/40 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-950 flex items-center mr-1">
              <Filter className="w-3.5 h-3.5 mr-1" /> Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  selectedCategory === cat
                    ? 'bg-slate-950 text-white ring-2 ring-slate-950'
                    : 'bg-white/80 hover:bg-white text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* The Grid of Skill Quest Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuests.map((quest) => {
            const isExpanded = expandedQuestId === quest.id;

            return (
              <div
                key={quest.id}
                className={`bg-white rounded-2xl border transition-all p-6 flex flex-col justify-between space-y-4 card-hover relative overflow-hidden ${
                  quest.isCompleted
                    ? 'border-emerald-400 bg-emerald-50/20 shadow-md ring-2 ring-emerald-400/20'
                    : quest.isAccepted
                    ? 'border-blue-400 bg-blue-50/20 shadow-md ring-2 ring-blue-400/20'
                    : 'border-slate-200 shadow-sm hover:border-blue-300'
                }`}
              >
                {/* Top Badge Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`p-2.5 rounded-xl flex items-center justify-center ${
                        quest.isCompleted
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {renderQuestIcon(quest.icon)}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        {quest.category}
                      </span>
                      <div className="text-xs text-slate-600 font-semibold">
                        {quest.duration}
                      </div>
                    </div>
                  </div>

                  {/* Prominent +X% Eligibility Badge */}
                  <div
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-black shadow-sm ${
                      quest.isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                    }`}
                  >
                    {quest.isCompleted ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-1 stroke-[3]" />
                        <span>+{quest.eligibilityBoost}% Boosted!</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5 mr-1 fill-white" />
                        <span>+{quest.eligibilityBoost}% Eligibility</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Quest Title & Description */}
                <div className="space-y-2">
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {quest.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {quest.description}
                  </p>
                </div>

                {/* Sponsor Company & XP Badge */}
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <span className="text-slate-500 font-medium">
                    Sponsor: <strong className="text-slate-800">{quest.sponsorCompany}</strong>
                  </span>
                  <span className="text-amber-700 font-bold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                    +{quest.xpReward} XP
                  </span>
                </div>

                {/* Syllabus Preview Accordion */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <button
                    type="button"
                    onClick={() => setExpandedQuestId(isExpanded ? null : quest.id)}
                    className="w-full flex items-center justify-between text-xs font-bold text-slate-700 hover:text-blue-600"
                  >
                    <span>Syllabus Modules ({quest.syllabus.length})</span>
                    <span className="text-blue-600">{isExpanded ? 'Hide' : 'Preview'}</span>
                  </button>

                  {isExpanded && (
                    <ul className="mt-2.5 space-y-1.5 text-[11px] text-slate-600 border-t border-slate-200 pt-2 animate-in fade-in duration-150">
                      {quest.syllabus.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Action Button: Start / Complete Quest */}
                <div>
                  {quest.isCompleted ? (
                    <button
                      onClick={() => handleQuestAction(quest)}
                      className="w-full flex items-center justify-center space-x-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors"
                      title="Click to reset quest status"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>Quest Completed (Score Active)</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleQuestAction(quest)}
                      className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black py-2.5 px-4 rounded-xl text-xs shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Zap className="w-4 h-4 text-amber-300" />
                      <span>Complete Quest & Boost +{quest.eligibilityBoost}%</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
