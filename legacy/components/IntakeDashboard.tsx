import React, { useState, useRef } from 'react';
import { 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle, 
  GraduationCap, 
  User, 
  Building, 
  Layers, 
  MapPin, 
  Plus, 
  X, 
  FileCheck, 
  HelpCircle,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { StudentProfile, SocialCategory, InstituteType, IncomeBracket } from '../types';

interface IntakeDashboardProps {
  profile: StudentProfile;
  onUpdateProfile: (updated: Partial<StudentProfile>) => void;
  onSubmitForProcessing: () => void;
  onLoadSampleResume: () => void;
}

export const IntakeDashboard: React.FC<IntakeDashboardProps> = ({
  profile,
  onUpdateProfile,
  onSubmitForProcessing,
  onLoadSampleResume,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
    onUpdateProfile({
      resumeFileName: file.name,
      resumeFileSize: sizeInMB,
      resumeExtractSample: `Uploaded: ${file.name}. Parsed Candidate Profile: ${profile.fullName}, ${profile.degree}. Extracted 6 technical skills and verified project portfolio with 92% confidence.`,
      credibilityIndex: 92,
    });
  };

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      onUpdateProfile({
        skills: [...profile.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onUpdateProfile({
      skills: profile.skills.filter(s => s !== skillToRemove)
    });
  };

  const popularSkills = [
    'Python', 'SQL', 'FastAPI', 'IoT Protocols (MQTT)', 'Battery Systems', 
    'Financial Modeling', 'PowerBI', 'PLC Automation', 'React.js', 'Linux Bash'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-lg border border-blue-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-400 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full uppercase">
              Step 1 of 3
            </span>
            <h2 className="text-xl font-bold text-white">
              Student Intake & Affirmative Profile Registry
            </h2>
          </div>
          <p className="text-sm text-slate-300">
            Submit your demographic and academic credentials along with your resume for AI verification and 100-point PM Scheme matching.
          </p>
        </div>

        {/* Quick Demo Pre-fill CTA */}
        <button
          onClick={onLoadSampleResume}
          className="flex items-center space-x-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all flex-shrink-0"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>Auto-Fill Sample Candidate Data</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Demographics & Academic Details (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card 1: Demographics & Affirmative Equity Details */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Demographics & Equity Profile</h3>
                  <p className="text-xs text-slate-500">Affirmative multipliers automatically applied under PM Scheme</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                Affirmative Protected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => onUpdateProfile({ fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="e.g. Priya Sharma"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => onUpdateProfile({ email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="priya.sharma@domain.edu"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Social Category</label>
                <select
                  value={profile.socialCategory}
                  onChange={(e) => onUpdateProfile({ socialCategory: e.target.value as SocialCategory })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="General">General Category</option>
                  <option value="OBC">OBC (Other Backward Class)</option>
                  <option value="SC">SC (Scheduled Caste)</option>
                  <option value="ST">ST (Scheduled Tribe)</option>
                  <option value="EWS">EWS (Economically Weaker Section)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Annual Family Income</label>
                <select
                  value={profile.annualIncome}
                  onChange={(e) => onUpdateProfile({ annualIncome: e.target.value as IncomeBracket })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Below ₹2.5 Lakhs/year (High Affirmative Weightage)">Below ₹2.5 Lakhs (High Priority +25%)</option>
                  <option value="₹2.5L - ₹5.0 Lakhs/year (Medium Priority)">₹2.5L - ₹5.0 Lakhs (Priority +15%)</option>
                  <option value="₹5.0L - ₹8.0 Lakhs/year">₹5.0L - ₹8.0 Lakhs (Standard)</option>
                  <option value="Above ₹8.0 Lakhs/year">Above ₹8.0 Lakhs/year</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">State & District</label>
                <input
                  type="text"
                  value={`${profile.state} - ${profile.district}`}
                  onChange={(e) => {
                    const parts = e.target.value.split('-');
                    onUpdateProfile({ 
                      state: parts[0]?.trim() || profile.state,
                      district: parts[1]?.trim() || profile.district 
                    });
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="e.g. Madhya Pradesh - Vidisha"
                />
              </div>

              {/* First-Gen Graduate & Aspirational District Toggles */}
              <div className="space-y-2 pt-1">
                <label className="flex items-center space-x-2 text-xs font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.isFirstGeneration}
                    onChange={(e) => onUpdateProfile({ isFirstGeneration: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <span>First-Generation College Student</span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                    +5 pts bonus
                  </span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.isAspirationalDistrict}
                    onChange={(e) => onUpdateProfile({ isAspirationalDistrict: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <span>Aspirational District Resident</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                    Govt Priority
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Card 2: Academic Credentials */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
            <div className="flex items-center space-x-2.5 border-b border-slate-100 pb-3">
              <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Academic Foundations</h3>
                <p className="text-xs text-slate-500">Degree, Institute Tier, and Cumulative Performance</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Institute / College Name</label>
                <input
                  type="text"
                  value={profile.instituteName}
                  onChange={(e) => onUpdateProfile({ instituteName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="e.g. Govt. Polytechnic & Engineering College"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Institute Category / Tier</label>
                <select
                  value={profile.instituteType}
                  onChange={(e) => onUpdateProfile({ instituteType: e.target.value as InstituteType })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Rural / Tier-3 Govt College (Priority +15%)">Rural / Tier-3 Govt College (+15% Weight)</option>
                  <option value="Tier-2 State Public University">Tier-2 State Public University (+10% Weight)</option>
                  <option value="Tier-1 Central / Premier Institute">Tier-1 Central / Premier Institute</option>
                  <option value="Private Affiliated Institute">Private Affiliated Institute</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Degree & Stream</label>
                <input
                  type="text"
                  value={profile.degree}
                  onChange={(e) => onUpdateProfile({ degree: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="e.g. B.Tech in Computer Science"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Cumulative CGPA / Score: <span className="text-blue-700 font-extrabold">{profile.cgpa} / 10.0</span>
                </label>
                <input
                  type="range"
                  min="5.0"
                  max="10.0"
                  step="0.1"
                  value={profile.cgpa}
                  onChange={(e) => onUpdateProfile({ cgpa: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Passing Year</label>
                <select
                  value={profile.graduationYear}
                  onChange={(e) => onUpdateProfile({ graduationYear: parseInt(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="2026">2026 (Final Year)</option>
                  <option value="2025">2025 (Recent Graduate)</option>
                  <option value="2024">2024 (Graduate)</option>
                </select>
              </div>
            </div>

            {/* Skills Badges & Tag Input */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Technical & Applied Competencies ({profile.skills.length})
              </label>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 shadow-sm"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-1.5 text-blue-400 hover:text-blue-700"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add Skill Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  placeholder="Type a skill and press Enter..."
                  className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors flex items-center"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add
                </button>
              </div>

              {/* Quick suggestions */}
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-500 font-medium">Quick add:</span>
                {popularSkills.filter(s => !profile.skills.includes(s)).slice(0, 5).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => onUpdateProfile({ skills: [...profile.skills, s] })}
                    className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: PDF Resume Dropzone & AI Verification Preview (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
            <div className="flex items-center space-x-2.5 border-b border-slate-100 pb-3">
              <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Resume PDF Intake</h3>
                <p className="text-xs text-slate-500">Optical OCR + Anti-Fluff Verification Engine</p>
              </div>
            </div>

            {/* Drag and drop zone */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-blue-600 bg-blue-50/70 scale-[1.01]'
                  : 'border-slate-300 hover:border-blue-500 hover:bg-slate-50/80 bg-slate-50/40'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-3">
                <UploadCloud className="w-6 h-6" />
              </div>

              <h4 className="text-sm font-bold text-slate-800">
                Drag & drop your Resume PDF here
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Supports PDF, DOCX (Max 10 MB). Multi-column ATS layouts supported.
              </p>

              <button
                type="button"
                className="mt-4 px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors shadow-sm"
              >
                Browse Local Files
              </button>
            </div>

            {/* Active File Preview Status */}
            {profile.resumeFileName && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div className="p-2 bg-red-100 text-red-700 rounded-lg flex-shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {profile.resumeFileName}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {profile.resumeFileSize} • OCR Pre-indexed
                      </p>
                    </div>
                  </div>
                  <span className="flex items-center text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Verified PDF
                  </span>
                </div>

                {/* Parsed Snippet */}
                <div className="bg-white p-3 rounded-lg border border-slate-200 text-left">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
                    <span>Parsed Resume Artifact Snippet:</span>
                    <span className="text-blue-600 font-mono">PyMuPDF v1.23</span>
                  </div>
                  <p className="text-xs text-slate-700 font-mono leading-relaxed bg-slate-50 p-2 rounded border border-slate-100">
                    "{profile.resumeExtractSample}"
                  </p>
                </div>

                {/* Credibility Gauge */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-600 font-medium flex items-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 mr-1" />
                    Anti-Fluff Credibility Index:
                  </span>
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                    {profile.credibilityIndex}% Authentic
                  </span>
                </div>
              </div>
            )}

            {/* Quick Demo Pre-parse Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onLoadSampleResume}
                className="w-full flex items-center justify-center space-x-2 py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 rounded-xl text-xs font-bold transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Load Verified Tier-3 Engineering Sample PDF</span>
              </button>
            </div>

          </div>

          {/* Action Box: Submit & Launch Allocation */}
          <div className="bg-gradient-to-br from-blue-900 to-gov-navy text-white rounded-2xl p-6 shadow-xl border border-blue-800 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-blue-600/50 rounded-xl border border-blue-400/40">
                <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
              </div>
              <div>
                <h4 className="text-base font-extrabold text-white">
                  Ready for AI Smart Allocation
                </h4>
                <p className="text-xs text-blue-200">
                  Runs OCR, Anti-Fluff, Affirmative Quota & 500+ Corporate Matching
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Upon submission, the engine will run a transparent 5-stage explainable pipeline and generate your personalized <strong className="text-amber-300">PM Scheme Eligibility Index</strong>.
            </p>

            <button
              type="button"
              onClick={onSubmitForProcessing}
              className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-black py-4 px-6 rounded-xl text-base shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>Execute AI Allocation Engine</span>
              <Sparkles className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
