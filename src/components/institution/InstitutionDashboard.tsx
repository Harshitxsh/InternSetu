import React from 'react';
import { Landmark, TrendingUp, AlertTriangle, CheckCircle2, BarChart2, PieChart, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const COHORT_DISTRIBUTION = [
  { range: '>= 85 (Pool Ready)', count: 42, color: '#C59B27' },
  { range: '70 - 84 (Near Ready)', count: 98, color: '#184E38' },
  { range: '55 - 69 (Quest Mode)', count: 87, color: '#2D7A5A' },
  { range: '< 55 (Foundational)', count: 21, color: '#94A3B8' },
];

const SKILL_HEATMAP = [
  { skill: 'HPLC Quality Control', demand: 88, supply: 34, gap: 54 },
  { skill: 'Bioinformatics (R / Bioconductor)', demand: 72, supply: 28, gap: 44 },
  { skill: 'FHIR / ABDM APIs', demand: 65, supply: 18, gap: 47 },
  { skill: 'Molecular Docking (AutoDock)', demand: 58, supply: 21, gap: 37 },
  { skill: 'Pharmacovigilance NLP', demand: 54, supply: 12, gap: 42 },
  { skill: 'GMP Compliance & SOPs', demand: 80, supply: 55, gap: 25 },
  { skill: 'Python / ML Modeling', demand: 92, supply: 78, gap: 14 },
];

export const InstitutionDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-ayush-forest text-white rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="section-label text-white/50 mb-0.5">Institution & University Console</div>
          <h1 className="text-xl font-bold">Cohort Placement Analytics & Skill Demand Heatmap</h1>
          <p className="text-xs text-white/70 mt-1 max-w-2xl">
            Real-time readiness telemetry across academic departments, identifying curriculum gaps against Ministry of AYUSH industry requirements.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="bg-white/10 px-4 py-2 rounded text-center">
            <div className="text-2xl font-bold text-brass">248</div>
            <div className="text-[10px] text-white/70">Enrolled Cohort</div>
          </div>
          <div className="bg-white/10 px-4 py-2 rounded text-center">
            <div className="text-2xl font-bold text-ayush-leaf">16.9%</div>
            <div className="text-[10px] text-white/70">Already Allocated</div>
          </div>
        </div>
      </div>

      {/* Grid: JRI Distribution & Curriculum Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cohort Readiness Histogram */}
        <div className="card space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <h2 className="text-sm font-bold text-ink flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-ayush-forest" />
                Student Cohort JRI Score Distribution
              </h2>
              <p className="text-xs text-ink-muted">248 active candidates assessed</p>
            </div>
            <span className="badge-green badge">42 Eligible for PM Scheme</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={COHORT_DISTRIBUTION} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis dataKey="range" tick={{ fontSize: 10, fill: '#64748B' }} interval={0} />
                <YAxis tick={{ fontSize: 10, fill: '#64748B' }} />
                <Tooltip />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {COHORT_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs border-t border-border pt-3">
            <div className="flex items-center gap-1.5 text-brass-dark font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-brass" />
              <span>42 Students at or above 85.0 JRI</span>
            </div>
            <div className="flex items-center gap-1.5 text-ayush-forest font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-ayush-pine" />
              <span>98 Students 1-2 Quests away</span>
            </div>
          </div>
        </div>

        {/* Skill Demand vs Supply Heatmap */}
        <div className="card space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <h2 className="text-sm font-bold text-ink flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-warn" />
                AYUSH Curriculum Gap Analysis (Demand vs Supply)
              </h2>
              <p className="text-xs text-ink-muted">Calculated against 50+ enterprise job specifications</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {SKILL_HEATMAP.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-ink">{item.skill}</span>
                  <span className="font-bold text-red-600">Gap: +{item.gap}%</span>
                </div>
                <div className="w-full h-2 bg-parchment-warm rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${item.supply}%` }}
                    className="bg-ayush-pine h-full"
                    title={`Student Supply: ${item.supply}%`}
                  />
                  <div
                    style={{ width: `${item.gap}%` }}
                    className="bg-red-400 h-full opacity-80"
                    title={`Industry Deficit: ${item.gap}%`}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-ink-muted">
                  <span>Student Supply: {item.supply}%</span>
                  <span>Enterprise Demand: {item.demand}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
