import {describe, expect, it} from 'vitest';
import {mapGitHubCommits} from '../../../lib/github/mappers/mapGitHubCommits.js';

describe('mapGitHubCommits', () => {
    it('should return an empty array when commitsData is null', () => {
        const result = mapGitHubCommits(null);
        expect(result).toEqual([]);
    });

    it('should return an empty array when commitContributionsByRepository is missing', () => {
        const commitsData = {};
        const result = mapGitHubCommits(commitsData);
        expect(result).toEqual([]);
    });

    it('should map commits data correctly', () => {
        const commitsData = {
            commitContributionsByRepository: [
                {
                    contributions: {
                        nodes: [
                            {
                                occurredAt: '2023-01-01T00:00:00Z'
                            },
                            {
                                occurredAt: '2023-01-02T00:00:00Z'
                            }
                        ]
                    }
                },
                {
                    contributions: {
                        nodes: [
                            {
                                occurredAt: '2023-01-03T00:00:00Z'
                            }
                        ]
                    }
                }
            ]
        };
        const result = mapGitHubCommits(commitsData);
        expect(result).toEqual([
            {
                date: '2023-01-01T00:00:00Z'
            },
            {
                date: '2023-01-02T00:00:00Z'
            },
            {
                date: '2023-01-03T00:00:00Z'
            }
        ]);
    });
});