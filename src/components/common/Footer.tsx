import React from 'react';
import { ArrowRight, Building2, Shield, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onExploreCourse: (courseId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onExploreCourse }) => {
  return (
    <footer className="bg-[#FAF8F5] border-t border-[#E7E5E4] pt-16 pb-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Latest Announcement Ticker Bar */}
        <div className="p-4 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs mb-14 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs sm:text-sm text-[#0F172A]">
            <span className="px-2.5 py-1 rounded-md bg-[#2A7F7E] text-white text-[11px] font-bold uppercase tracking-wider shrink-0">
              Latest
            </span>
            <span className="font-medium">
              New course on <span className="font-bold">Machine Learning for Weather Prediction</span> is now live with accredited modules.
            </span>
          </div>

          <button
            onClick={() => onExploreCourse('course-ml-weather')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D3B66] hover:underline whitespace-nowrap"
          >
            <span>Explore Course</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Primary Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E7E5E4]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0D3B66] p-2 flex items-center justify-center text-white shadow-xs">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-[#0F172A] tracking-tight">
                  CAPACITY <span className="text-[#0D3B66]">CONNECT</span>
                </h3>
                <p className="text-[11px] text-[#64748B] font-medium">
                  Digital Capacity Building & Learning Management Portal
                </p>
              </div>
            </div>

            <p className="text-xs text-[#57534E] leading-relaxed max-w-sm">
              An institutional technology initiative developed for the Ministry of Earth Sciences (MoES) and India Meteorological Department (IMD) to empower scientific excellence, nowcasting accuracy, and continuous competency development.
            </p>

            <div className="pt-2 text-xs text-[#64748B] space-y-1 font-mono">
              <p>Mausam Bhawan, Lodhi Road, New Delhi – 110003</p>
              <p>Coordination: Central Training Institute (CTI) Pune</p>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider font-mono">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#57534E]">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-[#0D3B66]">
                  Portal Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#0D3B66]">
                  Capacity Lifecycle
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-[#0D3B66]">
                  Course Catalog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('trainers')} className="hover:text-[#0D3B66]">
                  Faculty Matching
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-[#0D3B66]">
                  Resource Library
                </button>
              </li>
            </ul>
          </div>

          {/* Intelligence & Frameworks */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider font-mono">
              Intelligence
            </h4>
            <ul className="space-y-2 text-xs text-[#57534E]">
              <li>
                <button onClick={() => onNavigate('recommendations')} className="hover:text-[#0D3B66]">
                  Scoring Engine
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('skill-gap')} className="hover:text-[#0D3B66]">
                  Competency Gaps
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai-assistant')} className="hover:text-[#0D3B66]">
                  Capacity AI
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('certification')} className="hover:text-[#0D3B66]">
                  Credential Registry
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('announcements')} className="hover:text-[#0D3B66]">
                  Directives
                </button>
              </li>
            </ul>
          </div>

          {/* Institutional Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider font-mono">
              Governance
            </h4>
            <ul className="space-y-2 text-xs text-[#57534E]">
              <li>Ministry of Earth Sciences (MoES)</li>
              <li>India Meteorological Department (IMD)</li>
              <li>Regional Met Centres (RMCs)</li>
              <li>WMO Competency Guidelines</li>
              <li>Data Privacy & Security Protocols</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] gap-4">
          <p>© {new Date().getFullYear()} Ministry of Earth Sciences, Government of India. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Problem Statement 26075</span>
            <span>•</span>
            <span>Theme: Smart Education</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
