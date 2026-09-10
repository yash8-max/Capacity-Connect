import React, { useState } from 'react';
import { User, Course } from '../../types';
import { CourseService } from '../../services/courseService';
import { Plus, Users, BookOpen, Star, CheckCircle, FileUp, Sparkles, MessageSquare } from 'lucide-react';

interface TrainerDashboardProps {
  currentUser: User;
  onOpenCourse: (courseId: string) => void;
}

export const TrainerDashboard: React.FC<TrainerDashboardProps> = ({
  currentUser,
  onOpenCourse,
}) => {
  const [courses, setCourses] = useState<Course[]>(CourseService.getCourses());
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Radar');
  const [newLevel, setNewLevel] = useState<'Foundation' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [newDesc, setNewDesc] = useState('');

  const trainerCourses = courses.filter((c) => c.trainerId === currentUser.id || c.trainerName.includes('Rajesh'));

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created = CourseService.createCourse({
      code: `IMD-${newCategory.substring(0, 3).toUpperCase()}-40${courses.length + 1}`,
      title: newTitle,
      category: (newCategory as any) || 'Radar',
      level: newLevel,
      description: newDesc || 'Specialized meteorological curriculum designed for operational forecasters.',
      thumbnail: 'https://images.unsplash.com/photo-1590055531615-f16d36ffe8ec?w=800&auto=format&fit=crop&q=80',
      durationHours: 12,
      modulesCount: 4,
      trainerId: currentUser.id,
      trainerName: currentUser.name,
      trainerTitle: currentUser.designation,
      trainerAvatar: currentUser.avatar,
      competenciesTaught: [newCategory, 'Atmospheric Diagnostics'],
      prerequisites: ['Basic Meteorology'],
      rating: 4.9,
      reviewCount: 1,
      modules: [
        {
          id: 'mod-1',
          title: 'Module 1: Fundamental Principles & Physical Basis',
          durationMinutes: 180,
          duration: '3h',
          lessons: [
            {
              id: 'les-1',
              title: 'Governing Equations and Observational Datasets',
              duration: '45 mins',
              type: 'video',
              content: 'Video lecture analyzing primary datasets.',
              completed: false,
            },
          ],
        },
      ],
    });

    setCourses(CourseService.getCourses());
    setIsCreatingCourse(false);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="space-y-8 text-left">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#0D3B66]/30"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">
                  Faculty Console: {currentUser.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#EBF2F7] text-[#0D3B66] text-xs font-semibold">
                  Lead Instructor
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                {currentUser.designation} • {currentUser.trainerProfile?.department} • {currentUser.location}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCreatingCourse(!isCreatingCourse)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D3B66] text-white text-xs sm:text-sm font-semibold hover:bg-[#092b4d] transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Publish New Course</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs">
          <p className="text-xs text-[#64748B] font-medium">Courses Taught</p>
          <p className="text-2xl font-black text-[#0F172A] mt-1">{trainerCourses.length}</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs">
          <p className="text-xs text-[#64748B] font-medium">Active Trainees</p>
          <p className="text-2xl font-black text-[#2A7F7E] mt-1">
            {currentUser.trainerProfile?.totalTraineesTrained || 450}+
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs">
          <p className="text-xs text-[#64748B] font-medium">Faculty Rating</p>
          <p className="text-2xl font-black text-amber-500 mt-1 flex items-center gap-1">
            <Star className="w-5 h-5 fill-amber-500" />
            <span>{currentUser.trainerProfile?.averageRating || 4.9}</span>
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs">
          <p className="text-xs text-[#64748B] font-medium">Pending Reviews</p>
          <p className="text-2xl font-black text-[#0D3B66] mt-1">4 Assessments</p>
        </div>
      </div>

      {/* Create Course Modal / Form Dropdown */}
      {isCreatingCourse && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#0D3B66]/30 shadow-md animate-fade-in">
          <h3 className="text-lg font-bold text-[#0F172A] mb-4">
            Author New Meteorological Course
          </h3>

          <form onSubmit={handleCreateCourse} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Advanced Radar Polarimetry in Coastal Convection"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E7E5E4] text-xs sm:text-sm text-[#0F172A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E7E5E4] text-xs sm:text-sm text-[#0F172A]"
                >
                  <option value="Radar">Radar Meteorology</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Satellite">Satellite Meteorology</option>
                  <option value="NWP">Numerical Weather Prediction</option>
                  <option value="Climate">Climate Science</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                Curriculum Overview & Learning Objectives
              </label>
              <textarea
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                rows={3}
                placeholder="Explain the operational skills forecasters will acquire..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#E7E5E4] text-xs sm:text-sm text-[#0F172A]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsCreatingCourse(false)}
                className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:bg-[#F5F0E8] rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-[#0D3B66] text-white text-xs font-semibold hover:bg-[#092b4d]"
              >
                Publish to National Catalog
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Courses Managed */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#0F172A]">My Published Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trainerCourses.map((course) => (
            <div
              key={course.id}
              className="p-5 rounded-2xl bg-white border border-[#E7E5E4] hover:border-[#0D3B66]/30 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E7E5E4] text-[#0D3B66]">
                    {course.code}
                  </span>
                  <span className="text-xs text-[#2A7F7E] font-semibold">
                    ★ {course.rating} ({course.reviewCount} reviews)
                  </span>
                </div>

                <h4 className="font-bold text-base text-[#0F172A] mb-2">{course.title}</h4>
                <p className="text-xs text-[#57534E] line-clamp-2 mb-4">{course.description}</p>
              </div>

              <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
                <span className="text-xs text-[#64748B]">{course.modulesCount} modules • {course.durationHours} hours</span>
                <button
                  onClick={() => onOpenCourse(course.id)}
                  className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#CBD5E1] text-[#0D3B66] text-xs font-semibold hover:bg-[#EBF2F7]"
                >
                  Manage Curriculum →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
