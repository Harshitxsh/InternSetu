import React, { useEffect, useState, useRef } from 'react';
import { 
  Cpu, 
  CheckCircle2, 
  Terminal, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Activity, 
  ArrowRight, 
  FastForward,
  Building2,
  FileCheck,
  Award
} from 'lucide-react';
import { ProcessingStage, StudentProfile } from '../types';
import { INITIAL_PROCESSING_STAGES } from '../data/mockData';

interface ProcessingPipelineProps {
  profile: StudentProfile;
  onComplete: () => void;
}

export const ProcessingPipeline: React.FC<ProcessingPipelineProps> = ({
  profile,
  onComplete,
}) => {
  const [stages, setStages] = useState<ProcessingStage[]>(INITIAL_PROCESSING_STAGES);
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [overallProgress, setOverallProgress] = useState<number>(10);
  const [liveLogs, setLiveLogs] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [liveLogs]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    // Simulate stage progress sequentially
    const runSimulation = () => {
      const stageSequence = [
        {
          index: 0,
          duration: 1800,
          logs: [
            `[00.12s] Initializing PyMuPDF LayoutLMv3 parser on '${profile.resumeFileName}'...`,
            `[00.45s] Optical OCR bounding boxes resolved with 99.4% confidence.`,
            `[00.82s] Extracted entities: Candidate Name: ${profile.fullName}, Degree: ${profile.degree}`,
            `[01.20s] Found ${profile.skills.length} declared skills & verified capstone project artifact.`
          ]
        },
        {
          index: 1,
          duration: 2000,
          logs: [
            `[01.50s] Invoking Anti-Fluff & AI-Hallucination Credibility Model...`,
            `[01.90s] Cross-referencing claimed repository commits with Git heuristics...`,
            `[02.30s] Semantic consistency check passed: Zero generative spam templates detected.`,
            `[02.70s] Authenticity verification complete. Credibility Index: ${profile.credibilityIndex}%`
          ]
        },
        {
          index: 2,
          duration: 2200,
          logs: [
            `[03.10s] Querying MCA Affirmative Allocation Rule-Engine v2.4...`,
            `[03.40s] Evaluating Demographic Matrix: Category = ${profile.socialCategory}, Income = ${profile.annualIncome}`,
            `[03.80s] Institute Normalization: ${profile.instituteType} (+15% Tier-3 Weightage Active)`,
            `[04.20s] Aspirational District Bonus applied for ${profile.district} (+5.0 pts).`
          ]
        },
        {
          index: 3,
          duration: 2400,
          logs: [
            `[04.60s] Projecting 1536-dimensional competency embedding onto PM Scheme Vector Space...`,
            `[05.00s] Cosine Similarity search executed across 12,400+ Fortune 500 corporate vacancies...`,
            `[05.40s] Top Enterprise Matches identified: Tata Motors (92%), L&T Tech (88%), Infosys (85%).`,
            `[05.80s] Verified Direct Benefit Transfer (DBT) quota compliance.`
          ]
        },
        {
          index: 4,
          duration: 1800,
          logs: [
            `[06.20s] Aggregating composite 100-point explainable allocation index...`,
            `[06.60s] Composite Score calculated: High Affinity Allocation Pool (Tier 1 Priority).`,
            `[07.00s] Synthesizing personalized Gamified Skill Quests (+8% to +14% eligibility boost).`,
            `[07.30s] AI Smart Allocation Pipeline successfully completed!`
          ]
        }
      ];

      let elapsed = 0;
      stageSequence.forEach((step, sIdx) => {
        timer = setTimeout(() => {
          setCurrentStageIndex(sIdx);
          setOverallProgress(Math.round(((sIdx + 1) / stageSequence.length) * 100));
          
          setStages(prev => prev.map((stage, idx) => {
            if (idx < sIdx) return { ...stage, status: 'done', progress: 100 };
            if (idx === sIdx) return { ...stage, status: 'active', progress: 100 };
            return { ...stage, status: 'waiting', progress: 0 };
          }));

          // Stream logs
          step.logs.forEach((log, logIdx) => {
            setTimeout(() => {
              setLiveLogs(prev => [...prev, log]);
            }, logIdx * 350);
          });

          if (sIdx === stageSequence.length - 1) {
            setTimeout(() => {
              setStages(prev => prev.map(s => ({ ...s, status: 'done', progress: 100 })));
              setIsFinished(true);
            }, step.duration);
          }

        }, elapsed);

        elapsed += step.duration;
      });
    };

    runSimulation();

    return () => clearTimeout(timer);
  }, []);

  const handleSkip = () => {
    setStages(prev => prev.map(s => ({ ...s, status: 'done', progress: 100 })));
    setOverallProgress(100);
    setCurrentStageIndex(4);
    setIsFinished(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl border border-slate-800 relative overflow-hidden">
        {/* Background circuit glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-blue-950 border border-blue-600/50 rounded-full px-3 py-1 text-xs font-bold text-blue-300">
              <Activity className="w-3.5 h-3.5 animate-spin text-amber-400" />
              <span>AI SMART ALLOCATION ENGINE IN PROGRESS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Evaluating Profile: <span className="text-amber-400">{profile.fullName}</span>
            </h2>
            <p className="text-sm text-slate-300">
              Applying Multi-Factor PM Scheme Affirmative Weights, Anti-Fluff Credibility, and Top-500 Enterprise Embeddings
            </p>
          </div>

          {/* Quick Skip button for demo */}
          <div className="flex items-center space-x-3">
            {!isFinished ? (
              <button
                onClick={handleSkip}
                className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                <FastForward className="w-4 h-4 text-amber-400" />
                <span>Fast-Forward AI Pipeline</span>
              </button>
            ) : (
              <button
                onClick={onComplete}
                className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black px-6 py-3 rounded-xl text-sm shadow-lg shadow-emerald-500/25 transition-all hover:scale-105"
              >
                <span>View Gamified Allocation Results</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-8 space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-300">
            <span className="flex items-center">
              <Cpu className="w-4 h-4 mr-1.5 text-blue-400" />
              Pipeline Execution: {overallProgress}% Complete
            </span>
            <span className="font-mono text-amber-400">
              {isFinished ? 'STATUS: ALLOCATION MATRIX READY' : 'STATUS: COMPUTING NEURAL VECTOR MATCH'}
            </span>
          </div>

          <div className="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-400 to-emerald-400 rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${overallProgress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: 5 Sequential Stages (Left) & Live Telemetry Terminal (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: 5 Pipeline Stages */}
        <div className="lg:col-span-7 space-y-3.5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 px-1 flex items-center">
            <ShieldCheck className="w-4 h-4 mr-1.5 text-blue-600" />
            Active Verification & Allocation Pipeline
          </h3>

          {stages.map((stage, index) => {
            const isActive = stage.status === 'active';
            const isDone = stage.status === 'done';
            const isWaiting = stage.status === 'waiting';

            return (
              <div
                key={stage.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isActive
                    ? 'bg-blue-50/80 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                    : isDone
                    ? 'bg-white border-emerald-200/80 shadow-sm'
                    : 'bg-slate-50/60 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start space-x-3">
                    {/* Stage Number / Status Icon */}
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 mt-0.5 ${
                        isDone
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : isActive
                          ? 'bg-blue-600 text-white animate-pulse shadow-md'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-5 h-5" /> : stage.id}
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-bold text-slate-900">
                          {stage.name}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md border border-slate-200">
                          {stage.techLabel}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Metric / Status Badge */}
                  <div className="flex flex-col items-end flex-shrink-0">
                    {isDone && (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                        {stage.badge || 'Verified'}
                      </span>
                    )}

                    {isActive && (
                      <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full flex items-center animate-pulse">
                        <Activity className="w-3.5 h-3.5 mr-1 animate-spin" />
                        Processing...
                      </span>
                    )}

                    {isWaiting && (
                      <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                        Queued
                      </span>
                    )}

                    {stage.metricLabel && (
                      <div className="mt-1 text-right">
                        <span className="text-[10px] text-slate-500">{stage.metricLabel}: </span>
                        <span className="text-xs font-black text-slate-800">{stage.metricValue}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Live AI Terminal Stream */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-950 text-slate-100 rounded-2xl p-5 shadow-2xl border border-slate-800 flex flex-col h-[460px]">
            
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
                <span className="text-xs font-mono text-slate-400 pl-2">internsetu-ai-kernel.log</span>
              </div>
              <span className="flex items-center text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-ping"></span>
                STREAMING
              </span>
            </div>

            {/* Terminal Scroll Content */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 font-mono text-[11px] leading-relaxed text-slate-300">
              <div className="text-slate-500">
                # PM Internship Scheme Smart Allocation Engine v2.4 (SIH 2026)
              </div>
              <div className="text-slate-500">
                # Initializing secure model context on local node...
              </div>

              {liveLogs.map((log, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <span className="text-blue-400 select-none">&gt;</span>
                  <span className={log.includes('Verified') || log.includes('passed') || log.includes('completed') ? 'text-emerald-400 font-semibold' : 'text-slate-200'}>
                    {log}
                  </span>
                </div>
              ))}

              {!isFinished && (
                <div className="flex items-center space-x-2 text-amber-400 animate-pulse pt-1">
                  <span className="select-none">&gt;</span>
                  <span>Executing next neural node...</span>
                  <span className="inline-block w-2 h-4 bg-amber-400 ml-1 animate-ping"></span>
                </div>
              )}

              <div ref={terminalEndRef} />
            </div>

            {/* Terminal Footer */}
            <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>Latency: 18ms</span>
              <span>Memory: 384 MB</span>
              <span>Encrypted SHA-256</span>
            </div>
          </div>

          {/* Bottom Callout when finished */}
          {isFinished && (
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-5 rounded-2xl shadow-xl flex items-center justify-between animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="space-y-1">
                <h4 className="text-sm font-black flex items-center">
                  <Award className="w-4 h-4 mr-1.5 text-amber-300" />
                  Allocation Match Ready!
                </h4>
                <p className="text-xs text-emerald-100">
                  Overall Composite Score: <strong className="text-white font-bold">76 / 100</strong> (Tier 1 Direct Match)
                </p>
              </div>
              <button
                onClick={onComplete}
                className="bg-white hover:bg-slate-100 text-emerald-950 font-black px-4 py-2 rounded-xl text-xs shadow-md transition-transform hover:scale-105 flex items-center space-x-1 flex-shrink-0"
              >
                <span>View Results</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
