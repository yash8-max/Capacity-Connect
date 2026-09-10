import React from 'react';
import { User } from '../../../types';
import { COMPETENCIES } from '../../../data/mockData';
import { BarChart3, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface AdminCompetenciesViewProps {
  currentUser: User;
  onToast: (msg: string) => void;
}

export const AdminCompetenciesView: React.FC<AdminCompetenciesViewProps> = ({ currentUser, onToast }) => {
  return (
    <div className="space-y-6 text-left">
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8">
        <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">National Competency Landscape</h2>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1">
          WMO-aligned competency mapping, skill gap analysis, and training coverage across regional forecasting stations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {COMPETENCIES.map((comp) => (
          <div key={comp.id} className="bg-white rounded-3xl border border-[#E7E5E4] p-6 shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#E8F3F1] text-[#2A7F7E] text-[10px] font-bold font-mono uppercase">
                  {comp.category}
                </span>
                <h3 className="text-base font-bold text-[#0F172A] mt-2">{comp.name}</h3>
                <p className="text-xs text-[#64748B] mt-1">{comp.description}</p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-[#64748B]">National Coverage</span>
                <span className="text-[#0D3B66]">78%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-[#FAF8F5] border border-[#E7E5E4] overflow-hidden">
                <div className="h-full bg-[#2A7F7E] rounded-full" style={{ width: '78%' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
