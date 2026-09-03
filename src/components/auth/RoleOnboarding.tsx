import React, { useState } from 'react';
import { UserRole, AYUSHDomain } from '../../types';
import { useAppStore } from '../../store/appStore';
import { useAuth } from '../../auth/AuthProvider';
import { api, setToken } from '../../lib/api';
import { GraduationCap, Microscope, Building2, Landmark, ChevronRight, Check } from 'lucide-react';

const ROLES: { role: UserRole; label: string; icon: React.ReactNode; description: string }[] = [
  {
    role: 'STUDENT',
    label: 'Student / Intern Aspirant',
    icon: <GraduationCap className="w-6 h-6" />,
    description: 'Access JRI scoring, GitHub analysis, skill quests, and PM Internship Scheme allocation.',
  },
  {
    role: 'COMPANY',
    label: 'Company / Enterprise Partner',
    icon: <Building2 className="w-6 h-6" />,
    description: 'Post PM Internship Scheme openings, publish skill modules, and access AI-ranked candidate shortlists.',
  },
  {
    role: 'INSTITUTION',
    label: 'Institution / University CRM',
    icon: <Landmark className="w-6 h-6" />,
    description: 'View cohort placement heatmaps, skill gap analytics, and institutional performance dashboards.',
  },
];

const AYUSH_DOMAINS: AYUSHDomain[] = [
  'Ayurveda', 'Yoga & Naturopathy', 'Unani Medicine', 'Siddha', 'Homeopathy',
  'Herbal Pharmaceuticals', 'Biotechnology & Bioinformatics',
  'Pharmacovigilance', 'Digital Healthcare', 'Traditional Medicine Research',
];

