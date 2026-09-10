import React from 'react';
import { X, Award, ShieldCheck, Printer, CheckCircle2, QrCode, Download } from 'lucide-react';
import { Certificate } from '../../types';

interface CertificateModalProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !certificate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl border border-[#E7E5E4] shadow-2xl overflow-hidden p-6 sm:p-10 text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#FAF8F5] text-[#64748B] hover:text-[#0F172A]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Frame */}
        <div className="relative border-4 border-[#0D3B66]/20 rounded-2xl p-6 sm:p-10 bg-[#FAF8F5]/30">
          <div className="text-center mb-8">
            <p className="text-[11px] font-mono tracking-widest uppercase font-bold text-[#64748B]">
              Government of India • Ministry of Earth Sciences
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0D3B66] tracking-tight mt-1">
              INDIA METEOROLOGICAL DEPARTMENT
            </h3>
            <p className="text-xs text-[#2A7F7E] font-semibold mt-1">
              NATIONAL DIGITAL CAPACITY BUILDING ACCREDITATION
            </p>
          </div>

          <div className="text-center my-6 space-y-2">
            <p className="text-xs text-[#64748B] italic">This officially certifies that</p>
            <h4 className="text-3xl font-extrabold text-[#0F172A] tracking-tight border-b-2 border-[#0D3B66]/20 pb-2 inline-block px-10">
              {certificate.traineeName}
            </h4>
            <p className="text-xs text-[#57534E] font-medium">
              {certificate.traineeDesignation}, {certificate.traineeStation}
            </p>
          </div>

          <div className="text-center my-6">
            <p className="text-xs text-[#64748B]">
              has successfully achieved verified operational competency in
            </p>
            <p className="text-xl font-bold text-[#0D3B66] mt-1">
              {certificate.courseTitle}
            </p>
            <p className="text-xs font-semibold text-[#2A7F7E] mt-1">
              Score: {certificate.finalScore}% (Distinction) • Issued: {certificate.issueDate}
            </p>
          </div>

          {/* Verification Hash & Signatures */}
          <div className="pt-6 border-t border-[#E7E5E4] grid grid-cols-3 gap-4 items-end text-xs">
            <div>
              <div className="h-8 flex items-end font-serif italic text-sm text-[#0D3B66] font-bold">
                {certificate.trainerName}
              </div>
              <p className="border-t border-[#94A3B8] pt-1 text-[10px] text-[#64748B]">
                Faculty Lead
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <QrCode className="w-10 h-10 text-[#0D3B66]" />
              <span className="text-[9px] font-mono text-[#64748B] mt-1">
                {certificate.certificateNumber}
              </span>
            </div>

            <div className="text-right">
              <div className="h-8 flex items-end justify-end font-serif italic text-sm text-[#0D3B66] font-bold">
                {certificate.directorGeneralName}
              </div>
              <p className="border-t border-[#94A3B8] pt-1 text-[10px] text-[#64748B]">
                Director General of Meteorology
              </p>
            </div>
          </div>
        </div>

        {/* Cryptographic Ledger Verification Proof */}
        <div className="mt-6 p-4 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="space-y-1 truncate max-w-lg">
            <div className="flex items-center gap-1.5 text-[#2A7F7E] font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Cryptographically Verified Record</span>
            </div>
            <p className="font-mono text-[10px] text-[#64748B] truncate">
              SHA-256 Hash: {certificate.verificationHash}
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-[#0D3B66] text-white text-xs font-semibold hover:bg-[#092b4d] flex items-center gap-1.5 shadow-xs whitespace-nowrap"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Record</span>
          </button>
        </div>
      </div>
    </div>
  );
};
