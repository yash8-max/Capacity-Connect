import React from 'react';
import { User } from '../../../types';
import { INITIAL_USERS } from '../../../data/mockData';
import { Users, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface TrainerTraineesViewProps {
  currentUser: User;
  onToast: (msg: string) => void;
}

export const TrainerTraineesView: React.FC<TrainerTraineesViewProps> = ({ currentUser, onToast }) => {
  const trainees = INITIAL_USERS.filter((u) => u.role === 'TRAINEE');

  return (
    <div className="space-y-6 text-left">
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8">
        <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">Trainees Mentored & Interventions</h2>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1">
          Monitor your enrolled trainee officers, identify learning roadblocks, and provide direct feedback.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E7E5E4] text-[11px] font-mono text-[#94A3B8] uppercase">
              <th className="py-3 px-4">Trainee Officer</th>
              <th className="py-3 px-4">Enrolled Course</th>
              <th className="py-3 px-4">Progress</th>
              <th className="py-3 px-4">Assessment Score</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E7E5E4] text-xs">
            {trainees.map((t, idx) => (
              <tr key={t.id} className="hover:bg-[#FAF8F5]">
                <td className="py-4 px-4 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <p className="font-bold text-[#0F172A]">{t.name}</p>
                    <p className="text-[11px] text-[#64748B]">{t.designation}</p>
                  </div>
                </td>
                <td className="py-4 px-4 font-medium text-[#0F172A]">Numerical Weather Prediction</td>
                <td className="py-4 px-4 font-mono font-bold text-[#0D3B66]">{(idx + 2) * 20}%</td>
                <td className="py-4 px-4 font-mono font-bold text-[#2A7F7E]">84.5%</td>
                <td className="py-4 px-4">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                    On Track
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <button
                    onClick={() => onToast(`Feedback sent to ${t.name}`)}
                    className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#E7E5E4] font-semibold text-[#0F172A] hover:bg-[#0D3B66] hover:text-white transition-all"
                  >
                    Provide Feedback
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
