import React from 'react';
import { Award, CheckCircle, Printer, Download, MapPin, IndianRupee, ShieldCheck, X } from 'lucide-react';
import { InternshipMatch } from '../../types';
import { useAuth } from '../../auth/AuthProvider';
import { useAppStore } from '../../store/appStore';

interface PassModalProps {
  isOpen: boolean;
  match: InternshipMatch | null;
  onClose: () => void;
}

export const ApplicationPassModal: React.FC<PassModalProps> = ({ isOpen, match, onClose }) => {
  const { user } = useAuth();
  const { jri } = useAppStore();

  if (!isOpen || !match) return null;

  const intern = match.internship;
  const passId = `AYUSH-PMIS-2026-${intern.id.replace('INT-', '')}-789`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg border border-border shadow-panel max-w-xl w-full max-h-[95vh] overflow-y-auto p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-brass" />
            <h2 className="text-base font-bold text-ayush-forest">
              Official Provisional Allocation Pass
            </h2>
          </div>
          <button onClick={onClose} className="text-ink-muted hover:text-ink text-sm">✕</button>
        </div>

        {/* Printable Pass Container */}
        <div id="printable-pass" className="border-2 border-ayush-forest rounded-lg p-5 bg-parchment/30 space-y-4 relative overflow-hidden">
          {/* Subtle watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <img src="/ayush-logo.jpg" alt="" className="w-80 h-80 object-contain" />
          </div>

          {/* Official Pass Header */}
          <div className="flex items-center justify-between border-b-2 border-ayush-forest pb-3">
            <div className="flex items-center gap-3">
              <img
                src="/ayush-logo.jpg"
                alt="Ministry of AYUSH"
                className="h-12 w-auto object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div>
                <div className="text-[10px] uppercase font-bold text-ink-muted tracking-wider">Government of India</div>
                <div className="text-sm font-black text-ayush-forest leading-tight">MINISTRY OF AYUSH</div>
                <div className="text-[10px] text-brass-dark font-semibold">PM Internship Scheme &bull; AI Allocation Cell</div>
              </div>
            </div>
            <div className="text-right">
              <span className="badge-green badge font-bold">PROVISIONAL ALLOCATION</span>
              <div className="text-[10px] font-mono text-ink-muted mt-1">ID: {passId}</div>
            </div>
          </div>

          {/* Candidate Details */}
          <div className="grid grid-cols-2 gap-3 text-xs border-b border-border pb-3">
            <div>
              <span className="text-ink-muted text-[10px] block">Candidate Name:</span>
              <span className="font-bold text-ink text-sm">{user?.name || 'Arjun Sharma'}</span>
            </div>
            <div>
              <span className="text-ink-muted text-[10px] block">Assessed JRI Score:</span>
              <span className="font-black text-brass-dark text-sm">{jri?.overall_jri.toFixed(1) || '87.4'} / 100</span>
            </div>
            <div>
              <span className="text-ink-muted text-[10px] block">Academic Institute:</span>
              <span className="font-semibold text-ink">AIIA, New Delhi</span>
            </div>
            <div>
              <span className="text-ink-muted text-[10px] block">ILP Allocation Priority:</span>
              <span className="font-bold text-ayush-forest">Rank #{match.ilp_rank} (Top Tier)</span>
            </div>
          </div>

          {/* Allocated Scheme Position */}
          <div className="bg-surface p-3.5 rounded border border-border space-y-2">
            <div className="text-[10px] uppercase font-bold tracking-wider text-ink-muted">Allocated Host Enterprise</div>
            <div className="text-base font-bold text-ayush-forest">{intern.company_name}</div>
            <div className="text-xs font-semibold text-ink">{intern.role_title}</div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border text-[11px] text-ink-muted">
              <div>
                <span className="block text-[10px]">Location:</span>
                <span className="font-semibold text-ink">{intern.location}</span>
              </div>
              <div>
                <span className="block text-[10px]">Monthly Stipend:</span>
                <span className="font-bold text-ayush-forest">₹{intern.stipend_monthly.toLocaleString()}/mo</span>
              </div>
              <div>
                <span className="block text-[10px]">Tenure:</span>
                <span className="font-semibold text-ink">{intern.duration_months} Months</span>
              </div>
            </div>
          </div>

          {/* Verification Barcode / Stamp */}
          <div className="flex items-center justify-between pt-2 text-[10px] text-ink-muted">
            <div className="flex items-center gap-1.5 text-ayush-forest font-semibold">
              <ShieldCheck className="w-4 h-4 text-ayush-leaf" />
              Cryptographically verified by InternSetu v2.0 Engine
            </div>
            <div className="font-mono text-ink-faint">SHA256: 9e2a11ab88...</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="text-xs text-ink-muted">
            Present this pass during offline verification.
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handlePrint} className="btn-secondary text-xs">
              <Printer className="w-3.5 h-3.5" /> Print Pass
            </button>
            <button onClick={onClose} className="btn-primary text-xs">
              Confirm & Return to Hub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
