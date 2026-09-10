import React, { useState } from 'react';
import { User } from '../../../types';
import { INITIAL_USERS } from '../../../data/mockData';
import { GraduationCap, Search, CheckCircle2 } from 'lucide-react';

interface AdminTraineesViewProps {
  currentUser: User;
  onToast: (msg: string) => void;
}

export const AdminTraineesView: React.FC<AdminTraineesViewProps> = ({ currentUser, onToast }) => {
  const trainees = INITIAL_USERS.filter((u) => u.role === 'TRAINEE');
  const [search, setSearch] = useState('');

  const filtered = trainees.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.designation.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 text-left">
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">Trainee Officers Directory</h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Tracking active learning progress, competency scores, and certification records for operational meteorologists.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search trainees..."
            className="w-full bg-[#FAF8F5] border border-[#E7E5E4] rounded-xl pl-10 pr-4 py-2 text-xs text-[#0F172A] outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E7E5E4] text-[11px] font-mono text-[#94A3B8] uppercase">
              <th className="py-3 px-4">Trainee Officer</th>
              <th className="py-3 px-4">Cadre & Station</th>
              <th className="py-3 px-4">Courses Completed</th>
              <th className="py-3 px-4">Competency Score</th>
              <th className="py-3 px-4">Assessment Average</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E7E5E4] text-xs">
            {filtered.map((t) => (
              <tr key={t.id} className="hover:bg-[#FAF8F5]">
                <td className="py-4 px-4 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <p className="font-bold text-[#0F172A]">{t.name}</p>
                    <p className="text-[11px] text-[#64748B]">{t.email}</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <p className="font-medium text-[#0F172A]">{t.designation}</p>
                  <p className="text-[11px] text-[#64748B]">RMC New Delhi</p>
                </td>
                <td className="py-4 px-4 font-bold text-[#0D3B66]">3 / 8 Enrolled</td>
                <td className="py-4 px-4 font-bold text-[#2A7F7E]">82.4% (Advanced)</td>
                <td className="py-4 px-4 font-bold text-[#9E7318]">88.5%</td>
                <td className="py-4 px-4 text-right">
                  <button
                    onClick={() => onToast(`Viewing dossier for ${t.name}`)}
                    className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#E7E5E4] font-semibold text-[#0F172A] hover:bg-[#0D3B66] hover:text-white transition-all"
                  >
                    View Dossier
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
