import React, { useState } from 'react';
import { X, Play, CheckCircle2, BookOpen, Clock, FileText, Download, ChevronRight, Award, Sparkles } from 'lucide-react';
import { Course, Lesson, User } from '../../types';
import { CourseService } from '../../services/courseService';

interface CoursePlayerModalProps {
  course: Course;
  currentUser: User;
  isOpen: boolean;
  onClose: () => void;
  onStartAssessment?: () => void;
}

export const CoursePlayerModal: React.FC<CoursePlayerModalProps> = ({
  course,
  currentUser,
  isOpen,
  onClose,
  onStartAssessment,
}) => {
  if (!isOpen) return null;

  const firstModule = course.modules?.[0];
  const firstLesson = firstModule?.lessons?.[0];

  const [activeLesson, setActiveLesson] = useState<Lesson | undefined>(firstLesson);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessons((prev) => {
      const next = new Set(prev);
      if (next.has(lessonId)) {
        next.delete(lessonId);
      } else {
        next.add(lessonId);
      }
      return next;
    });
    CourseService.completeLesson(currentUser.id, course.id, lessonId);
  };

  const totalLessons = course.modules?.reduce((acc, m) => acc + m.lessons.length, 0) || 1;
  const progressPercent = Math.round((completedLessons.size / totalLessons) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-6xl h-[90vh] bg-white rounded-3xl border border-[#E7E5E4] shadow-2xl overflow-hidden flex flex-col text-left">
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#FAF8F5] border-b border-[#E7E5E4] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md bg-[#0D3B66] text-white font-mono text-xs font-bold">
              {course.code}
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0F172A] truncate max-w-xl">
                {course.title}
              </h3>
              <p className="text-xs text-[#64748B]">
                Faculty: {course.trainerName} ({course.trainerTitle})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs">
              <span className="text-[#64748B]">Progress:</span>
              <span className="font-bold text-[#2A7F7E]">{progressPercent}%</span>
              <div className="w-24 bg-[#E7E5E4] h-2 rounded-full overflow-hidden">
                <div className="bg-[#2A7F7E] h-full" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white border border-[#E7E5E4] text-[#64748B] hover:text-[#0F172A]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content Area: Sidebar Syllabus + Player View */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* LEFT: Active Lesson Content & Interactive Simulator */}
          <div className="lg:col-span-8 p-6 sm:p-8 overflow-y-auto space-y-6 bg-white">
            {activeLesson ? (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#EBF2F7] text-[#0D3B66]">
                      {activeLesson.type} Lesson
                    </span>
                    <span className="text-xs text-[#64748B] flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      {activeLesson.duration}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">
                    {activeLesson.title}
                  </h2>
                </div>

                {/* Video / Interactive Visual Simulated Stage */}
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-[#0D3B66] text-white flex flex-col items-center justify-center p-8 shadow-inner">
                  <div className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center cursor-pointer transition-transform hover:scale-105 mb-4 ring-4 ring-white/10">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </div>
                  <p className="text-sm font-semibold tracking-wide">
                    Live Operational Stream: {activeLesson.title}
                  </p>
                  <p className="text-xs text-white/70 mt-1 max-w-md text-center">
                    Simulated high-resolution doppler reflectivities and WRF boundary layers streaming from Pune CTI HPC node.
                  </p>
                </div>

                {/* Lesson Theoretical Reading & Code Diagnostics */}
                <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4] space-y-4">
                  <h4 className="text-sm font-bold text-[#0F172A]">Core Meteorological Synopsis</h4>
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                    {activeLesson.content}
                  </p>

                  <div className="p-4 rounded-xl bg-[#0F172A] text-emerald-400 font-mono text-xs overflow-x-auto space-y-1">
                    <p className="text-slate-400"># Operational Verification Pipeline</p>
                    <p>import xarray as xr</p>
                    <p>import numpy as np</p>
                    <p>ds = xr.open_dataset('radar_dwr_kolkata_pol.nc')</p>
                    <p>zdr_filtered = ds['ZDR'].where(ds['RHOHV'] &gt; 0.85)</p>
                    <p>print(f"Calculated Hydro-Meteor Classification Accuracy: 96.4%")</p>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#E7E5E4]">
                  <button
                    onClick={() => toggleLessonComplete(activeLesson.id)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                      completedLessons.has(activeLesson.id)
                        ? 'bg-[#E8F3F1] text-[#2A7F7E] border border-[#B9DDD7]'
                        : 'bg-[#0D3B66] text-white hover:bg-[#092b4d]'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {completedLessons.has(activeLesson.id)
                        ? 'Completed (Click to unmark)'
                        : 'Mark as Completed'}
                    </span>
                  </button>

                  {onStartAssessment && (
                    <button
                      onClick={onStartAssessment}
                      className="px-5 py-2.5 rounded-xl bg-[#2A7F7E] text-white text-xs font-semibold hover:bg-[#206362] transition-colors flex items-center gap-1.5"
                    >
                      <Award className="w-4 h-4" />
                      <span>Take Module Exam</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-20 text-center text-[#64748B]">Select a lesson from the syllabus</div>
            )}
          </div>

          {/* RIGHT: Course Curriculum Syllabus Accordion */}
          <div className="lg:col-span-4 bg-[#FAF8F5] border-t lg:border-t-0 lg:border-l border-[#E7E5E4] p-6 overflow-y-auto space-y-6">
            <div>
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#0D3B66]">
                Curriculum Syllabus
              </h4>
              <p className="text-xs text-[#64748B] mt-0.5">
                {course.modules?.length || 1} Modules • {course.durationHours} Hours Total
              </p>
            </div>

            <div className="space-y-4">
              {course.modules?.map((mod, modIdx) => (
                <div key={mod.id} className="bg-white rounded-2xl border border-[#E7E5E4] p-4 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-xs font-bold text-[#0F172A]">{mod.title}</h5>
                    <span className="text-[10px] font-mono text-[#94A3B8]">{mod.duration}</span>
                  </div>

                  <div className="space-y-1.5">
                    {mod.lessons.map((les) => {
                      const isActive = activeLesson?.id === les.id;
                      const isDone = completedLessons.has(les.id);

                      return (
                        <div
                          key={les.id}
                          onClick={() => setActiveLesson(les)}
                          className={`p-2.5 rounded-xl text-xs flex items-center justify-between cursor-pointer transition-all ${
                            isActive
                              ? 'bg-[#EBF2F7] text-[#0D3B66] font-bold ring-1 ring-[#0D3B66]/20'
                              : 'hover:bg-[#FAF8F5] text-[#57534E]'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0">
                              {isDone ? '✓' : '○'}
                            </span>
                            <span className="truncate">{les.title}</span>
                          </div>
                          <span className="text-[10px] font-mono text-[#94A3B8] shrink-0 ml-2">
                            {les.duration}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
