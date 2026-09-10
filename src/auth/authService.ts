import { User, UserRole } from '../types';
import { INITIAL_USERS } from '../data/mockData';

const CURRENT_USER_KEY = 'capacity_connect_current_user';
const SESSION_TOKEN_KEY = 'capacity_connect_session_token';

export class AuthService {
  static getCurrentUser(): User | null {
    try {
      const stored = localStorage.getItem(CURRENT_USER_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}
    return null;
  }

  static setCurrentUser(user: User): void {
    try {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      localStorage.setItem(SESSION_TOKEN_KEY, `cc_token_${user.role.toLowerCase()}_${Date.now()}`);
    } catch {}
  }

  static loginAsRole(role: UserRole): User {
    let targetUser: User | undefined;
    if (role === 'ADMIN') {
      targetUser = INITIAL_USERS.find((u) => u.role === 'ADMIN') || INITIAL_USERS[0];
    } else if (role === 'TRAINER') {
      targetUser = INITIAL_USERS.find((u) => u.role === 'TRAINER') || INITIAL_USERS[1];
    } else {
      targetUser = INITIAL_USERS.find((u) => u.role === 'TRAINEE') || INITIAL_USERS.find((u) => u.id === 'trainee-1');
    }

    if (!targetUser) targetUser = INITIAL_USERS[0];
    this.setCurrentUser(targetUser);
    return targetUser;
  }

  static loginWithCredentials(
    email: string,
    pass: string,
    expectedRole?: UserRole
  ): { success: boolean; user?: User; error?: string; roleMismatch?: boolean } {
    const emailLower = email.trim().toLowerCase();

    // Check demo credentials mapping
    let matchedUser: User | undefined;

    if (emailLower === 'admin@capacityconnect.gov.in' || emailLower === 'admin@imd.gov.in') {
      if (pass !== 'Admin@12345' && pass !== 'password') {
        return { success: false, error: 'Invalid password. Hint: Use Admin@12345' };
      }
      matchedUser = INITIAL_USERS.find((u) => u.role === 'ADMIN');
    } else if (emailLower === 'trainer@capacityconnect.gov.in' || emailLower === 'rajesh.kumar@imd.gov.in') {
      if (pass !== 'Trainer@12345' && pass !== 'password') {
        return { success: false, error: 'Invalid password. Hint: Use Trainer@12345' };
      }
      matchedUser = INITIAL_USERS.find((u) => u.role === 'TRAINER');
    } else if (emailLower === 'trainee@capacityconnect.gov.in' || emailLower === 'priya.sharma@imd.gov.in') {
      if (pass !== 'Trainee@12345' && pass !== 'password') {
        return { success: false, error: 'Invalid password. Hint: Use Trainee@12345' };
      }
      matchedUser = INITIAL_USERS.find((u) => u.role === 'TRAINEE');
    } else {
      matchedUser = INITIAL_USERS.find((u) => u.email.toLowerCase() === emailLower);
    }

    if (!matchedUser) {
      return { success: false, error: 'Unable to sign in. Please check your institutional email and password.' };
    }

    // Check role match if expectedRole is provided
    if (expectedRole && matchedUser.role !== expectedRole) {
      return {
        success: false,
        roleMismatch: true,
        user: matchedUser,
        error: `This account belongs to role ${matchedUser.role}, but you attempted sign in via ${expectedRole} portal.`,
      };
    }

    this.setCurrentUser(matchedUser);
    return { success: true, user: matchedUser };
  }

  static logout(): void {
    try {
      localStorage.removeItem(CURRENT_USER_KEY);
      localStorage.removeItem(SESSION_TOKEN_KEY);
    } catch {}
  }
}
