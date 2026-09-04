vi.mock('../../lib/github/mappers/mapGitHubCommits.js', () => ({
    mapGitHubCommits: vi.fn()
}));

vi.mock('../../lib/github/mappers/mapGitHubPrs.js', () => ({
    mapGitHubPrs: vi.fn()
}));

vi.mock('../../lib/github/mappers/mapGitHubIssues.js', () => ({
    mapGitHubIssues: vi.fn()
}));

vi.mock('../../lib/github/mappers/mapGitHubStars.js', () => ({
    mapGitHubStars: vi.fn()
}));

vi.mock('../../lib/github/mappers/mapGitHubContributions.js', () => ({
    mapGitHubContributions: vi.fn()
}));


import { describe, it, expect, afterEach, vi} from 'vitest';
import { mapGitHubActivity } from '../../lib/github/githubMapper.js';
import { mapGitHubCommits } from '../../lib/github/mappers/mapGitHubCommits.js';
import { mapGitHubPrs } from '../../lib/github/mappers/mapGitHubPrs.js';
import { mapGitHubIssues } from '../../lib/github/mappers/mapGitHubIssues.js';
import { mapGitHubStars } from '../../lib/github/mappers/mapGitHubStars.js';
import { mapGitHubContributions } from '../../lib/github/mappers/mapGitHubContributions.js';    


afterEach(() => {
  vi.restoreAllMocks();
});

describe('mapGitHubActivity', () => {
    it('should return default values when activityData is null', () => {
        const result = mapGitHubActivity(null);

        expect(result).toEqual({
            commits: [],
            pullRequests: [],
            issues: [],
            stars: 0,
            contributions: []
        });
    });

    it('should call mapping functions and return mapped activity when activityData is provided', () => {
        const activityData = {
            commits: { any: "thing" },
            pullRequests: { any: "thing" },
            issues: { any: "thing" },
            stars: 5,
            contributions: { any: "thing" }
        };

        mapGitHubCommits.mockReturnValue([{ date: "2026-08-01" }]);
        mapGitHubPrs.mockReturnValue([{ date: "2026-08-02" }]);
        mapGitHubIssues.mockReturnValue([{ date: "2026-08-03" }]);
        mapGitHubStars.mockReturnValue(5);
        mapGitHubContributions.mockReturnValue([{ date: "2026-08-04", contributionCount: 10 }]);

        const result = mapGitHubActivity(activityData);
        
        expect(mapGitHubCommits).toHaveBeenCalledWith(activityData.commits);
        expect(result.commits).toEqual([{ date: "2026-08-01" }]);
        expect(mapGitHubPrs).toHaveBeenCalledWith(activityData.pullRequests);
        expect(result.pullRequests).toEqual([{ date: "2026-08-02" }]);
        expect(mapGitHubIssues).toHaveBeenCalledWith(activityData.issues);
        expect(result.issues).toEqual([{ date: "2026-08-03" }]);
        expect(mapGitHubStars).toHaveBeenCalledWith(activityData.stars);
        expect(result.stars).toEqual(5);
        expect(mapGitHubContributions).toHaveBeenCalledWith(activityData.contributions);
        expect(result.contributions).toEqual([{ date: "2026-08-04", contributionCount: 10 }]);
        });
    });
    