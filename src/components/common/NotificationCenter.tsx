import React, { useState } from 'react';
import { Bell, CheckCheck, X, Sparkles, BookOpen, Award, AlertTriangle, ShieldCheck } from 'lucide-react';
import { NotificationItem } from '../../types';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onNotificationClick: (item: NotificationItem) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onNotificationClick,
}) => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  if (!isOpen) return null;

  const filtered = notifications.filter(n => filter === 'all' || !n.read);

  const getIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen className="w-4 h-4 text-[#0D3B66]" />;
      case 'certificate': return <Award className="w-4 h-4 text-[#D97706]" />;
      case 'assessment': return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      default: return <Sparkles className="w-4 h-4 text-[#2A7F7E]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-[#E7E5E4] animate-slide-right">
        {/* Header */}
        <div className="p-6 border-b border-[#E7E5E4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#0D3B66]" />
            <h3 className="text-base font-bold text-[#0F172A]">Notification Center</h3>
            <span className="px-2 py-0.5 rounded-full bg-[#E8F3F1] text-[#2A7F7E] text-xs font-bold">
              {notifications.filter(n => !n.read).length} new
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4] text-[#64748B] hover:text-[#0F172A]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters & Actions */}
        <div className="px-6 py-3 bg-[#FAF8F5] border-b border-[#E7E5E4] flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filter === 'all' ? 'bg-[#0D3B66] text-white' : 'bg-white border border-[#E7E5E4] text-[#57534E]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filter === 'unread' ? 'bg-[#0D3B66] text-white' : 'bg-white border border-[#E7E5E4] text-[#57534E]'
              }`}
            >
              Unread
            </button>
          </div>
          <button
            onClick={onMarkAllAsRead}
            className="text-[#2A7F7E] hover:underline flex items-center gap-1 font-bold"
          >
            <CheckCheck className="w-4 h-4" /> Mark all read
          </button>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => onNotificationClick(item)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  item.read
                    ? 'bg-[#FAF8F5] border-[#E7E5E4] opacity-80'
                    : 'bg-white border-[#0D3B66]/30 shadow-xs ring-1 ring-[#0D3B66]/10'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-[#E7E5E4] flex items-center justify-center shrink-0">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-bold text-[#0F172A] truncate">{item.title}</p>
                      <span className="text-[10px] text-[#94A3B8] shrink-0 font-mono">{item.timestamp}</span>
                    </div>
                    <p className="text-xs text-[#64748B] mt-1 line-clamp-2">{item.message}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <ShieldCheck className="w-12 h-12 text-[#94A3B8] mx-auto mb-3" />
              <p className="text-sm font-bold text-[#0F172A]">All caught up!</p>
              <p className="text-xs text-[#64748B] mt-1">No unread notifications in your institutional queue.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#E7E5E4] text-center text-xs text-[#64748B]">
          Ministry of Earth Sciences • IMD Alert System
        </div>
      </div>
    </div>
  );
};
