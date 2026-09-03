import React, { useEffect } from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Minus, ShieldCheck } from 'lucide-react';
import { JRIBreakdown } from '../../types';

interface JRIGaugeProps { jri: JRIBreakdown; }

const FACTOR_LABELS = [
  { key: 's_assess', label: 'Assessment',      weight: '35%', color: '#C59B27' },
  { key: 's_proj',   label: 'GitHub Projects', weight: '30%', color: '#184E38' },
  { key: 's_resume', label: 'Resume ATS',      weight: '20%', color: '#2D7A5A' },
  { key: 's_acad',   label: 'Academic',        weight: '15%', color: '#8B7355' },
];

export const JRIGauge: React.FC<JRIGaugeProps> = ({ jri }) => {
  const score = jri.overall_jri;
  const isAllocation = jri.tier === 'ALLOCATION_MODE';
  const chartData = [{ name: 'JRI', value: score, fill: isAllocation ? '#C59B27' : '#184E38' }];

  const tierColor = isAllocation ? 'text-brass-dark' : 'text-ayush-forest';
  const tierBg = isAllocation ? 'bg-brass-pale border-brass-border' : 'bg-ayush-mint border-ayush-sage/30';

  return (
    <div className="card space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-ink text-sm">Job Readiness Index (JRI)</h3>
          <p className="text-xs text-ink-muted">
            JRI = 0.35 × S<sub>assess</sub> + 0.30 × S<sub>proj</sub> + 0.20 × S<sub>resume</sub> + 0.15 × S<sub>acad</sub>
          </p>
        </div>
        <span className={`badge ${tierBg} ${tierColor} border font-bold text-[11px] px-2.5 py-1`}>
          {isAllocation ? '🎯 Allocation Mode' : '📚 Quest Mode'}
        </span>
      </div>

      {/* Radial Chart */}
      <div className="flex items-center gap-6">
        <div className="relative w-36 h-36 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%" cy="50%"
              innerRadius="70%" outerRadius="100%"
              startAngle={90} endAngle={-270}
              data={chartData}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar dataKey="value" cornerRadius={4} background={{ fill: '#E8D98A30' }} />
            </RadialBarChart>
          </ResponsiveContainer>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-ink tabular-nums">{score.toFixed(1)}</span>
            <span className="text-[10px] text-ink-muted font-semibold">/ 100</span>
          </div>
        </div>

        {/* 4 Factor breakdown */}
        <div className="flex-1 space-y-2.5">
          {FACTOR_LABELS.map(({ key, label, weight, color }) => {
            const val = jri[key as keyof JRIBreakdown] as number;
            return (
              <div key={key} className="space-y-0.5">
                <div className="flex justify-between text-xs">
                  <span className="text-ink-muted font-medium">{label} <span className="text-ink-faint">({weight})</span></span>
                  <span className="font-bold tabular-nums" style={{ color }}>{val.toFixed(1)}</span>
                </div>
                <div className="jri-bar-track">
                  <div className="jri-bar-fill" style={{ width: `${val}%`, backgroundColor: color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 border-t border-border pt-4">
        <div className="metric-cell items-center text-center">
          <span className="metric-value text-xl">{jri.percentile.toFixed(0)}<span className="text-sm font-medium">%ile</span></span>
          <span className="metric-label">Percentile Rank</span>
        </div>
        <div className="metric-cell items-center text-center">
          <span className="metric-value text-xl text-ayush-leaf">{jri.top_strengths[0] ?? '—'}</span>
          <span className="metric-label">Top Strength</span>
        </div>
        <div className="metric-cell items-center text-center">
          <span className="metric-value text-xl text-warn">{jri.skill_gaps[0] ?? '—'}</span>
          <span className="metric-label">Key Gap</span>
        </div>
      </div>

      {/* Threshold bar */}
      {!isAllocation && (
        <div className="flex items-center gap-2 bg-brass-pale border border-brass-border rounded p-2.5 text-xs text-brass-dark">
          <ShieldCheck className="w-4 h-4 flex-shrink-0" />
          <span>
            <strong>{(85 - score).toFixed(1)} pts</strong> needed to unlock the Allocation Pool (threshold: 85 / 100).
            Complete Skill Quests to close the gap!
          </span>
        </div>
      )}
    </div>
  );
};
