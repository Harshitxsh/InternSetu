import React from 'react';
import { CheckCircle2, Circle, ArrowRight, Shield, Award, Lock, Sparkles } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

export const ProgressTree: React.FC = () => {
  const { jri, quests } = useAppStore();
  const currentJRI = jri?.overall_jri || 65.0;
  const isUnlocked = currentJRI >= 85.0;

  const steps = [
    {
      label: 'Diagnostic Baseline',
      points: '60.0 JRI',
      status: currentJRI >= 60.0 ? 'completed' : 'current',
      desc: 'Academic CGPA & initial AYUSH diagnostic completed'
    },
    {
      label: 'GitHub Project Verification',
      points: '70.0 JRI',
      status: currentJRI >= 70.0 ? 'completed' : currentJRI >= 60.0 ? 'current' : 'pending',
      desc: 'Code repository relevance and commit cadence scored'
    },
    {
      label: 'Specialized Skill Quests',
      points: '80.0 JRI',
      status: currentJRI >= 80.0 ? 'completed' : currentJRI >= 70.0 ? 'current' : 'pending',
      desc: 'Complete HPLC or Pharmacovigilance micro-credentials'
    },
    {
      label: 'PM Scheme Allocation Pool',
      points: '85.0+ JRI',
      status: isUnlocked ? 'completed' : 'pending',
      desc: 'Autonomous OR-Tools linear programming placement match'
    }
  ];

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div>
          <h3 className="font-bold text-ink text-sm">Readiness Pathway & Milestone Progression</h3>
          <p className="text-xs text-ink-muted">Milestone path from student diagnostic intake to national allocation</p>
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold text-brass-dark bg-brass-pale border border-brass-border px-2.5 py-1 rounded">
          {isUnlocked ? <Award className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
          <span>{isUnlocked ? 'Pool Unlocked' : 'Threshold: 85.0 JRI'}</span>
        </div>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
        {steps.map((step, idx) => {
          const isDone = step.status === 'completed';
          const isCurr = step.status === 'current';
          return (
            <div key={idx} className="relative flex items-start gap-4">
              <div
                className={`absolute -left-6 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center border text-xs font-bold transition-all ${
                  isDone
                    ? 'bg-ayush-pine text-white border-ayush-pine'
                    : isCurr
                    ? 'bg-brass text-white border-brass-dark ring-2 ring-brass/30'
                    : 'bg-surface text-ink-faint border-border'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-3 h-3" /> : idx + 1}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className={`text-xs font-bold ${isDone ? 'text-ayush-forest' : isCurr ? 'text-brass-dark' : 'text-ink-muted'}`}>
                    {step.label}
                  </h4>
                  <span className="text-[11px] font-mono font-medium text-ink-muted">{step.points}</span>
                </div>
                <p className="text-[11px] text-ink-muted mt-0.5">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
