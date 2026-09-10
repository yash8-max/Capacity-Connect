import { Course, CourseEnrollment } from '../types';
import { COURSES, INITIAL_ENROLLMENTS } from '../data/mockData';

const COURSES_STORAGE_KEY = 'capacity_connect_courses';
const ENROLLMENTS_STORAGE_KEY = 'capacity_connect_enrollments';

export class CourseService {
  static getCourses(): Course[] {
    try {
      const stored = localStorage.getItem(COURSES_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return COURSES;
  }

  static getCourseById(id: string): Course | undefined {
    const courses = this.getCourses();
    return courses.find((c) => c.id === id || c.slug === id);
  }

  static getEnrollments(traineeId: string): CourseEnrollment[] {
    try {
      const stored = localStorage.getItem(ENROLLMENTS_STORAGE_KEY);
      if (stored) {
        const all: CourseEnrollment[] = JSON.parse(stored);
        return all.filter((e) => e.traineeId === traineeId);
      }
    } catch {
      // fallback
    }
    return INITIAL_ENROLLMENTS.filter((e) => e.traineeId === traineeId);
  }

  static getUserEnrollments(traineeId: string): CourseEnrollment[] {
    return this.getEnrollments(traineeId);
  }

  static addCourse(course: Course): Course {
    const courses = this.getCourses();
    courses.unshift(course);
    try {
      localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courses));
    } catch {}
    return course;
  }

  static createCourse(courseData: Partial<Course> & { title: string; code: string }): Course {
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      slug: courseData.title.toLowerCase().replace(/\s+/g, '-'),
      code: courseData.code,
      title: courseData.title,
      category: courseData.category || 'General',
      level: courseData.level || 'Intermediate',
      description: courseData.description || '',
      thumbnail: courseData.thumbnail || 'https://images.unsplash.com/photo-1590055531615-f16d36ffe8ec?w=800&auto=format&fit=crop&q=80',
      durationHours: courseData.durationHours || 10,
      modulesCount: courseData.modulesCount || 4,
      enrolledCount: 0,
      trainerId: courseData.trainerId || 'trainer-rajesh',
      trainerName: courseData.trainerName || 'Dr. Rajesh Kumar',
      trainerTitle: courseData.trainerTitle || 'Scientist-G',
      trainerAvatar: courseData.trainerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      learningOutcomes: courseData.learningOutcomes || ['Master operational meteorological workflows', 'Analyze real-time atmospheric datasets'],
      competenciesTaught: courseData.competenciesTaught || [],
      prerequisites: courseData.prerequisites || [],
      rating: 5.0,
      reviewCount: 1,
      isNew: true,
      modules: courseData.modules || [],
    };
    return this.addCourse(newCourse);
  }

  static completeLesson(traineeId: string, courseId: string, lessonId: string): void {
    const enrollments = this.getAllEnrollments();
    let enrollment = enrollments.find((e) => e.courseId === courseId && e.traineeId === traineeId);
    if (!enrollment) {
      enrollment = this.enrollInCourse(courseId, traineeId);
    }
    this.updateProgress(enrollment.id, lessonId, true);
  }

  static enrollInCourse(courseId: string, traineeId: string): CourseEnrollment {
    const enrollments = this.getAllEnrollments();
    const existing = enrollments.find((e) => e.courseId === courseId && e.traineeId === traineeId);
    if (existing) return existing;

    const newEnrollment: CourseEnrollment = {
      id: `enr-${Date.now()}`,
      courseId,
      traineeId,
      enrolledDate: new Date().toISOString().split('T')[0],
      progressPercent: 0,
      completedModules: [],
      status: 'In Progress',
      lastAccessed: new Date().toISOString(),
    };

    enrollments.push(newEnrollment);
    try {
      localStorage.setItem(ENROLLMENTS_STORAGE_KEY, JSON.stringify(enrollments));
    } catch {
      // storage unavailable
    }
    return newEnrollment;
  }

  static updateProgress(enrollmentId: string, moduleId: string, isCompleted: boolean): CourseEnrollment | null {
    const enrollments = this.getAllEnrollments();
    const index = enrollments.findIndex((e) => e.id === enrollmentId);
    if (index === -1) return null;

    const enrollment = { ...enrollments[index] };
    const course = this.getCourseById(enrollment.courseId);
    const totalModules = course ? Math.max(1, course.modules.length || course.modulesCount) : 5;

    const completedSet = new Set(enrollment.completedModules);
    if (isCompleted) {
      completedSet.add(moduleId);
    } else {
      completedSet.delete(moduleId);
    }

    enrollment.completedModules = Array.from(completedSet);
    enrollment.progressPercent = Math.min(100, Math.round((enrollment.completedModules.length / totalModules) * 100));
    enrollment.status = enrollment.progressPercent === 100 ? 'Completed' : 'In Progress';
    enrollment.lastAccessed = new Date().toISOString();

    enrollments[index] = enrollment;
    try {
      localStorage.setItem(ENROLLMENTS_STORAGE_KEY, JSON.stringify(enrollments));
    } catch {}

    return enrollment;
  }

  private static getAllEnrollments(): CourseEnrollment[] {
    try {
      const stored = localStorage.getItem(ENROLLMENTS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return [...INITIAL_ENROLLMENTS];
  }
}
