import { mapGitHubCommits} from "./mappers/mapGitHubCommits.js";
import { mapGitHubPrs } from "./mappers/mapGitHubPrs.js";
import { mapGitHubIssues } from "./mappers/mapGitHubIssues.js";
import { mapGitHubStars } from "./mappers/mapGitHubStars.js";
import { mapGitHubContribution } from "./mappers/mapGitHubContribution.js";

export function mapGitHubContributions(userData) {
  if (!userData?.contributionsCollection?.contributionCalendar?.weeks) {
    return [];
  }

  const weeks = userData.contributionsCollection.contributionCalendar.weeks;

  const contributions = [];

  for (const week of weeks) {
    for (const day of week.contributionDays) {
      contributions.push({
        date: day.date,
        contributionCount: day.contributionCount
      });
    }
  }

  return contributions.sort((a, b) => new Date(a.date) - new Date(b.date));
}

export function mapGitHubLanguages(languagesData) { 
  if (!languagesData?.edges) {
    return [];
  }

  return languagesData.edges.map(edge => ({
    name: edge.node.name,
    color: edge.node.color,
    size: edge.size
  }));
}

export function mapGitHubActivity(activityData) {
  if (!activityData) {
    return {
      commits: [],
      pullRequests: [],
      issues: [],
      stars: 0,
      contributions: []
    };
  }

  return {
    commits: mapGitHubCommits(activityData.commits),
    pullRequests: mapGitHubPrs(activityData.pullRequests),
    issues: mapGitHubIssues(activityData.issues),
    stars: mapGitHubStars(activityData.stars),
    contributions: mapGitHubContribution(activityData.contributions)
  };
}