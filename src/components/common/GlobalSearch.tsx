import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, User as UserIcon, Award, FileText, CheckSquare, Sparkles, ChevronRight } from 'lucide-react';
import { Course, User, Certificate, ResourceItem, Assessment } from '../../types';
import { CourseService } from '../../services/courseService';
import { INITIAL_USERS, RESOURCES, CERTIFICATES } from '../../data/mockData';
import { AssessmentService } from '../../services/assessmentService';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCourse: (courseId: string) => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose, onSelectCourse }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'all' | 'courses' | 'users' | 'resources' | 'certificates' | 'assessments'>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle search via parent state or event
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const courses = CourseService.getCourses().filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase()) || 
    c.category.toLowerCase().includes(query.toLowerCase()) ||
    c.description.toLowerCase().includes(query.toLowerCase())
  );

  const users = INITIAL_USERS.filter(u =>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.designation.toLowerCase().includes(query.toLowerCase()) ||
    u.organization.toLowerCase().includes(query.toLowerCase())
  );

  const resources = RESOURCES.filter(r =>
    r.title.toLowerCase().includes(query.toLowerCase()) ||
    r.category.toLowerCase().includes(query.toLowerCase())
  );

  const certificates = CERTIFICATES.filter(c =>
    c.courseTitle.toLowerCase().includes(query.toLowerCase()) ||
    c.traineeName.toLowerCase().includes(query.toLowerCase()) ||
    c.certificateNumber.toLowerCase().includes(query.toLowerCase())
  );

  const assessments = AssessmentService.getAssessments().filter(a =>
    a.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-20 px-4 animate-fade-in">
      <div className="bg-white rounded-3xl border border-[#E7E5E4] shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Bar Header */}
        <div className="p-4 sm:p-6 border-b border-[#E7E5E4] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#2A7F7E]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, users, resources, competencies, certificates..."
            className="flex-1 bg-transparent text-sm sm:text-base font-medium text-[#0F172A] outline-none placeholder:text-[#94A3B8]"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4] text-[#64748B] hover:text-[#0F172A]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="px-6 py-3 bg-[#FAF8F5] border-b border-[#E7E5E4] flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-semibold">
          {(['all', 'courses', 'users', 'resources', 'certificates', 'assessments'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-xl capitalize transition-all whitespace-nowrap ${
                category === cat
                  ? 'bg-[#0D3B66] text-white shadow-xs'
                  : 'bg-white border border-[#E7E5E4] text-[#57534E] hover:border-[#0D3B66]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Courses */}
          {(category === 'all' || category === 'courses') && courses.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] font-bold">Courses ({courses.length})</h4>
              <div className="space-y-2">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    onClick={() => {
                      onSelectCourse(course.id);
                      onClose();
                    }}
                    className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4] hover:border-[#0D3B66] cursor-pointer flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#E8F3F1] text-[#2A7F7E] flex items-center justify-center font-bold">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#0F172A] group-hover:text-[#0D3B66] transition-colors">{course.title}</p>
                        <p className="text-[11px] text-[#64748B]">{course.category} • Trainer: {course.trainerName}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#94A3B8] group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Users */}
          {(category === 'all' || category === 'users') && users.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] font-bold">Users & Officers ({users.length})</h4>
              <div className="space-y-2">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <p className="text-xs font-bold text-[#0F172A]">{user.name}</p>
                        <p className="text-[11px] text-[#64748B]">{user.designation} • {user.organization}</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#EBF2F7] text-[#0D3B66] text-[10px] font-bold uppercase font-mono">
                      {user.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {(category === 'all' || category === 'resources') && resources.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] font-bold">Resource Library ({resources.length})</h4>
              <div className="space-y-2">
                {resources.map((res) => (
                  <div
                    key={res.id}
                    className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FDF6E2] text-[#9E7318] flex items-center justify-center font-bold">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#0F172A]">{res.title}</p>
                        <p className="text-[11px] text-[#64748B]">{res.type} • Category: {res.category}</p>
                      </div>
                    </div>
                    <span className="text-xs text-[#2A7F7E] font-semibold">{res.fileSize}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificates */}
          {(category === 'all' || category === 'certificates') && certificates.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] font-bold">Certificates ({certificates.length})</h4>
              <div className="space-y-2">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF3EE] text-[#D97706] flex items-center justify-center font-bold">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#0F172A]">{cert.courseTitle}</p>
                        <p className="text-[11px] text-[#64748B]">Issued to: {cert.traineeName} • ID: {cert.certificateNumber}</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {courses.length === 0 && users.length === 0 && resources.length === 0 && certificates.length === 0 && (
            <div className="text-center py-12">
              <Sparkles className="w-10 h-10 text-[#94A3B8] mx-auto mb-3" />
              <p className="text-sm font-bold text-[#0F172A]">No records found matching "{query}"</p>
              <p className="text-xs text-[#64748B] mt-1">Try searching for meteorological topics, forecaster names, or competencies.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#E7E5E4] flex items-center justify-between text-xs text-[#64748B]">
          <span>Tip: Press ESC to close</span>
          <span className="font-mono text-[10px]">CAPACITY CONNECT GLOBAL SEARCH</span>
        </div>
      </div>
    </div>
  );
};
