import { calculateCurrentStreak } from "./calculateCurrentStreak.js";
import { calculateLongestStreak } from "./calculateLongestStreak.js";

export function calculateStreak(contributions) {
  if (!Array.isArray(contributions) || contributions.length === 0) {
    return {
      totalContributions: 0,
      firstContributionDate: null,
      lastContributionDate: null,
      longestStreak: { start: null, end: null, length: 0 },
      currentStreak: { start: null, end: null, length: 0 }
    };
  }
  // Order contributions by date ascending
  const sorted = contributions
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const currentStreak = calculateCurrentStreak(sorted);  
  const longestStreak = calculateLongestStreak(sorted);

  let totalContributions = 0;
  let firstContributionDate = null;
  let lastContributionDate = null;

  for (const day of sorted) {
    const count = day.count || 0;

    // First and last contribution date
    if (count > 0) {
      if (!firstContributionDate) firstContributionDate = day.date;
      lastContributionDate = day.date;
    }

    totalContributions += count;

  }
    return {
      totalContributions,
      firstContributionDate,
      lastContributionDate,
      longestStreak,
      currentStreak
    };
}