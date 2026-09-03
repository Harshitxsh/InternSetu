import React, { useEffect, useState } from 'react';
import { JRIGauge } from './JRIGauge';
import { SkillRadarChart } from './SkillRadarChart';
import { GitHubSyncCard } from './GitHubSyncCard';
import { ProgressTree } from './ProgressTree';
import { QuestDashboard } from './QuestDashboard';
import { AllocationPool } from './AllocationPool';
import { useAppStore } from '../../store/appStore';
import { useAuth } from '../../auth/AuthProvider';
import { InternshipMatch } from '../../types';
import { Award, Zap, Briefcase, RefreshCw, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

interface StudentDashboardProps {
  onOpenPassModal: (match: InternshipMatch) => void;
  onOpenExplainabilityModal: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onOpenPassModal, onOpenExplainabilityModal }) => {
  const { jri, fetchJRI, calculateJRI, user: storeUser } = useAppStore();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'AUTO' | 'QUESTS' | 'ALLOCATION'>('AUTO');

  useEffect(() => {
    if (user) {
      fetchJRI(user.uid);
    }
  }, [user?.uid]);

  const currentJRI = jri?.overall_jri || 68.5;
  const isAllocationEligible = currentJRI >= 85.0;

  return (
    <div className="space-y-6">
      {/* Top Banner / SIH Venue Demo Controls */}
      <div className="bg-surface border border-border rounded-lg p-4 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-ayush-mint flex items-center justify-center text-ayush-forest font-bold">
            {user?.name.charAt(0) || 'A'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-ink">{user?.name || 'Arjun Sharma'}</h1>
              <span className="badge-green badge">Verified Candidate</span>
            </div>
            <p className="text-xs text-ink-muted">
              Student Profile
            </p>
          </div>
        </div>
      </div>

      {/* Primary Analytics Grid: JRI Gauge & Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {jri && <JRIGauge jri={jri} />}
        <SkillRadarChart />
      </div>

      {/* Secondary Row: GitHub Engine & Pathway Progression */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GitHubSyncCard />
        <ProgressTree />
      </div>

      {/* Dynamic Conditional Branch: Quest Mode vs Allocation Mode */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <div className="flex items-center gap-2">
            <span className="section-label">Platform Operating Tier</span>
            <span className={`badge ${isAllocationEligible ? 'badge-brass' : 'badge-green'}`}>
              {isAllocationEligible ? 'Tier 2: PM Scheme Allocation' : 'Tier 1: Skill Quest Upskilling'}
            </span>
          </div>

          {/* Tab overrides */}
          <div className="flex items-center gap-1 bg-parchment-warm p-1 rounded text-xs border border-border">
            <button
              onClick={() => setActiveTab('AUTO')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                activeTab === 'AUTO' ? 'bg-white shadow text-ayush-forest font-semibold' : 'text-ink-muted hover:text-ink'
              }`}
            >
              Dynamic Mode
            </button>
            <button
              onClick={() => setActiveTab('QUESTS')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                activeTab === 'QUESTS' ? 'bg-white shadow text-ayush-forest font-semibold' : 'text-ink-muted hover:text-ink'
              }`}
            >
              Skill Quests
            </button>
            <button
              onClick={() => setActiveTab('ALLOCATION')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                activeTab === 'ALLOCATION' ? 'bg-white shadow text-ayush-forest font-semibold' : 'text-ink-muted hover:text-ink'
              }`}
            >
              Allocation Pool
            </button>
          </div>
        </div>

        {/* Dynamic Branch Render */}
        {activeTab === 'AUTO' ? (
          isAllocationEligible ? (
            <AllocationPool
              onOpenPassModal={onOpenPassModal}
              onOpenExplainabilityModal={onOpenExplainabilityModal}
            />
          ) : (
            <QuestDashboard />
          )
        ) : activeTab === 'QUESTS' ? (
          <QuestDashboard />
        ) : (
          <AllocationPool
            onOpenPassModal={onOpenPassModal}
            onOpenExplainabilityModal={onOpenExplainabilityModal}
          />
        )}
      </div>
    </div>
  );
};
