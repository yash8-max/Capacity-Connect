import React, { useState } from 'react';
import { User, Announcement } from '../../../types';
import { ANNOUNCEMENTS } from '../../../data/mockData';
import { Bell, Plus } from 'lucide-react';

interface AdminAnnouncementsViewProps {
  currentUser: User;
  onToast: (msg: string) => void;
}

export const AdminAnnouncementsView: React.FC<AdminAnnouncementsViewProps> = ({ currentUser, onToast }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(ANNOUNCEMENTS);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      title,
      summary: content,
      date: new Date().toISOString().split('T')[0],
      type: 'Directive',
      targetRole: 'ALL',
    };

    setAnnouncements([newAnn, ...announcements]);
    setModalOpen(false);
    setTitle('');
    setContent('');
    onToast('Institutional announcement published successfully');
  };

  return (
    <div className="space-y-6 text-left">
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">Institutional Announcements & Directives</h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Publish urgent advisory memos, training schedules, and circulars to forecasters nationwide.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D3B66] text-white text-xs font-semibold hover:bg-[#092b4d]"
        >
          <Plus className="w-4 h-4" />
          <span>New Announcement</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {announcements.map((ann) => (
          <div key={ann.id} className="bg-white rounded-3xl border border-[#E7E5E4] p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#FAF3EE] text-[#D97706] text-[10px] font-bold font-mono uppercase">
                {ann.priority} Priority
              </span>
              <span className="text-xs text-[#94A3B8] font-mono">{ann.date}</span>
            </div>
            <h3 className="text-base font-bold text-[#0F172A]">{ann.title}</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">{ann.content}</p>
            <p className="text-[11px] text-[#2A7F7E] font-semibold pt-2 border-t border-[#E7E5E4]">
              Author: {ann.author} • Audience: {ann.audience}
            </p>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
            <h3 className="text-lg font-bold text-[#0F172A]">Publish New Announcement</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#57534E] mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Monsoon Preparedness Briefing 2026"
                  className="w-full bg-[#FAF8F5] border border-[#E7E5E4] rounded-xl px-4 py-2.5 text-xs text-[#0F172A] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#57534E] mb-1">Content & Directives</label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter detailed memo content..."
                  className="w-full bg-[#FAF8F5] border border-[#E7E5E4] rounded-xl p-4 text-xs text-[#0F172A] outline-none resize-none"
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E7E5E4]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4] text-xs font-semibold text-[#57534E]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0D3B66] text-xs font-semibold text-white hover:bg-[#092b4d]"
                >
                  Publish Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
