export function mapGitHubContributions(contributionsData) {
  if (!contributionsData?.contributionCalendar?.weeks) {
    return [];
  }

    return contributionsData.contributionCalendar.weeks.flatMap(week => 
      week.contributionDays.map(day => ({
        date: day.date,
        contributionCount: day.contributionCount
      }))
    );
    };

   