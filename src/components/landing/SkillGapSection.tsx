import React, { useState } from 'react';
import { Target, TrendingUp, ArrowRight, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { CompetencyService } from '../../services/competencyService';
import { User } from '../../types';

interface SkillGapSectionProps {
  currentUser?: User | null;
  onEnrollInRecommendedCourse: (courseId: string) => void;
}

export const SkillGapSection: React.FC<SkillGapSectionProps> = ({
  currentUser,
  onEnrollInRecommendedCourse,
}) => {
  const safeUser = currentUser || {
    id: 'trainee-1',
    name: 'Priya Sharma',
    email: 'priya.sharma@imd.gov.in',
    role: 'TRAINEE' as const,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    designation: 'Meteorologist Grade-II',
    department: 'NWFC Forecasting Division',
    organization: 'India Meteorological Department (IMD)',
    location: 'New Delhi',
    joinedDate: '2023-01-15',
    traineeProfile: {
      employeeCode: 'IMD-TR-1042',
      batchYear: 2023,
      cadre: 'Meteorological Service Cadre Gr-II',
      currentStation: 'RMC New Delhi',
      completedCoursesCount: 4,
      activeEnrollmentsCount: 2,
      totalCertificatesCount: 3,
      learningHours: 48,
      competencyLevel: 'Intermediate',
      learningInterests: ['Doppler Radar', 'Numerical Weather Prediction']
    }
  };
  const [selectedCompetencyId, setSelectedCompetencyId] = useState<string>('comp-ml');
  const userCompetencies = CompetencyService.getUserCompetencies(safeUser.id);
  const gapsData = CompetencyService.getSkillGaps(safeUser.id);

  const activeComp = userCompetencies.find((c) => c.competencyId === selectedCompetencyId) || userCompetencies[0];

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'Master':
      case 'Advanced':
        return 'bg-[#E8F3F1] text-[#2A7F7E] border-[#B9DDD7]';
      case 'Intermediate':
        return 'bg-[#EBF2F7] text-[#0D3B66] border-[#BFD4E6]';
      case 'Beginner':
      default:
        return 'bg-[#FFF1F2] text-[#E11D48] border-[#FECDD3]';
    }
  };

  return (
    <section id="skill-gap" className="py-20 bg-white border-y border-[#E7E5E4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF2F7] text-[#0D3B66] text-xs font-semibold mb-3">
            <Target className="w-3.5 h-3.5" />
            <span>Target vs. Current Operational Proficiency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Skill Gap Intelligence & Action Pathway
          </h2>
          <p className="text-base text-[#57534E] mt-3">
            Real-time competency diagnostics for <span className="font-bold text-[#0F172A]">{safeUser.name}</span> ({safeUser.designation} at {safeUser.traineeProfile?.currentStation || safeUser.location}).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Live Interactive Competency Progress Bars */}
          <div className="lg:col-span-7 bg-[#FAF8F5] rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
              <span className="text-xs uppercase font-bold tracking-wider text-[#0D3B66]">
                Evaluated Competency Dimensions
              </span>
              <span className="text-xs text-[#64748B] font-medium">Click to inspect action plan</span>
            </div>

            <div className="space-y-4">
              {userCompetencies.map((comp) => {
                const isSelected = comp.competencyId === selectedCompetencyId;
                const isCriticalGap = comp.gap >= 30;

                return (
                  <div
                    key={comp.competencyId}
                    onClick={() => setSelectedCompetencyId(comp.competencyId)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-[#0D3B66] shadow-md ring-2 ring-[#0D3B66]/10'
                        : 'bg-white/80 border-[#E7E5E4] hover:bg-white hover:border-[#CBD5E1]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <h4 className="text-sm font-bold text-[#0F172A]">{comp.competencyName}</h4>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getLevelBadge(comp.levelLabel)}`}>
                          {comp.levelLabel}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-[#0F172A]">{comp.currentLevel}%</span>
                        <span className="text-[11px] text-[#94A3B8]"> / {comp.targetLevel}% Target</span>
                      </div>
                    </div>

                    {/* Progress Track & Deficit Gap Indicator */}
                    <div className="relative w-full h-3 bg-[#E7E5E4] rounded-full overflow-hidden">
                      {/* Current Score */}
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${
                          isCriticalGap ? 'bg-[#E11D48]' : 'bg-[#2A7F7E]'
                        }`}
                        style={{ width: `${comp.currentLevel}%` }}
                      />
                      {/* Target Marker */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-[#0D3B66]"
                        style={{ left: `${comp.targetLevel}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between mt-2 text-[11px] text-[#64748B]">
                      <span className="flex items-center gap-1">
                        {isCriticalGap ? (
                          <span className="text-[#E11D48] font-semibold flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" /> Critical Gap: -{comp.gap}%
                          </span>
                        ) : (
                          <span className="text-[#2A7F7E] font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Deficit: -{comp.gap}%
                          </span>
                        )}
                      </span>
                      <span>Last assessed: {comp.lastEvaluated}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Targeted Remediation Card for Selected Skill */}
          <div className="lg:col-span-5 bg-[#FAF8F5] rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
              <span className="text-xs uppercase font-bold tracking-wider text-[#2A7F7E]">
                Recommended Next Step
              </span>
              <span className="text-xs font-mono font-bold text-[#0D3B66] px-2 py-0.5 rounded bg-white border border-[#E7E5E4]">
                IMD FAST-TRACK
              </span>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#E7E5E4] shadow-xs">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                Focus Competency
              </span>
              <h3 className="text-xl font-bold text-[#0F172A] mt-1 mb-3">
                {activeComp.competencyName}
              </h3>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4] mb-5 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Current Level:</span>
                  <span className="font-bold text-[#0F172A]">{activeComp.currentLevel}% ({activeComp.levelLabel})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Target IMD Operational Threshold:</span>
                  <span className="font-bold text-[#0D3B66]">{activeComp.targetLevel}%</span>
                </div>
                <div className="flex justify-between border-t border-[#E7E5E4] pt-2">
                  <span className="text-[#64748B]">Calculated Deficit:</span>
                  <span className="font-bold text-[#E11D48]">-{activeComp.gap}% points</span>
                </div>
              </div>

              <div className="space-y-2 mb-6 text-xs text-[#57534E]">
                <p className="font-semibold text-[#0F172A]">Why bridge this gap now?</p>
                <p className="leading-relaxed">
                  The Ministry of Earth Sciences and IMD are automating next-generation severe weather nowcasting with physics-informed AI algorithms. Mastering this competency directly elevates your station's warning lead times.
                </p>
              </div>

              {/* Recommended Course button */}
              <div className="pt-2">
                <p className="text-[11px] text-[#64748B] mb-2 font-medium">Recommended Course to Close Gap:</p>
                <div className="p-4 rounded-xl bg-[#EBF2F7] border border-[#BFD4E6] text-left mb-4">
                  <p className="text-xs font-bold text-[#0D3B66]">Machine Learning for Weather Prediction</p>
                  <p className="text-[11px] text-[#57534E] mt-0.5">Under Dr. Rajesh Kumar (Scientist-G, New Delhi)</p>
                </div>

                <button
                  onClick={() => onEnrollInRecommendedCourse('course-ml-weather')}
                  className="w-full py-3 px-4 rounded-xl bg-[#0D3B66] text-white text-xs sm:text-sm font-semibold hover:bg-[#082947] transition-all flex items-center justify-center gap-2 shadow-md group"
                >
                  <span>Begin Learning (Bridge Gap)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Quick summary metrics */}
            <div className="grid grid-cols-2 gap-3 text-center text-xs">
              <div className="p-3 rounded-xl bg-white border border-[#E7E5E4]">
                <p className="text-xl font-bold text-[#E11D48]">{gapsData.criticalGaps.length}</p>
                <p className="text-[#64748B] text-[11px]">Critical Gaps</p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#E7E5E4]">
                <p className="text-xl font-bold text-[#2A7F7E]">{gapsData.proficientSkills.length}</p>
                <p className="text-[#64748B] text-[11px]">Proficient Skills</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
