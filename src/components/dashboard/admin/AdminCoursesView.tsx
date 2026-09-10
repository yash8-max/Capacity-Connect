import React, { useState } from 'react';
import { User, Course } from '../../../types';
import { CourseService } from '../../../services/courseService';
import { BookOpen, Search, Plus, Star, Users } from 'lucide-react';

interface AdminCoursesViewProps {
  currentUser: User;
  onToast: (msg: string) => void;
}

export const AdminCoursesView: React.FC<AdminCoursesViewProps> = ({ currentUser, onToast }) => {
  const [courses, setCourses] = useState<Course[]>(CourseService.getCourses());
  const [search, setSearch] = useState('');

  const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 text-left">
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">Institutional Course Catalogue</h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Supervise curriculum standards, faculty assignments, enrollments, and publishing states.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search curriculum..."
            className="w-full bg-[#FAF8F5] border border-[#E7E5E4] rounded-xl pl-10 pr-4 py-2 text-xs text-[#0F172A] outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((course) => (
          <div key={course.id} className="bg-white rounded-3xl border border-[#E7E5E4] overflow-hidden shadow-xs flex flex-col justify-between">
            <div>
              <div className="h-40 overflow-hidden relative">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#0D3B66] text-[10px] font-bold font-mono">
                  {course.category}
                </span>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-base font-bold text-[#0F172A]">{course.title}</h3>
                <p className="text-xs text-[#64748B] line-clamp-2">{course.description}</p>
                <div className="flex items-center gap-2 pt-2">
                  <img src={course.trainerAvatar} alt={course.trainerName} className="w-6 h-6 rounded-full object-cover" />
                  <span className="text-xs font-medium text-[#57534E]">{course.trainerName}</span>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between border-t border-[#E7E5E4] mt-4">
              <span className="text-xs font-bold text-[#2A7F7E]">{course.durationHours} Hours • {course.modulesCount} Modules</span>
              <button
                onClick={() => onToast(`Course ${course.title} management console opened`)}
                className="px-3.5 py-1.5 rounded-xl bg-[#0D3B66] text-white text-xs font-semibold hover:bg-[#092b4d]"
              >
                Supervise
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
