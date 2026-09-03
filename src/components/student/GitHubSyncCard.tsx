import React, { useState } from 'react';
import { Github, RefreshCw, Code2, GitCommit, Star, ExternalLink } from 'lucide-react';
import { GitHubSnapshot } from '../../types';
import { useAppStore } from '../../store/appStore';
import { useAuth } from '../../auth/AuthProvider';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';

export const GitHubSyncCard: React.FC = () => {
  const { githubSnapshot, githubLoading, syncGitHub, user: storeUser } = useAppStore();
  const { user } = useAuth();
  const [username, setUsername] = useState(user?.github_username ?? 'arjun-ayurveda-dev');

  const handleSync = () => {
    syncGitHub(username, user?.github_token);
  };

  const snap = githubSnapshot;

  // Build language distribution for radar
  const langData = snap
    ? Object.entries(snap.primary_languages)
        .slice(0, 6)
        .map(([name, count]) => ({ subject: name, A: count }))
    : [];

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Github className="w-5 h-5 text-ink" />
          <h3 className="font-bold text-ink text-sm">GitHub Project Score (S<sub>proj</sub>)</h3>
        </div>
        <div className="flex items-center gap-2">
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="form-input text-xs py-1 w-40"
            placeholder="github-username"
          />
          <button onClick={handleSync} disabled={githubLoading} className="btn-primary text-xs py-1 px-3 disabled:opacity-60">
            {githubLoading ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5" />
            )}
            {githubLoading ? 'Syncing...' : 'Sync'}
          </button>
        </div>
      </div>

      {!snap ? (
        <div className="flex flex-col items-center justify-center py-10 text-center gap-3 border-2 border-dashed border-border rounded-lg">
          <Github className="w-10 h-10 text-ink-faint" />
          <div>
            <p className="text-sm font-semibold text-ink">Connect GitHub to score your projects</p>
            <p className="text-xs text-ink-muted mt-0.5">
              Fetches public repos, analyzes AYUSH domain relevance, CI/CD, and commit velocity
            </p>
          </div>
          <button onClick={handleSync} className="btn-primary text-xs">
            <Github className="w-3.5 h-3.5" /> Sync GitHub Profile
          </button>
        </div>
      ) : (
        <>
          {/* Score hero */}
          <div className="flex items-center gap-4 bg-ayush-mint border border-ayush-sage/30 rounded-lg p-4">
            <div className="text-center">
              <div className="text-4xl font-black text-ayush-forest tabular-nums">{snap.s_proj_score.toFixed(1)}</div>
              <div className="text-xs text-ayush-sage font-semibold">S_proj / 100</div>
            </div>
            <div className="flex-1 space-y-1 text-sm">
              <div className="flex justify-between text-xs">
                <span className="text-ink-muted">Repositories:</span>
                <span className="font-bold text-ink">{snap.total_repos}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-ink-muted">Commit Velocity:</span>
                <span className="font-bold text-ink">{snap.commit_velocity.toFixed(1)} / week</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-ink-muted">Profile:</span>
                <a
                  href={`https://github.com/${snap.username}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-ayush-forest flex items-center gap-1 hover:underline"
                >
                  @{snap.username} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Language radar */}
          {langData.length > 0 && (
            <div className="h-36">
              <p className="text-xs font-semibold text-ink-muted mb-1">Language Distribution</p>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={langData}>
                  <PolarGrid stroke="#E2E8F0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748B' }} />
                  <Radar dataKey="A" stroke="#184E38" fill="#184E38" fillOpacity={0.2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Top repos table */}
          <div>
            <p className="text-xs font-semibold text-ink-muted mb-1.5">Top Repositories (AYUSH Relevance Ranked)</p>
            <div className="border border-border rounded-lg overflow-hidden">
              <table>
                <thead>
                  <tr>
                    <th>Repository</th>
                    <th>Language</th>
                    <th className="text-center"><Star className="w-3 h-3 inline" /></th>
                    <th>CI/Docker</th>
                  </tr>
                </thead>
                <tbody>
                  {snap.repos.slice(0, 5).map((repo) => (
                    <tr key={repo.name}>
                      <td className="font-medium text-ayush-forest">{repo.name}</td>
                      <td>
                        <span className="badge-slate">{repo.language ?? 'N/A'}</span>
                      </td>
                      <td className="text-center font-mono text-xs">{repo.stars}</td>
                      <td>
                        <div className="flex gap-1">
                          {repo.has_ci && <span className="badge-green text-[10px]">CI</span>}
                          {repo.has_dockerfile && <span className="badge-info text-[10px]">Docker</span>}
                          {!repo.has_ci && !repo.has_dockerfile && <span className="text-ink-faint text-[10px]">—</span>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
