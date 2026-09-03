import React, { useState } from 'react';
import { Building2, Plus, Briefcase, Users, Star, CheckCircle, Search, Filter, ArrowUpRight } from 'lucide-react';
import { Internship } from '../../types';

export const IndustryDashboard: React.FC = () => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [postedJobs, setPostedJobs] = useState([
    {
      id: 'INT-IND-01',
      title: 'Herbal Drug Standardization Intern',
      domain: 'Herbal Pharmaceuticals',
      seats: 30,
      applied: 48,
      stipend: 15000,
      status: 'Active'
    },
    {
      id: 'INT-IND-02',
      title: 'Pharmacovigilance Clinical Safety Trainee',
      domain: 'Pharmacovigilance',
      seats: 22,
      applied: 36,
      stipend: 17000,
      status: 'Active'
    }
  ]);

  const [candidates] = useState([
    { name: 'Arjun Sharma', college: 'AIIA New Delhi', jri: 68.5, match: 94.6, skills: 'HPLC, Formulations, Python' },
    { name: 'Priya Nair', college: 'ICT Mumbai', jri: 88.4, match: 92.1, skills: 'Bioconductor, Docking, R' },
    { name: 'Ananya Deshmukh', college: 'Gujarat Ayurved Univ.', jri: 86.2, match: 88.7, skills: 'FHIR, Digital Health' },
    { name: 'Vikram Joshi', college: 'BHU Varanasi', jri: 74.0, match: 84.3, skills: 'Clinical Safety, NLP' },
  ]);

  const [newJob, setNewJob] = useState({
    title: '',
    domain: 'Herbal Pharmaceuticals',
    seats: '15',
    stipend: '16000',
    description: '',
  });

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.title) return;
    setPostedJobs([
      ...postedJobs,
      {
        id: `INT-IND-0${postedJobs.length + 1}`,
        title: newJob.title,
        domain: newJob.domain,
        seats: parseInt(newJob.seats),
        applied: 0,
        stipend: parseInt(newJob.stipend),
        status: 'Active'
      }
    ]);
    setShowPostModal(false);
    setNewJob({ title: '', domain: 'Herbal Pharmaceuticals', seats: '15', stipend: '16000', description: '' });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-ayush-forest text-white rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="section-label text-white/50 mb-0.5">Industry & Enterprise Portal</div>
          <h1 className="text-xl font-bold">PM Internship Scheme Enterprise Console</h1>
          <p className="text-xs text-white/70 mt-1 max-w-2xl">
            Post verified internship opportunities, sponsor domain skill quests, and access AI-shortlisted AYUSH candidate cohorts.
          </p>
        </div>
        <button
          onClick={() => setShowPostModal(true)}
          className="btn-primary text-xs flex items-center gap-1.5 flex-shrink-0"
        >
          <Plus className="w-4 h-4" /> Post New Scheme Internship
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card">
          <div className="text-xs font-semibold text-ink-muted">Active Scheme Openings</div>
          <div className="text-2xl font-black text-ink mt-1">{postedJobs.length}</div>
          <div className="text-[11px] text-ayush-leaf mt-1 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Ministry Approved
          </div>
        </div>
        <div className="card">
          <div className="text-xs font-semibold text-ink-muted">Total Available Seats</div>
          <div className="text-2xl font-black text-ayush-forest mt-1">
            {postedJobs.reduce((s, j) => s + j.seats, 0)}
          </div>
          <div className="text-[11px] text-ink-muted mt-1">52 Total Candidates Matched</div>
        </div>
        <div className="card">
          <div className="text-xs font-semibold text-ink-muted">Average Candidate JRI</div>
          <div className="text-2xl font-black text-brass-dark mt-1">79.3</div>
          <div className="text-[11px] text-ink-muted mt-1">Top Tier Readiness</div>
        </div>
      </div>

      {/* Grid: Posted Openings & AI Shortlist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Openings */}
        <div className="card space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h2 className="text-sm font-bold text-ink flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-ayush-forest" />
              Your Active Postings
            </h2>
            <span className="badge-slate badge">{postedJobs.length} Openings</span>
          </div>

          <div className="space-y-3">
            {postedJobs.map((job) => (
              <div key={job.id} className="p-3 rounded border border-border bg-parchment/40 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="badge-green badge text-[10px]">{job.domain}</span>
                    <h3 className="text-xs font-bold text-ink mt-1">{job.title}</h3>
                  </div>
                  <span className="badge-brass badge text-[10px]">₹{job.stipend.toLocaleString()}/mo</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-ink-muted border-t border-border/60 pt-2">
                  <span>{job.seats} Seats Allocated</span>
                  <span className="font-semibold text-ayush-forest">{job.applied} Candidates Applied</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Candidate Shortlist */}
        <div className="card space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h2 className="text-sm font-bold text-ink flex items-center gap-2">
              <Star className="w-4 h-4 text-brass" />
              AI Semantic Shortlist (Ranked by Cosine Match)
            </h2>
            <span className="badge-brass badge">Sentence-BERT</span>
          </div>

          <div className="border border-border rounded overflow-hidden">
            <table>
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Match %</th>
                  <th>JRI</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((c, i) => (
                  <tr key={i}>
                    <td>
                      <div className="font-semibold text-xs text-ink">{c.name}</div>
                      <div className="text-[10px] text-ink-muted">{c.skills}</div>
                    </td>
                    <td>
                      <span className="badge-green text-[10px] font-bold">{c.match}%</span>
                    </td>
                    <td>
                      <span className="font-mono text-xs font-bold">{c.jri.toFixed(1)}</span>
                    </td>
                    <td className="text-right">
                      <button className="btn-secondary text-[10px] py-1 px-2.5">
                        Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal: Post New Job */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg border border-border shadow-panel max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-base font-bold text-ayush-forest">Post PM Scheme Internship Position</h3>
              <button onClick={() => setShowPostModal(false)} className="text-ink-muted hover:text-ink text-sm">✕</button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-3">
              <div>
                <label className="form-label">Role Title</label>
                <input
                  className="form-input"
                  placeholder="e.g. Phytochemical Quality Analyst"
                  value={newJob.title}
                  onChange={e => setNewJob({ ...newJob, title: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">AYUSH Domain</label>
                  <select
                    className="form-select"
                    value={newJob.domain}
                    onChange={e => setNewJob({ ...newJob, domain: e.target.value })}
                  >
                    <option>Herbal Pharmaceuticals</option>
                    <option>Biotechnology & Bioinformatics</option>
                    <option>Pharmacovigilance</option>
                    <option>Digital Healthcare</option>
                    <option>Ayurveda</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Available Seats</label>
                  <input
                    className="form-input"
                    type="number"
                    value={newJob.seats}
                    onChange={e => setNewJob({ ...newJob, seats: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Monthly Stipend (₹)</label>
                <input
                  className="form-input"
                  type="number"
                  value={newJob.stipend}
                  onChange={e => setNewJob({ ...newJob, stipend: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border">
                <button type="button" onClick={() => setShowPostModal(false)} className="btn-secondary text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Submit for Ministry Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
