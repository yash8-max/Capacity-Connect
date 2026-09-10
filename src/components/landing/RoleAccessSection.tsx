import React from 'react';
import { Shield, UserCheck, GraduationCap, ArrowRight, Sparkles, Building, Award, BookOpen } from 'lucide-react';
import { UserRole } from '../../types';

interface RoleAccessSectionProps {
  onSelectRole: (role: UserRole) => void;
}

export const RoleAccessSection: React.FC<RoleAccessSectionProps> = ({ onSelectRole }) => {
  const roles = [
    {
      id: 'ADMIN' as UserRole,
      title: 'ADMIN',
      subtitle: 'Institutional Oversight & Governance',
      description: 'Manage people, programs, analytics, skill gap intelligence and institutional learning across all RMCs.',
      icon: Shield,
      features: ['Capacity Intelligence Dashboard', 'Skill Gap Allocation Matrix', 'Officer Certification Audits', 'National Program Deployment'],
      accentColor: 'border-[#B88E28]/40 hover:border-[#B88E28] bg-gradient-to-b from-white to-[#FDFBF7]',
      iconBadge: 'bg-[#FDF6E2] text-[#9E7318] ring-1 ring-[#E8D49E]',
      buttonStyle: 'bg-[#9E7318] hover:bg-[#856113] text-white',
      demoUser: 'Dr. M. Ravichandran (Director General)',
      tag: 'Governance & Analytics',
    },
    {
      id: 'TRAINER' as UserRole,
      title: 'TRAINER',
      subtitle: 'Domain Experts & Faculty',
      description: 'Create learning experiences, design evaluations, upload Doppler & satellite case studies, and share scientific expertise.',
      icon: UserCheck,
      features: ['Curriculum & Module Builder', 'Doppler Radar & Satellite Lab Uploads', 'Trainee Competency Scoring', 'Feedback & Performance Metrics'],
      accentColor: 'border-[#0D3B66]/30 hover:border-[#0D3B66] bg-gradient-to-b from-white to-[#F8FAFC]',
      iconBadge: 'bg-[#EBF2F7] text-[#0D3B66] ring-1 ring-[#BFD4E6]',
      buttonStyle: 'bg-[#0D3B66] hover:bg-[#092b4d] text-white',
      demoUser: 'Dr. Rajesh Kumar (Head of NWP)',
      tag: 'Curriculum & Mentorship',
    },
    {
      id: 'TRAINEE' as UserRole,
      title: 'TRAINEE',
      subtitle: 'Forecasters & Scientific Officers',
      description: 'Learn, build competencies, complete real-world assessments, bridge skill gaps and grow through certified career pathways.',
      icon: GraduationCap,
      features: ['Personalized Recommendation Engine', 'Interactive Doppler/NWP Course Player', 'Instant Skill Gap Radar', 'Cryptographically Signed Certificates'],
      accentColor: 'border-[#2A7F7E]/35 hover:border-[#2A7F7E] bg-gradient-to-b from-white to-[#F6FAF9]',
      iconBadge: 'bg-[#E8F3F1] text-[#2A7F7E] ring-1 ring-[#B9DDD7]',
      buttonStyle: 'bg-[#2A7F7E] hover:bg-[#206362] text-white',
      demoUser: 'Priya Sharma (Meteorologist Grade-I, Kolkata)',
      tag: 'Learning & Growth',
    },
  ];

  return (
    <section id="role-access" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-[#64748B] font-mono">
            Role-Based Institutional Access
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mt-2">
            Tailored Experiences for Every Stakeholder
          </h2>
          <p className="text-base sm:text-lg text-[#57534E] mt-3">
            Seamlessly structured for administrators, specialized meteorological faculty, and operational forecasters.
          </p>
        </div>

        {/* The Three Major Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {roles.map((role) => {
            const Icon = role.icon;

            return (
              <div
                key={role.id}
                className={`relative rounded-2xl border p-6 sm:p-8 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between ${role.accentColor}`}
              >
                <div>
                  {/* Top Tag & Role Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3.5 rounded-xl ${role.iconBadge}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white border border-[#E7E5E4] text-[#57534E]">
                      {role.tag}
                    </span>
                  </div>

                  {/* Role Title */}
                  <h3 className="text-2xl font-black text-[#0F172A] tracking-tight">
                    {role.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#64748B] mb-3">
                    {role.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-[#57534E] leading-relaxed mb-6">
                    "{role.description}"
                  </p>

                  {/* Key Capabilities */}
                  <div className="space-y-2 py-4 border-t border-[#E7E5E4]/80 text-xs text-[#0F172A] mb-6">
                    {role.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-current mt-1.5 shrink-0 opacity-60" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Section: Active Profile Indicator & Access Button */}
                <div className="pt-4 border-t border-[#E7E5E4]/60">
                  <div className="flex items-center justify-between text-[11px] text-[#64748B] mb-3">
                    <span>Default Profile:</span>
                    <span className="font-semibold text-[#0F172A] truncate max-w-[180px]">{role.demoUser}</span>
                  </div>

                  <button
                    onClick={() => onSelectRole(role.id)}
                    className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all group ${role.buttonStyle}`}
                  >
                    <span>Login as {role.title}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
