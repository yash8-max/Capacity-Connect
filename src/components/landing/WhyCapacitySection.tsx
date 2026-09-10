import React from 'react';
import {
  Sparkles,
  Compass,
  Cpu,
  Award,
  BarChart3,
  Share2,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

interface WhyCapacitySectionProps {
  onLearnMoreClick?: (featureId: string) => void;
}

export const WhyCapacitySection: React.FC<WhyCapacitySectionProps> = ({ onLearnMoreClick }) => {
  const lifecycleSteps = [
    { number: '01', name: 'Discover', desc: 'Identify role-relevant courses and expert trainers with automated matching' },
    { number: '02', name: 'Learn', desc: 'Interactive lessons on WRF, INSAT-3DR, and dual-pol Doppler radar' },
    { number: '03', name: 'Practice', desc: 'Simulate synoptic chart analysis and high-resolution NetCDF pipelines' },
    { number: '04', name: 'Assess', desc: 'Rigorous competency-grounded evaluations and radar pattern tests' },
    { number: '05', name: 'Improve', desc: 'Continuous mathematical skill gap bridging and personalized guidance' },
    { number: '06', name: 'Certify', desc: 'Earn verifiable, cryptographically secured MoES-IMD digital certificates' },
    { number: '07', name: 'Share', desc: 'Deposit case studies, severe storm reports, and research notes' },
  ];

  const features = [
    {
      num: '01',
      title: 'Intelligent Recommendations',
      description: 'Get personalized course and trainer suggestions based on skills, interests, learning history and competency gaps.',
      icon: Sparkles,
      accent: 'text-[#2A7F7E] bg-[#E8F3F1]',
      target: 'recommendations',
    },
    {
      num: '02',
      title: 'Competency Mapping',
      description: 'Understand what skills exist, what skills are missing and where expertise can be found across all 6 RMCs.',
      icon: Compass,
      accent: 'text-[#0D3B66] bg-[#EBF2F7]',
      target: 'competencies',
    },
    {
      num: '03',
      title: 'AI-Powered Learning',
      description: 'Get instant explanations, learning guidance and personalized support through Capacity AI, grounded in verified data.',
      icon: Cpu,
      accent: 'text-[#B88E28] bg-[#FDF6E2]',
      target: 'ai-assistant',
    },
    {
      num: '04',
      title: 'Learning & Certification',
      description: 'Complete courses, assessments and earn verifiable certificates signed by the Director General of Meteorology.',
      icon: Award,
      accent: 'text-[#2A7F7E] bg-[#E8F3F1]',
      target: 'certification',
    },
    {
      num: '05',
      title: 'Analytics & Insights',
      description: 'Track participation, performance, learning outcomes and organizational capacity in real time.',
      icon: BarChart3,
      accent: 'text-[#0D3B66] bg-[#EBF2F7]',
      target: 'analytics',
    },
    {
      num: '06',
      title: 'Knowledge Sharing',
      description: 'Connect institutional expertise with learners through a centralized repository of Doppler manuals, case studies, and notebooks.',
      icon: Share2,
      accent: 'text-[#57534E] bg-[#F5F0E8]',
      target: 'resources',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white/70 border-y border-[#E7E5E4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* PART 1: The Lifecycle Timeline */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-[#64748B] font-mono">
            Continuous Professional Development
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mt-2">
            One Platform. Complete Capacity Building.
          </h2>
          <p className="text-base sm:text-lg text-[#57534E] mt-3">
            From discovering training pathways to operational storm certification, the entire learning lifecycle is seamlessly integrated.
          </p>
        </div>

        {/* Horizontal Process / Timeline */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {lifecycleSteps.map((step, idx) => (
            <div
              key={step.number}
              className="relative p-4 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4] hover:border-[#0D3B66]/40 transition-all text-left flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-[#0D3B66] px-2 py-0.5 rounded bg-white border border-[#E7E5E4]">
                    {step.number}
                  </span>
                  {idx < lifecycleSteps.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8] hidden lg:block group-hover:translate-x-1 transition-transform" />
                  )}
                </div>
                <h4 className="text-sm font-bold text-[#0F172A] mb-1">{step.name}</h4>
                <p className="text-[11px] text-[#64748B] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* PART 2: Why Capacity Connect (The 6 Pillars) */}
        <div id="features" className="pt-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-[#2A7F7E] font-mono">
              Institutional Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mt-2">
              Build a Stronger Tomorrow
            </h2>
            <p className="text-base sm:text-lg text-[#57534E] mt-3">
              Designed specifically for scientific personnel and meteorologists across India's atmospheric and oceanographic forecasting networks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.num}
                  onClick={() => onLearnMoreClick?.(item.target)}
                  className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E7E5E4] hover:border-[#0D3B66]/30 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group text-left"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`p-3 rounded-xl ${item.accent}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-[#94A3B8]">
                        {item.num}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#0F172A] mb-2 group-hover:text-[#0D3B66] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#57534E] leading-relaxed">
                      "{item.description}"
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs font-semibold text-[#0D3B66]">
                    <span>Explore Module</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
