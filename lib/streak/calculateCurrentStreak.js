import { isConsecutiveDays } from './isConsecutiveDays.js';

export function calculateCurrentStreak(sorted) {
  if (!Array.isArray(sorted) || sorted.length === 0) {
    return { start: null, end: null, length: 0 };
  }

    let revStreakLength = 0;
    let revStreakEnd = null;
    let revStreakStart = null;
    let prevDate = null;


  // If the last day has zero contributions, current streak is zero
  if (sorted[sorted.length - 1].count === 0) {
    
    return {
      start: null, end: null, length: 0 
    };
  }

  for (let i = sorted.length - 1; i >= 0; i--) {

    if (sorted[i].count > 0 && revStreakLength === 0) {
  
      revStreakEnd = sorted[i].date;
      revStreakStart = sorted[i].date;
      prevDate = sorted[i].date;

      revStreakLength++;

    } else if (revStreakLength > 0) {

    if (sorted[i].count === 0) break;
    
    if (!isConsecutiveDays(sorted[i].date, prevDate)) break;
    
    revStreakStart = sorted[i].date;
    revStreakLength++;
    prevDate = sorted[i].date;
       
    }
      
    }
   
    return {
        start: revStreakStart,
        end: revStreakEnd,
        length: revStreakLength
    };

}