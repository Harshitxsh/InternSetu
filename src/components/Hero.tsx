import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  Users, 
  Building2, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';

interface HeroProps {
  onStartIntake: () => void;
  onQuickSimulate: () => void;
  onOpenExplainability: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartIntake,
  onQuickSimulate,
  onOpenExplainability,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-950 via-slate-900 to-gov-navy text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-blue-900/60">
      {/* Subtle Background Circuit & Grid Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      {/* Decorative ambient glow orbs */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-6 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text & CTA Section */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* National Initiative Pill */}
            <div className="inline-flex items-center space-x-2 bg-blue-900/60 border border-blue-500/30 rounded-full px-3.5 py-1.5 shadow-inner">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Smart India Hackathon 2026 Initiative
              </span>
              <span className="text-blue-300 text-xs">•</span>
              <span className="text-xs text-blue-200 font-medium">
                MCA Problem Statement PMIS-AI-01
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              AI Smart Allocation Engine for <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200 bg-clip-text text-transparent">
                PM Internship Scheme
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              Empowering Tier-2/3 & rural aspirants with a <strong className="text-white font-semibold">100-Point Explainable AI matching engine</strong>. Eliminating hiring bias through affirmative equity weightage, anti-fluff resume verification, and gamified skill quests.
            </p>

            {/* Key Value Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 flex items-start space-x-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400 font-medium">Affirmative Action</div>
                  <div className="text-sm font-bold text-white">+15% Rural Priority</div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 flex items-start space-x-2.5">
                <Building2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400 font-medium">Partner Enterprises</div>
                  <div className="text-sm font-bold text-white">500+ Top Corporates</div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 flex items-start space-x-2.5 col-span-2 sm:col-span-1">
                <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400 font-medium">Skill Quests</div>
                  <div className="text-sm font-bold text-white">Gamified Roadmap</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={onStartIntake}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg shadow-blue-700/30 transition-all hover:scale-[1.02] active:scale-[0.98] border border-blue-400/30"
              >
                <span>Launch Intake & Parser</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onQuickSimulate}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 px-5 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Simulate Demo Profile</span>
              </button>

              <button
                onClick={onOpenExplainability}
                className="text-xs text-slate-400 hover:text-slate-200 underline underline-offset-4 flex items-center space-x-1 pl-2"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>How scoring works</span>
              </button>
            </div>
          </div>

          {/* Right Showcase Card with Official MCA Emblem (13.png) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-gradient-to-b from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-6 shadow-2xl relative">
              
              {/* Official Seal Header with 13.png */}
              <div className="flex items-center space-x-4 bg-white/95 text-slate-900 rounded-xl p-3.5 shadow-md mb-5 border border-slate-200">
                <img 
                  src="/13.png" 
                  alt="Ministry of Corporate Affairs Logo" 
                  className="h-16 w-auto object-contain flex-shrink-0"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('src/assets')) {
                      target.src = '/src/assets/13.png';
                    }
                  }}
                />
                <div className="text-left border-l pl-3 border-slate-200">
                  <div className="text-[11px] uppercase tracking-wider font-extrabold text-blue-900">
                    Ministry of Corporate Affairs
                  </div>
                  <div className="text-xs font-semibold text-slate-700">
                    Government of India
                  </div>
                  <div className="text-[10px] text-emerald-700 font-bold mt-0.5 flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1 inline text-emerald-600" />
                    Verified Allocation Standard v2.4
                  </div>
                </div>
              </div>

              {/* Live Scheme Metrics */}
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-slate-800/80 p-3 rounded-lg border border-slate-700/50">
                  <span className="text-xs text-slate-300">Target Candidates:</span>
                  <span className="text-sm font-bold text-amber-400">1.25 Crore Youth</span>
                </div>

                <div className="flex justify-between items-center bg-slate-800/80 p-3 rounded-lg border border-slate-700/50">
                  <span className="text-xs text-slate-300">Direct DBT Support:</span>
                  <span className="text-sm font-bold text-emerald-400">₹5,000 / month (Govt)</span>
                </div>

                <div className="flex justify-between items-center bg-slate-800/80 p-3 rounded-lg border border-slate-700/50">
                  <span className="text-xs text-slate-300">Company Allowance:</span>
                  <span className="text-sm font-bold text-blue-400">₹500+ / mo CSR Fund</span>
                </div>

                <div className="flex justify-between items-center bg-slate-800/80 p-3 rounded-lg border border-slate-700/50">
                  <span className="text-xs text-slate-300">Duration:</span>
                  <span className="text-sm font-bold text-white">12 Months Direct Industry Training</span>
                </div>
              </div>

              {/* Status Footer Tag */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                  AI Engine Online & Ready
                </span>
                <span className="text-slate-400 font-mono text-[11px]">v2.4-SIH26</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
