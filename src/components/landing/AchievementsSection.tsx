import React from 'react';
import { Users, BookOpen, UserCheck, Layers, Award } from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const stats = [
    {
      number: '500+',
      label: 'Trainees Certified',
      subtext: 'Across 6 Regional Meteorological Centres',
      icon: Award,
      accent: 'text-[#2A7F7E] bg-[#E8F3F1]',
    },
    {
      number: '120+',
      label: 'Accredited Courses',
      subtext: 'Radar, NWP, Satellite & Climate domains',
      icon: BookOpen,
      accent: 'text-[#0D3B66] bg-[#EBF2F7]',
    },
    {
      number: '75+',
      label: 'Expert Trainers',
      subtext: 'Senior Scientists, Directors & WMO fellows',
      icon: UserCheck,
      accent: 'text-[#B88E28] bg-[#FDF6E2]',
    },
    {
      number: '1,500+',
      label: 'Learning Resources',
      subtext: 'Doppler manuals, NetCDF scripts, case studies',
      icon: Layers,
      accent: 'text-[#57534E] bg-[#F5F0E8]',
    },
  ];

  return (
    <section className="py-16 bg-white border-y border-[#E7E5E4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4] hover:border-[#0D3B66]/30 transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight group-hover:text-[#0D3B66] transition-colors">
                    {stat.number}
                  </span>
                  <div className={`p-2.5 rounded-xl ${stat.accent}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-[#0F172A] mb-1">
                  {stat.label}
                </h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
