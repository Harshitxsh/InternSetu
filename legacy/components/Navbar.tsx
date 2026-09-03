import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  User, 
  BookOpen, 
  Layers, 
  FileText, 
  CheckCircle2, 
  ChevronDown,
  RefreshCw,
  Award,
  IndianRupee,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import { StudentPersona } from '../types';

interface NavbarProps {
  currentTab: 'intake' | 'processing' | 'results' | 'quests' | 'transparency';
  setCurrentTab: (tab: 'intake' | 'processing' | 'results' | 'quests' | 'transparency') => void;
  personas: StudentPersona[];
  selectedPersona: StudentPersona;
  onSelectPersona: (persona: StudentPersona) => void;
  onReset: () => void;
  currentScore: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  personas,
  selectedPersona,
  onSelectPersona,
  onReset,
  currentScore,
}) => {
  const [isPersonaOpen, setIsPersonaOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Top Govt of India Strip */}
      <div className="bg-gov-navy text-slate-200 text-xs py-1.5 px-4 sm:px-8 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <span className="flex items-center text-amber-400 font-semibold tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5 mr-1 inline" />
            GOVERNMENT OF INDIA • MINISTRY OF CORPORATE AFFAIRS
          </span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline text-slate-300 font-medium">
            PM Internship Scheme (PMIS) Smart Allocation Portal
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-blue-900/60 text-blue-200 px-2.5 py-0.5 rounded-full text-[11px] border border-blue-700/50">
            <IndianRupee className="w-3 h-3 mr-1 text-amber-400" />
            <span className="font-semibold text-white">₹5,000/mo</span>
            <span className="ml-1 text-slate-300">Direct DBT</span>
          </div>
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            SIH 2026 Edition
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCurrentTab('intake')}
              className="flex items-center space-x-3 group focus:outline-none"
            >
              {/* Ministry of Corporate Affairs Logo (13.png) */}
              <div className="h-14 py-1 flex items-center bg-white px-1 rounded transition-transform group-hover:scale-[1.02]">
                <img 
                  src="/13.png" 
                  alt="Ministry of Corporate Affairs - Government of India" 
                  className="h-12 w-auto object-contain"
                  onError={(e) => {
                    // Fallback to relative asset path if /13.png fails
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('src/assets')) {
                      target.src = '/src/assets/13.png';
                    }
                  }}
                />
              </div>

              {/* Vertical separator */}
              <div className="h-10 w-[1.5px] bg-slate-200 hidden sm:block"></div>

              {/* Title & Tagline */}
              <div className="text-left">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-black tracking-tight text-gov-navy">
                    Intern<span className="text-blue-600">Setu</span>
                  </span>
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                    AI Engine
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 font-medium hidden sm:block">
                  Affirmative Allocation & Skill Bridging for PM Internship Scheme
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setCurrentTab('intake')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentTab === 'intake'
                  ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-200'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Intake Portal</span>
            </button>

            <button
              onClick={() => setCurrentTab('results')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentTab === 'results'
                  ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-200'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Allocation Matcher</span>
              {currentScore > 0 && (
                <span className="ml-1 bg-emerald-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {currentScore} pts
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentTab('quests')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentTab === 'quests'
                  ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-200'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Skill Quests</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
            </button>

            <button
              onClick={() => setCurrentTab('transparency')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentTab === 'transparency'
                  ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-200'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>AI Explainability</span>
            </button>
          </nav>

          {/* Persona Switcher & Quick Pitch Controls */}
          <div className="flex items-center space-x-3">
            {/* Quick Demo Persona Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsPersonaOpen(!isPersonaOpen)}
                className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200/80 border border-slate-300/80 text-slate-800 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm"
                title="Select a pre-loaded candidate persona to quickly test the AI matching rules"
              >
                <User className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden md:inline text-slate-500">Demo Persona:</span>
                <span className="text-blue-900 font-bold max-w-[110px] truncate">{selectedPersona.name}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isPersonaOpen ? 'rotate-180' : ''}`} />
              </button>

              {isPersonaOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100 bg-slate-50">
                    <p className="text-[11px] font-bold uppercase text-slate-600 tracking-wider">
                      Select Demo Profile (SIH Pitch)
                    </p>
                  </div>
                  {personas.map((persona) => (
                    <button
                      key={persona.id}
                      onClick={() => {
                        onSelectPersona(persona);
                        setIsPersonaOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 flex items-start space-x-2.5 transition-colors ${
                        selectedPersona.id === persona.id
                          ? 'bg-blue-50/80 border-l-4 border-blue-600'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                        {persona.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-900 truncate">{persona.name}</p>
                          <span className="text-[10px] font-extrabold text-blue-700 bg-blue-100 px-1.5 py-0.2 rounded">
                            {persona.profile.socialCategory}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">{persona.tagline}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Reset Button */}
            <button
              onClick={onReset}
              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="Reset application to initial state"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2 shadow-lg">
          <button
            onClick={() => {
              setCurrentTab('intake');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-semibold ${
              currentTab === 'intake' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Intake Portal</span>
          </button>
          <button
            onClick={() => {
              setCurrentTab('results');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-semibold ${
              currentTab === 'results' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Allocation Matcher</span>
          </button>
          <button
            onClick={() => {
              setCurrentTab('quests');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-semibold ${
              currentTab === 'quests' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Skill Quests (+% Eligibility)</span>
          </button>
          <button
            onClick={() => {
              setCurrentTab('transparency');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-semibold ${
              currentTab === 'transparency' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>AI Explainability Matrix</span>
          </button>
        </div>
      )}
    </header>
  );
};
