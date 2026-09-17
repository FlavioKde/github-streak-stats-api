import { describe, it, expect } from 'vitest';
import { calculatePullRequests } from '../../lib/activity/calculatePullRequest.js';

describe('calculatePullRequests', () => {
    it('should return an empty object when sorted is not an array', () => {
        const result = calculatePullRequests(null);
        expect(result).toEqual({});
    });

    it('should return an empty object when sorted is an empty array', () => {
        const result = calculatePullRequests([]);
        expect(result).toEqual({});
    });

    it('should return the count of pull requests when sorted is a non-empty array', () => {
        const sorted = [{ date: '2023-01-01' }, { date: '2023-01-02' }];
        const result = calculatePullRequests(sorted);
        expect(result).toEqual({ count: 2 });
    });

    it('should return the count of pull requests when sorted has one element', () => {
        const sorted = [{ date: '2023-01-01' }];
        const result = calculatePullRequests(sorted);
        expect(result).toEqual({ count: 1 });
    });

    it('should return the count of pull requests when sorted has multiple elements, in the same day', () => {
        const sorted = [
            { date: '2023-01-01' },
            { date: '2023-01-01' },
            { date: '2023-01-01' }
        ];
        const result = calculatePullRequests(sorted);
        expect(result).toEqual({ count: 3 });
    });
})