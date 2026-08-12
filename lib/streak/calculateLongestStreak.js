export function calculateLongestStreak(sorted) {
  if (!Array.isArray(sorted) || sorted.length === 0) {
    return { start: null, end: null, length: 0 };
  }

  let longestStreak = { start: null, end: null, length: 0 };
  let tempStreakStart = null;
  let tempStreakLength = 0;

  for (const day of sorted) {
    const count = day.count || 0;

    if (count > 0) {
      if (tempStreakLength === 0) {
        tempStreakStart = day.date;
      }

      tempStreakLength++;

      if (tempStreakLength > longestStreak.length) {
        longestStreak = {
          start: tempStreakStart,
          end: day.date,
          length: tempStreakLength
        };
      }
    } else {
      tempStreakLength = 0;
      tempStreakStart = null;
    }
  }

  return longestStreak;
}