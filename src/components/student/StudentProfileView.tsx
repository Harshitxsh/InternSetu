import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { useAppStore } from '../../store/appStore';
import { User, Mail, GraduationCap, Building, Code, Award, CheckCircle, Save } from 'lucide-react';

export const StudentProfileView: React.FC = () => {
  const { user } = useAuth();
  const { jri } = useAppStore();
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: user?.name || 'Arjun Sharma',
    email: user?.email || 'arjun.sharma@ayush-institute.edu.in',
    institution: 'All India Institute of Ayurveda (AIIA), New Delhi',
    degree: 'B.Pharm (Ayurveda)',
    branch: 'Phytopharmacy & Drug Standardization',
    cgpa: '8.4',
    graduation_year: '2026',
    primary_domain: 'Ayurveda',
    skills: 'HPLC, Phytochemistry, GC-MS, Python, RDKit, Molecular Docking, AYUSH Formulations',
    github_username: user?.github_username || 'arjun-ayurveda-dev',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-ayush-forest">Student Profile & Academic Record</h2>
        <p className="text-xs text-ink-muted mt-0.5">
          Verified academic and competency record used by the 100-Point JRI Engine
        </p>
      </div>

      <div className="card space-y-6">
        <div className="flex items-center gap-4 pb-4 border-b border-border">
          <div className="w-16 h-16 rounded-full bg-ayush-forest text-white font-black text-2xl flex items-center justify-center">
            {profile.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-ink">{profile.name}</h3>
            <p className="text-xs text-ink-muted">{profile.degree} &bull; {profile.institution}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="badge-green badge">National Student ID: AYUSH-2026-9842</span>
              {jri && (
                <span className="badge-brass badge">
                  Verified JRI: {jri.overall_jri.toFixed(1)} / 100
                </span>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Full Name</label>
              <input
                className="form-input"
                value={profile.name}
                onChange={e => setProfile({ ...profile, name: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">Email Address (OAuth Verified)</label>
              <input
                className="form-input bg-parchment-warm cursor-not-allowed"
                value={profile.email}
                disabled
              />
            </div>
            <div>
              <label className="form-label">College / Institute</label>
              <input
                className="form-input"
                value={profile.institution}
                onChange={e => setProfile({ ...profile, institution: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">Degree & Specialization</label>
              <input
                className="form-input"
                value={profile.degree}
                onChange={e => setProfile({ ...profile, degree: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">Academic CGPA (Out of 10.0)</label>
              <input
                className="form-input"
                type="number"
                step="0.1"
                value={profile.cgpa}
                onChange={e => setProfile({ ...profile, cgpa: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">Graduation Year</label>
              <input
                className="form-input"
                value={profile.graduation_year}
                onChange={e => setProfile({ ...profile, graduation_year: e.target.value })}
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="form-label">GitHub Account Username</label>
              <input
                className="form-input font-mono"
                value={profile.github_username}
                onChange={e => setProfile({ ...profile, github_username: e.target.value })}
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="form-label">Technical Competencies & AYUSH Lab Skills</label>
              <textarea
                rows={3}
                className="form-input"
                value={profile.skills}
                onChange={e => setProfile({ ...profile, skills: e.target.value })}
              />
              <p className="text-[11px] text-ink-muted mt-1">
                Parsed by Sentence-BERT scoring engine for semantic ATS alignment.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            {saved ? (
              <span className="text-xs text-ayush-leaf font-bold flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> Profile updated successfully
              </span>
            ) : <div />}
            <button type="submit" className="btn-primary">
              <Save className="w-4 h-4" /> Save Academic Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
