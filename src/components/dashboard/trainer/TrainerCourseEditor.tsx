import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { User, Course, CourseModule } from '../../../types';
import { CourseService } from '../../../services/courseService';
import { BookOpen, Plus, Trash2, ArrowLeft, Save, Sparkles, Check } from 'lucide-react';

interface TrainerCourseEditorProps {
  currentUser: User;
  onToast: (msg: string) => void;
}

export const TrainerCourseEditor: React.FC<TrainerCourseEditorProps> = ({ currentUser, onToast }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id && id !== 'create');

  const existingCourse = isEditing ? CourseService.getCourseById(id!) : null;

  const [title, setTitle] = useState(existingCourse?.title || '');
  const [code, setCode] = useState(existingCourse?.code || `IMD-${Math.floor(100 + Math.random() * 900)}`);
  const [category, setCategory] = useState<any>(existingCourse?.category || 'Weather');
  const [level, setLevel] = useState<any>(existingCourse?.level || 'Intermediate');
  const [durationHours, setDurationHours] = useState(existingCourse?.durationHours || 12);
  const [description, setDescription] = useState(existingCourse?.description || '');
  const [thumbnail, setThumbnail] = useState(existingCourse?.thumbnail || 'https://images.unsplash.com/photo-1590055531615-f16d36ffe8ec?w=800&auto=format&fit=crop&q=80');
  const [modules, setModules] = useState<CourseModule[]>(
    existingCourse?.modules || [
      { id: 'm-1', title: 'Module 1: Introduction & Fundamentals', duration: '3 Hours', readingContent: 'Introduction to operational theory and frameworks.' },
      { id: 'm-2', title: 'Module 2: Advanced Data Interpretation', duration: '4 Hours', readingContent: 'Analyzing real-time Doppler and satellite observations.' },
    ]
  );

  const handleAddModule = () => {
    setModules([
      ...modules,
      {
        id: `m-${Date.now()}`,
        title: `Module ${modules.length + 1}: New Topic`,
        duration: '2 Hours',
        readingContent: 'Detailed lesson notes and operational guidelines.',
      },
    ]);
  };

  const handleRemoveModule = (modId: string) => {
    setModules(modules.filter((m) => m.id !== modId));
  };

  const handleSave = (publish: boolean) => {
    if (!title.trim()) {
      onToast('Course title is required.');
      return;
    }

    if (isEditing && existingCourse) {
      // update existing
      const all = CourseService.getCourses();
      const idx = all.findIndex((c) => c.id === existingCourse.id);
      if (idx !== -1) {
        all[idx] = {
          ...all[idx],
          title,
          code,
          category,
          level,
          durationHours: Number(durationHours),
          description,
          thumbnail,
          modulesCount: modules.length,
          modules,
        };
        try {
          localStorage.setItem('capacity_connect_courses', JSON.stringify(all));
        } catch {}
      }
      onToast(`Course "${title}" updated successfully!`);
    } else {
      CourseService.createCourse({
        title,
        code,
        category,
        level,
        durationHours: Number(durationHours),
        description,
        thumbnail,
        trainerId: currentUser.id,
        trainerName: currentUser.name,
        trainerTitle: currentUser.designation || 'Faculty Expert',
        trainerAvatar: currentUser.avatar,
        modulesCount: modules.length,
        modules,
      });
      onToast(`Course "${title}" created and published successfully!`);
    }

    navigate('/trainer/courses');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left pb-16">
      {/* Header */}
      <div className="flex items-center justify-between bg-white rounded-3xl border border-[#E7E5E4] p-6 shadow-xs">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/trainer/courses')}
            className="p-2 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4] text-[#64748B] hover:text-[#0F172A]"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-black text-[#0F172A] tracking-tight">
              {isEditing ? 'Edit Course Curriculum' : 'Create New Course'}
            </h2>
            <p className="text-xs text-[#64748B]">Configure modules, assessments, and trainer resources</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSave(false)}
            className="px-4 py-2 rounded-xl border border-[#E7E5E4] text-xs font-semibold text-[#0F172A] hover:bg-[#FAF8F5]"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#0D3B66] text-white text-xs font-semibold hover:bg-[#092b4d]"
          >
            <Save className="w-4 h-4" />
            <span>Publish Course</span>
          </button>
        </div>
      </div>

      {/* Basic Info Form */}
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 space-y-6">
        <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider font-mono">1. General Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-[#57534E] mb-2">Course Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Advanced Doppler Radar Meteorology"
              className="w-full px-4 py-2.5 rounded-xl border border-[#E7E5E4] bg-[#FAF8F5] text-xs text-[#0F172A] focus:outline-none focus:border-[#0D3B66]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#57534E] mb-2">Course Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. IMD-RAD-401"
              className="w-full px-4 py-2.5 rounded-xl border border-[#E7E5E4] bg-[#FAF8F5] text-xs text-[#0F172A] focus:outline-none focus:border-[#0D3B66]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#57534E] mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E7E5E4] bg-[#FAF8F5] text-xs text-[#0F172A] focus:outline-none focus:border-[#0D3B66]"
            >
              <option value="Weather">Weather</option>
              <option value="Climate">Climate</option>
              <option value="Satellite">Satellite</option>
              <option value="Radar">Radar</option>
              <option value="Data Science">Data Science</option>
              <option value="Python">Python</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="GIS">GIS</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#57534E] mb-2">Difficulty Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as any)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E7E5E4] bg-[#FAF8F5] text-xs text-[#0F172A] focus:outline-none focus:border-[#0D3B66]"
            >
              <option value="Foundation">Foundation</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Executive">Executive</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#57534E] mb-2">Duration (Hours)</label>
            <input
              type="number"
              value={durationHours}
              onChange={(e) => setDurationHours(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E7E5E4] bg-[#FAF8F5] text-xs text-[#0F172A] focus:outline-none focus:border-[#0D3B66]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#57534E] mb-2">Thumbnail Image URL</label>
            <input
              type="text"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E7E5E4] bg-[#FAF8F5] text-xs text-[#0F172A] focus:outline-none focus:border-[#0D3B66]"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#57534E] mb-2">Detailed Course Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Comprehensive description of learning outcomes and institutional objectives..."
            className="w-full px-4 py-2.5 rounded-xl border border-[#E7E5E4] bg-[#FAF8F5] text-xs text-[#0F172A] focus:outline-none focus:border-[#0D3B66]"
          />
        </div>
      </div>

      {/* Modules Builder */}
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider font-mono">2. Curriculum Modules ({modules.length})</h3>
          <button
            onClick={handleAddModule}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4] text-xs font-semibold text-[#0D3B66] hover:bg-[#E8F3F1]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Module</span>
          </button>
        </div>

        <div className="space-y-4">
          {modules.map((mod, index) => (
            <div key={mod.id} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#2A7F7E] font-mono">Module {index + 1}</span>
                <button
                  onClick={() => handleRemoveModule(mod.id)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={mod.title}
                  onChange={(e) => {
                    const updated = [...modules];
                    updated[index].title = e.target.value;
                    setModules(updated);
                  }}
                  placeholder="Module Title"
                  className="sm:col-span-2 px-3 py-2 rounded-xl border border-[#E7E5E4] bg-white text-xs text-[#0F172A]"
                />
                <input
                  type="text"
                  value={mod.duration || '2 Hours'}
                  onChange={(e) => {
                    const updated = [...modules];
                    updated[index].duration = e.target.value;
                    setModules(updated);
                  }}
                  placeholder="Duration"
                  className="px-3 py-2 rounded-xl border border-[#E7E5E4] bg-white text-xs text-[#0F172A]"
                />
              </div>
              <textarea
                rows={2}
                value={mod.readingContent || ''}
                onChange={(e) => {
                  const updated = [...modules];
                  updated[index].readingContent = e.target.value;
                  setModules(updated);
                }}
                placeholder="Module reading notes or video lecture summary..."
                className="w-full px-3 py-2 rounded-xl border border-[#E7E5E4] bg-white text-xs text-[#0F172A]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
