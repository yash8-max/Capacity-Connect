import React from 'react';
import { User } from '../../../types';
import { INITIAL_USERS } from '../../../data/mockData';
import { UserCheck, Star, Award, BookOpen, Sparkles } from 'lucide-react';

interface AdminTrainersViewProps {
  currentUser: User;
  onToast: (msg: string) => void;
}

export const AdminTrainersView: React.FC<AdminTrainersViewProps> = ({ currentUser, onToast }) => {
  const trainers = INITIAL_USERS.filter((u) => u.role === 'TRAINER');

  return (
    <div className="space-y-6 text-left">
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8">
        <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">Faculty Trainers Roster</h2>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1">
          Meteorological experts, senior scientists, and specialists conducting operational training across IMD divisions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <div key={trainer.id} className="bg-white rounded-3xl border border-[#E7E5E4] p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between gap-4">
                <img src={trainer.avatar} alt={trainer.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#0D3B66]/20" />
                <span className="px-2.5 py-1 rounded-full bg-[#EBF2F7] text-[#0D3B66] text-[10px] font-bold font-mono">
                  Best Match: 98%
                </span>
              </div>
              <h3 className="text-base font-bold text-[#0F172A] mt-4">{trainer.name}</h3>
              <p className="text-xs text-[#2A7F7E] font-medium">{trainer.designation}</p>
              <p className="text-xs text-[#64748B] mt-2 line-clamp-2">{trainer.bio}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {trainer.trainerProfile?.specialization.map((spec, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-lg bg-[#FAF8F5] border border-[#E7E5E4] text-[10px] font-semibold text-[#57534E]">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E7E5E4] flex items-center justify-between text-xs">
              <div>
                <span className="text-[#94A3B8] block text-[10px]">Trainees Trained</span>
                <span className="font-bold text-[#0F172A]">{trainer.trainerProfile?.totalTraineesTrained || 450}+ Officers</span>
              </div>
              <div className="text-right">
                <span className="text-[#94A3B8] block text-[10px]">Rating</span>
                <span className="font-bold text-[#9E7318] flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#9E7318]" /> {trainer.trainerProfile?.averageRating || 4.9}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
