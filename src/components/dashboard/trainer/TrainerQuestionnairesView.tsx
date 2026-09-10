import React, { useState } from 'react';
import { User, Assessment } from '../../../types';
import { AssessmentService } from '../../../services/assessmentService';
import { FileQuestion, Plus, Sparkles } from 'lucide-react';

interface TrainerQuestionnairesViewProps {
  currentUser: User;
  onToast: (msg: string) => void;
}

export const TrainerQuestionnairesView: React.FC<TrainerQuestionnairesViewProps> = ({ currentUser, onToast }) => {
  const [assessments, setAssessments] = useState<Assessment[]>(AssessmentService.getAssessments());
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [passingScore, setPassingScore] = useState(70);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newAss: Assessment = {
      id: `ass-${Date.now()}`,
      courseId: 'course-ml-weather',
      courseTitle: 'Numerical Weather Prediction & AI',
      title,
      description: 'Specialized faculty questionnaire on atmospheric modeling.',
      durationMinutes: 30,
      passingScorePercent: passingScore,
      totalQuestions: 1,
      questions: [
        {
          id: 'q1',
          question: 'What is the primary governing equation for horizontal momentum in mesoscale models?',
          options: ['Navier-Stokes momentum equation', 'Geostrophic balance law', 'Stefan-Boltzmann law', 'Clapeyron equation'],
          correctOptionIndex: 0,
          explanation: 'Governing equations rely on Navier-Stokes momentum formulations.',
          competencyId: 'comp-nwp',
        },
      ],
    };

    setAssessments([newAss, ...assessments]);
    setModalOpen(false);
    setTitle('');
    onToast('Questionnaire created successfully with AI question suggestions');
  };

  return (
    <div className="space-y-6 text-left">
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">Questionnaires & Assessment Workspace</h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Build quizzes and exams with AI-assisted question generation for your trainees.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D3B66] text-white text-xs font-semibold hover:bg-[#092b4d]"
        >
          <Plus className="w-4 h-4" />
          <span>Create Questionnaire</span>
        </button>
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
            <div className="pt-4 border-t border-[#E7E5E4] flex items-center justify-between text-xs font-semibold">
              <span className="text-[#0D3B66] font-mono">{ass.questions.length} Question Items</span>
              <button
                onClick={() => onToast(`Managing questionnaire: ${ass.title}`)}
                className="text-[#2A7F7E] hover:underline"
              >
                View Responses →
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#0F172A]">Create New Questionnaire</h3>
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E8F3F1] text-[#2A7F7E] text-[10px] font-bold">
                <Sparkles className="w-3.5 h-3.5" /> AI Assisted
              </span>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#57534E] mb-1">Assessment Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Advanced Radar Polarimetry Exam"
                  className="w-full bg-[#FAF8F5] border border-[#E7E5E4] rounded-xl px-4 py-2.5 text-xs text-[#0F172A] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#57534E] mb-1">Passing Score (%)</label>
                <input
                  type="number"
                  value={passingScore}
                  onChange={(e) => setPassingScore(Number(e.target.value))}
                  className="w-full bg-[#FAF8F5] border border-[#E7E5E4] rounded-xl px-4 py-2.5 text-xs text-[#0F172A] outline-none"
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
                  Generate with AI & Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
