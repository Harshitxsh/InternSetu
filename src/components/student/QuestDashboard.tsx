import React, { useEffect } from 'react';
import { Zap, Loader2, Info, BookOpen } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { useAuth } from '../../auth/AuthProvider';
import { SkillQuestCard } from './SkillQuestCard';

export const QuestDashboard: React.FC = () => {
  const { quests, questsLoading, fetchQuests, jri } = useAppStore();
  const { user } = useAuth();

  useEffect(() => {
    if (user) fetchQuests(user.uid);
  }, [user?.uid]);

  const completedCount = quests.filter(q => q.status === 'COMPLETED').length;
  const totalBoost = quests.filter(q => q.status === 'COMPLETED').reduce((s, q) => s + q.jri_boost_percent, 0);
  const available = quests.filter(q => q.status !== 'COMPLETED');
  const completed = quests.filter(q => q.status === 'COMPLETED');

  return (
    <div className="space-y-5">
      {/* Header banner */}
      <div className="bg-ayush-forest text-white rounded-lg px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="section-label text-white/50 mb-0.5">Gamified Skill Development</div>
          <h2 className="text-lg font-bold">AYUSH Skill Quest Roadmap</h2>
          <p className="text-xs text-white/60 mt-0.5">
            Complete enterprise-sponsored quests to close skill gaps and unlock the Allocation Pool (85 / 100 JRI).
          </p>
        </div>
        <div className="flex gap-4 flex-shrink-0">
          <div className="text-center">
            <div className="text-2xl font-black text-brass">{completedCount}</div>
            <div className="text-[10px] text-white/50">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-white">+{totalBoost.toFixed(1)}%</div>
            <div className="text-[10px] text-white/50">Total Boost</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-white">{available.length}</div>
            <div className="text-[10px] text-white/50">Available</div>
          </div>
        </div>
      </div>

      {/* JRI threshold tracker */}
      {jri && (
        <div className="card-compact flex items-center gap-3">
          <div className="flex-1 space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-ink-muted">Progress to Allocation Pool (85 pts threshold)</span>
              <span className="text-ink font-bold">{jri.overall_jri.toFixed(1)} / 85</span>
            </div>
            <div className="jri-bar-track">
              <div
                className="jri-bar-fill"
                style={{
                  width: `${Math.min(100, (jri.overall_jri / 85) * 100)}%`,
                  background: jri.tier === 'ALLOCATION_MODE'
                    ? 'linear-gradient(90deg, #C59B27, #D4AF37)'
                    : 'linear-gradient(90deg, #184E38, #3B9C72)'
                }}
              />
            </div>
          </div>
          {jri.tier === 'ALLOCATION_MODE' && (
            <span className="badge-green badge font-bold flex-shrink-0">🎯 Unlocked!</span>
          )}
        </div>
      )}

      {/* Loading state */}
      {questsLoading && (
        <div className="flex items-center justify-center py-16 gap-2 text-ink-muted text-sm">
          <Loader2 className="w-5 h-5 animate-spin" />
          Generating personalised AYUSH quest roadmap...
        </div>
      )}

      {/* Available quests */}
      {!questsLoading && available.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-brass" />
            <h3 className="font-bold text-sm text-ink">Available Quests ({available.length})</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {available.map(q => <SkillQuestCard key={q.id} quest={q} />)}
          </div>
        </div>
      )}

      {/* Completed quests */}
      {completed.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-ayush-leaf" />
            <h3 className="font-bold text-sm text-ink">Completed ({completed.length})</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {completed.map(q => <SkillQuestCard key={q.id} quest={q} />)}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!questsLoading && quests.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
          <Info className="w-10 h-10 text-ink-faint" />
          <p className="text-sm text-ink-muted">No quests generated yet. Complete your profile and calculate your JRI first.</p>
        </div>
      )}
    </div>
  );
};
