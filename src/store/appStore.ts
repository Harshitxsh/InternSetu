import { create } from 'zustand';
import { User, JRIBreakdown, GitHubSnapshot, SkillQuest, AppView, StudentProfile } from '../types';
import { api } from '../lib/api';

interface AppState {
  // Auth
  user: User | null;
  studentProfile: StudentProfile | null;
  // JRI
  jri: JRIBreakdown | null;
  // GitHub
  githubSnapshot: GitHubSnapshot | null;
  githubLoading: boolean;
  // Quests
  quests: SkillQuest[];
  questsLoading: boolean;
  // View
  currentView: AppView;
  sidebarOpen: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setStudentProfile: (p: StudentProfile) => void;
  setView: (v: AppView) => void;
  toggleSidebar: () => void;

  fetchJRI: (uid: string) => Promise<void>;
  calculateJRI: (uid: string, scores: Partial<{ s_assess: number; s_proj: number; s_resume: number; s_acad: number }>) => Promise<void>;
  syncGitHub: (username: string, token?: string) => Promise<void>;
  fetchQuests: (uid: string) => Promise<void>;
  completeQuest: (uid: string, questId: string) => Promise<{ new_jri: number; tier_unlocked: boolean } | null>;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  studentProfile: null,
  jri: null,
  githubSnapshot: null,
  githubLoading: false,
  quests: [],
  questsLoading: false,
  currentView: 'login',
  sidebarOpen: true,

  setUser: (user) => set({ user }),
  setStudentProfile: (p) => set({ studentProfile: p }),
  setView: (v) => set({ currentView: v }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  fetchJRI: async (uid) => {
    try {
      const data = await api.get<JRIBreakdown>(`/jri/${uid}`);
      set({ jri: data });
    } catch {
      // Fallback defaults if backend unavailable
      set({
        jri: {
          uid, overall_jri: 65.4,
          s_assess: 62, s_proj: 58, s_resume: 55, s_acad: 70,
          tier: 'QUEST_MODE', top_strengths: ['Academic', 'Assessment'],
          skill_gaps: ['Resume', 'GitHub Projects'], percentile: 60.8
        }
      });
    }
  },

  calculateJRI: async (uid, scores) => {
    try {
      const data = await api.post<JRIBreakdown>('/jri/calculate', { uid, ...scores });
      set({ jri: data });
    } catch (e) {
      console.error('JRI calculate error', e);
    }
  },

  syncGitHub: async (username, _token) => {
    set({ githubLoading: true });
    try {
      // The GitHub access token is now embedded in the JWT — no need to pass it
      const snapshot = await api.get<GitHubSnapshot>(`/github/repos/${username}`);
      set({ githubSnapshot: snapshot, githubLoading: false });
      // Propagate s_proj into JRI
      const { user, jri } = get();
      if (user && jri) {
        get().calculateJRI(user.uid, {
          s_assess: jri.s_assess, s_proj: snapshot.s_proj_score,
          s_resume: jri.s_resume, s_acad: jri.s_acad
        });
      }
    } catch {
      set({ githubLoading: false });
    }
  },

  fetchQuests: async (uid) => {
    set({ questsLoading: true });
    try {
      const data = await api.get<SkillQuest[]>(`/quests/${uid}`);
      set({ quests: data, questsLoading: false });
    } catch {
      set({ questsLoading: false });
    }
  },

  completeQuest: async (uid, questId) => {
    try {
      const data = await api.post<{ new_jri: number; tier_unlocked: boolean; xp_earned: number }>(
        `/quests/${uid}/complete/${questId}`
      );
      // Update quest status in local state
      set((s) => ({
        quests: s.quests.map(q => q.id === questId ? { ...q, status: 'COMPLETED' as const } : q),
        jri: s.jri ? { ...s.jri, overall_jri: data.new_jri,
          tier: data.tier_unlocked ? 'ALLOCATION_MODE' : 'QUEST_MODE' } : s.jri
      }));
      return data;
    } catch (e) {
      // Optimistic update
      set((s) => ({
        quests: s.quests.map(q => q.id === questId ? { ...q, status: 'COMPLETED' as const } : q),
      }));
    }
    return null;
  },
}));
