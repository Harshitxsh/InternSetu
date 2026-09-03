import React from 'react';
import {
  LayoutDashboard, Zap, Briefcase, FlaskConical, BookOpen,
  Users, Building2, BarChart3, LogOut, Menu, ChevronRight,
  Leaf, CircleHelp
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { useAuth } from '../../auth/AuthProvider';
import { AppView, UserRole } from '../../types';

interface NavItem { label: string; icon: React.ReactNode; view: AppView; }

const STUDENT_NAV: NavItem[] = [
  { label: 'Dashboard',       icon: <LayoutDashboard className="w-4 h-4" />, view: 'student-dashboard' },
  { label: 'Skill Quests',    icon: <Zap className="w-4 h-4" />,             view: 'student-quests' },
  { label: 'Allocation Pool', icon: <Briefcase className="w-4 h-4" />,       view: 'student-allocation' },
  { label: 'My Profile',      icon: <FlaskConical className="w-4 h-4" />,    view: 'student-profile' },
];
const COMPANY_NAV: NavItem[] = [
  { label: 'Dashboard',       icon: <LayoutDashboard className="w-4 h-4" />, view: 'company-dashboard' },
];
const INSTITUTION_NAV: NavItem[] = [
  { label: 'Dashboard',       icon: <LayoutDashboard className="w-4 h-4" />, view: 'institution-dashboard' },
];

const NAV_MAP: Record<UserRole, NavItem[]> = {
  STUDENT: STUDENT_NAV,
  COMPANY: COMPANY_NAV,
  INSTITUTION: INSTITUTION_NAV,
};

export const Sidebar: React.FC = () => {
  const { currentView, setView, sidebarOpen, toggleSidebar, jri, user: storeUser } = useAppStore();
  const { user, signOut } = useAuth();
  const role: UserRole = (user?.role || 'STUDENT') as UserRole;
  const navItems = NAV_MAP[role] || STUDENT_NAV;

  return (
    <aside className={`flex flex-col bg-ayush-forest text-white transition-all duration-300 ${sidebarOpen ? 'w-60' : 'w-14'} flex-shrink-0 min-h-screen`}>
      {/* Logo area */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-ayush-herb">
        <img
          src="/ayush-logo.jpg"
          alt="AYUSH"
          className="w-8 h-8 object-contain bg-white rounded p-0.5 flex-shrink-0"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        {sidebarOpen && (
          <div className="overflow-hidden">
            <div className="text-sm font-bold tracking-tight leading-tight">
              Intern<span className="text-brass">Setu</span>
            </div>
            <div className="text-[10px] text-white/50">Ministry of AYUSH</div>
          </div>
        )}
        <button onClick={toggleSidebar} className="ml-auto text-white/60 hover:text-white p-1 rounded">
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* JRI Quick Gauge (Student only) */}
      {role === 'STUDENT' && sidebarOpen && jri && (
        <div className="mx-3 mt-4 bg-ayush-herb rounded p-3 space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-white/70">JRI Score</span>
            <span className={`font-bold ${jri.tier === 'ALLOCATION_MODE' ? 'text-brass' : 'text-white'}`}>
              {jri.overall_jri.toFixed(1)} / 100
            </span>
          </div>
          <div className="jri-bar-track">
            <div
              className="jri-bar-fill"
              style={{
                width: `${jri.overall_jri}%`,
                background: jri.tier === 'ALLOCATION_MODE'
                  ? 'linear-gradient(90deg, #C59B27, #D4AF37)'
                  : 'linear-gradient(90deg, #2D7A5A, #3B9C72)'
              }}
            />
          </div>
          <div className="text-[10px] text-white/50">
            {jri.tier === 'ALLOCATION_MODE'
              ? '🎉 Allocation Pool Unlocked!'
              : `${(85 - jri.overall_jri).toFixed(1)} pts to Allocation Mode`}
          </div>
        </div>
      )}

      {/* Nav Items */}
      <nav className="flex-1 px-2 py-4 space-y-0.5">
        <div className={`text-[10px] font-bold uppercase tracking-widest text-white/30 px-2 pb-1.5 ${!sidebarOpen && 'hidden'}`}>
          Navigation
        </div>
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => setView(item.view)}
            className={currentView === item.view ? 'nav-item-active w-full' : 'nav-item w-full'}
            title={!sidebarOpen ? item.label : undefined}
          >
            {item.icon}
            {sidebarOpen && <span>{item.label}</span>}
            {sidebarOpen && currentView === item.view && <ChevronRight className="w-3 h-3 ml-auto text-brass" />}
          </button>
        ))}
      </nav>

      {/* User footer */}
      <div className="border-t border-ayush-herb px-3 py-3 space-y-2">
        {sidebarOpen && user && (
          <div className="flex items-center gap-2 text-xs text-white/70">
            <div className="w-7 h-7 rounded-full bg-ayush-herb flex items-center justify-center font-bold text-white text-xs flex-shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="truncate font-semibold text-white text-[11px]">{user.name}</div>
              <div className="truncate text-[10px]">{role}</div>
            </div>
          </div>
        )}
        <button
          onClick={signOut}
          className="w-full flex items-center gap-2 text-xs text-white/50 hover:text-red-300 transition-colors px-1"
          title="Sign out"
        >
          <LogOut className="w-3.5 h-3.5" />
          {sidebarOpen && 'Sign out'}
        </button>
      </div>
    </aside>
  );
};
