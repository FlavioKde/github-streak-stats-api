import { calculateCommits } from './calculateCommits.js';
import { calculatePullRequest } from './calculatePullRequest.js';
import { calculateIssues } from './calculateIssues.js';
import { calculateContributions } from './calculateContributions.js';

export function calculateActivity(activity) {
    if (!activity) {
        return {
            commits: {},
            pullRequests: {},
            issues: {},
            stars: 0,
            contributions: {}
        };
    }
    return {
        commits: calculateCommits(activity.commits),
        pullRequests: calculatePullRequest(activity.pullRequests),
        issues: calculateIssues(activity.issues),
        stars: activity.stars || 0,
        contributions: calculateContributions(activity.contributions)
    };
};