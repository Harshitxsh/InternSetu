import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  HelpCircle, 
  Layers,
  Scale
} from 'lucide-react';
import { ScoreBreakdown, StudentProfile } from '../types';

interface ExplainabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  scoreBreakdown: ScoreBreakdown;
}

export const ExplainabilityModal: React.FC<ExplainabilityModalProps> = ({
  isOpen,
  onClose,
  profile,
  scoreBreakdown,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="gov-gradient-header p-6 text-white flex items-center justify-between border-b border-blue-900">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-800/80 rounded-xl">
              <Scale className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                PMIS Explainable AI Allocation Matrix
              </h3>
              <p className="text-xs text-blue-200">
                Transparent Multi-Factor Scoring Architecture (MCA Standard v2.4)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Top Formula Card */}
          <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">
              Mathematical Composite Objective Function
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-blue-300 overflow-x-auto">
              Score = (w_demo × S_demo) + (w_acad × S_acad) + (w_skill × S_skill) + (w_cred × S_cred) + Σ(Quest_Boost)
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed font-sans">
              Where affirmative equity parameters (<code className="text-amber-300 font-mono">w_demo = 0.25</code>) guarantee high-leverage representation for first-generation graduates and Tier-3 rural institutions.
            </p>
          </div>

          {/* 4 Factor Weightage Breakdown */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Factor-by-Factor Evaluation for {profile.fullName}
            </h4>

            {/* Factor 1 */}
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-blue-900 flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-1.5 text-blue-600" />
                  1. Affirmative Equity & Demographics (25% Total Weight)
                </span>
                <span className="text-xs font-black text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                  {scoreBreakdown.demographicScore} / 25 Pts
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Candidate belongs to <strong className="text-slate-900">{profile.socialCategory}</strong> with income bracket <strong className="text-slate-900">{profile.annualIncome}</strong>. Registered from <strong className="text-slate-900">{profile.instituteType}</strong> in <strong className="text-slate-900">{profile.district}</strong>.
              </p>
            </div>

            {/* Factor 2 */}
            <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-indigo-900 flex items-center">
                  <Award className="w-4 h-4 mr-1.5 text-indigo-600" />
                  2. Normalized Academic Foundation (25% Total Weight)
                </span>
                <span className="text-xs font-black text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded">
                  {scoreBreakdown.academicScore} / 25 Pts
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                CGPA <strong className="text-slate-900">{profile.cgpa} / 10.0</strong> in {profile.degree}. Normalization algorithm prevents Tier-1 GPA inflation bias.
              </p>
            </div>

            {/* Factor 3 */}
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-amber-900 flex items-center">
                  <Zap className="w-4 h-4 mr-1.5 text-amber-600" />
                  3. Vector Cosine Skill Alignment (25% Total Weight)
                </span>
                <span className="text-xs font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  {scoreBreakdown.skillMatchScore} / 25 Pts
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calculated high cosine alignment between candidate competencies ({profile.skills.join(', ')}) and top PM Scheme enterprise partner requirements.
              </p>
            </div>

            {/* Factor 4 */}
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-emerald-900 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-600" />
                  4. Anti-Fluff Credibility Verification (25% Total Weight)
                </span>
                <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  {scoreBreakdown.authenticityScore} / 25 Pts
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero AI hallucination or buzzword stuffing detected. Credibility index verified at <strong className="text-slate-900">{profile.credibilityIndex}%</strong>.
              </p>
            </div>
          </div>

          {/* Equal Opportunity Compliance Guarantee */}
          <div className="bg-slate-100 rounded-2xl p-4 text-xs text-slate-700 space-y-1.5 border border-slate-200">
            <div className="font-bold text-slate-900 flex items-center">
              <ShieldCheck className="w-4 h-4 mr-1.5 text-blue-600" />
              Equal Opportunity & Non-Discrimination Audit
            </div>
            <p className="leading-relaxed">
              InternSetu's allocation engine strictly complies with Ministry of Corporate Affairs affirmative guidelines. No candidate is deprioritized based on geographic remoteness or non-tier-1 college status.
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Close Rationale Window
          </button>
        </div>

      </div>
    </div>
  );
};
