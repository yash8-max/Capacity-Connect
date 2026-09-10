import React from 'react';
import { User, Certificate } from '../../../types';
import { CERTIFICATES } from '../../../data/mockData';
import { Award, ShieldCheck } from 'lucide-react';

interface AdminCertificationsViewProps {
  currentUser: User;
  onToast: (msg: string) => void;
  onViewCertificate: (cert: Certificate) => void;
}

export const AdminCertificationsView: React.FC<AdminCertificationsViewProps> = ({ currentUser, onToast, onViewCertificate }) => {
  return (
    <div className="space-y-6 text-left">
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">Institutional Certifications & Verification</h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Cryptographically issued and verified WMO-compliant credentials for IMD forecasters.
          </p>
        </div>
        <div className="p-3 rounded-2xl bg-[#FAF3EE] text-[#D97706] border border-[#E8D49E]">
          <ShieldCheck className="w-8 h-8" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CERTIFICATES.map((cert) => (
          <div key={cert.id} className="bg-white rounded-3xl border border-[#E7E5E4] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#FAF3EE] text-[#D97706] text-[10px] font-bold font-mono">
                {cert.certificateNumber}
              </span>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Verified
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">{cert.courseTitle}</h3>
              <p className="text-xs text-[#64748B] mt-1">Recipient: <strong className="text-[#0F172A]">{cert.traineeName}</strong></p>
              <p className="text-xs text-[#64748B]">Issued on {cert.issueDate} by {cert.trainerName}</p>
            </div>
            <button
              onClick={() => onViewCertificate(cert)}
              className="w-full py-2.5 rounded-xl bg-[#0D3B66] text-white text-xs font-semibold hover:bg-[#092b4d]"
            >
              Inspect Certificate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
