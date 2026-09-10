import React, { useState } from 'react';
import { User, Certificate } from '../../types';
import { Shield, Users, Award, BookOpen, MapPin, CheckCircle2, TrendingUp, AlertTriangle, Download } from 'lucide-react';
import { CERTIFICATES, INITIAL_USERS } from '../../data/mockData';

interface AdminDashboardProps {
  currentUser: User;
  onViewCertificate: (cert: Certificate) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  onViewCertificate,
}) => {
  const [selectedRMC, setSelectedRMC] = useState<string>('All');

  const rmcData = [
    { name: 'RMC New Delhi (Northern Region)', trainees: 142, avgCompetency: 78, criticalGaps: 12, lead: 'Dr. S. K. Roy' },
    { name: 'RMC Kolkata (Eastern Region)', trainees: 98, avgCompetency: 72, criticalGaps: 18, lead: 'Dr. G. K. Das' },
    { name: 'RMC Mumbai (Western Region)', trainees: 110, avgCompetency: 75, criticalGaps: 14, lead: 'Dr. Jayanta Sarkar' },
    { name: 'RMC Chennai (Southern Region)', trainees: 104, avgCompetency: 81, criticalGaps: 9, lead: 'Dr. S. Balachandran' },
    { name: 'RMC Guwahati (North-Eastern Region)', trainees: 62, avgCompetency: 69, criticalGaps: 24, lead: 'Dr. S. O’Neill' },
    { name: 'RMC Nagpur (Central Region)', trainees: 54, avgCompetency: 74, criticalGaps: 15, lead: 'Dr. M. L. Sahu' },
  ];

  return (
    <div className="space-y-8 text-left">
      {/* Admin Executive Header */}
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#FDF6E2] border border-[#E8D49E] text-[#9E7318] flex items-center justify-center">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">
                  National Capacity Governance Console
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FDF6E2] text-[#9E7318] text-xs font-bold font-mono">
                  DIRECTOR GENERAL
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                {currentUser.name} • {currentUser.designation} • Central Institutional Learning Directorate
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] uppercase font-bold text-[#94A3B8] tracking-wider block">
              National Compliance
            </span>
            <span className="text-2xl font-black text-[#2A7F7E]">94.2% WMO Aligned</span>
          </div>
        </div>
      </div>

      {/* Top Level Institutional Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs">
          <p className="text-xs text-[#64748B] font-medium">Total Forecasters Enrolled</p>
          <p className="text-2xl font-black text-[#0F172A] mt-1">570 Officers</p>
          <p className="text-[11px] text-[#2A7F7E] mt-1">↑ +14% this quarter</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs">
          <p className="text-xs text-[#64748B] font-medium">Certificates Granted</p>
          <p className="text-2xl font-black text-[#0D3B66] mt-1">{CERTIFICATES.length * 150}+</p>
          <p className="text-[11px] text-[#64748B] mt-1">Cryptographically logged</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs">
          <p className="text-xs text-[#64748B] font-medium">Average Competency Level</p>
          <p className="text-2xl font-black text-[#2A7F7E] mt-1">74.8%</p>
          <p className="text-[11px] text-[#64748B] mt-1">Target baseline: 70%</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs">
          <p className="text-xs text-[#64748B] font-medium">Critical Gaps Remaining</p>
          <p className="text-2xl font-black text-rose-600 mt-1">92 Across India</p>
          <p className="text-[11px] text-rose-500 mt-1">Primarily Radar polarimetry & ML</p>
        </div>
      </div>

      {/* Regional Meteorological Centres (RMCs) Performance Breakdown */}
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-[#0F172A]">
              Regional Meteorological Centres (RMC) Capacity Matrix
            </h3>
            <p className="text-xs text-[#64748B] mt-1">
              Distribution of forecaster competencies and evaluated skill gaps across the six administrative forecasting zones.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rmcData.map((rmc, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4] space-y-4 hover:border-[#0D3B66]/30 transition-all"
            >
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#0D3B66] bg-white px-2 py-0.5 rounded border border-[#E7E5E4]">
                  Zone {idx + 1}
                </span>
                <h4 className="text-sm font-bold text-[#0F172A] mt-2">{rmc.name}</h4>
                <p className="text-[11px] text-[#64748B]">Director: {rmc.lead}</p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Active Trainees:</span>
                  <span className="font-bold text-[#0F172A]">{rmc.trainees}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Avg Proficiency:</span>
                  <span className="font-bold text-[#2A7F7E]">{rmc.avgCompetency}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Deficit Gaps:</span>
                  <span className="font-bold text-rose-600">{rmc.criticalGaps} flagged</span>
                </div>

                <div className="w-full bg-[#E7E5E4] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#2A7F7E] h-full" style={{ width: `${rmc.avgCompetency}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Certificate Issuances Table */}
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h3 className="text-xl font-bold text-[#0F172A]">National Certification Ledger</h3>
          <p className="text-xs text-[#64748B] mt-1">
            Official cryptographic records endorsed for service records.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF8F5] text-[#64748B] uppercase font-mono text-[10px] border-y border-[#E7E5E4]">
              <tr>
                <th className="px-4 py-3">Certificate ID</th>
                <th className="px-4 py-3">Officer Name</th>
                <th className="px-4 py-3">Station</th>
                <th className="px-4 py-3">Curriculum</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {CERTIFICATES.map((cert) => (
                <tr key={cert.id} className="hover:bg-[#FAF8F5]/80">
                  <td className="px-4 py-3 font-mono font-bold text-[#0D3B66]">
                    {cert.certificateNumber}
                  </td>
                  <td className="px-4 py-3 font-bold text-[#0F172A]">{cert.traineeName}</td>
                  <td className="px-4 py-3 text-[#57534E]">{cert.traineeStation}</td>
                  <td className="px-4 py-3 text-[#0F172A]">{cert.courseTitle}</td>
                  <td className="px-4 py-3 font-bold text-[#2A7F7E]">{cert.finalScore}%</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => onViewCertificate(cert)}
                      className="text-xs font-semibold text-[#0D3B66] hover:underline"
                    >
                      Audit Record →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
