import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { User, UserRole, Course, Certificate, ResourceItem } from './types';
import { AuthService } from './auth/authService';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { LoginPage } from './pages/auth/LoginPage';
import { UnauthorizedPage } from './pages/unauthorized/UnauthorizedPage';
import { AdminLayout } from './layouts/AdminLayout';
import { TrainerLayout } from './layouts/TrainerLayout';
import { TraineeLayout } from './layouts/TraineeLayout';

import { CourseService } from './services/courseService';
import { AssessmentService } from './services/assessmentService';
import { Navbar } from './components/common/Navbar';
import { HeroSection } from './components/landing/HeroSection';
import { RoleAccessSection } from './components/landing/RoleAccessSection';
import { WhyCapacitySection } from './components/landing/WhyCapacitySection';
import { RecommendationsSection } from './components/landing/RecommendationsSection';
import { SkillGapSection } from './components/landing/SkillGapSection';
import { CapacityAISection } from './components/landing/CapacityAISection';
import { CoursesSection } from './components/landing/CoursesSection';
import { TrainerDiscoverySection } from './components/landing/TrainerDiscoverySection';
import { ResourcesSection } from './components/landing/ResourcesSection';
import { CertificationSection } from './components/landing/CertificationSection';
import { AchievementsSection } from './components/landing/AchievementsSection';
import { AnnouncementsSection } from './components/landing/AnnouncementsSection';
import { Footer } from './components/common/Footer';
import { LoginModal } from './components/auth/LoginModal';
import { CoursePlayerModal } from './components/learning/CoursePlayerModal';
import { AssessmentModal } from './components/learning/AssessmentModal';
import { CertificateModal } from './components/common/CertificateModal';
import { SearchModal } from './components/common/SearchModal';
import { Toast } from './components/common/Toast';
import { TraineeDashboard } from './components/dashboard/TraineeDashboard';
import { TrainerDashboard } from './components/dashboard/TrainerDashboard';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { AdminUsersView } from './components/dashboard/admin/AdminUsersView';
import { AdminTrainersView } from './components/dashboard/admin/AdminTrainersView';
import { AdminTraineesView } from './components/dashboard/admin/AdminTraineesView';
import { AdminCoursesView } from './components/dashboard/admin/AdminCoursesView';
import { AdminAssessmentsView } from './components/dashboard/admin/AdminAssessmentsView';
import { AdminCertificationsView } from './components/dashboard/admin/AdminCertificationsView';
import { AdminCompetenciesView } from './components/dashboard/admin/AdminCompetenciesView';
import { AdminAnalyticsView } from './components/dashboard/admin/AdminAnalyticsView';
import { AdminAnnouncementsView } from './components/dashboard/admin/AdminAnnouncementsView';
import { AdminSettingsView } from './components/dashboard/admin/AdminSettingsView';

import { TrainerProfileView } from './components/dashboard/trainer/TrainerProfileView';
import { TrainerCoursesView } from './components/dashboard/trainer/TrainerCoursesView';
import { TrainerQuestionnairesView } from './components/dashboard/trainer/TrainerQuestionnairesView';
import { TrainerTraineesView } from './components/dashboard/trainer/TrainerTraineesView';
import { TrainerLibraryView } from './components/dashboard/trainer/TrainerLibraryView';
import { TrainerAnalyticsView } from './components/dashboard/trainer/TrainerAnalyticsView';

import { TraineeProfileView } from './components/dashboard/trainee/TraineeProfileView';
import { TraineeExploreCoursesView } from './components/dashboard/trainee/TraineeExploreCoursesView';
import { TraineeMyLearningView } from './components/dashboard/trainee/TraineeMyLearningView';
import { TraineeAssessmentsView } from './components/dashboard/trainee/TraineeAssessmentsView';
import { TraineeRecommendationsView } from './components/dashboard/trainee/TraineeRecommendationsView';
import { TraineeCompetenciesView } from './components/dashboard/trainee/TraineeCompetenciesView';
import { TraineeResourcesView } from './components/dashboard/trainee/TraineeResourcesView';
import { TraineeCertificatesView } from './components/dashboard/trainee/TraineeCertificatesView';
import { TraineeFeedbackView } from './components/dashboard/trainee/TraineeFeedbackView';

