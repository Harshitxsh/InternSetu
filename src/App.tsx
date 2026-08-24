import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { IntakeDashboard } from './components/IntakeDashboard';
import { ProcessingPipeline } from './components/ProcessingPipeline';
import { ResultDashboard } from './components/ResultDashboard';
import { ExplainabilityModal } from './components/ExplainabilityModal';
import { ApplicationPassModal } from './components/ApplicationPassModal';
import { Footer } from './components/Footer';

import { 
  StudentPersona, 
  StudentProfile, 
  ScoreBreakdown, 
  PMInternship, 
  SkillQuest 
} from './types';

import { 
  INITIAL_PERSONAS, 
  MOCK_INTERNSHIPS, 
  INITIAL_SKILL_QUESTS 
} from './data/mockData';

export function App() {
  // Navigation state
  const [currentTab, setCurrentTab] = useState<'intake' | 'processing' | 'results' | 'quests' | 'transparency'>('intake');
  
  // Personas and Profile state
  const [personas] = useState<StudentPersona[]>(INITIAL_PERSONAS);
  const [selectedPersona, setSelectedPersona] = useState<StudentPersona>(INITIAL_PERSONAS[0]);
  const [profile, setProfile] = useState<StudentProfile>(INITIAL_PERSONAS[0].profile);

  // Skill Quests state
  const [skillQuests, setSkillQuests] = useState<SkillQuest[]>(INITIAL_SKILL_QUESTS);
  
  // Internship matches
  const [internships, setInternships] = useState<PMInternship[]>(MOCK_INTERNSHIPS);
  const [selectedInternship, setSelectedInternship] = useState<PMInternship | null>(null);

  // Modals state
  const [isExplainabilityOpen, setIsExplainabilityOpen] = useState(false);
  const [isApplicationPassOpen, setIsApplicationPassOpen] = useState(false);

  // Dynamic Score Calculation
  const scoreBreakdown: ScoreBreakdown = useMemo(() => {
    // 1. Demographics & Affirmative Equity Score (Max 25)
    let demoScore = 12;
    if (profile.socialCategory === 'OBC' || profile.socialCategory === 'SC' || profile.socialCategory === 'ST' || profile.socialCategory === 'EWS') {
      demoScore += 4;
    }
    if (profile.annualIncome.includes('Below ₹2.5') || profile.annualIncome.includes('₹2.5L - ₹5.0')) {
      demoScore += 4;
    }
    if (profile.instituteType.includes('Rural') || profile.instituteType.includes('Tier-3')) {
      demoScore += 3;
    }
    if (profile.isFirstGeneration) {
      demoScore += 1;
    }
    if (profile.isAspirationalDistrict) {
      demoScore += 1;
    }
    demoScore = Math.min(25, demoScore);

    // 2. Academic Foundations Score (Max 25)
    let acadScore = Math.round((profile.cgpa / 10) * 23);
    if (profile.graduationYear === 2026 || profile.graduationYear === 2025) {
      acadScore += 2;
    }
    acadScore = Math.min(25, Math.max(12, acadScore));

    // 3. Skill Alignment Score (Max 25)
    const baseSkillScore = Math.min(20, Math.round(profile.skills.length * 3.5));
    
    // 4. Authenticity & Credibility Score (Max 25)
    const authScore = Math.min(25, Math.round((profile.credibilityIndex / 100) * 24));

    // 5. Additional boost from completed Skill Quests
    const questsBoost = skillQuests
      .filter(q => q.isCompleted)
      .reduce((sum, q) => sum + q.eligibilityBoost, 0);

    const baseScore = demoScore + acadScore + baseSkillScore + authScore;
    const finalScore = Math.min(100, Math.round(baseScore * 0.8 + questsBoost));

    let tier: ScoreBreakdown['rankTier'] = 'Tier 1 - Direct Allocation Pool';
    if (finalScore < 65) {
      tier = 'Tier 3 - Skill Bridging Recommended';
    } else if (finalScore < 75) {
      tier = 'Tier 2 - High Affinity';
    }

    return {
      overallScore: finalScore,
      demographicScore: demoScore,
      academicScore: acadScore,
      skillMatchScore: Math.min(25, baseSkillScore + Math.round(questsBoost * 0.5)),
      authenticityScore: authScore,
      rankTier: tier,
      percentileRank: Math.min(99, Math.round(finalScore * 0.95)),
      affirmativeBonusPoints: demoScore > 15 ? demoScore - 15 : 0,
      topStrengths: ['Affirmative Rural Normalization', 'High Credibility Index', 'Domain Foundations'],
      keyGapAreas: ['Microservice Architecture', 'Enterprise Telemetry Protocols'],
      allocationNotes: 'Eligible for direct allocation into Fortune 500 PM Scheme vacancies.'
    };
  }, [profile, skillQuests]);

  // Handle switching personas
  const handleSelectPersona = (persona: StudentPersona) => {
    setSelectedPersona(persona);
    setProfile(persona.profile);
    // Reset quests completion for fresh exploration
    setSkillQuests(INITIAL_SKILL_QUESTS.map(q => ({ ...q, isCompleted: false, isAccepted: false })));
    setCurrentTab('intake');
  };

  // Handle updating profile fields
  const handleUpdateProfile = (updated: Partial<StudentProfile>) => {
    setProfile(prev => ({ ...prev, ...updated }));
  };

  // Start processing pipeline
  const handleSubmitForProcessing = () => {
    setCurrentTab('processing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auto-fill sample resume data
  const handleLoadSampleResume = () => {
    setProfile(selectedPersona.profile);
  };

  // Toggle quest completion and score boost
  const handleToggleQuest = (questId: string) => {
    setSkillQuests(prev => prev.map(q => {
      if (q.id === questId) {
        const nextState = !q.isCompleted;
        return { ...q, isCompleted: nextState, isAccepted: nextState };
      }
      return q;
    }));
  };

  // Handle selecting internship for allocation pass
  const handleApplyInternship = (internship: PMInternship) => {
    setSelectedInternship(internship);
    setIsApplicationPassOpen(true);
  };

  // Reset demo
  const handleReset = () => {
    setSelectedPersona(INITIAL_PERSONAS[0]);
    setProfile(INITIAL_PERSONAS[0].profile);
    setSkillQuests(INITIAL_SKILL_QUESTS.map(q => ({ ...q, isCompleted: false, isAccepted: false })));
    setCurrentTab('intake');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        personas={personas}
        selectedPersona={selectedPersona}
        onSelectPersona={handleSelectPersona}
        onReset={handleReset}
        currentScore={scoreBreakdown.overallScore}
      />

      {/* Hero Banner (Always shown on intake or when requested) */}
      {currentTab === 'intake' && (
        <Hero
          onStartIntake={() => {
            const formElem = document.getElementById('intake-form-section');
            formElem?.scrollIntoView({ behavior: 'smooth' });
          }}
          onQuickSimulate={() => {
            handleSelectPersona(INITIAL_PERSONAS[0]);
            handleSubmitForProcessing();
          }}
          onOpenExplainability={() => setIsExplainabilityOpen(true)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {/* TAB 1: Intake Dashboard */}
        {currentTab === 'intake' && (
          <div id="intake-form-section">
            <IntakeDashboard
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
              onSubmitForProcessing={handleSubmitForProcessing}
              onLoadSampleResume={handleLoadSampleResume}
            />
          </div>
        )}

        {/* TAB 2: Dynamic Processing Pipeline */}
        {currentTab === 'processing' && (
          <ProcessingPipeline
            profile={profile}
            onComplete={() => {
              setCurrentTab('results');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* TAB 3: Results & Allocation View */}
        {(currentTab === 'results' || currentTab === 'quests') && (
          <ResultDashboard
            profile={profile}
            scoreBreakdown={scoreBreakdown}
            internships={internships}
            skillQuests={skillQuests}
            onToggleQuest={handleToggleQuest}
            onApplyInternship={handleApplyInternship}
            onOpenExplainability={() => setIsExplainabilityOpen(true)}
            onOpenCertificate={() => {
              setSelectedInternship(internships[0]);
              setIsApplicationPassOpen(true);
            }}
            onRetakeIntake={() => setCurrentTab('intake')}
          />
        )}

        {/* TAB 4: Transparency & Explainability Standalone View */}
        {currentTab === 'transparency' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-gov-lg space-y-6">
              <div className="gov-gradient-header p-6 rounded-2xl text-white flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black">MCA Explainable AI Allocation Blueprint</h2>
                  <p className="text-xs text-blue-200 mt-1">Smart India Hackathon 2026 • Verified Standard Architecture</p>
                </div>
                <button
                  onClick={() => setIsExplainabilityOpen(true)}
                  className="bg-amber-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs"
                >
                  Open Interactive Breakdown
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <h3 className="font-bold text-base text-slate-900">Why Affirmative Normalization Matters</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Standard hiring portals systematically favor candidates from Tier-1 premier institutes who have access to high-end resume formatting and legacy brand prestige. InternSetu's AI algorithm introduces mathematical equity multipliers for candidates from rural Tier-3 colleges and Aspirational Districts under the PM Internship Scheme.
                  </p>
                </div>

                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <h3 className="font-bold text-base text-slate-900">Anti-Fluff & Credibility Scoring</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Instead of rewarding keyword stuffing, our parser cross-checks claimed project artifacts against GitHub heuristics and repository evidence. Candidates receive transparency badges verifying genuine human contributions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Explainability Scoring Modal */}
      <ExplainabilityModal
        isOpen={isExplainabilityOpen}
        onClose={() => setIsExplainabilityOpen(false)}
        profile={profile}
        scoreBreakdown={scoreBreakdown}
      />

      {/* Provisional Application Pass Modal */}
      <ApplicationPassModal
        isOpen={isApplicationPassOpen}
        onClose={() => setIsApplicationPassOpen(false)}
        internship={selectedInternship || internships[0]}
        profile={profile}
        scoreBreakdown={scoreBreakdown}
      />

      {/* Official MCA & SIH Footer */}
      <Footer />
    </div>
  );
}

export default App;
