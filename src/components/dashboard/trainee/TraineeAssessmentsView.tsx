import React from 'react';
import { User } from '../../../types';
import { AssessmentService } from '../../../services/assessmentService';
import { CheckSquare, Play } from 'lucide-react';

interface TraineeAssessmentsViewProps {
  currentUser: User;
  onStartAssessment: (assessmentId: string) => void;
  onToast: (msg: string) => void;
}

export const TraineeAssessmentsView: React.FC<TraineeAssessmentsViewProps> = ({ currentUser, onStartAssessment, onToast }) => {
  const assessments = AssessmentService.getAssessments();

  return (
    <div className="space-y-6 text-left">
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8">
        <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">Assigned Competency Assessments</h2>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1">
          Complete your operational exams to earn WMO-compliant certificates and validate your forecaster skills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assessments.map((ass) => (
          <div key={ass.id} className="bg-white rounded-3xl border border-[#E7E5E4] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#E8F3F1] text-[#2A7F7E] text-[10px] font-bold font-mono">
                {ass.courseTitle}
              </span>
              <span className="text-xs font-mono text-[#64748B]">Passing: {ass.passingScore}%</span>
            </div>
            <h3 className="text-base font-bold text-[#0F172A]">{ass.title}</h3>
            <p className="text-xs text-[#64748B]">{ass.description}</p>
            <div className="pt-4 border-t border-[#E7E5E4] flex items-center justify-between">
              <span className="text-xs font-mono text-[#0D3B66] font-bold">{ass.questions.length} Questions</span>
              <button
                onClick={() => onStartAssessment(ass.id)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0D3B66] text-white text-xs font-semibold hover:bg-[#092b4d]"
              >
                <Play className="w-3.5 h-3.5" /> Start Exam
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
