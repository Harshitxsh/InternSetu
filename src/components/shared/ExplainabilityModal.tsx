import React from 'react';
import { X, CheckCircle, ShieldAlert, Cpu, Terminal, Scale } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

interface ExplainabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExplainabilityModal: React.FC<ExplainabilityModalProps> = ({ isOpen, onClose }) => {
  const { jri } = useAppStore();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg border border-border shadow-panel max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-ayush-forest" />
            <h2 className="text-base font-bold text-ayush-forest">
              AI Explainability & Algorithmic Audit Console
            </h2>
          </div>
          <button onClick={onClose} className="text-ink-muted hover:text-ink text-sm">✕</button>
        </div>

        {/* JRI Mathematical Formula */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-ink uppercase tracking-wider">
            1. 100-Point Job Readiness Index (JRI) Formulation
          </h3>
          <div className="bg-ayush-forest text-brass-light p-3.5 rounded font-mono text-xs overflow-x-auto">
            JRI = (0.35 &times; S_assess) + (0.30 &times; S_proj) + (0.20 &times; S_resume) + (0.15 &times; S_acad)
          </div>
          <p className="text-xs text-ink-muted leading-relaxed">
            Every candidate is holistically evaluated on four orthogonal pillars. The composite score determines conditional routing:
            <strong> JRI &lt; 85</strong> routes to adaptive Skill Quest remediation, while <strong>JRI &ge; 85</strong> qualifies for autonomous PM Scheme allocation.
          </p>
        </div>

        {/* Current Candidate Calculation Breakdown */}
        {jri && (
          <div className="border border-border rounded p-3 space-y-2 bg-parchment/50">
            <span className="text-xs font-semibold text-ink">Candidate Vector Breakdown:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              <div className="bg-surface p-2 rounded border border-border">
                <div className="text-[10px] text-ink-muted">S_assess (35%)</div>
                <div className="font-bold text-ayush-forest">{jri.s_assess.toFixed(1)} &times; 0.35 = {(jri.s_assess * 0.35).toFixed(1)}</div>
              </div>
              <div className="bg-surface p-2 rounded border border-border">
                <div className="text-[10px] text-ink-muted">S_proj (30%)</div>
                <div className="font-bold text-ayush-forest">{jri.s_proj.toFixed(1)} &times; 0.30 = {(jri.s_proj * 0.30).toFixed(1)}</div>
              </div>
              <div className="bg-surface p-2 rounded border border-border">
                <div className="text-[10px] text-ink-muted">S_resume (20%)</div>
                <div className="font-bold text-ayush-forest">{jri.s_resume.toFixed(1)} &times; 0.20 = {(jri.s_resume * 0.20).toFixed(1)}</div>
              </div>
              <div className="bg-surface p-2 rounded border border-border">
                <div className="text-[10px] text-ink-muted">S_acad (15%)</div>
                <div className="font-bold text-ayush-forest">{jri.s_acad.toFixed(1)} &times; 0.15 = {(jri.s_acad * 0.15).toFixed(1)}</div>
              </div>
            </div>
            <div className="text-right text-xs font-bold text-ink">
              Total Evaluated JRI: <span className="text-brass-dark">{jri.overall_jri.toFixed(1)} / 100</span>
            </div>
          </div>
        )}

        {/* OR-Tools ILP Formulation */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-ink uppercase tracking-wider">
            <Scale className="w-4 h-4 text-ayush-forest" />
            2. Google OR-Tools Integer Linear Programming (ILP) Formulation
          </div>
          <div className="bg-slate-900 text-slate-100 p-3.5 rounded font-mono text-[11px] leading-relaxed overflow-x-auto">
            <div className="text-emerald-400"># Objective Function: Maximize Total Candidate-Seat Semantic Match</div>
            <div>maximize &sum;<sub>i,j</sub> (Similarity(C<sub>i</sub>, S<sub>j</sub>) &times; x<sub>i,j</sub>)</div>
            <div className="text-emerald-400 mt-2"># Subject To Operational Constraints:</div>
            <div>1. Capacity: &sum;<sub>i</sub> x<sub>i,j</sub> &le; Capacity(S<sub>j</sub>) &forall; seat j</div>
            <div>2. Single Match: &sum;<sub>j</sub> x<sub>i,j</sub> &le; 1 &forall; candidate i</div>
            <div>3. Merit Threshold: x<sub>i,j</sub> = 0 if JRI(C<sub>i</sub>) &lt; 85.0</div>
            <div>4. Domain Representation: &sum;<sub>i &in; Dom(k)</sub> x<sub>i,j</sub> &ge; MinFloor(k)</div>
          </div>
        </div>

        {/* Anti-Hallucination & Bias Safeguards */}
        <div className="space-y-2 text-xs text-ink-muted">
          <span className="font-semibold text-ink">Bias Mitigation & Auditability:</span>
          <ul className="list-disc pl-5 space-y-1">
            <li>No black-box proprietary LLM hallucination in placement decisions.</li>
            <li>Sentence-BERT generates deterministic cosine similarity embeddings.</li>
            <li>All constraints are mathematically verifiable through the CP-SAT solver.</li>
          </ul>
        </div>

        <div className="flex justify-end pt-3 border-t border-border">
          <button onClick={onClose} className="btn-primary text-xs">
            Acknowledge & Close Audit
          </button>
        </div>
      </div>
    </div>
  );
};
