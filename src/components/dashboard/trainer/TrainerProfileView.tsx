import React from 'react';
import { User } from '../../../types';
import { User as UserIcon, Award, BookOpen, Star } from 'lucide-react';

interface TrainerProfileViewProps {
  currentUser: User;
  onToast: (msg: string) => void;
}

export const TrainerProfileView: React.FC<TrainerProfileViewProps> = ({ currentUser, onToast }) => {
  return (
    <div className="space-y-6 text-left">
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
        <img src={currentUser.avatar} alt={currentUser.name} className="w-24 h-24 rounded-2xl object-cover ring-4 ring-[#0D3B66]/20" />
        <div>
          <h2 className="text-2xl font-black text-[#0F172A]">{currentUser.name}</h2>
          <p className="text-xs sm:text-sm text-[#2A7F7E] font-medium mt-1">{currentUser.designation} • {currentUser.department}</p>
          <p className="text-xs text-[#64748B] mt-2 leading-relaxed">{currentUser.bio}</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 space-y-6">
        <h3 className="text-base font-bold text-[#0F172A]">Faculty Qualifications & Certifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentUser.trainerProfile?.certifications.map((cert, i) => (
            <div key={i} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4] flex items-center gap-3">
              <Award className="w-5 h-5 text-[#9E7318]" />
              <span className="text-xs font-bold text-[#0F172A]">{cert}</span>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-[#E7E5E4] flex justify-end">
          <button
            onClick={() => onToast('Faculty profile updated successfully')}
            className="px-5 py-2.5 rounded-xl bg-[#0D3B66] text-white text-xs font-semibold hover:bg-[#092b4d]"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};
