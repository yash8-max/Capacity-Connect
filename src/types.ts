export type UserRole = 'ADMIN' | 'TRAINER' | 'TRAINEE';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  designation: string;
  department: string;
  organization: string; // e.g. "India Meteorological Department (IMD)"
  division?: string; // e.g. "National Weather Forecasting Centre (NWFC)"
  location: string;
  joinedDate: string;
  bio?: string;
  traineeProfile?: TraineeProfile;
  trainerProfile?: TrainerProfile;
}

export interface TraineeProfile {
  employeeCode: string;
  batchYear: number;
  cadre: string;
  currentStation: string;
  completedCoursesCount: number;
  activeEnrollmentsCount: number;
  totalCertificatesCount: number;
  learningHours: number;
  competencyLevel: 'Foundation' | 'Intermediate' | 'Proficient' | 'Expert';
  learningInterests: string[];
}

export interface TrainerProfile {
  employeeCode: string;
  specialization: string[];
  yearsOfExperience: number;
  coursesTaughtCount: number;
  totalTraineesTrained: number;
  averageRating: number;
  publicationsCount: number;
  certifications: string[];
  availabilityStatus: 'Available' | 'In-Session' | 'On-Deputation';
}

export interface Competency {
  id: string;
  name: string;
  category: 'Atmospheric Physics' | 'Forecasting & Nowcasting' | 'Remote Sensing' | 'Computational & AI' | 'Instrumentation & Radar';
  description: string;
  weight: number;
  relatedCourses: string[];
  expertTrainerIds: string[];
}

export interface UserCompetencyScore {
  competencyId: string;
  competencyName: string;
  currentLevel: number; // 0 to 100
  targetLevel: number;  // 0 to 100
  levelLabel: 'Novice' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';
  gap: number; // target - current
  lastEvaluated: string;
  recommendedCourseId?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'interactive' | 'reading' | 'lab';
  content: string;
  completed?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  durationMinutes?: number;
  duration?: string;
  videoUrl?: string;
  readingContent?: string;
  keyTakeaways?: string[];
  isCompleted?: boolean;
  lessons?: Lesson[];
}

export interface Course {
  id: string;
  code: string;
  title: string;
  slug: string;
  category: 'Weather' | 'Climate' | 'Satellite' | 'Radar' | 'Data Science' | 'Python' | 'Machine Learning' | 'GIS' | 'General';
  thumbnail: string;
  level: 'Foundation' | 'Intermediate' | 'Advanced' | 'Executive';
  durationHours: number;
  modulesCount: number;
  enrolledCount: number;
  rating: number;
  reviewCount: number;
  trainerId: string;
  trainerName: string;
  trainerTitle: string;
  trainerAvatar: string;
  description: string;
  learningOutcomes: string[];
  prerequisites: string[];
  competenciesTaught: string[];
  modules: CourseModule[];
  assessmentId?: string;
  isPopular?: boolean;
  isNew?: boolean;
  featured?: boolean;
}

export interface CourseEnrollment {
  id: string;
  courseId: string;
  traineeId: string;
  enrolledDate: string;
  progressPercent: number;
  completedModules: string[];
  status: 'In Progress' | 'Completed' | 'Pending Review';
  lastAccessed: string;
  gradeScore?: number;
  certificateId?: string;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  questionText?: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  competencyId: string;
}

export interface Assessment {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  description?: string;
  durationMinutes: number;
  passingScorePercent: number;
  passingScore?: number;
  totalQuestions: number;
  questions: AssessmentQuestion[];
}

export interface AssessmentAttempt {
  id: string;
  assessmentId: string;
  traineeId: string;
  scorePercent: number;
  passed: boolean;
  submittedAt: string;
  answers: { [questionId: string]: number };
  feedback: string;
}

export interface Certificate {
  id: string;
  certificateNumber: string;
  traineeId: string;
  traineeName: string;
  traineeDesignation: string;
  traineeStation: string;
  courseId: string;
  courseTitle: string;
  trainerName: string;
  trainerDesignation: string;
  issueDate: string;
  finalScore: number;
  verificationHash: string;
  directorGeneralName: string;
}

export interface CourseRecommendation {
  course: Course;
  matchScore: number; // 0 to 100
  reasons: {
    icon: string;
    text: string;
  }[];
  matchingSkills: string[];
  matchingCompetencies: string[];
  gapsAddressed: string[];
}

export interface TrainerRecommendation {
  trainer: User;
  matchScore: number;
  reasons: {
    icon: string;
    text: string;
  }[];
  matchingSkills: string[];
  matchingCompetencies: string[];
  gapsAddressed: string[];
  subjectRelevance: number;
  competencyLevel: number;
  experienceScore: number;
  certificationScore: number;
  performanceScore: number;
  feedbackScore: number;
  specializationHighlighted: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  type: 'Video' | 'PDF' | 'Presentation' | 'Document' | 'Article';
  category: 'Weather' | 'Climate' | 'Satellite' | 'Radar' | 'Data Science' | 'Python' | 'Machine Learning' | 'GIS';
  trainerId: string;
  trainerName: string;
  fileSize: string;
  duration?: string;
  uploadDate: string;
  downloadsCount: number;
  viewsCount: number;
  description: string;
  downloadUrl?: string;
}

export interface Announcement {
  id: string;
  type: 'New Course' | 'Upcoming Training' | 'Achievement' | 'Directive';
  title: string;
  summary: string;
  date: string;
  targetRole?: UserRole | 'ALL';
  linkUrl?: string;
  actionLabel?: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  type: 'course' | 'assessment' | 'certificate' | 'announcement' | 'resource' | 'trainer';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionRoute?: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  metadata?: {
    recommendationMatch?: number;
    reasons?: string[];
    suggestedActions?: { label: string; action: string }[];
    competencyId?: string;
  };
}
