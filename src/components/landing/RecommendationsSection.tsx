import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ArrowRight, BookOpen, Clock, User, Star, HelpCircle } from 'lucide-react';
import { CourseRecommendation, User as UserType } from '../../types';
import { RecommendationEngine } from '../../services/recommendationService';

interface RecommendationsSectionProps {
  currentUser?: UserType | null;
  onSelectCourse: (courseId: string) => void;
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  currentUser,
  onSelectCourse,
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
  const recommendations = RecommendationEngine.getCourseRecommendations(safeUser);
  const [activeTab, setActiveTab] = useState<'recommendations' | 'engine-architecture'>('recommendations');
  const topRec = recommendations[0];

  return (
    <section id="recommendations" className="py-20 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F3F1] text-[#2A7F7E] text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-Factor Algorithmic Engine</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Intelligent Recommendations
            </h2>
            <p className="text-base text-[#57534E] mt-2 max-w-2xl">
              Deterministic, transparent scoring calibrated to your cadre, operational station, and evaluated skill gaps.
            </p>
          </div>

          {/* Toggle between Live Recommendations and Mathematical Scoring Formula */}
          <div className="mt-4 md:mt-0 flex items-center p-1 bg-white border border-[#E7E5E4] rounded-xl shadow-xs">
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'recommendations'
                  ? 'bg-[#0D3B66] text-white shadow-xs'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Recommended for You
            </button>
            <button
              onClick={() => setActiveTab('engine-architecture')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'engine-architecture'
                  ? 'bg-[#0D3B66] text-white shadow-xs'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Scoring Formula (100%)
            </button>
          </div>
        </div>

        {activeTab === 'recommendations' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* HERO RECOMMENDATION CARD (92% Match Spotlight) */}
            {topRec && (
              <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-[#2A7F7E]/30 p-6 sm:p-8 shadow-lg relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-[#2A7F7E] to-[#206362] text-white px-6 py-2 rounded-bl-2xl text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Top Recommendation</span>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#EBF2F7] text-[#0D3B66] text-xs font-mono font-semibold">
                      {topRec.course.code}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-[#E7E5E4] text-xs text-[#57534E]">
                      {topRec.course.level} Level
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight mb-3">
                    {topRec.course.title}
                  </h3>

                  <p className="text-sm text-[#57534E] leading-relaxed mb-6">
                    {topRec.course.description}
                  </p>

                  {/* The Critical "Why this recommendation?" Section */}
                  <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4] mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs uppercase font-bold tracking-wider text-[#0D3B66]">
                        Why this recommendation?
                      </h4>
                      <div className="flex items-center gap-1 text-sm font-bold text-[#2A7F7E]">
                        <span>{topRec.matchScore}%</span>
                        <span className="text-xs text-[#64748B] font-normal">Match Score</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {topRec.reasons.map((reason, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#0F172A]">
                          <CheckCircle2 className="w-4 h-4 text-[#2A7F7E] shrink-0 mt-0.5" />
                          <span>{reason.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Course Details Bar */}
                  <div className="grid grid-cols-3 gap-3 py-3 border-y border-[#F1F5F9] text-xs text-[#64748B] mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#94A3B8]" />
                      <span>{topRec.course.durationHours} Hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#94A3B8]" />
                      <span>{topRec.course.modulesCount} Modules</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>{topRec.course.rating} / 5.0</span>
                    </div>
                  </div>
                </div>

                {/* Trainer & Action CTA */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={topRec.course.trainerAvatar}
                      alt={topRec.course.trainerName}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-[#0D3B66]/20"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#0F172A]">{topRec.course.trainerName}</p>
                      <p className="text-[11px] text-[#64748B]">{topRec.course.trainerTitle}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectCourse(topRec.course.id)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0D3B66] text-white text-xs sm:text-sm font-semibold hover:bg-[#082846] transition-all shadow-md group"
                  >
                    <span>Start Learning</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* SECONDARY RECOMMENDATIONS (Rank 2 and 3) */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              {recommendations.slice(1, 3).map((rec) => (
                <div
                  key={rec.course.id}
                  className="bg-white rounded-2xl border border-[#E7E5E4] hover:border-[#0D3B66]/30 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E7E5E4] text-[#57534E]">
                        {rec.course.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-[#0D3B66]">
                        <span className="w-2 h-2 rounded-full bg-[#0D3B66]" />
                        <span>{rec.matchScore}% Match</span>
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-[#0F172A] mb-2">{rec.course.title}</h4>
                    <p className="text-xs text-[#57534E] line-clamp-2 mb-4 leading-relaxed">
                      {rec.course.description}
                    </p>

                    <div className="space-y-1.5 text-[11px] text-[#2A7F7E] mb-4 bg-[#F8FAFC] p-3 rounded-xl border border-[#F1F5F9]">
                      <div className="font-semibold text-[#0F172A] text-[10px] uppercase">
                        Primary Gap Fit:
                      </div>
                      <p className="text-[#57534E]">✓ {rec.reasons[0]?.text || 'Bridges core operational gap'}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#F1F5F9]">
                    <span className="text-xs text-[#64748B]">Instructor: {rec.course.trainerName}</span>
                    <button
                      onClick={() => onSelectCourse(rec.course.id)}
                      className="text-xs font-semibold text-[#0D3B66] hover:underline flex items-center gap-1"
                    >
                      <span>View Course</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ARCHITECTURE: The Deterministic Scoring Engine Formula Breakdown */
          <div className="bg-white rounded-3xl border border-[#E7E5E4] p-8 sm:p-10 shadow-sm text-left">
            <h3 className="text-2xl font-bold text-[#0F172A] mb-4">
              Deterministic Mathematical Scoring Architecture
            </h3>
            <p className="text-sm text-[#57534E] leading-relaxed mb-8 max-w-3xl">
              CAPACITY CONNECT does not rely on random or opaque generative AI guesses. Every course recommendation and trainer suggestion is computed with a verifiable multi-variable formula totaling 100%.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Course Scoring Breakdown */}
              <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4]">
                <h4 className="text-base font-bold text-[#0D3B66] mb-4 flex items-center justify-between">
                  <span>Course Match Formula</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-white border border-[#E7E5E4]">100% Max</span>
                </h4>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between font-semibold text-[#0F172A] mb-1">
                      <span>1. Competency Gap Deficit</span>
                      <span>35% Weight</span>
                    </div>
                    <div className="w-full bg-[#E7E5E4] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#2A7F7E] h-full w-[35%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-semibold text-[#0F172A] mb-1">
                      <span>2. Learning Interests & Cadre Alignment</span>
                      <span>25% Weight</span>
                    </div>
                    <div className="w-full bg-[#E7E5E4] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#0D3B66] h-full w-[25%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-semibold text-[#0F172A] mb-1">
                      <span>3. Prior Prerequisites & Skills Met</span>
                      <span>20% Weight</span>
                    </div>
                    <div className="w-full bg-[#E7E5E4] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#B88E28] h-full w-[20%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-semibold text-[#0F172A] mb-1">
                      <span>4. Current Level Difficulty Calibrator</span>
                      <span>10% Weight</span>
                    </div>
                    <div className="w-full bg-[#E7E5E4] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#64748B] h-full w-[10%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-semibold text-[#0F172A] mb-1">
                      <span>5. Peer Rating & Operational Adoption</span>
                      <span>10% Weight</span>
                    </div>
                    <div className="w-full bg-[#E7E5E4] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#64748B] h-full w-[10%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Trainer Matching Breakdown */}
              <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4]">
                <h4 className="text-base font-bold text-[#2A7F7E] mb-4 flex items-center justify-between">
                  <span>Trainer Matching Formula</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-white border border-[#E7E5E4]">100% Max</span>
                </h4>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between font-semibold text-[#0F172A] mb-1">
                      <span>Subject Expertise</span>
                      <span>30%</span>
                    </div>
                    <div className="w-full bg-[#E7E5E4] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#0D3B66] h-full w-[30%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-semibold text-[#0F172A] mb-1">
                      <span>Competency Level & Courses Taught</span>
                      <span>25%</span>
                    </div>
                    <div className="w-full bg-[#E7E5E4] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#2A7F7E] h-full w-[25%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-semibold text-[#0F172A] mb-1">
                      <span>Years of Atmospheric Experience</span>
                      <span>15%</span>
                    </div>
                    <div className="w-full bg-[#E7E5E4] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#B88E28] h-full w-[15%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-semibold text-[#0F172A] mb-1">
                      <span>Certifications (WMO, ECMWF, ISRO)</span>
                      <span>10%</span>
                    </div>
                    <div className="w-full bg-[#E7E5E4] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#64748B] h-full w-[10%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-semibold text-[#0F172A] mb-1">
                      <span>Publications & Research Performance</span>
                      <span>10%</span>
                    </div>
                    <div className="w-full bg-[#E7E5E4] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#64748B] h-full w-[10%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-semibold text-[#0F172A] mb-1">
                      <span>Trainee Feedback & Rating Score</span>
                      <span>10%</span>
                    </div>
                    <div className="w-full bg-[#E7E5E4] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#64748B] h-full w-[10%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
