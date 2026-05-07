export function formatJsonResponse(streakData, t) {
  
  const title = t('labels.title');
  const currentLabel = t('labels.currentStreak');
  const longestLabel = t('labels.longestStreak');
  const totalLabel = t('labels.totalContributions');


    return {
        current_streak: streakData.currentStreak,
        longest_streak: streakData.longestStreak,
        total_contributions: streakData.totalContributions,
        first_contribution_date: streakData.firstContributionDate,
        last_contribution_date: streakData.lastContributionDate,

    labels: {
    title: t('labels.title'),
    current_streak: t('labels.currentStreak'),
    longest_streak: t('labels.longestStreak'),
    total_contributions: t('labels.totalContributions')
  }    
    };
}