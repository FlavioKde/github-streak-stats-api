vi.mock('../../lib/activity/calculateCommits.js', () => ({
  calculateCommits: vi.fn()
}));
vi.mock('../../lib/activity/calculatePullRequest.js', () => ({
  calculatePullRequest: vi.fn()
}));
vi.mock('../../lib/activity/calculateIssues.js', () => ({
  calculateIssues: vi.fn()
}));
vi.mock('../../lib/activity/calculateContributions.js', () => ({
  calculateContributions: vi.fn()
}));

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { calculateActivity } from '../../lib/activity/calculateActivity.js';
import { calculateCommits } from '../../lib/activity/calculateCommits.js';
import { calculatePullRequest } from '../../lib/activity/calculatePullRequest.js';
import { calculateIssues } from '../../lib/activity/calculateIssues.js';
import { calculateContributions } from '../../lib/activity/calculateContributions.js';

describe('calculateActivity', () => {


    beforeEach(() => {
        vi.clearAllMocks();
    });
    
    it('should return a default activity object when no activity is provided', () => {
        const result = calculateActivity();
        expect(result).toEqual({
            commits: {},
            pullRequests: {},
            issues: {},
            stars: 0,
            contributions: {}
        });
    });

    it('should return a default activity object when an empty activity is provided', () => {

        calculateCommits.mockReturnValue({});
        calculatePullRequest.mockReturnValue({});
        calculateIssues.mockReturnValue({});
        calculateContributions.mockReturnValue({});

        const result = calculateActivity({});
        expect(result).toEqual({
            commits: {},
            pullRequests: {},
            issues: {},
            stars: 0,
            contributions: {}
        });
    });

    it('should call the respective calculation functions with the provided activity data', () => {
        const activity = {
            commits: [{ date: '2023-01-01' }],
            pullRequests: [{ date: '2023-01-02' }],
            issues: [{ date: '2023-01-03' }],
            stars: 5,
            contributions: [{ date: '2023-01-04' }]
        };

        calculateCommits.mockReturnValue({ count: 1 });
        calculatePullRequest.mockReturnValue({ count: 1 });
        calculateIssues.mockReturnValue({ count: 1 });
        calculateContributions.mockReturnValue({ count: 1 });

        const result = calculateActivity(activity);
        expect(result).toEqual({
            commits: { count: 1 },
            pullRequests: { count: 1 },
            issues: { count: 1 },
            stars: 5,
            contributions: { count: 1 }
        });

        expect(calculateCommits).toHaveBeenCalledWith(activity.commits);
        expect(calculatePullRequest).toHaveBeenCalledWith(activity.pullRequests);
        expect(calculateIssues).toHaveBeenCalledWith(activity.issues);
        expect(calculateContributions).toHaveBeenCalledWith(activity.contributions);
    });
});
