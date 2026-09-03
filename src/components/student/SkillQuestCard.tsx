import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Zap, CheckCircle2, Clock, ChevronDown, ChevronUp, Award, Building2 } from 'lucide-react';
import { SkillQuest } from '../../types';
import { useAppStore } from '../../store/appStore';
import { useAuth } from '../../auth/AuthProvider';

interface SkillQuestCardProps { quest: SkillQuest; }

const DIFFICULTY_BADGE: Record<string, string> = {
  Beginner:     'badge-green',
  Intermediate: 'badge-brass',
  Advanced:     'badge-danger',
};

export const SkillQuestCard: React.FC<SkillQuestCardProps> = ({ quest }) => {
  const { user } = useAuth();
  const { completeQuest, jri } = useAppStore();
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const isCompleted = quest.status === 'COMPLETED';

  const handleComplete = async () => {
    if (!user || isCompleted) return;
    setLoading(true);
    const result = await completeQuest(user.uid, quest.id);
    setLoading(false);
    if (result) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#C59B27', '#184E38', '#3B9C72', '#D4AF37'],
      });
    }
  };

  return (
    <div className={isCompleted ? 'quest-card-completed' : 'quest-card'}>
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={DIFFICULTY_BADGE[quest.difficulty] + ' badge'}>{quest.difficulty}</span>
            <span className="badge-slate badge">{quest.category}</span>
            {isCompleted && (
              <span className="badge badge-green">
                <CheckCircle2 className="w-3 h-3" /> Completed
              </span>
            )}
          </div>
          <h4 className="font-bold text-ink text-sm leading-snug">{quest.title}</h4>
          <p className="text-xs text-ink-muted mt-0.5 line-clamp-2">{quest.description}</p>
        </div>

        {/* JRI Boost badge — prominent */}
        <div className={`flex-shrink-0 flex flex-col items-center justify-center min-w-[64px] rounded-lg p-2 border text-center ${
          isCompleted
            ? 'bg-ayush-mint border-ayush-sage/30 text-ayush-pine'
            : 'bg-brass-pale border-brass-border text-brass-dark'
        }`}>
          <Zap className={`w-4 h-4 mb-0.5 ${isCompleted ? 'text-ayush-leaf' : 'text-brass'}`} />
          <span className="text-base font-black leading-none">+{quest.jri_boost_percent}%</span>
          <span className="text-[9px] font-semibold mt-0.5 opacity-70">JRI Boost</span>
        </div>
      </div>

      {/* Meta info */}
      <div className="flex items-center gap-4 text-xs text-ink-muted">
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {quest.duration_days} days</span>
        <span className="flex items-center gap-1"><Award className="w-3 h-3 text-brass" /> {quest.xp_reward} XP</span>
        <span className="flex items-center gap-1 truncate"><Building2 className="w-3 h-3" /> {quest.sponsor_company}</span>
      </div>

      {/* Syllabus accordion */}
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs font-semibold text-ayush-sage hover:text-ayush-forest transition-colors"
        >
          Syllabus ({quest.syllabus.length} modules)
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {expanded && (
          <ul className="mt-2 space-y-1 border-t border-border pt-2">
            {quest.syllabus.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-ink-muted">
                <span className="w-4 h-4 rounded-full bg-ayush-mint text-ayush-pine text-[9px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* CTA */}
      {isCompleted ? (
        <div className="flex items-center gap-2 text-xs text-ayush-pine font-semibold pt-1 border-t border-ayush-sage/20">
          <CheckCircle2 className="w-4 h-4 text-ayush-leaf" />
          +{quest.jri_boost_percent}% JRI applied to your score
        </div>
      ) : (
        <button
          onClick={handleComplete}
          disabled={loading}
          className="btn-primary w-full justify-center disabled:opacity-60"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-ayush-forest/30 border-t-ayush-forest rounded-full animate-spin" />
          ) : (
            <Zap className="w-4 h-4" />
          )}
          {loading ? 'Processing...' : `Complete Quest & Claim +${quest.jri_boost_percent}% JRI`}
        </button>
      )}
    </div>
  );
};
