import React, { useState } from 'react';
import {
  BookOpen,
  Award,
  Target,
  Sparkles,
  Clock,
  Play,
  CheckCircle2,
  AlertCircle,
  FileText,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { User, Course, Certificate } from '../../types';
import { CourseService } from '../../services/courseService';
import { CompetencyService } from '../../services/competencyService';
import { AssessmentService } from '../../services/assessmentService';

interface TraineeDashboardProps {
  currentUser: User;
  onOpenCourse: (courseId: string) => void;
  onStartAssessment: (assessmentId: string) => void;
  onViewCertificate: (cert: Certificate) => void;
}

export const TraineeDashboard: React.FC<TraineeDashboardProps> = ({
  currentUser,
  onOpenCourse,
  onStartAssessment,
  onViewCertificate,
}) => {
  const safeUser = currentUser || {
    id: 'trainee-1',
    name: 'Priya Sharma',
    email: 'priya.sharma@imd.gov.in',
    role: 'TRAINEE' as const,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    designation: 'Meteorologist Grade-II',
    department: 'NWFC Forecasting Division',
    organization: 'India Meteorological Department (IMD)',
    location: 'New Delhi',
    joinedDate: '2023-01-15',
    traineeProfile: {
      employeeCode: 'IMD-TR-1042',
      batchYear: 2023,
      cadre: 'Meteorological Service Cadre Gr-II',
      currentStation: 'RMC New Delhi',
      completedCoursesCount: 4,
      activeEnrollmentsCount: 2,
      totalCertificatesCount: 3,
      learningHours: 48,
      competencyLevel: 'Intermediate',
      learningInterests: ['Doppler Radar', 'Numerical Weather Prediction']
    }
  };

  const [activeTab, setActiveTab] = useState<'enrolled' | 'competencies' | 'assessments' | 'certificates'>('enrolled');

  const enrollments = CourseService.getUserEnrollments(safeUser.id);
  const userCompetencies = CompetencyService.getUserCompetencies(safeUser.id);
  const userCerts = AssessmentService.getUserCertificates(safeUser.id);
  const assessments = AssessmentService.getAssessments();

  // Find enrolled course objects
  const enrolledCoursesWithProgress = enrollments.map((enr) => {
    const course = CourseService.getCourseById(enr.courseId);
    return {
      course,
      progress: enr.progressPercent,
      completedLessons: enr.completedModules?.length || 0,
      isCompleted: enr.status === 'Completed',
    };
  }).filter((item): item is { course: Course; progress: number; completedLessons: number; isCompleted: boolean } => !!item.course);

  return (
    <div className="space-y-8 text-left">
      {/* Officer Welcome & Summary Banner */}
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={safeUser.avatar}
              alt={safeUser.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#2A7F7E]/30"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">
                  Welcome back, {safeUser.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#E8F3F1] text-[#2A7F7E] text-xs font-semibold">
                  Trainee Forecaster
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                {safeUser.designation} • {safeUser.traineeProfile?.currentStation || safeUser.location} • Cadre ID: {safeUser.traineeProfile?.employeeCode || 'IMD-TR-1042'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-[#E7E5E4] pt-4 md:pt-0 md:pl-6">
            <div>
              <p className="text-xs text-[#64748B]">Completed</p>
              <p className="text-xl font-bold text-[#2A7F7E]">
                {safeUser.traineeProfile?.completedCoursesCount || 2} Courses
              </p>
            </div>
            <div className="w-px h-8 bg-[#E7E5E4]" />
            <div>
              <p className="text-xs text-[#64748B]">Certificates</p>
              <p className="text-xl font-bold text-[#0D3B66]">{userCerts.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E7E5E4] pb-2 text-xs sm:text-sm overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('enrolled')}
          className={`px-4 py-2 font-semibold rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'enrolled'
              ? 'bg-[#0D3B66] text-white shadow-xs'
              : 'text-[#57534E] hover:bg-[#F5F0E8]'
          }`}
        >
          My Enrolled Courses ({enrolledCoursesWithProgress.length})
        </button>
        <button
          onClick={() => setActiveTab('competencies')}
          className={`px-4 py-2 font-semibold rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'competencies'
              ? 'bg-[#0D3B66] text-white shadow-xs'
              : 'text-[#57534E] hover:bg-[#F5F0E8]'
          }`}
        >
          Skill Gap Diagnostics ({userCompetencies.length})
        </button>
        <button
          onClick={() => setActiveTab('assessments')}
          className={`px-4 py-2 font-semibold rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'assessments'
              ? 'bg-[#0D3B66] text-white shadow-xs'
              : 'text-[#57534E] hover:bg-[#F5F0E8]'
          }`}
        >
          Available Assessments
        </button>
        <button
          onClick={() => setActiveTab('certificates')}
          className={`px-4 py-2 font-semibold rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'certificates'
              ? 'bg-[#0D3B66] text-white shadow-xs'
              : 'text-[#57534E] hover:bg-[#F5F0E8]'
          }`}
        >
          My Certificates ({userCerts.length})
        </button>
      </div>

      {/* TAB 1: Enrolled Courses */}
      {activeTab === 'enrolled' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCoursesWithProgress.map(({ course, progress, completedLessons, isCompleted }) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-[#E7E5E4] hover:border-[#0D3B66]/30 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-40 w-full overflow-hidden bg-slate-200">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#0D3B66] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                      {course.code}
                    </div>
                    {isCompleted && (
                      <div className="absolute top-3 right-3 bg-[#2A7F7E] text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Completed
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-[#0F172A] text-base line-clamp-1 mb-1">
                      {course.title}
                    </h3>
                    <p className="text-xs text-[#64748B] mb-4">
                      Instructor: {course.trainerName}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 mb-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#64748B]">Course Progress</span>
                        <span className="font-bold text-[#0F172A]">{progress}%</span>
                      </div>
                      <div className="w-full bg-[#E7E5E4] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#2A7F7E] h-full transition-all duration-300 rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onOpenCourse(course.id)}
                    className="w-full py-2.5 rounded-xl bg-[#0D3B66] text-white text-xs font-semibold hover:bg-[#092b4d] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{progress === 0 ? 'Start Course' : 'Continue Learning'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Competency Skill Gap Breakdown */}
      {activeTab === 'competencies' && (
        <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-[#0F172A]">Detailed Forecaster Competency Matrix</h3>
            <p className="text-xs text-[#64748B] mt-1">
              Operational benchmark targets set by IMD Central Training Institute (CTI).
            </p>
          </div>

          <div className="divide-y divide-[#F1F5F9]">
            {userCompetencies.map((c) => (
              <div key={c.competencyId} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 sm:w-1/3">
                  <p className="font-bold text-sm text-[#0F172A]">{c.competencyName}</p>
                  <p className="text-xs text-[#64748B]">Status: {c.levelLabel}</p>
                </div>

                <div className="sm:w-1/3 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#64748B]">Current vs Target</span>
                    <span className="font-bold text-[#0F172A]">{c.currentLevel}% / {c.targetLevel}%</span>
                  </div>
                  <div className="w-full bg-[#E7E5E4] h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${c.gap >= 30 ? 'bg-rose-500' : 'bg-[#2A7F7E]'}`}
                      style={{ width: `${c.currentLevel}%` }}
                    />
                  </div>
                </div>

                <div className="sm:w-1/4 text-right">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    c.gap >= 30 ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    Deficit: -{c.gap}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Assessments & Knowledge Evaluations */}
      {activeTab === 'assessments' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assessments.map((ass) => (
            <div
              key={ass.id}
              className="bg-white rounded-2xl border border-[#E7E5E4] p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded bg-[#FAF8F5] border border-[#E7E5E4] text-[11px] font-mono text-[#0D3B66]">
                    Passing: {ass.passingScorePercent}%
                  </span>
                  <span className="text-xs text-[#64748B] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {ass.durationMinutes} mins
                  </span>
                </div>

                <h4 className="text-base font-bold text-[#0F172A] mb-2">{ass.title}</h4>
                <p className="text-xs text-[#57534E] leading-relaxed mb-4">
                  {ass.description || 'Comprehensive evaluation on meteorological theory, observational data pipelines, and operational warning protocols.'}
                </p>

                <div className="text-[11px] text-[#64748B] mb-4">
                  <span>Questions: {ass.questions.length} Scenario & Theory Items</span>
                </div>
              </div>

              <button
                onClick={() => onStartAssessment(ass.id)}
                className="w-full py-2.5 rounded-xl bg-[#0D3B66] text-white text-xs font-semibold hover:bg-[#092b4d] transition-all flex items-center justify-center gap-1.5"
              >
                <span>Take Assessment Now</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: Certificates */}
      {activeTab === 'certificates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userCerts.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-2xl border border-[#E7E5E4] p-6 shadow-xs flex flex-col justify-between text-left"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Award className="w-8 h-8 text-[#B88E28]" />
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E7E5E4] text-[#64748B]">
                    {cert.certificateNumber}
                  </span>
                </div>

                <h4 className="text-base font-bold text-[#0F172A] mb-1">{cert.courseTitle}</h4>
                <p className="text-xs text-[#2A7F7E] font-medium mb-3">
                  Score: {cert.finalScore}% (Distinction) • Issued: {cert.issueDate}
                </p>
                <p className="text-xs text-[#57534E] mb-4">
                  Certified by: {cert.trainerName} and {cert.directorGeneralName}
                </p>
              </div>

              <button
                onClick={() => onViewCertificate(cert)}
                className="w-full py-2 rounded-xl bg-[#FAF8F5] border border-[#CBD5E1] text-[#0D3B66] text-xs font-semibold hover:bg-[#EBF2F7] transition-colors"
              >
                View & Print Official Certificate →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
