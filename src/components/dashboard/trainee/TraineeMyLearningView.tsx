import React from 'react';
import { User, Course } from '../../../types';
import { CourseService } from '../../../services/courseService';
import { BookOpen, Play, CheckCircle2 } from 'lucide-react';

interface TraineeMyLearningViewProps {
  currentUser: User;
  onOpenCourse: (courseId: string) => void;
  onToast: (msg: string) => void;
}

export const TraineeMyLearningView: React.FC<TraineeMyLearningViewProps> = ({ currentUser, onOpenCourse, onToast }) => {
  const enrollments = CourseService.getUserEnrollments(currentUser.id);
  const enrolledCourses = enrollments.map(e => CourseService.getCourseById(e.courseId)).filter((c): c is Course => !!c);

  return (
    <div className="space-y-6 text-left">
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8">
        <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">My Active Learning & Enrolled Courses</h2>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1">
          Continue your active modules, video lectures, and operational training assignments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-3xl border border-[#E7E5E4] overflow-hidden shadow-xs flex flex-col justify-between">
            <div>
              <div className="h-36 overflow-hidden relative">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#E8F3F1] text-[#2A7F7E] text-[10px] font-bold">
                  65% Completed
                </span>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-base font-bold text-[#0F172A]">{course.title}</h3>
                <div className="w-full h-2 rounded-full bg-[#FAF8F5] border border-[#E7E5E4] overflow-hidden">
                  <div className="h-full bg-[#2A7F7E] rounded-full" style={{ width: '65%' }} />
                </div>
              </div>
            </div>
            <div className="p-6 pt-0 flex items-center justify-between border-t border-[#E7E5E4] mt-4">
              <span className="text-xs text-[#64748B]">Next: Module 3</span>
              <button
                onClick={() => onOpenCourse(course.id)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0D3B66] text-white text-xs font-semibold hover:bg-[#092b4d]"
              >
                <Play className="w-3.5 h-3.5" /> Continue
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
