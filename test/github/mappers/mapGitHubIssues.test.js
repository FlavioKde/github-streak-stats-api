import { describe, it, expect } from 'vitest';
import { mapGitHubIssues } from '../../../lib/github/mappers/mapGitHubIssues.js';

describe('mapGitHubIssues', () => {
    it('should return an empty array when issuesData is null', () => {
        const result = mapGitHubIssues(null);
        expect(result).toEqual([]);
    });

    it('should return an empty array when nodes is missing', () => {
        const issuesData = {};
        const result = mapGitHubIssues(issuesData);
        expect(result).toEqual([]);
    });

    it('should map issues data correctly', () => {
        const issuesData = {
            nodes: [    
                {
                    createdAt: '2023-01-01T00:00:00Z'
                },
                {
                    createdAt: '2023-01-02T00:00:00Z'
                }
            ]
        };
        const result = mapGitHubIssues(issuesData);
        expect(result).toEqual([
            {
                date: '2023-01-01T00:00:00Z'
            },
            {
                date: '2023-01-02T00:00:00Z'
            }
        ]);
    });
});