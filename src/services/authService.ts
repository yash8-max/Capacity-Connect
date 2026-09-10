import { User, UserRole } from '../types';
import { INITIAL_USERS } from '../data/mockData';

const CURRENT_USER_KEY = 'capacity_connect_current_user';

export class AuthService {
  static getCurrentUser(): User {
    try {
      const stored = localStorage.getItem(CURRENT_USER_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}
    // Default to Trainee Priya Sharma
    return INITIAL_USERS.find((u) => u.id === 'trainee-1') || INITIAL_USERS[0];
  }

  static setCurrentUser(user: User): void {
    try {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } catch {}
  }

  static loginAsRole(role: UserRole): User {
    let targetUser: User | undefined;
    if (role === 'ADMIN') {
      targetUser = INITIAL_USERS.find((u) => u.role === 'ADMIN');
    } else if (role === 'TRAINER') {
      targetUser = INITIAL_USERS.find((u) => u.id === 'trainer-1'); // Dr. Rajesh Kumar
    } else {
      targetUser = INITIAL_USERS.find((u) => u.id === 'trainee-1'); // Priya Sharma
    }

    if (!targetUser) targetUser = INITIAL_USERS[0];
    this.setCurrentUser(targetUser);
    return targetUser;
  }

  static loginWithCredentials(email: string, _password: string): { success: boolean; user?: User; error?: string } {
    const user = INITIAL_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      this.setCurrentUser(user);
      return { success: true, user };
    }
    return { success: false, error: 'Invalid institutional credentials for IMD / MoES portal' };
  }

  static logout(): void {
    try {
      localStorage.removeItem(CURRENT_USER_KEY);
    } catch {}
  }
}
