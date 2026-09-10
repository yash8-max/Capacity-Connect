import React from 'react';
import { Bell, ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { ANNOUNCEMENTS } from '../../data/mockData';

interface AnnouncementsSectionProps {
  onAnnouncementClick?: (announcementId: string) => void;
}

export const AnnouncementsSection: React.FC<AnnouncementsSectionProps> = ({
  onAnnouncementClick,
}) => {
  return (
    <section id="announcements" className="py-16 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF2F7] text-[#0D3B66] text-xs font-semibold mb-2">
              <Bell className="w-3.5 h-3.5" />
              <span>Official Institutional Notices</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Announcements & Directives
            </h2>
          </div>
          <p className="text-xs text-[#64748B] mt-2 sm:mt-0 font-mono">
            New Delhi HQ • Mausam Bhawan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ANNOUNCEMENTS.map((ann) => (
            <div
              key={ann.id}
              onClick={() => onAnnouncementClick?.(ann.id)}
              className="p-6 rounded-2xl bg-white border border-[#E7E5E4] hover:border-[#0D3B66]/30 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-[#E7E5E4] text-[11px] font-semibold text-[#0D3B66]">
                    {ann.type}
                  </span>
                  <span className="text-xs text-[#94A3B8] flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    {ann.date}
                  </span>
                </div>

                <h4 className="text-base font-bold text-[#0F172A] group-hover:text-[#0D3B66] transition-colors mb-2">
                  {ann.title}
                </h4>

                <p className="text-xs text-[#57534E] leading-relaxed mb-4">
                  {ann.summary}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-[#0D3B66] pt-3 border-t border-[#F1F5F9]">
                <span>{ann.actionLabel || 'Read Directive Details'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
