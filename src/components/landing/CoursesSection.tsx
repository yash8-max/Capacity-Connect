import React, { useState } from 'react';
import { Search, Clock, BookOpen, Star, User, Sparkles, Filter, ArrowRight } from 'lucide-react';
import { Course } from '../../types';
import { CourseService } from '../../services/courseService';

interface CoursesSectionProps {
  onSelectCourse: (courseId: string) => void;
  enrolledCourseIds?: Set<string>;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  onSelectCourse,
  enrolledCourseIds = new Set(),
}) => {
  const allCourses = CourseService.getCourses();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');

  const categories = ['All', 'Machine Learning', 'Radar', 'Satellite', 'Weather', 'Climate', 'Python', 'GIS'];

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.trainerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.competenciesTaught.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || course.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <section id="courses" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#0D3B66] font-mono">
              Operational & Research Curriculum
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mt-1">
              Curated Meteorological Learning Pathways
            </h2>
            <p className="text-base text-[#57534E] mt-2 max-w-2xl">
              Specialized courses authored by leading IMD scientists, certified by WMO guidelines, and recognized for career advancements.
            </p>
          </div>

          <div className="mt-4 md:mt-0 text-sm font-semibold text-[#0D3B66]">
            Showing {filteredCourses.length} of {allCourses.length} courses
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E7E5E4] mb-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, Doppler, WRF, Python..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#E7E5E4] text-xs sm:text-sm focus:outline-none focus:border-[#0D3B66] text-[#0F172A]"
              />
            </div>

            {/* Level Filter */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-semibold text-[#64748B] whitespace-nowrap">Level:</span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2 rounded-xl bg-white border border-[#E7E5E4] text-xs font-medium text-[#0F172A] focus:outline-none"
              >
                <option value="All">All Levels</option>
                <option value="Foundation">Foundation</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#0D3B66] text-white shadow-xs'
                    : 'bg-white text-[#57534E] border border-[#E7E5E4] hover:bg-[#F5F0E8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCourses.map((course) => {
              const isEnrolled = enrolledCourseIds.has(course.id);

              return (
                <div
                  key={course.id}
                  onClick={() => onSelectCourse(course.id)}
                  className="group bg-[#FAF8F5] rounded-2xl border border-[#E7E5E4] hover:border-[#0D3B66]/30 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Thumbnail Image Container */}
                    <div className="relative h-48 w-full overflow-hidden bg-[#E2E8F0]">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md text-[11px] font-mono font-bold text-[#0D3B66] shadow-xs">
                          {course.code}
                        </span>
                        {course.isNew && (
                          <span className="px-2.5 py-1 rounded-md bg-[#2A7F7E] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                            New
                          </span>
                        )}
                      </div>

                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[11px] font-medium">
                          {course.level}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                        <span className="font-medium bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                          {course.category}
                        </span>
                        <div className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="font-bold">{course.rating}</span>
                          <span className="text-[10px] opacity-80">({course.reviewCount})</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-5 text-left">
                      <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#0D3B66] transition-colors line-clamp-1 mb-2">
                        {course.title}
                      </h3>
                      <p className="text-xs text-[#57534E] line-clamp-2 leading-relaxed mb-4">
                        {course.description}
                      </p>

                      {/* Instructor Information */}
                      <div className="flex items-center gap-2.5 pt-3 border-t border-[#E7E5E4]/70 mb-3">
                        <img
                          src={course.trainerAvatar}
                          alt={course.trainerName}
                          className="w-7 h-7 rounded-full object-cover ring-1 ring-[#0D3B66]/20"
                        />
                        <div className="truncate">
                          <p className="text-xs font-semibold text-[#0F172A] truncate">
                            {course.trainerName}
                          </p>
                          <p className="text-[10px] text-[#64748B] truncate">
                            {course.trainerTitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Bar */}
                  <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs text-[#64748B]">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {course.durationHours}h
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        {course.modulesCount} mod
                      </span>
                    </div>

                    <button className="text-xs font-semibold text-[#0D3B66] group-hover:underline flex items-center gap-1">
                      <span>{isEnrolled ? 'Continue' : 'Details'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="py-16 text-center bg-[#FAF8F5] rounded-2xl border border-dashed border-[#CBD5E1]">
            <p className="text-base font-semibold text-[#0F172A]">No courses found matching your criteria</p>
            <p className="text-xs text-[#64748B] mt-1">Try resetting the category filter or searching for another keyword.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedLevel('All');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#0D3B66] text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
