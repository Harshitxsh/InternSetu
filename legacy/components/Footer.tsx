import React from 'react';
import { ShieldCheck, Heart, ExternalLink, HelpCircle, FileText, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gov-navy text-slate-300 border-t border-slate-800 text-xs">
      {/* Top Footer Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Portal Info with 13.png logo */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-3 bg-white p-2 rounded-xl inline-flex">
              <img 
                src="/13.png" 
                alt="Ministry of Corporate Affairs" 
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('src/assets')) {
                    target.src = '/src/assets/13.png';
                  }
                }}
              />
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              InternSetu is an AI Smart Allocation & Skill Bridging Engine built for the Prime Minister's Internship Scheme under Ministry of Corporate Affairs, Govt of India.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase text-xs">
              Portal Navigation
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#intake" className="hover:text-amber-400 transition-colors">Candidate Intake Form</a></li>
              <li><a href="#pipeline" className="hover:text-amber-400 transition-colors">AI Allocation Engine</a></li>
              <li><a href="#quests" className="hover:text-amber-400 transition-colors">Gamified Skill Quests</a></li>
              <li><a href="#explainability" className="hover:text-amber-400 transition-colors">100-Point Scoring Matrix</a></li>
            </ul>
          </div>

          {/* Col 3: PM Scheme Guidelines */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase text-xs">
              PM Scheme Provisions
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                <span>₹5,000/mo Govt Direct Benefit Transfer</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                <span>₹6,000 One-time Incidentals Grant</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                <span>500 Top CSR Enterprises</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                <span>Tier-3 & Rural Affirmative Priority</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Hackathon Attribution & Tech Stack */}
          <div className="space-y-2.5">
            <div className="inline-flex items-center space-x-1.5 bg-blue-900/60 border border-blue-700/50 px-3 py-1 rounded-lg text-amber-300 font-bold text-xs">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Smart India Hackathon 2026</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Designed with React 18, TypeScript, Tailwind CSS & Explainable AI Heuristics for equitable national allocation.
            </p>
            <div className="text-[11px] text-slate-500 font-mono">
              Engine Version: v2.4.0-SIH26 (Build: 2026.08)
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-3">
          <div>
            © 2026 Ministry of Corporate Affairs, Government of India. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Allocation</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Accessibility Statement</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
