import { AIChatMessage, User } from '../types';
import { RecommendationEngine } from './recommendationService';
import { CompetencyService } from './competencyService';
import { CourseService } from './courseService';
import { AssessmentService } from './assessmentService';
import { RESOURCES } from '../data/mockData';

export class AIService {
  /**
   * Main chat assistant method that builds role-aware context and calls /api/ai/chat.
   */
  static async askCapacityAI(query: string, currentUser: User): Promise<AIChatMessage> {
    const contextPayload = this.buildRoleAwareContext(currentUser);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          context: contextPayload,
          userRole: currentUser.role,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.text) {
          return {
            id: `ai-${Date.now()}`,
            sender: 'assistant',
            text: data.text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            metadata: data.metadata,
          };
        }
      }
    } catch {
      // Fallback to deterministic local synthesizer
    }

    return this.generateGroundedResponse(query, currentUser);
  }

  /**
   * Function 1: askAssistant
   */
  static async askAssistant(query: string, currentUser: User): Promise<AIChatMessage> {
    return this.askCapacityAI(query, currentUser);
  }

  /**
   * Function 2: generateLearningPlan
   */
  static async generateLearningPlan(currentUser: User, focusArea?: string): Promise<AIChatMessage> {
    const query = focusArea
      ? `Generate a 30-day structured learning plan focusing on ${focusArea}.`
      : `Generate my personalized 30-day capacity building roadmap.`;
    return this.askCapacityAI(query, currentUser);
  }

  /**
   * Function 3: explainRecommendation
   */
  static async explainRecommendation(courseId: string, currentUser: User): Promise<AIChatMessage> {
    const course = CourseService.getCourseById(courseId);
    const courseTitle = course ? course.title : 'Selected Course';
    const query = `Explain why "${courseTitle}" is recommended for me and how it aligns with my skill gaps.`;
    return this.askCapacityAI(query, currentUser);
  }

  /**
   * Function 4: explainAssessment
   */
  static async explainAssessment(assessmentId: string, currentUser: User): Promise<AIChatMessage> {
    const assessment = AssessmentService.getAssessmentById(assessmentId);
    const title = assessment ? assessment.title : 'Competency Assessment';
    const query = `Provide a preparation guide and explain what competencies and question topics are evaluated in the assessment "${title}".`;
    return this.askCapacityAI(query, currentUser);
  }

  /**
   * Function 5: summarizeResource
   */
  static async summarizeResource(resourceId: string, currentUser: User): Promise<AIChatMessage> {
    const resource = RESOURCES.find((r) => r.id === resourceId);
    const title = resource ? resource.title : 'Technical Document';
    const query = `Summarize the operational key takeaways and meteorological relevance of the resource "${title}".`;
    return this.askCapacityAI(query, currentUser);
  }

  /**
   * Role-Aware Context Builder ensuring strict authorization & data grounding
   */
  private static buildRoleAwareContext(currentUser: User): any {
    const role = currentUser.role;

    if (role === 'TRAINEE') {
      const skillGaps = CompetencyService.getSkillGaps(currentUser.id);
      const enrollments = CourseService.getUserEnrollments(currentUser.id);
      const certs = AssessmentService.getUserCertificates(currentUser.id);
      const recommendations = RecommendationEngine.getCourseRecommendations(currentUser);

      return {
        role: 'TRAINEE',
        traineeDetails: {
          name: currentUser.name,
          designation: currentUser.designation,
          station: currentUser.traineeProfile?.currentStation || currentUser.location,
          cadre: currentUser.traineeProfile?.cadre,
        },
        learningInterests: currentUser.traineeProfile?.learningInterests || [],
        skillGaps: skillGaps.criticalGaps.concat(skillGaps.moderateGaps),
        learningHistory: enrollments.map((e) => ({
          courseId: e.courseId,
          progress: e.progressPercent,
          status: e.status,
        })),
        certificates: certs.map((c) => c.courseTitle),
        topRecommendations: recommendations.slice(0, 3).map((r) => ({
          title: r.course.title,
          matchScore: r.matchScore,
          reasons: r.reasons.map((x) => x.text),
        })),
      };
    }

    if (role === 'TRAINER') {
      const courses = CourseService.getCourses().filter((c) => c.trainerId === currentUser.id);
      return {
        role: 'TRAINER',
        trainerDetails: {
          name: currentUser.name,
          designation: currentUser.designation,
          department: currentUser.department,
          specialization: currentUser.trainerProfile?.specialization || [],
          yearsOfExperience: currentUser.trainerProfile?.yearsOfExperience,
        },
        authoredCourses: courses.map((c) => ({
          id: c.id,
          title: c.title,
          modulesCount: c.modules?.length || 0,
          enrolledCount: c.enrolledCount,
        })),
        resources: RESOURCES.slice(0, 5).map((r) => ({ title: r.title, category: r.category })),
        authorizedTraineeStats: {
          totalTraineesMentored: currentUser.trainerProfile?.totalTraineesTrained || 45,
          averageRating: currentUser.trainerProfile?.averageRating || 4.9,
        },
      };
    }

    if (role === 'ADMIN') {
      const allCourses = CourseService.getCourses();
      const allCerts = AssessmentService.getAllCertificates();
      return {
        role: 'ADMIN',
        adminDetails: {
          name: currentUser.name,
          designation: currentUser.designation,
          organization: 'Ministry of Earth Sciences & India Meteorological Department',
        },
        aggregatePlatformStats: {
          totalTrainees: 1240,
          activeCourses: allCourses.length,
          totalCertificatesIssued: allCerts.length + 310,
          averageCompetencyScore: '84.6%',
          rmcsCovered: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Guwahati', 'Nagpur'],
        },
        competencyDemand: [
          { competency: 'Numerical Weather Prediction (NWP)', demandIndex: '94%' },
          { competency: 'Dual-Pol Doppler Radar Data Analysis', demandIndex: '89%' },
          { competency: 'Satellite Meteorology (INSAT-3DR)', demandIndex: '82%' },
        ],
        trainerAvailabilityCount: 18,
      };
    }

    return { role: 'GUEST' };
  }

  /**
   * Local deterministic knowledge synthesizer fallback when API key is not present
   */
  private static generateGroundedResponse(query: string, currentUser: User): AIChatMessage {
    const q = query.toLowerCase();

    if (q.includes('learn next') || q.includes('study') || q.includes('recommend')) {
      const recs = RecommendationEngine.getCourseRecommendations(currentUser);
      const top = recs[0];
      return {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: `Based on your verified profile as a **${currentUser.designation}** at ${currentUser.traineeProfile?.currentStation || currentUser.location}, I recommend:\n\n**${top.course.title}** (${top.matchScore}% Match).\n\n**Key Reasons:**\n${top.reasons.map((r) => `✓ ${r.text}`).join('\n')}\n\nTaught by ${top.course.trainerName}. Would you like me to open the syllabus?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        metadata: {
          recommendationMatch: top.matchScore,
          reasons: top.reasons.map((r) => r.text),
          suggestedActions: [{ label: 'View Course Syllabus', action: 'view_course_ml' }],
        },
      };
    }

    if (q.includes('learning plan') || q.includes('roadmap') || q.includes('30-day')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: `Here is your customized **30-Day Capacity Building Roadmap**:\n\n1. **Week 1 (Days 1–7)**: Gridded meteorological dataset ingestion (NetCDF4, GRIB2 via Python Xarray).\n2. **Week 2 (Days 8–14)**: Dual-polarization Doppler radar ZDR & RHOHV velocity analysis.\n3. **Week 3 (Days 15–21)**: NWP physics parameterizations & WRF boundary layer setups.\n4. **Week 4 (Days 22–30)**: Competency evaluation and digital credential issuance.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    }

    return {
      id: `ai-${Date.now()}`,
      sender: 'assistant',
      text: `Hello ${currentUser.name}. I am **Capacity AI**, your role-authenticated intelligence layer for CAPACITY CONNECT (MoES & IMD).\n\nI am actively monitoring your permissions as **${currentUser.role}**. How may I assist with your meteorological training, course navigation, or competency gap analysis today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      metadata: {
        suggestedActions: [
          { label: 'What should I learn next?', action: 'query_learn_next' },
          { label: 'Generate 30-day learning plan', action: 'query_learning_plan' },
          { label: 'Analyze my skill gaps', action: 'query_skill_gaps' },
        ],
      },
    };
  }
}