// Public Landing Page Component
const LandingPageContent: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginModalRole, setLoginModalRole] = useState<UserRole>('TRAINEE');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeAssessmentId, setActiveAssessmentId] = useState<string | null>(null);
  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null);
  const [unreadNotifications, setUnreadNotifications] = useState(3);

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenLoginForRole = (role: UserRole) => {
    navigate(`/login/${role.toLowerCase()}`);
  };

  const handleSelectCourse = (courseId: string) => {
    const course = CourseService.getCourseById(courseId);
    if (course) setActiveCourse(course);
  };

  const handleStartAssessment = (assessmentId: string) => {
    setActiveAssessmentId(assessmentId);
  };

  const selectedAssessment = activeAssessmentId
    ? AssessmentService.getAssessmentById(activeAssessmentId)
    : null;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0F172A] font-sans antialiased selection:bg-[#0D3B66] selection:text-white">
      <Navbar
        currentUser={user || AuthService.getCurrentUser() || undefined}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenNotifications={() => {
          setUnreadNotifications(0);
          handleScrollToSection('announcements');
        }}
        unreadNotificationsCount={unreadNotifications}
        onSelectRoleLogin={(role) => navigate(`/login/${role.toLowerCase()}`)}
        onNavigate={handleScrollToSection}
        onEnterDashboard={() => {
          const r = user ? user.role : 'TRAINEE';
          if (r === 'ADMIN') navigate('/admin/dashboard');
          else if (r === 'TRAINER') navigate('/trainer/dashboard');
          else navigate('/trainee/dashboard');
        }}
        isInDashboard={false}
        onBackToLanding={() => {}}
      />

      <main>
        <HeroSection
          onExplorePlatform={() => {
            const r = user ? user.role : 'TRAINEE';
            if (r === 'ADMIN') navigate('/admin/dashboard');
            else if (r === 'TRAINER') navigate('/trainer/dashboard');
            else navigate('/trainee/dashboard');
          }}
          onHowItWorksClick={() => handleScrollToSection('about')}
          onFeatureCardClick={(sectionId) => handleScrollToSection(sectionId)}
        />

        <RoleAccessSection onSelectRole={handleOpenLoginForRole} />

        <WhyCapacitySection onLearnMoreClick={(featureId) => handleScrollToSection(featureId)} />

        <RecommendationsSection
          currentUser={user || AuthService.getCurrentUser() || undefined}
          onSelectCourse={handleSelectCourse}
        />

        <SkillGapSection
          currentUser={user || AuthService.getCurrentUser() || undefined}
          onEnrollInRecommendedCourse={handleSelectCourse}
        />

        <CapacityAISection
          currentUser={user || AuthService.getCurrentUser() || undefined}
          onNavigateAction={(action) => {
            if (action === 'view_course_ml') handleSelectCourse('course-ml-weather');
            if (action === 'view_skill_gaps') handleScrollToSection('skill-gap');
          }}
        />

        <CoursesSection
          onSelectCourse={handleSelectCourse}
          enrolledCourseIds={new Set(['course-ml-weather', 'course-radar-dwr'])}
        />

        <TrainerDiscoverySection
          onSelectTrainer={(trainer) => {
            const c = CourseService.getCourses().find((x) => x.trainerId === trainer.id);
            if (c) handleSelectCourse(c.id);
          }}
        />

        <ResourcesSection
          onOpenResource={() => handleSelectCourse('course-radar-dwr')}
        />

        <CertificationSection
          onVerifyCertificate={(cert) => setActiveCertificate(cert)}
        />

        <AchievementsSection />

        <AnnouncementsSection
          onAnnouncementClick={() => handleSelectCourse('course-ml-weather')}
        />
      </main>

      <Footer
        onNavigate={handleScrollToSection}
        onExploreCourse={handleSelectCourse}
      />

      {activeCourse && (
        <CoursePlayerModal
          course={activeCourse}
          currentUser={user || AuthService.getCurrentUser()}
          isOpen={!!activeCourse}
          onClose={() => setActiveCourse(null)}
          onStartAssessment={() => {
            const ass = AssessmentService.getAssessmentForCourse(activeCourse.id);
            if (ass) setActiveAssessmentId(ass.id);
          }}
        />
      )}

      {selectedAssessment && (
        <AssessmentModal
          assessment={selectedAssessment}
          currentUser={user || AuthService.getCurrentUser()}
          isOpen={!!selectedAssessment}
          onClose={() => setActiveAssessmentId(null)}
          onCertificateEarned={(cert) => setActiveCertificate(cert)}
        />
      )}

      {activeCertificate && (
        <CertificateModal
          certificate={activeCertificate}
          isOpen={!!activeCertificate}
          onClose={() => setActiveCertificate(null)}
        />
      )}

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectCourse={handleSelectCourse}
      />
    </div>
  );
};

