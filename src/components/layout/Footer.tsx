import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-ayush-forest text-white/70 text-xs py-4 px-6 border-t border-ayush-herb mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <img
            src="/ayush-logo.jpg"
            alt="Ministry of AYUSH"
            className="h-6 w-auto object-contain bg-white rounded p-0.5"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <span>
            <strong>Ministry of AYUSH</strong>, Government of India &nbsp;|&nbsp; PM Internship Scheme AI Skill-Bridge
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-white/50">
          <span>Smart India Hackathon 2026</span>
          <span>&bull;</span>
          <span>Team CodeNOVA</span>
          <span>&bull;</span>
          <span>Galgotias University</span>
        </div>
      </div>
    </footer>
  );
};
