import React from 'react';
import { User } from '../../../types';
import { AssessmentService } from '../../../services/assessmentService';
import { CheckSquare, Award, BarChart3 } from 'lucide-react';

interface AdminAssessmentsViewProps {
  currentUser: User;
  onToast: (msg: string) => void;
}

export const AdminAssessmentsView: React.FC<AdminAssessmentsViewProps> = ({ currentUser, onToast }) => {
  const assessments = AssessmentService.getAssessments();

  return (
    <div className="space-y-6 text-left">
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8">
        <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">Institutional Assessments & Questionnaires</h2>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1">
          Monitor competency exam pass rates, question banks, and validation results across operational modules.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E7E5E4] text-[11px] font-mono text-[#94A3B8] uppercase">
              <th className="py-3 px-4">Assessment Title</th>
              <th className="py-3 px-4">Target Course</th>
              <th className="py-3 px-4">Questions</th>
              <th className="py-3 px-4">Passing Score</th>
              <th className="py-3 px-4">Attempts</th>
              <th className="py-3 px-4 text-right">Pass Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E7E5E4] text-xs">
            {assessments.map((a) => (
              <tr key={a.id} className="hover:bg-[#FAF8F5]">
                <td className="py-4 px-4 font-bold text-[#0F172A]">{a.title}</td>
                <td className="py-4 px-4 text-[#64748B]">{a.courseTitle}</td>
                <td className="py-4 px-4 font-mono">{a.questions.length} Items</td>
                <td className="py-4 px-4 font-mono text-[#2A7F7E]">{a.passingScore}%</td>
                <td className="py-4 px-4 font-mono">142 Officers</td>
                <td className="py-4 px-4 text-right font-bold text-emerald-600">92.4%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