export function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentUser = AuthService.getCurrentUser() || {
    id: 'user-admin-1',
    name: 'Dr. A. K. Mitra',
    email: 'ak.mitra@imd.gov.in',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    designation: 'Director General of Meteorology',
    department: 'Executive Directorate',
    organization: 'India Meteorological Department (IMD)',
    division: 'HQ New Delhi',
    location: 'New Delhi',
    joinedDate: '2018-04-12',
    bio: 'Senior institutional executive directing national meteorological services.',
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPageContent />} />
          <Route path="/login/:roleParam" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="ADMIN">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route
              path="dashboard"
              element={
                <AdminDashboard
                  currentUser={currentUser}
                  onViewCertificate={(cert) => alert(`Certificate: ${cert.certificateNumber}`)}
                />
              }
            />
            <Route path="users" element={<AdminUsersView currentUser={currentUser} onToast={setToastMessage} />} />
            <Route path="trainers" element={<AdminTrainersView currentUser={currentUser} onToast={setToastMessage} />} />
            <Route path="trainees" element={<AdminTraineesView currentUser={currentUser} onToast={setToastMessage} />} />
            <Route path="courses" element={<AdminCoursesView currentUser={currentUser} onToast={setToastMessage} />} />
            <Route path="enrollments" element={<AdminUsersView currentUser={currentUser} onToast={setToastMessage} />} />
            <Route path="assessments" element={<AdminAssessmentsView currentUser={currentUser} onToast={setToastMessage} />} />
            <Route path="certifications" element={<AdminCertificationsView currentUser={currentUser} onToast={setToastMessage} onViewCertificate={() => {}} />} />
            <Route path="competencies" element={<AdminCompetenciesView currentUser={currentUser} onToast={setToastMessage} />} />
            <Route path="analytics" element={<AdminAnalyticsView currentUser={currentUser} onToast={setToastMessage} />} />
            <Route path="announcements" element={<AdminAnnouncementsView currentUser={currentUser} onToast={setToastMessage} />} />
            <Route path="settings" element={<AdminSettingsView currentUser={currentUser} onToast={setToastMessage} />} />
          </Route>

          {/* Trainer Protected Routes */}
          <Route
            path="/trainer"
            element={
              <ProtectedRoute allowedRole="TRAINER">
                <TrainerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route
              path="dashboard"
              element={
                <TrainerDashboard
                  currentUser={currentUser}
                  onOpenCourse={(id) => alert(`Opening course ${id}`)}
                />
              }
            />
            <Route path="profile" element={<TrainerProfileView currentUser={currentUser} onToast={setToastMessage} />} />
            <Route path="courses" element={<TrainerCoursesView currentUser={currentUser} onToast={setToastMessage} />} />
            <Route path="courses/create" element={<TrainerCoursesView currentUser={currentUser} onToast={setToastMessage} />} />
            <Route path="courses/:id" element={<TrainerCoursesView currentUser={currentUser} onToast={setToastMessage} />} />
            <Route path="questionnaires" element={<TrainerQuestionnairesView currentUser={currentUser} onToast={setToastMessage} />} />
            <Route path="trainees" element={<TrainerTraineesView currentUser={currentUser} onToast={setToastMessage} />} />
            <Route path="performance" element={<TrainerTraineesView currentUser={currentUser} onToast={setToastMessage} />} />
            <Route path="library" element={<TrainerLibraryView currentUser={currentUser} onToast={setToastMessage} />} />
            <Route path="analytics" element={<TrainerAnalyticsView currentUser={currentUser} onToast={setToastMessage} />} />
            <Route path="notifications" element={<TrainerAnalyticsView currentUser={currentUser} onToast={setToastMessage} />} />
            <Route path="settings" element={<TrainerProfileView currentUser={currentUser} onToast={setToastMessage} />} />
          </Route>

          {/* Trainee Protected Routes */}
          <Route
            path="/trainee"
            element={
              <ProtectedRoute allowedRole="TRAINEE">
                <TraineeLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route
              path="dashboard"
              element={
                <TraineeDashboard
                  currentUser={currentUser}
                  onOpenCourse={(id) => alert(`Opening course ${id}`)}
                  onStartAssessment={(id) => alert(`Starting assessment ${id}`)}
                  onViewCertificate={(cert) => alert(`Viewing certificate ${cert.certificateNumber}`)}
                />
              }
            />
            <Route path="profile" element={<TraineeProfileView currentUser={currentUser} onToast={setToastMessage} />} />
            <Route path="courses" element={<TraineeExploreCoursesView currentUser={currentUser} onOpenCourse={() => {}} onToast={setToastMessage} />} />
            <Route path="courses/:id" element={<TraineeExploreCoursesView currentUser={currentUser} onOpenCourse={() => {}} onToast={setToastMessage} />} />
            <Route path="my-learning" element={<TraineeMyLearningView currentUser={currentUser} onOpenCourse={() => {}} onToast={setToastMessage} />} />
            <Route path="assessments" element={<TraineeAssessmentsView currentUser={currentUser} onStartAssessment={() => {}} onToast={setToastMessage} />} />
            <Route path="certificates" element={<TraineeCertificatesView currentUser={currentUser} onViewCertificate={() => {}} onToast={setToastMessage} />} />
            <Route path="resources" element={<TraineeResourcesView currentUser={currentUser} onToast={setToastMessage} />} />
            <Route path="recommendations" element={<TraineeRecommendationsView currentUser={currentUser} onOpenCourse={() => {}} onToast={setToastMessage} />} />
            <Route path="competencies" element={<TraineeCompetenciesView currentUser={currentUser} onToast={setToastMessage} />} />
            <Route path="feedback" element={<TraineeFeedbackView currentUser={currentUser} onToast={setToastMessage} />} />
            <Route path="notifications" element={<TraineeResourcesView currentUser={currentUser} onToast={setToastMessage} />} />
            <Route path="settings" element={<TraineeProfileView currentUser={currentUser} onToast={setToastMessage} />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
