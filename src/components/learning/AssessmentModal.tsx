import React, { useState } from 'react';
import { X, Award, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Assessment, User, Certificate } from '../../types';
import { AssessmentService } from '../../services/assessmentService';

interface AssessmentModalProps {
  assessment: Assessment;
  currentUser: User;
  isOpen: boolean;
  onClose: () => void;
  onCertificateEarned: (cert: Certificate) => void;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({
  assessment,
  currentUser,
  isOpen,
  onClose,
  onCertificateEarned,
}) => {
  if (!isOpen) return null;

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState<{
    score: number;
    passed: boolean;
    earnedCertificate?: Certificate;
  } | null>(null);

  const currentQuestion = assessment.questions[currentQuestionIdx];

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: idx,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIdx < assessment.questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    const { attempt, certificate } = AssessmentService.submitAssessment(
      assessment.id,
      currentUser.id,
      currentUser.name,
      currentUser.designation,
      currentUser.traineeProfile?.currentStation || currentUser.location,
      selectedAnswers
    );

    setScoreResult({
      score: attempt.scorePercent,
      passed: attempt.passed,
      earnedCertificate: certificate,
    });
    setIsSubmitted(true);

    if (certificate) {
      onCertificateEarned(certificate);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#E7E5E4] shadow-2xl overflow-hidden p-6 sm:p-8 text-left">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4] mb-6">
          <div>
            <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E7E5E4] text-[#0D3B66]">
              Competency Evaluation
            </span>
            <h3 className="text-lg font-bold text-[#0F172A] mt-1">{assessment.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#FAF8F5] text-[#64748B] hover:text-[#0F172A]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isSubmitted ? (
          <div className="space-y-6">
            {/* Question Progress Tracker */}
            <div className="flex items-center justify-between text-xs text-[#64748B]">
              <span>
                Question {currentQuestionIdx + 1} of {assessment.questions.length}
              </span>
              <span className="font-mono font-semibold">Passing: {assessment.passingScore}%</span>
            </div>

            <div className="w-full bg-[#E7E5E4] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#0D3B66] h-full transition-all"
                style={{
                  width: `${((currentQuestionIdx + 1) / assessment.questions.length) * 100}%`,
                }}
              />
            </div>

            {/* Question Card */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4]">
              <h4 className="text-base font-bold text-[#0F172A] mb-4">
                {currentQuestion.questionText}
              </h4>

              <div className="space-y-2.5">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedAnswers[currentQuestion.id] === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`p-3.5 rounded-xl border text-xs sm:text-sm font-medium cursor-pointer transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'bg-[#0D3B66] text-white border-[#0D3B66] shadow-xs'
                          : 'bg-white text-[#57534E] border-[#E7E5E4] hover:border-[#CBD5E1]'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-mono shrink-0 ${
                          isSelected ? 'border-white bg-white/20' : 'border-[#CBD5E1]'
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentQuestionIdx === 0}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#64748B] hover:bg-[#F5F0E8] disabled:opacity-30"
              >
                ← Previous
              </button>

              {currentQuestionIdx < assessment.questions.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-xl bg-[#0D3B66] text-white text-xs font-semibold hover:bg-[#092b4d]"
                >
                  Next Question →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2.5 rounded-xl bg-[#2A7F7E] text-white text-xs font-semibold hover:bg-[#206362] shadow-sm"
                >
                  Submit Assessment
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Result Summary & Certificate Granted */
          <div className="space-y-6 text-center py-4">
            <div
              className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${
                scoreResult?.passed ? 'bg-[#E8F3F1] text-[#2A7F7E]' : 'bg-[#FFF1F2] text-rose-500'
              }`}
            >
              {scoreResult?.passed ? (
                <Award className="w-8 h-8" />
              ) : (
                <AlertCircle className="w-8 h-8" />
              )}
            </div>

            <div>
              <h4 className="text-2xl font-black text-[#0F172A]">
                {scoreResult?.passed ? 'Assessment Passed with Distinction!' : 'Assessment Incomplete'}
              </h4>
              <p className="text-sm text-[#64748B] mt-1">
                Your Score: <span className="font-bold text-[#0F172A]">{scoreResult?.score}%</span> (Passing Threshold: {assessment.passingScore}%)
              </p>
            </div>

            {scoreResult?.passed && scoreResult.earnedCertificate && (
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#B9DDD7] text-left space-y-2">
                <div className="flex items-center gap-2 text-[#2A7F7E] font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Accredited MoES-IMD Certificate Issued</span>
                </div>
                <p className="text-xs text-[#0F172A]">
                  <span className="font-semibold">Certificate Number:</span>{' '}
                  <span className="font-mono">{scoreResult.earnedCertificate.certificateNumber}</span>
                </p>
                <p className="text-xs text-[#57534E]">
                  This record has been signed by the Director General of Meteorology and permanently logged to your trainee profile.
                </p>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-[#0D3B66] text-white text-xs sm:text-sm font-semibold hover:bg-[#092b4d]"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
