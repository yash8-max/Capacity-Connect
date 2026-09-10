import { UserRole } from '../types';

export type Permission =
  | 'manage_users'
  | 'manage_trainers'
  | 'manage_trainees'
  | 'manage_courses'
  | 'manage_assessments'
  | 'manage_certificates'
  | 'manage_competencies'
  | 'view_analytics'
  | 'manage_announcements'
  | 'manage_achievements'
  | 'manage_settings'
  | 'create_courses'
  | 'edit_courses'
  | 'upload_resources'
  | 'create_questionnaires'
  | 'view_trainees'
  | 'view_performance'
  | 'manage_trainer_library'
  | 'enroll_courses'
  | 'view_courses'
  | 'take_assessments'
  | 'view_results'
  | 'download_resources'
  | 'view_certificates'
  | 'submit_feedback'
  | 'view_recommendations'
  | 'view_competencies';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  ADMIN: [
    'manage_users',
    'manage_trainers',
    'manage_trainees',
    'manage_courses',
    'manage_assessments',
    'manage_certificates',
    'manage_competencies',
    'view_analytics',
    'manage_announcements',
    'manage_achievements',
    'manage_settings',
    'create_courses',
    'edit_courses',
    'upload_resources',
    'create_questionnaires',
    'view_trainees',
    'view_performance',
    'manage_trainer_library',
    'enroll_courses',
    'view_courses',
    'take_assessments',
    'view_results',
    'download_resources',
    'view_certificates',
    'submit_feedback',
    'view_recommendations',
    'view_competencies',
  ],
  TRAINER: [
    'create_courses',
    'edit_courses',
    'upload_resources',
    'create_questionnaires',
    'view_trainees',
    'view_performance',
    'view_analytics',
    'manage_trainer_library',
    'view_courses',
    'download_resources',
    'view_certificates',
    'view_competencies',
  ],
  TRAINEE: [
    'enroll_courses',
    'view_courses',
    'take_assessments',
    'view_results',
    'download_resources',
    'view_certificates',
    'submit_feedback',
    'view_recommendations',
    'view_competencies',
  ],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  const perms = ROLE_PERMISSIONS[role] || [];
  return perms.includes(permission);
}
