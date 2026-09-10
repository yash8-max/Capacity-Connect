import React from 'react';
import { User } from '../../../types';
import { CompetencyService } from '../../../services/competencyService';
import { Target, BarChart3 } from 'lucide-react';

interface TraineeCompetenciesViewProps {
  currentUser: User;
  onToast: (msg: string) => void;
}

export const TraineeCompetenciesView: React.FC<TraineeCompetenciesViewProps> = ({ currentUser, onToast }) => {
  const userComps = CompetencyService.getUserCompetencies(currentUser.id);
  const gaps = CompetencyService.getSkillGaps(currentUser.id);

  return (
    <div className="space-y-6 text-left">
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8">
        <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">My Competency Profile & Radar</h2>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1">
          Track your current proficiency levels across WMO meteorological skill areas and identify development targets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userComps.map((uc) => (
          <div key={uc.competencyId} className="bg-white rounded-3xl border border-[#E7E5E4] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0F172A]">{uc.competencyName}</h3>
              <span className="px-2.5 py-1 rounded-full bg-[#E8F3F1] text-[#2A7F7E] text-xs font-bold">
                Level: {uc.currentLevel}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-[#64748B]">Proficiency Score</span>
                <span className="text-[#0D3B66]">{uc.currentLevel}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#FAF8F5] border border-[#E7E5E4] overflow-hidden">
                <div className="h-full bg-[#0D3B66] rounded-full" style={{ width: `${uc.currentLevel}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
