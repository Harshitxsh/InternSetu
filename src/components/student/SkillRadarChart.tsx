import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Target, Zap } from 'lucide-react';

interface SkillRadarProps {
  userSkills?: string[];
  primaryDomain?: string;
}

const DEFAULT_RADAR_DATA = [
  { domain: 'Full-Stack Dev', score: 82, benchmark: 75 },
  { domain: 'Data Analytics', score: 70, benchmark: 80 },
  { domain: 'Cloud Infrastructure', score: 62, benchmark: 70 },
  { domain: 'Product Management', score: 58, benchmark: 65 },
  { domain: 'Digital Health Systems', score: 45, benchmark: 60 },
  { domain: 'Regulatory Compliance', score: 75, benchmark: 70 },
];

export const SkillRadarChart: React.FC<SkillRadarProps> = ({ userSkills, primaryDomain }) => {
  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-ayush-forest" />
          <h3 className="font-bold text-ink text-sm">Competency Vector vs. Industry Benchmark</h3>
        </div>
        <span className="text-[11px] text-ink-muted">6 Key AYUSH Competency Vectors</span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={DEFAULT_RADAR_DATA}>
            <PolarGrid stroke="#E2E8F0" />
            <PolarAngleAxis dataKey="domain" tick={{ fill: '#475569', fontSize: 11, fontWeight: 500 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#CBD5E1" tick={{ fontSize: 9 }} />
            <Radar
              name="Student Vector"
              dataKey="score"
              stroke="#184E38"
              fill="#184E38"
              fillOpacity={0.4}
            />
            <Radar
              name="Industry Baseline"
              dataKey="benchmark"
              stroke="#C59B27"
              fill="#C59B27"
              fillOpacity={0.15}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-6 text-xs border-t border-border pt-2 text-ink-muted">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-ayush-pine opacity-80" />
          <span>Your Vector (Dynamic)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-brass opacity-60" />
          <span>PM Internship Benchmark</span>
        </div>
      </div>
    </div>
  );
};
