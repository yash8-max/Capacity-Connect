import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, UserCheck, FileText, Target, ArrowRight } from 'lucide-react';
import { COURSES, INITIAL_USERS, COMPETENCIES, RESOURCES } from '../../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCourse: (courseId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectCourse }) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut Cmd+K or /
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingCourses = q
    ? COURSES.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          c.trainerName.toLowerCase().includes(q)
      )
    : COURSES.slice(0, 3);

  const matchingTrainers = q
    ? INITIAL_USERS.filter(
        (u) =>
          u.role === 'TRAINER' &&
          (u.name.toLowerCase().includes(q) ||
            u.trainerProfile?.specialization.some((s) => s.toLowerCase().includes(q)))
      )
    : [];

  const matchingResources = q
    ? RESOURCES.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q)
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#E7E5E4] shadow-2xl overflow-hidden text-left">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E7E5E4] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#94A3B8]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, trainers, Doppler radar manuals, NWP..."
            className="w-full text-sm sm:text-base focus:outline-none text-[#0F172A] bg-transparent"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#FAF8F5]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {/* Courses */}
          <div>
            <p className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-wider mb-2 px-2">
              Courses ({matchingCourses.length})
            </p>
            <div className="space-y-1">
              {matchingCourses.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    onSelectCourse(c.id);
                    onClose();
                  }}
                  className="p-3 rounded-xl hover:bg-[#FAF8F5] cursor-pointer transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-[#0D3B66]" />
                    <div>
                      <p className="text-xs font-bold text-[#0F172A] group-hover:text-[#0D3B66]">
                        {c.title}
                      </p>
                      <p className="text-[11px] text-[#64748B]">
                        {c.code} • {c.trainerName} ({c.level})
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:translate-x-1 transition-transform" />
                </div>
              ))}
            </div>
          </div>

          {/* Trainers if matched */}
          {matchingTrainers.length > 0 && (
            <div>
              <p className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-wider mb-2 px-2">
                Faculty ({matchingTrainers.length})
              </p>
              <div className="space-y-1">
                {matchingTrainers.map((t) => (
                  <div
                    key={t.id}
                    className="p-3 rounded-xl hover:bg-[#FAF8F5] cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <UserCheck className="w-4 h-4 text-[#2A7F7E]" />
                      <div>
                        <p className="text-xs font-bold text-[#0F172A]">{t.name}</p>
                        <p className="text-[11px] text-[#64748B]">{t.designation} • {t.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources if matched */}
          {matchingResources.length > 0 && (
            <div>
              <p className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-wider mb-2 px-2">
                Documents & Resources ({matchingResources.length})
              </p>
              <div className="space-y-1">
                {matchingResources.map((r) => (
                  <div
                    key={r.id}
                    className="p-3 rounded-xl hover:bg-[#FAF8F5] cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-[#B88E28]" />
                      <div>
                        <p className="text-xs font-bold text-[#0F172A]">{r.title}</p>
                        <p className="text-[11px] text-[#64748B]">{r.type} • {r.fileSize}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#FAF8F5] border-t border-[#E7E5E4] text-center text-[11px] text-[#94A3B8]">
          Tip: Press <kbd className="font-mono bg-white px-1.5 py-0.5 border rounded">ESC</kbd> to exit search
        </div>
      </div>
    </div>
  );
};
