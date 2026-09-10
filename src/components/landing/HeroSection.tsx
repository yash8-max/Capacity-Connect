import React from 'react';
import { ArrowRight, Play, Sparkles, Building2, CheckCircle2, Award } from 'lucide-react';
import { EarthGlobe } from '../3d/EarthGlobe';

interface HeroSectionProps {
  onExplorePlatform: () => void;
  onHowItWorksClick: () => void;
  onFeatureCardClick: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplorePlatform,
  onHowItWorksClick,
  onFeatureCardClick,
}) => {
  return (
    <section id="hero" className="relative pt-8 sm:pt-14 pb-20 sm:pb-28 overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F8F6F0] to-[#FAF8F5]">
      {/* Architectural ambient lighting and soft radial glows */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[#2A7F7E]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-0 w-[550px] h-[550px] bg-[#0D3B66]/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT: Institutional Editorial Typography & Call to Action */}
          <div className="lg:col-span-6 xl:col-span-6 text-left space-y-6 sm:space-y-8">
            {/* Ministry & Department Pill */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#E7E5E4] shadow-xs text-[#0D3B66]">
              <Building2 className="w-4 h-4 text-[#0D3B66]" />
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider uppercase font-mono">
                <span>Ministry of Earth Sciences</span>
                <span className="text-[#CBD5E1]">|</span>
                <span className="text-[#2A7F7E]">India Meteorological Department</span>
              </div>
            </div>

            {/* Smart Education Initiative Badge */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <span className="px-3 py-1 rounded-md bg-[#F5F0E8] border border-[#E7E5E4] text-[#57534E] font-mono font-medium">
                Smart Education • PS 26075
              </span>
              <span className="px-3 py-1 rounded-md bg-[#E8F3F1] border border-[#B9DDD7] text-[#2A7F7E] font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2A7F7E] animate-pulse" />
                National Operational Network Active
              </span>
            </div>

            {/* Large Editorial Serif Display Heading */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-[84px] font-serif font-extrabold text-[#0F172A] tracking-tight leading-[1.03]">
                Connect. <br />
                Learn. <br />
                <span className="text-[#2A7F7E] relative inline-block italic font-serif">
                  Grow.
                  <span className="absolute -bottom-1.5 left-0 w-full h-2.5 bg-[#2A7F7E]/15 rounded-full -z-10" />
                </span>
              </h1>
            </div>

            {/* Sophisticated Editorial Description */}
            <p className="text-base sm:text-lg lg:text-xl text-[#57534E] font-normal leading-relaxed max-w-xl">
              An intelligent digital capacity-building platform engineering operational excellence, competency mapping, and advanced meteorological training across all Regional Meteorological Centres.
            </p>

            {/* Key Value Points Grid */}
            <div className="grid grid-cols-2 gap-3.5 pt-1 text-xs sm:text-sm text-[#0F172A] font-medium">
              <div className="flex items-center gap-2.5 bg-white/60 p-2.5 rounded-xl border border-[#E7E5E4]/60">
                <CheckCircle2 className="w-4 h-4 text-[#2A7F7E] shrink-0" />
                <span>Deterministic Skill-Gap Scoring</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/60 p-2.5 rounded-xl border border-[#E7E5E4]/60">
                <CheckCircle2 className="w-4 h-4 text-[#2A7F7E] shrink-0" />
                <span>Dual-Pol Radar & NWP Modules</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/60 p-2.5 rounded-xl border border-[#E7E5E4]/60">
                <CheckCircle2 className="w-4 h-4 text-[#2A7F7E] shrink-0" />
                <span>Faculty & Mentorship Matching</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/60 p-2.5 rounded-xl border border-[#E7E5E4]/60">
                <CheckCircle2 className="w-4 h-4 text-[#2A7F7E] shrink-0" />
                <span>Verifiable MoES Certificates</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExplorePlatform}
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-[#0D3B66] text-white text-sm sm:text-base font-semibold shadow-md hover:bg-[#092b4d] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
              >
                <span>Explore Platform</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={onHowItWorksClick}
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-white border border-[#E7E5E4] text-[#0F172A] text-sm sm:text-base font-semibold shadow-xs hover:bg-[#FAF8F5] hover:border-[#CBD5E1] transition-all duration-200"
              >
                <span className="w-3 h-3 rounded-full border-2 border-[#0D3B66] flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-[#0D3B66]" />
                </span>
                <span>How It Works</span>
              </button>
            </div>
          </div>

          {/* RIGHT: Premium 3D Earth Scene with Architectural Pedestal & Floating Cards */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center">
            <EarthGlobe onFeatureCardClick={onFeatureCardClick} />
          </div>
        </div>
      </div>
    </section>
  );
};
