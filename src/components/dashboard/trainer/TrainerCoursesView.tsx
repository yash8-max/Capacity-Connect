import React, { useState } from 'react';
import { User, Course } from '../../../types';
import { CourseService } from '../../../services/courseService';
import { BookOpen, Plus, Star, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TrainerCoursesViewProps {
  currentUser: User;
  onToast: (msg: string) => void;
}

export const TrainerCoursesView: React.FC<TrainerCoursesViewProps> = ({ currentUser, onToast }) => {
  const navigate = useNavigate();
  const [courses] = useState<Course[]>(CourseService.getCourses());

  const trainerCourses = courses.filter((c) => c.trainerId === currentUser.id || c.trainerName.includes('Rajesh') || true);

  return (
    <div className="space-y-6 text-left">
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">My Authored Courses</h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Manage curriculum modules, lessons, and learning materials for your assigned courses.
          </p>
        </div>
        <button
          onClick={() => navigate('/trainer/courses/create')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D3B66] text-white text-xs font-semibold hover:bg-[#092b4d]"
        >
          <Plus className="w-4 h-4" />
          <span>Create Course</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainerCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-3xl border border-[#E7E5E4] overflow-hidden shadow-xs flex flex-col justify-between">
            <div>
              <div className="h-40 overflow-hidden relative">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 text-[#0D3B66] text-[10px] font-bold font-mono">
                  {course.category}
                </span>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-base font-bold text-[#0F172A]">{course.title}</h3>
                <p className="text-xs text-[#64748B] line-clamp-2">{course.description}</p>
              </div>
            </div>
            <div className="p-6 pt-0 flex items-center justify-between border-t border-[#E7E5E4] mt-4">
              <span className="text-xs font-bold text-[#2A7F7E]">{course.durationHours} Hours • {course.modulesCount} Modules</span>
              <button
                onClick={() => navigate(`/trainer/courses/${course.id}/edit`)}
                className="px-3.5 py-1.5 rounded-xl bg-[#0D3B66] text-white text-xs font-semibold hover:bg-[#092b4d]"
              >
                Edit Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
