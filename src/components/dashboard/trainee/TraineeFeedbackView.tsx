import React, { useState } from 'react';
import { User } from '../../../types';
import { MessageSquare, Star } from 'lucide-react';

interface TraineeFeedbackViewProps {
  currentUser: User;
  onToast: (msg: string) => void;
}

export const TraineeFeedbackView: React.FC<TraineeFeedbackViewProps> = ({ currentUser, onToast }) => {
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onToast('Course feedback submitted successfully to faculty');
    setComments('');
  };

  return (
    <div className="space-y-6 text-left max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8">
        <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">Course & Faculty Feedback</h2>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1">
          Share your evaluation on curriculum quality, instruction clarity, and technical relevance.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-[#57534E] mb-2">Select Course</label>
            <select className="w-full bg-[#FAF8F5] border border-[#E7E5E4] rounded-xl px-4 py-3 text-xs text-[#0F172A] outline-none">
              <option>Numerical Weather Prediction & AI</option>
              <option>Doppler Weather Radar (DWR) Operations</option>
              <option>Satellite Meteorology & INSAT-3DR</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#57534E] mb-2">Overall Rating</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setRating(s)}
                  className={`p-2 rounded-xl border transition-all ${
                    s <= rating ? 'bg-[#FAF3EE] border-[#E8D49E] text-[#D97706]' : 'bg-[#FAF8F5] border-[#E7E5E4] text-[#94A3B8]'
                  }`}
                >
                  <Star className="w-5 h-5 fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#57534E] mb-2">Detailed Comments & Suggestions</label>
            <textarea
              rows={4}
              required
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Provide constructive feedback on course materials, practical sessions, or pedagogical pace..."
              className="w-full bg-[#FAF8F5] border border-[#E7E5E4] rounded-xl p-4 text-xs text-[#0F172A] outline-none resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#0D3B66] text-white text-xs font-semibold hover:bg-[#092b4d]"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
