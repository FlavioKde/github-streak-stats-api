import { describe, it, expect } from 'vitest';
import { mapGitHubPrs } from '../../../lib/github/mappers/mapGitHubPrs.js';

describe('mapGitHubPrs', () => {
    it('should return an empty array when prsData is null', () => {
        const result = mapGitHubPrs(null);
        expect(result).toEqual([]);
    });

    it('should return an empty array when nodes is missing', () => {
        const prsData = {};
        const result = mapGitHubPrs(prsData);
        expect(result).toEqual([]);
    });

    it('should map PRs data correctly', () => {
        const prsData = {
            nodes: [
                {   
                    createdAt: '2023-01-01T00:00:00Z'
                }
            ]
        };
        const result = mapGitHubPrs(prsData);
        expect(result).toEqual([
            {
                date: '2023-01-01T00:00:00Z'
            }
        ]);
    });
});