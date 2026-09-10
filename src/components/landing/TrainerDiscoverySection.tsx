import React, { useState } from 'react';
import { Search, UserCheck, Star, Award, BookOpen, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { RecommendationEngine } from '../../services/recommendationService';
import { User } from '../../types';

interface TrainerDiscoverySectionProps {
  onSelectTrainer?: (trainer: User) => void;
}

export const TrainerDiscoverySection: React.FC<TrainerDiscoverySectionProps> = ({
  onSelectTrainer,
}) => {
  const [subjectQuery, setSubjectQuery] = useState('Radar Meteorology');
  const trainerMatches = RecommendationEngine.getTrainerRecommendations(subjectQuery);

  const subjectPills = [
    'Radar Meteorology',
    'Numerical Weather Prediction',
    'Satellite Meteorology',
    'Climate Science',
    'Python for Atmospheric Data',
    'Severe Convective Storms',
  ];

  return (
    <section id="trainers" className="py-20 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF2F7] text-[#0D3B66] text-xs font-semibold mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Institutional Faculty Discovery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Find the Right Scientific Expert
          </h2>
          <p className="text-base text-[#57534E] mt-3">
            Match with certified senior scientists across IMD's Specialized Divisions for mentorship, assessment reviews, and research collaborations.
          </p>
        </div>

        {/* Search & Topic Selector Bar */}
        <div className="max-w-3xl mx-auto mb-12 space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-[#94A3B8] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={subjectQuery}
              onChange={(e) => setSubjectQuery(e.target.value)}
              placeholder="Search subject or specialized topic (e.g. Doppler, NWP, INSAT-3DR, Climate)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-[#E7E5E4] text-sm font-medium focus:outline-none focus:border-[#0D3B66] shadow-xs text-[#0F172A]"
            />
          </div>

          <div className="flex items-center justify-center flex-wrap gap-2 text-xs">
            <span className="text-[#64748B] font-semibold text-[11px] mr-1">Popular subjects:</span>
            {subjectPills.map((pill) => (
              <button
                key={pill}
                onClick={() => setSubjectQuery(pill)}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  subjectQuery.toLowerCase() === pill.toLowerCase()
                    ? 'bg-[#0D3B66] text-white shadow-xs'
                    : 'bg-white text-[#57534E] border border-[#E7E5E4] hover:bg-[#F5F0E8]'
                }`}
              >
                {pill}
              </button>
            ))}
          </div>
        </div>

        {/* Trainer Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {trainerMatches.slice(0, 6).map((item) => {
            const { trainer, matchScore } = item;
            const profile = trainer.trainerProfile;

            return (
              <div
                key={trainer.id}
                className="bg-white rounded-2xl border border-[#E7E5E4] hover:border-[#0D3B66]/40 p-6 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left"
              >
                <div>
                  {/* Top Bar: Match Score & Availability */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#EBF2F7] text-[#0D3B66] text-xs font-bold font-mono">
                      {matchScore}% Match
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#E8F3F1] text-[#2A7F7E] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2A7F7E]" />
                      {profile?.availabilityStatus || 'Available'}
                    </span>
                  </div>

                  {/* Profile Header */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <img
                      src={trainer.avatar}
                      alt={trainer.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#0D3B66]/10"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-[#0F172A] leading-tight">{trainer.name}</h3>
                      <p className="text-xs font-medium text-[#0D3B66]">{trainer.designation}</p>
                      <p className="text-[11px] text-[#64748B] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span>{trainer.location}</span>
                      </p>
                    </div>
                  </div>

                  {/* Bio summary */}
                  <p className="text-xs text-[#57534E] line-clamp-2 leading-relaxed mb-4">
                    {trainer.bio}
                  </p>

                  {/* Specializations & Highlights */}
                  <div className="space-y-1.5 mb-5">
                    <span className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-wider">
                      Core Specializations:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {profile?.specialization.map((spec, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-[#FAF8F5] border border-[#E7E5E4] text-[11px] text-[#0F172A]"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics bar */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#F1F5F9] text-center text-xs text-[#64748B] mb-5">
                    <div>
                      <p className="font-bold text-[#0F172A]">{profile?.yearsOfExperience} yrs</p>
                      <p className="text-[10px]">Experience</p>
                    </div>
                    <div>
                      <p className="font-bold text-[#0F172A]">{profile?.totalTraineesTrained}+</p>
                      <p className="text-[10px]">Trainees</p>
                    </div>
                    <div>
                      <p className="font-bold text-amber-600 flex items-center justify-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-500" />
                        <span>{profile?.averageRating}</span>
                      </p>
                      <p className="text-[10px]">Rating</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <button
                  onClick={() => onSelectTrainer?.(trainer)}
                  className="w-full py-2.5 rounded-xl border border-[#0D3B66] text-[#0D3B66] hover:bg-[#0D3B66] hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View Faculty Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
