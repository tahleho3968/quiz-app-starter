import { useState } from "react";
import type { Category } from "../types/quiz";

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface BadgeCriteria {
  id: string;
  check: (stats: BadgeStats) => boolean;
}

export interface BadgeStats {
  score: number;
  correctCount: number;
  totalQuestions: number;
  bestStreak: number;
  averageTime: number;
  categoryBreakdown: { category: Category; correct: number; total: number }[];
  perfectCategories: Category[];
  comeback: boolean;
}

const BADGE_DEFINITIONS: Badge[] = [
  {
    id: "first-quiz",
    name: "First Steps",
    icon: "👣",
    description: "Completed your first quiz!",
    unlocked: false,
  },
  {
    id: "perfectionist",
    name: "Perfectionist",
    icon: "💯",
    description: "Scored 100% on a quiz",
    unlocked: false,
  },
  {
    id: "speed-demon",
    name: "Speed Demon",
    icon: "⚡",
    description: "Average answer time under 5 seconds",
    unlocked: false,
  },
  {
    id: "hot-streak",
    name: "Hot Streak",
    icon: "🔥",
    description: "Got 10+ correct in a row",
    unlocked: false,
  },
  {
    id: "git-master",
    name: "Git Master",
    icon: "📚",
    description: "100% correct on Git questions",
    unlocked: false,
  },
  {
    id: "react-pro",
    name: "React Pro",
    icon: "⚛️",
    description: "100% correct on React questions",
    unlocked: false,
  },
  {
    id: "typescript-guru",
    name: "TypeScript Guru",
    icon: "🦕",
    description: "100% correct on TypeScript questions",
    unlocked: false,
  },
  {
    id: "dev-tools-master",
    name: "Dev Tools Master",
    icon: "🔧",
    description: "100% correct on Tooling questions",
    unlocked: false,
  },
  {
    id: "deployment-pro",
    name: "Deployment Pro",
    icon: "🚀",
    description: "100% correct on Deployment questions",
    unlocked: false,
  },
  {
    id: "stylist",
    name: "CSS Stylist",
    icon: "🎨",
    description: "100% correct on HTML/CSS questions",
    unlocked: false,
  },
  {
    id: "comeback-kid",
    name: "Comeback Kid",
    icon: "💪",
    description: "Recovered from mistakes to finish strong",
    unlocked: false,
  },
  {
    id: "marathon-runner",
    name: "Marathon Runner",
    icon: "🏃",
    description: "Completed 30+ questions in one session",
    unlocked: false,
  },
  {
    id: "scholar",
    name: "Scholar",
    icon: "🎓",
    description: "Answered 100 questions total",
    unlocked: false,
  },
];

const BADGE_KEY = "aca_quiz_badges";

export function useBadges() {
  const [badges, setBadges] = useState<Badge[]>(() => {
    try {
      const saved = localStorage.getItem(BADGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return BADGE_DEFINITIONS.map((def) => {
          const existing = parsed.find((b: Badge) => b.id === def.id);
          return existing || def;
        });
      }
    } catch {
      // ignore
    }
    return BADGE_DEFINITIONS;
  });

  const [newBadge, setNewBadge] = useState<Badge | null>(null);

  const unlockBadge = (badgeId: string) => {
    setBadges((prev) => {
      const updated = prev.map((b) =>
        b.id === badgeId && !b.unlocked
          ? { ...b, unlocked: true, unlockedAt: new Date().toISOString() }
          : b
      );
      const newlyUnlocked = updated.find((b) => b.id === badgeId);
      if (newlyUnlocked?.unlocked) {
        setNewBadge(newlyUnlocked);
        setTimeout(() => setNewBadge(null), 5000);
      }
      localStorage.setItem(BADGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const checkBadges = (stats: BadgeStats) => {
    const toUnlock: string[] = [];

    // First Quiz
    if (stats.totalQuestions > 0 && !badges.find(b => b.id === "first-quiz")?.unlocked) {
      toUnlock.push("first-quiz");
    }

    // Perfectionist
    if (stats.correctCount === stats.totalQuestions && stats.totalQuestions >= 5) {
      toUnlock.push("perfectionist");
    }

    // Speed Demon
    if (stats.averageTime > 0 && stats.averageTime < 5 && stats.totalQuestions >= 5) {
      toUnlock.push("speed-demon");
    }

    // Hot Streak
    if (stats.bestStreak >= 10) {
      toUnlock.push("hot-streak");
    }

    // Category Masters - Fixed mapping!
    const badgeMap: Record<Category, string | null> = {
      git: "git-master",
      react: "react-pro",
      typescript: "typescript-guru",
      tooling: "dev-tools-master",
      deployment: "deployment-pro",
      "html-css": "stylist",
    };

    stats.categoryBreakdown.forEach((cat) => {
      if (cat.correct === cat.total && cat.total >= 3) {
        const badgeId = badgeMap[cat.category];
        if (badgeId) {
          toUnlock.push(badgeId);
        }
      }
    });

    // Comeback Kid
    if (stats.comeback) {
      toUnlock.push("comeback-kid");
    }

    // Marathon Runner
    if (stats.totalQuestions >= 30) {
      toUnlock.push("marathon-runner");
    }

    // Scholar - track total questions answered across sessions
    const totalAnswered = parseInt(localStorage.getItem("aca_total_answered") || "0");
    if (totalAnswered >= 100) {
      toUnlock.push("scholar");
    }

    // Unlock all eligible badges
    toUnlock.forEach((id) => {
      const badge = badges.find(b => b.id === id);
      if (badge && !badge.unlocked) {
        unlockBadge(id);
      }
    });
  };

  const updateTotalAnswered = (count: number) => {
    const current = parseInt(localStorage.getItem("aca_total_answered") || "0");
    localStorage.setItem("aca_total_answered", String(current + count));
  };

  const resetBadges = () => {
    localStorage.removeItem(BADGE_KEY);
    localStorage.removeItem("aca_total_answered");
    setBadges(BADGE_DEFINITIONS);
  };

  const getUnlockedCount = () => badges.filter(b => b.unlocked).length;
  const getTotalBadges = () => badges.length;

  return {
    badges,
    newBadge,
    checkBadges,
    updateTotalAnswered,
    resetBadges,
    getUnlockedCount,
    getTotalBadges,
    clearNewBadge: () => setNewBadge(null),
  };
}