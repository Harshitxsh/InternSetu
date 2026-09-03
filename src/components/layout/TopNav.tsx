import React from 'react';
import { Bell, ShieldCheck, Wifi, WifiOff } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { useAuth } from '../../auth/AuthProvider';

export const TopNav: React.FC = () => {
  const { currentView, jri } = useAppStore();
  const { user } = useAuth();

  const breadcrumbMap: Record<string, string> = {
    'student-dashboard':  'Dashboard',
    'student-quests':     'Skill Quests',
    'student-allocation': 'Allocation Pool',
    'student-profile':    'My Profile',
    'company-dashboard':  'Company Portal',
    'institution-dashboard': 'Institution CRM',
  };

  return (
    <header className="h-14 bg-surface border-b border-border flex items-center px-5 gap-4 flex-shrink-0">
      {/* Ministry strip + breadcrumb */}
      <div className="flex items-center gap-2 min-w-0">
        <img
          src="/ayush-logo.jpg"
          alt="AYUSH"
          className="h-7 w-auto object-contain flex-shrink-0"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div className="flex items-center gap-1.5 text-xs text-ink-muted">
          <span className="font-semibold text-ayush-forest">InternSetu</span>
          <span>/</span>
          <span className="text-ink font-medium">{breadcrumbMap[currentView] ?? currentView}</span>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-3">
        {/* Live badge */}
        <div className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded border bg-ayush-mint text-ayush-pine border-ayush-sage/30">
          <Wifi className="w-3 h-3" />
          Live
        </div>

        {/* JRI badge (students only) */}
        {user?.role === 'STUDENT' && jri && (
          <div className={`hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded border ${
            jri.tier === 'ALLOCATION_MODE'
              ? 'bg-brass-pale text-brass-dark border-brass-border'
              : 'bg-parchment-warm text-ink-muted border-border-strong'
          }`}>
            <ShieldCheck className="w-3.5 h-3.5" />
            JRI: {jri.overall_jri.toFixed(1)}
            <span className="font-normal opacity-60">/ 100</span>
          </div>
        )}

        {/* Bell */}
        <button className="relative p-1.5 text-ink-muted hover:text-ink rounded transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-brass rounded-full" />
        </button>

        {/* Avatar */}
        {user && (
          <div className="w-7 h-7 rounded-full bg-ayush-pine flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
    </header>
  );
};
