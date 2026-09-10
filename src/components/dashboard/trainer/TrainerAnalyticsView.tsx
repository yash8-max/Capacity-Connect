import React from 'react';
import { User } from '../../../types';
import { BarChart3, TrendingUp, Sparkles } from 'lucide-react';

interface TrainerAnalyticsViewProps {
  currentUser: User;
  onToast: (msg: string) => void;
}

export const TrainerAnalyticsView: React.FC<TrainerAnalyticsViewProps> = ({ currentUser, onToast }) => {
  return (
    <div className="space-y-6 text-left">
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8">
        <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">Teaching Analytics & Insights</h2>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1">
          Evaluate trainee engagement, course completion velocities, and knowledge retention trends.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#E8F3F1] border border-[#2A7F7E]/30 text-[#2A7F7E]">
          <Sparkles className="w-6 h-6 shrink-0" />
          <p className="text-xs sm:text-sm font-semibold">
            "Learners perform 18% better after completing the satellite imagery module before attempting Numerical Weather Prediction exams."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4]">
            <p className="text-xs text-[#64748B]">Average Trainee Score</p>
            <p className="text-3xl font-black text-[#0F172A] mt-2">88.4%</p>
            <p className="text-xs text-emerald-600 mt-1">↑ +4.2% vs last batch</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4]">
            <p className="text-xs text-[#64748B]">Course Completion Rate</p>
            <p className="text-3xl font-black text-[#2A7F7E] mt-2">94.8%</p>
            <p className="text-xs text-[#64748B] mt-1">620 active learners</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4]">
            <p className="text-xs text-[#64748B]">Faculty Rating</p>
            <p className="text-3xl font-black text-[#9E7318] mt-2">4.92 / 5.0</p>
            <p className="text-xs text-[#64748B] mt-1">Based on 140 reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
};