export const RoleOnboarding: React.FC = () => {
  const { user } = useAuth();
  const { setView, calculateJRI } = useAppStore();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [form, setForm] = useState({
    institution: '', degree: '', branch: '', cgpa: '7.5',
    graduation_year: '2026', primary_domain: 'Ayurveda' as AYUSHDomain,
    skills: '', company_name: '', department: '', designation: '',
    institution_name: '', affiliated_to: '',
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!user || !selectedRole) return;
    setSaving(true);

    const profileData: Record<string, unknown> = { name: user.name, email: user.email };
    if (selectedRole === 'STUDENT') {
      profileData.institution = form.institution;
      profileData.degree = form.degree;
      profileData.branch = form.branch;
      profileData.cgpa = parseFloat(form.cgpa);
      profileData.graduation_year = parseInt(form.graduation_year);
      profileData.primary_domain = form.primary_domain;
      profileData.skills = form.skills.split(',').map(s => s.trim()).filter(Boolean);
    } else if (selectedRole === 'COMPANY') {
      profileData.company_name = form.company_name;
    } else {
      profileData.institution_name = form.institution_name;
      profileData.affiliated_to = form.affiliated_to;
    }

    try {
      const result = await api.post('/auth/onboard', {
        role: selectedRole,
        profile_data: profileData,
      });
      // Store the new JWT with the updated role
      if (result.access_token) {
        setToken(result.access_token);
      }
    } catch {/* continue anyway */}

    if (selectedRole === 'STUDENT') {
      const cgpaNum = parseFloat(form.cgpa);
      await calculateJRI(user.uid, {
        s_acad: Math.min(100, (cgpaNum / 10) * 85 + 10),
        s_assess: 62, s_proj: 45, s_resume: 50,
      });
    }

    setSaving(false);
    const viewMap: Record<UserRole, string> = {
      STUDENT: 'student-dashboard',
      COMPANY: 'company-dashboard', INSTITUTION: 'institution-dashboard',
    };
    setView(viewMap[selectedRole] as any);
  };

  return (
    <div className="min-h-screen bg-parchment flex items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-0">
        <div className="bg-ayush-forest text-white text-center py-2 px-4 text-xs font-medium rounded-t-lg">
          InternSetu v2.0 &nbsp;·&nbsp; First-time Setup &nbsp;·&nbsp; Step {step} of 2
        </div>

        <div className="bg-surface border border-border border-t-0 rounded-b-lg shadow-panel p-8 space-y-6">
          <div className="flex items-center gap-3">
            <img src="/ayush-logo.jpg" alt="AYUSH" className="h-10 w-auto object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            <div>
              <h2 className="text-lg font-bold text-ayush-forest">
                {step === 1 ? 'Select Your Role' : 'Complete Your Profile'}
              </h2>
              <p className="text-xs text-ink-muted">
                Welcome, {user?.name}. This sets up your personalised dashboard.
              </p>
            </div>
          </div>

          {/* Step 1: Role selection */}
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ROLES.map(({ role, label, icon, description }) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`text-left p-4 rounded-lg border-2 transition-all ${
                    selectedRole === role
                      ? 'border-ayush-forest bg-ayush-mint'
                      : 'border-border hover:border-ayush-sage bg-surface'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-1.5 rounded ${selectedRole === role ? 'bg-ayush-forest text-white' : 'bg-parchment text-ayush-sage'}`}>
                      {icon}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-ink">{label}</div>
                      <div className="text-xs text-ink-muted mt-0.5 leading-relaxed">{description}</div>
                    </div>
                    {selectedRole === role && <Check className="w-4 h-4 text-ayush-forest ml-auto flex-shrink-0 mt-0.5" />}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Profile form */}
          {step === 2 && selectedRole && (
            <div className="space-y-4">
              {selectedRole === 'STUDENT' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="form-label">Institution / College</label><input className="form-input" value={form.institution} onChange={e => setForm(f => ({ ...f, institution: e.target.value }))} placeholder="e.g. AIIA, New Delhi" /></div>
                    <div><label className="form-label">Degree</label><input className="form-input" value={form.degree} onChange={e => setForm(f => ({ ...f, degree: e.target.value }))} placeholder="e.g. B.Pharm / M.Sc Bioinformatics" /></div>
                    <div><label className="form-label">Branch / Specialization</label><input className="form-input" value={form.branch} onChange={e => setForm(f => ({ ...f, branch: e.target.value }))} placeholder="e.g. Phytopharmacy" /></div>
                    <div><label className="form-label">CGPA / Score (out of 10)</label><input className="form-input" type="number" step="0.1" min="0" max="10" value={form.cgpa} onChange={e => setForm(f => ({ ...f, cgpa: e.target.value }))} /></div>
                    <div><label className="form-label">Passing Year</label>
                      <select className="form-select" value={form.graduation_year} onChange={e => setForm(f => ({ ...f, graduation_year: e.target.value }))}>
                        {[2024, 2025, 2026, 2027].map(y => <option key={y}>{y}</option>)}
                      </select>
                    </div>
                    <div><label className="form-label">Primary AYUSH Domain</label>
                      <select className="form-select" value={form.primary_domain} onChange={e => setForm(f => ({ ...f, primary_domain: e.target.value as AYUSHDomain }))}>
                        {AYUSH_DOMAINS.map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>
                  <div><label className="form-label">Technical Skills (comma-separated)</label><input className="form-input" value={form.skills} onChange={e => setForm(f => ({ ...f, skills: e.target.value }))} placeholder="Python, HPLC, bioinformatics, R, molecular docking..." /></div>
                </>
              )}
              {selectedRole === 'COMPANY' && (
                <div><label className="form-label">Company / Organisation Name</label><input className="form-input" value={form.company_name} onChange={e => setForm(f => ({ ...f, company_name: e.target.value }))} placeholder="e.g. Dabur India, NHA, CSIR-NBRI" /></div>
              )}
              {selectedRole === 'INSTITUTION' && (
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="form-label">Institution Name</label><input className="form-input" value={form.institution_name} onChange={e => setForm(f => ({ ...f, institution_name: e.target.value }))} /></div>
                  <div><label className="form-label">Affiliated To</label><input className="form-input" value={form.affiliated_to} onChange={e => setForm(f => ({ ...f, affiliated_to: e.target.value }))} placeholder="e.g. Rajiv Gandhi University of Health Sciences" /></div>
                </div>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            {step === 2 ? (
              <button onClick={() => setStep(1)} className="btn-secondary text-xs">← Back</button>
            ) : <div />}
            {step === 1 ? (
              <button
                onClick={() => selectedRole && setStep(2)}
                disabled={!selectedRole}
                className="btn-primary disabled:opacity-50"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleSave} disabled={saving} className="btn-primary disabled:opacity-60">
                {saving ? 'Saving...' : 'Launch Dashboard →'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
