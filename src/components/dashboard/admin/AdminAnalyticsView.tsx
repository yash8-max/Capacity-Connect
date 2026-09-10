import React from 'react';
import { User } from '../../../types';
import { BarChart3, Download, TrendingUp } from 'lucide-react';

interface AdminAnalyticsViewProps {
  currentUser: User;
  onToast: (msg: string) => void;
}

export const AdminAnalyticsView: React.FC<AdminAnalyticsViewProps> = ({ currentUser, onToast }) => {
  return (
    <div className="space-y-6 text-left">
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">Institutional Analytics & Audit Workspace</h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Comprehensive reporting on learning progress, course completion metrics, and RMC performance.
          </p>
        </div>
        <button
          onClick={() => onToast('Institutional analytics report downloaded successfully')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D3B66] text-white text-xs font-semibold hover:bg-[#092b4d]"
        >
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#0F172A]">Enrollment Growth</h3>
          <p className="text-3xl font-black text-[#0D3B66]">+24.8%</p>
          <p className="text-xs text-[#64748B]">Compared to previous operational year across all regional centers.</p>
        </div>
        <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#0F172A]">Assessment Pass Rate</h3>
          <p className="text-3xl font-black text-[#2A7F7E]">91.2%</p>
          <p className="text-xs text-[#64748B]">High proficiency demonstrated in Numerical Weather Prediction exams.</p>
        </div>
        <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#0F172A]">WMO Competency Compliance</h3>
          <p className="text-3xl font-black text-[#9E7318]">94.2%</p>
          <p className="text-xs text-[#64748B]">Exceeds international baseline standards for meteorological training.</p>
        </div>
      </div>
    </div>
  );
};
