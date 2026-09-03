import React, { useState } from 'react';
import { Leaf, Github, Chrome, ShieldCheck, ExternalLink } from 'lucide-react';
import { useAuth } from '../../auth/AuthProvider';

export const LoginCard: React.FC = () => {
  const { signInWithGoogle, signInWithGitHub } = useAuth();
  const [loading, setLoading] = useState<'google' | 'github' | null>(null);

  const handleGoogle = async () => {
    setLoading('google');
    await signInWithGoogle();
    setLoading(null);
  };

  const handleGitHub = async () => {
    setLoading('github');
    await signInWithGitHub();
    setLoading(null);
  };

  return (
    <div className="min-h-screen bg-parchment flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-0">

        {/* Official Government Strip */}
        <div className="bg-ayush-forest text-white text-center py-2 px-4 text-xs font-medium rounded-t-lg border-b border-ayush-herb">
          Government of India &nbsp;|&nbsp; Ministry of AYUSH &nbsp;|&nbsp; PM Internship Scheme
        </div>

        {/* Main Card */}
        <div className="bg-surface border border-border border-t-0 rounded-b-lg shadow-panel p-8 space-y-7">

          {/* Emblem + Wordmark */}
          <div className="flex flex-col items-center gap-3 pb-1">
            <img
              src="/ayush-logo.jpg"
              alt="Ministry of AYUSH — Government of India"
              className="h-20 w-auto object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="text-center">
              <div className="text-xl font-bold text-ayush-forest tracking-tight">
                Intern<span className="text-brass">Setu</span>
                <span className="ml-2 text-xs font-bold bg-brass-pale text-brass-dark border border-brass-border px-2 py-0.5 rounded align-middle">
                  v2.0
                </span>
              </div>
              <p className="text-xs text-ink-muted mt-0.5">
                AI Skill-Bridge Platform for AYUSH Healthcare Internships
              </p>
            </div>
          </div>

          {/* Sign-in heading */}
          <div>
            <p className="text-xs font-semibold text-ink-faint uppercase tracking-widest mb-3">
              Sign in to continue
            </p>

            <div className="space-y-3">
              {/* Google */}
              <button
                onClick={handleGoogle}
                disabled={loading !== null}
                className="w-full flex items-center justify-center gap-3 bg-surface border border-border-strong text-ink font-semibold text-sm py-2.5 px-4 rounded hover:bg-parchment-warm transition-colors disabled:opacity-60"
              >
                {loading === 'google' ? (
                  <span className="w-4 h-4 border-2 border-ink-faint border-t-ink rounded-full animate-spin" />
                ) : (
                  <Chrome className="w-4 h-4 text-red-500" />
                )}
                Continue with Google
              </button>

              {/* GitHub (required for Students) */}
              <button
                onClick={handleGitHub}
                disabled={loading !== null}
                className="w-full flex items-center justify-center gap-3 bg-[#24292F] hover:bg-[#1c2128] text-white font-semibold text-sm py-2.5 px-4 rounded transition-colors disabled:opacity-60"
              >
                {loading === 'github' ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Github className="w-4 h-4" />
                )}
                Continue with GitHub
                <span className="ml-auto text-[10px] bg-white/10 px-1.5 py-0.5 rounded font-medium">
                  Students
                </span>
              </button>
            </div>
          </div>

          {/* Scope notice */}
          <p className="text-[11px] text-ink-faint text-center leading-relaxed">
            GitHub sign-in requests <code className="font-mono bg-parchment px-1 rounded">read:user</code> and{' '}
            <code className="font-mono bg-parchment px-1 rounded">public_repo</code> scopes
            to power the automated <strong>GitHub Project Scoring Engine (S_proj)</strong>.
          </p>

          {/* Decorative divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-ink-faint">AYUSH Healthcare • SIH 2026</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Four stakeholder roles */}
          <div className="grid grid-cols-2 gap-2">
            {['Student', 'Company Partner', 'Institution CRM'].map((r) => (
              <div key={r} className="flex items-center gap-1.5 text-xs text-ink-muted">
                <Leaf className="w-3 h-3 text-ayush-sage flex-shrink-0" />
                {r}
              </div>
            ))}
          </div>
        </div>

        {/* Footer attribution */}
        <p className="text-center text-[10px] text-ink-faint mt-4">
          Smart India Hackathon 2026 &nbsp;·&nbsp; Team CodeNOVA &nbsp;·&nbsp; Galgotias University
        </p>
      </div>
    </div>
  );
};
