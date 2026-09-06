import { describe, it, expect } from 'vitest';
import { mapGitHubContribution } from '../../../lib/github/mappers/mapGitHubContribution.js';

describe('mapGitHubContribution', () => {
  it('should return an empty array when contributionsData is null', () => {
    const result = mapGitHubContribution(null);
    expect(result).toEqual([]);
  });

    it('should return an empty array when contributionCalendar is missing', () => {
        const contributionsData = {};
        const result = mapGitHubContribution(contributionsData);
        expect(result).toEqual([]);
    });

    it('should map contributions data correctly', () => {
        const contributionsData = {
            contributionCalendar: {
                weeks: [
                    {
                        contributionDays: [
                            {
                                date: '2023-01-01',
                                contributionCount: 5
                            }
                        ]
                    },
                    {
                        contributionDays: [
                            {
                                date: '2023-01-02',
                                contributionCount: 10
                            }
                        ]
                    }
                ]
            }
        };
        const result = mapGitHubContribution(contributionsData);
        expect(result).toEqual([
            {
                date: '2023-01-01',
                contributionCount: 5
            },
            {
                date: '2023-01-02',
                contributionCount: 10
            }
        ]);
    }); 
});