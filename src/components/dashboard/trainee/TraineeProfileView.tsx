import React from 'react';
import { User } from '../../../types';
import { User as UserIcon, Award, BookOpen } from 'lucide-react';

interface TraineeProfileViewProps {
  currentUser: User;
  onToast: (msg: string) => void;
}

export const TraineeProfileView: React.FC<TraineeProfileViewProps> = ({ currentUser, onToast }) => {
  return (
    <div className="space-y-6 text-left">
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
        <img src={currentUser.avatar} alt={currentUser.name} className="w-24 h-24 rounded-2xl object-cover ring-4 ring-[#2A7F7E]/20" />
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-[#0F172A]">{currentUser.name}</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#E8F3F1] text-[#2A7F7E] text-xs font-bold">
              Trainee Forecaster
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">{currentUser.designation} • {currentUser.organization} • Cadre ID: {currentUser.traineeProfile?.employeeCode || 'IMD-TR-1042'}</p>
          <p className="text-xs text-[#64748B] mt-2 leading-relaxed">{currentUser.bio}</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 space-y-6">
        <h3 className="text-base font-bold text-[#0F172A]">Current Station & Service Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4]">
            <span className="text-[#94A3B8] block text-[10px] uppercase font-mono">Current Station</span>
            <span className="font-bold text-[#0F172A] text-sm mt-1 block">{currentUser.traineeProfile?.currentStation || 'RMC New Delhi'}</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4]">
            <span className="text-[#94A3B8] block text-[10px] uppercase font-mono">Completed Courses</span>
            <span className="font-bold text-[#2A7F7E] text-sm mt-1 block">{currentUser.traineeProfile?.completedCoursesCount || 3} Courses</span>
          </div>
        </div>
        <div className="pt-4 border-t border-[#E7E5E4] flex justify-end">
          <button
            onClick={() => onToast('Profile details updated successfully')}
            className="px-5 py-2.5 rounded-xl bg-[#0D3B66] text-white text-xs font-semibold hover:bg-[#092b4d]"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};
