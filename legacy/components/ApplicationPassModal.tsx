import React from 'react';
import { 
  X, 
  CheckCircle2, 
  Printer, 
  Download, 
  Building2, 
  MapPin, 
  IndianRupee, 
  ShieldCheck, 
  QrCode,
  Sparkles
} from 'lucide-react';
import { PMInternship, StudentProfile, ScoreBreakdown } from '../types';

interface ApplicationPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  internship: PMInternship | null;
  profile: StudentProfile;
  scoreBreakdown: ScoreBreakdown;
}

export const ApplicationPassModal: React.FC<ApplicationPassModalProps> = ({
  isOpen,
  onClose,
  internship,
  profile,
  scoreBreakdown,
}) => {
  if (!isOpen || !internship) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Pass Top Banner with Ministry Emblem */}
        <div className="gov-gradient-header p-6 text-white border-b border-blue-900 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-1 rounded-lg">
              <img 
                src="/13.png" 
                alt="Ministry of Corporate Affairs" 
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('src/assets')) {
                    target.src = '/src/assets/13.png';
                  }
                }}
              />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider font-extrabold text-amber-300">
                Government of India • Ministry of Corporate Affairs
              </div>
              <h3 className="text-lg font-bold text-white">
                Provisional PM Internship Allocation Pass
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate / Pass Body */}
        <div className="p-6 sm:p-8 space-y-6 text-left">
          
          {/* Status Bar */}
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-900">
                AI Allocation Verified & Reserved under PM Scheme
              </span>
            </div>
            <span className="text-xs font-black text-emerald-800 bg-emerald-200/70 px-2.5 py-0.5 rounded-full">
              {scoreBreakdown.overallScore} / 100 PTS
            </span>
          </div>

          {/* Grid of details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Candidate Full Name</span>
              <div className="text-sm font-bold text-slate-900">{profile.fullName}</div>
              <div className="text-slate-500">{profile.email} • {profile.phone}</div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Candidate Registry ID</span>
              <div className="text-sm font-mono font-bold text-blue-700">{profile.id}</div>
              <div className="text-slate-500">{profile.socialCategory} • {profile.district}</div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1 sm:col-span-2">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Allocated Enterprise Partner</span>
              <div className="text-base font-bold text-slate-900 flex items-center">
                <Building2 className="w-4 h-4 mr-1.5 text-blue-600" />
                {internship.companyName}
              </div>
              <div className="text-xs text-blue-700 font-semibold">{internship.roleTitle}</div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Allocated Location</span>
              <div className="font-bold text-slate-800 flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1 text-slate-500" />
                {internship.location}
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Monthly Stipend (Direct DBT)</span>
              <div className="font-bold text-emerald-700 text-sm flex items-center">
                <IndianRupee className="w-4 h-4 mr-0.5 text-emerald-600" />
                ₹{internship.stipendGovt + internship.stipendCompany} / month
              </div>
              <span className="text-[10px] text-slate-500">₹5,000 Govt DBT + ₹{internship.stipendCompany} Company</span>
            </div>
          </div>

          {/* Official Verification Seal & QR Barcode simulation */}
          <div className="border-t border-slate-200 pt-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 bg-slate-900 text-white rounded-xl flex items-center justify-center p-2">
                <div className="grid grid-cols-3 gap-0.5 w-full h-full">
                  <div className="bg-white rounded-xs"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-white rounded-xs"></div>
                  <div className="bg-white rounded-xs"></div>
                  <div className="bg-white rounded-xs"></div>
                  <div className="bg-white rounded-xs"></div>
                  <div className="bg-white rounded-xs"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-white rounded-xs"></div>
                </div>
              </div>
              <div className="text-[11px] text-slate-500 space-y-0.5">
                <div className="font-bold text-slate-800">Digitally Signed by AI Smart Allocation Engine</div>
                <div>Hash: SHA256-MCA-PMIS-8819-2026</div>
                <div className="text-emerald-700 font-semibold flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                  Direct Aadhaar DBT Linked
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400">Assigned Industry Mentor</div>
              <div className="text-xs font-bold text-slate-800">{internship.mentorAssigned}</div>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 text-xs font-bold px-3 py-2 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Pass</span>
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-bold"
            >
              Close
            </button>
            <button
              onClick={() => {
                alert('Provisional AI Allocation Pass PDF downloaded successfully!');
                onClose();
              }}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Pass</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
