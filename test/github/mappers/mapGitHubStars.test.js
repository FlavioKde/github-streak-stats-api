import { describe, it, expect } from 'vitest';
import { mapGitHubStars } from '../../../lib/github/mappers/mapGitHubStars.js';

describe('mapGitHubStars', () => {
    it('should return 0 when starsData is null', () => {
        const result = mapGitHubStars(null);
        expect(result).toEqual(0);
    });

    it('should return 0 when nodes is missing', () => {
        const starsData = {};
        const result = mapGitHubStars(starsData);
        expect(result).toEqual(0);
    });

    it('should map stars data correctly', () => {
        const starsData = {
            nodes: [
                {
                    stargazerCount: 5
                },
                {
                    stargazerCount: 10
                }
            ]
        };
        const result = mapGitHubStars(starsData);
        expect(result).toEqual(15);
    });
});
