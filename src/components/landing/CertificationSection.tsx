import React, { useState } from 'react';
import { Award, ShieldCheck, CheckCircle2, QrCode, Search, ExternalLink, Printer } from 'lucide-react';
import { CERTIFICATES } from '../../data/mockData';
import { Certificate } from '../../types';

interface CertificationSectionProps {
  onVerifyCertificate?: (cert: Certificate) => void;
}

export const CertificationSection: React.FC<CertificationSectionProps> = ({
  onVerifyCertificate,
}) => {
  const sampleCert = CERTIFICATES[0];
  const [certSearchId, setCertSearchId] = useState('');
  const [searchedCert, setSearchedCert] = useState<Certificate | null>(null);
  const [searchError, setSearchError] = useState(false);

  const handleVerifySearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certSearchId.trim()) return;
    const found = CERTIFICATES.find(
      (c) =>
        c.certificateNumber.toLowerCase().includes(certSearchId.trim().toLowerCase()) ||
        c.id.toLowerCase().includes(certSearchId.trim().toLowerCase()) ||
        c.traineeName.toLowerCase().includes(certSearchId.trim().toLowerCase())
    );
    if (found) {
      setSearchedCert(found);
      setSearchError(false);
    } else {
      setSearchedCert(null);
      setSearchError(true);
    }
  };

  return (
    <section id="certification" className="py-20 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F3F1] text-[#2A7F7E] text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Verifiable Digital Capacity Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Accredited Ministry of Earth Sciences Certification
          </h2>
          <p className="text-base text-[#57534E] mt-3">
            Every completed curriculum issues a cryptographically authenticated credential endorsed by the Director General of Meteorology and recognized across national forecasting centres.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* LEFT: Physical / Diplomatic Certificate Preview */}
          <div className="lg:col-span-7">
            <div className="relative bg-white rounded-3xl border-8 border-[#F5F0E8] p-8 sm:p-10 shadow-2xl overflow-hidden text-left">
              {/* Decorative Guilloche style inner border */}
              <div className="absolute inset-3 border-2 border-[#0D3B66]/20 rounded-2xl pointer-events-none" />
              <div className="absolute inset-5 border border-dashed border-[#B88E28]/40 rounded-xl pointer-events-none" />

              {/* Watermark in background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-4 pointer-events-none">
                <ShieldCheck className="w-96 h-96 text-[#0D3B66]" />
              </div>

              {/* Certificate Header */}
              <div className="text-center mb-8 relative z-10">
                <p className="text-[11px] font-mono tracking-widest uppercase font-bold text-[#64748B]">
                  Government of India • Ministry of Earth Sciences
                </p>
                <h3 className="text-xl sm:text-2xl font-black text-[#0D3B66] tracking-tight mt-1">
                  INDIA METEOROLOGICAL DEPARTMENT
                </h3>
                <p className="text-xs text-[#2A7F7E] font-semibold mt-0.5">
                  CAPACITY CONNECT • DIGITAL CERTIFICATE OF SCIENTIFIC PROFICIENCY
                </p>
              </div>

              {/* Certificate Recipient */}
              <div className="text-center my-6 space-y-2 relative z-10">
                <p className="text-xs text-[#64748B] italic">This is to officially certify that</p>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight border-b-2 border-[#0D3B66]/20 pb-2 inline-block px-8">
                  {sampleCert.traineeName}
                </h4>
                <p className="text-xs text-[#57534E] font-medium">
                  {sampleCert.traineeDesignation}, {sampleCert.traineeStation}
                </p>
              </div>

              {/* Course Title & Distinction */}
              <div className="text-center my-6 relative z-10">
                <p className="text-xs text-[#64748B]">
                  has successfully satisfied all rigorous theoretical and practical competencies in:
                </p>
                <p className="text-lg font-bold text-[#0D3B66] mt-1">
                  {sampleCert.courseTitle}
                </p>
                <p className="text-xs font-semibold text-[#2A7F7E] mt-1">
                  Grade: {sampleCert.finalScore}% (Distinction) • Verified Assessment
                </p>
              </div>

              {/* Footer with Signatures & QR Verification */}
              <div className="pt-6 border-t border-[#E7E5E4] grid grid-cols-3 gap-4 items-end relative z-10 text-xs">
                {/* Faculty Lead */}
                <div className="text-left">
                  <div className="h-9 flex items-end">
                    <span className="font-serif italic text-sm text-[#0D3B66] font-bold">R. Kumar</span>
                  </div>
                  <div className="border-t border-[#94A3B8] pt-1">
                    <p className="font-bold text-[#0F172A] text-[11px]">{sampleCert.trainerName}</p>
                    <p className="text-[10px] text-[#64748B]">Lead Instructor</p>
                  </div>
                </div>

                {/* QR Code Concept */}
                <div className="flex flex-col items-center justify-center">
                  <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#CBD5E1] shadow-xs">
                    <QrCode className="w-12 h-12 text-[#0D3B66]" />
                  </div>
                  <span className="text-[9px] font-mono text-[#64748B] mt-1">
                    {sampleCert.certificateNumber}
                  </span>
                </div>

                {/* Director General */}
                <div className="text-right">
                  <div className="h-9 flex items-end justify-end">
                    <span className="font-serif italic text-sm text-[#0D3B66] font-bold">M. Ravichandran</span>
                  </div>
                  <div className="border-t border-[#94A3B8] pt-1">
                    <p className="font-bold text-[#0F172A] text-[11px]">{sampleCert.directorGeneralName}</p>
                    <p className="text-[10px] text-[#64748B]">Director General of Meteorology</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Real-time Verification Panel */}
          <div className="lg:col-span-5 text-left space-y-6">
            <div className="bg-white rounded-3xl border border-[#E7E5E4] p-8 shadow-sm">
              <h3 className="text-xl font-bold text-[#0F172A] mb-2">
                Instant Certificate Verification
              </h3>
              <p className="text-xs text-[#57534E] leading-relaxed mb-6">
                Enter any Certificate Number (e.g. <span className="font-mono font-bold text-[#0D3B66]">IMD-CC-2026-004189</span>) or trainee name to inspect the tamper-proof institutional ledger.
              </p>

              <form onSubmit={handleVerifySearch} className="space-y-3 mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={certSearchId}
                    onChange={(e) => setCertSearchId(e.target.value)}
                    placeholder="Enter Certificate Number or Officer Name"
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-[#E7E5E4] focus:outline-none focus:border-[#0D3B66] bg-[#FAF8F5]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#0D3B66] text-white text-xs sm:text-sm font-semibold hover:bg-[#092b4d] transition-all flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Verify Credential Authenticity</span>
                </button>
              </form>

              {/* Search Result Feedback */}
              {searchedCert && (
                <div className="p-4 rounded-xl bg-[#E8F3F1] border border-[#B9DDD7] text-xs space-y-2">
                  <div className="flex items-center gap-1.5 text-[#2A7F7E] font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Valid & Certified in Central IMD Registry</span>
                  </div>
                  <p className="text-[#0F172A]">
                    <span className="font-semibold">Officer:</span> {searchedCert.traineeName} ({searchedCert.traineeStation})
                  </p>
                  <p className="text-[#0F172A]">
                    <span className="font-semibold">Curriculum:</span> {searchedCert.courseTitle}
                  </p>
                  <p className="text-[11px] font-mono text-[#64748B] truncate">
                    Hash: {searchedCert.verificationHash}
                  </p>
                  <button
                    onClick={() => onVerifyCertificate?.(searchedCert)}
                    className="text-xs font-bold text-[#0D3B66] underline pt-1 block"
                  >
                    Open Official Credential View →
                  </button>
                </div>
              )}

              {searchError && (
                <div className="p-3 rounded-xl bg-[#FFF1F2] border border-[#FECDD3] text-xs text-[#E11D48]">
                  No certificate record matched this ID in the database. Please verify the number.
                </div>
              )}

              {/* Standard Security Guarantees */}
              <div className="pt-6 border-t border-[#F1F5F9] space-y-2.5 text-xs text-[#57534E]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2A7F7E]" />
                  <span>Aligned with WMO Guidelines for Competency Training</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2A7F7E]" />
                  <span>Integrates into National Forecaster Service Records</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2A7F7E]" />
                  <span>Tamper-evident 256-bit cryptographic verification</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
