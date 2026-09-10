import { Competency, UserCompetencyScore } from '../types';
import { COMPETENCIES, PRIYA_SHARMA_COMPETENCIES } from '../data/mockData';

const USER_COMPETENCIES_KEY = 'capacity_connect_user_competencies';

export class CompetencyService {
  static getAllCompetencies(): Competency[] {
    return COMPETENCIES;
  }

  static getUserCompetencies(_userId: string): UserCompetencyScore[] {
    try {
      const stored = localStorage.getItem(USER_COMPETENCIES_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return PRIYA_SHARMA_COMPETENCIES;
  }

  static getSkillGaps(userId: string): {
    criticalGaps: UserCompetencyScore[];
    moderateGaps: UserCompetencyScore[];
    proficientSkills: UserCompetencyScore[];
  } {
    const scores = this.getUserCompetencies(userId);
    const criticalGaps = scores.filter((s) => s.gap >= 30).sort((a, b) => b.gap - a.gap);
    const moderateGaps = scores.filter((s) => s.gap > 0 && s.gap < 30).sort((a, b) => b.gap - a.gap);
    const proficientSkills = scores.filter((s) => s.gap <= 0 || s.currentLevel >= 80).sort((a, b) => b.currentLevel - a.currentLevel);

    return { criticalGaps, moderateGaps, proficientSkills };
  }

  static updateUserScore(competencyId: string, addedPoints: number): UserCompetencyScore[] {
    const scores = this.getUserCompetencies('default');
    const updated = scores.map((s) => {
      if (s.competencyId === competencyId) {
        const newCurrent = Math.min(100, s.currentLevel + addedPoints);
        const newGap = Math.max(0, s.targetLevel - newCurrent);
        let newLabel = s.levelLabel;
        if (newCurrent >= 80) newLabel = 'Advanced';
        else if (newCurrent >= 50) newLabel = 'Intermediate';
        else newLabel = 'Beginner';

        return {
          ...s,
          currentLevel: newCurrent,
          gap: newGap,
          levelLabel: newLabel,
          lastEvaluated: new Date().toISOString().split('T')[0],
        };
      }
      return s;
    });

    try {
      localStorage.setItem(USER_COMPETENCIES_KEY, JSON.stringify(updated));
    } catch {}

    return updated;
  }
}
