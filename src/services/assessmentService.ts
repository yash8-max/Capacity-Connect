import { Assessment, AssessmentAttempt, Certificate } from '../types';
import { ASSESSMENTS, CERTIFICATES } from '../data/mockData';
import { CompetencyService } from './competencyService';

const ASSESSMENTS_KEY = 'capacity_connect_assessments';
const CERTIFICATES_KEY = 'capacity_connect_certificates';

export class AssessmentService {
  static getAllAssessments(): Assessment[] {
    return ASSESSMENTS;
  }

  static getAssessments(): Assessment[] {
    return ASSESSMENTS;
  }

  static getAssessmentByCourseId(courseId: string): Assessment | undefined {
    return ASSESSMENTS.find((a) => a.courseId === courseId);
  }

  static getAssessmentForCourse(courseId: string): Assessment | undefined {
    return this.getAssessmentByCourseId(courseId);
  }

  static getAssessmentById(id: string): Assessment | undefined {
    return ASSESSMENTS.find((a) => a.id === id);
  }

  static getUserCertificates(traineeId: string): Certificate[] {
    return this.getAllCertificates().filter((c) => c.traineeId === traineeId);
  }

  static getCertificatesForUser(traineeId: string): Certificate[] {
    return this.getUserCertificates(traineeId);
  }

  static submitAssessment(
    assessmentId: string,
    traineeId: string,
    traineeName: string,
    traineeDesignation: string,
    traineeStation: string,
    answers: { [questionId: string]: number }
  ): { attempt: AssessmentAttempt; certificate?: Certificate } {
    const assessment = this.getAssessmentById(assessmentId);
    if (!assessment) {
      throw new Error('Assessment not found');
    }

    let correctCount = 0;
    assessment.questions.forEach((q) => {
      if (answers[q.id] === q.correctOptionIndex) {
        correctCount += 1;
        // Boost competency score
        CompetencyService.updateUserScore(q.competencyId, 5);
      }
    });

    const scorePercent = Math.round((correctCount / assessment.questions.length) * 100);
    const passed = scorePercent >= assessment.passingScorePercent;

    const attempt: AssessmentAttempt = {
      id: `att-${Date.now()}`,
      assessmentId,
      traineeId,
      scorePercent,
      passed,
      submittedAt: new Date().toISOString(),
      answers,
      feedback: passed
        ? `Congratulations! You demonstrated proficiency (${scorePercent}%) in ${assessment.courseTitle}. Official certificate generated.`
        : `Score: ${scorePercent}%. Minimum passing requirement is ${assessment.passingScorePercent}%. Review modules and re-attempt.`,
    };

    let certificate: Certificate | undefined;

    if (passed) {
      certificate = {
        id: `cert-gen-${Date.now()}`,
        certificateNumber: `IMD-CC-2026-${Math.floor(100000 + Math.random() * 900000)}`,
        traineeId,
        traineeName,
        traineeDesignation,
        traineeStation,
        courseId: assessment.courseId,
        courseTitle: assessment.courseTitle,
        trainerName: 'Dr. Rajesh Kumar',
        trainerDesignation: 'Scientist-G & Head of NWP, IMD New Delhi',
        issueDate: new Date().toISOString().split('T')[0],
        finalScore: scorePercent,
        verificationHash: Array.from({ length: 44 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        directorGeneralName: 'Dr. M. Ravichandran',
      };

      const certs = this.getAllCertificates();
      certs.unshift(certificate);
      try {
        localStorage.setItem(CERTIFICATES_KEY, JSON.stringify(certs));
      } catch {}
    }

    return { attempt, certificate };
  }

  static getAllCertificates(): Certificate[] {
    try {
      const stored = localStorage.getItem(CERTIFICATES_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return CERTIFICATES;
  }

  static getCertificateById(id: string): Certificate | undefined {
    const certs = this.getAllCertificates();
    return certs.find((c) => c.id === id || c.certificateNumber === id);
  }
}
