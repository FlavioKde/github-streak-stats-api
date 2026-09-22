import { describe, it, expect } from 'vitest';
import { calculatePullRequest } from '../../lib/activity/calculatePullRequest.js';

describe('calculatePullRequest', () => {
    it('should return an empty object when sorted is not an array', () => {
        const result = calculatePullRequest(null);
        expect(result).toEqual({});
    });

    it('should return an empty object when sorted is an empty array', () => {
        const result = calculatePullRequest([]);
        expect(result).toEqual({});
    });

    it('should return the count of pull requests when sorted is a non-empty array', () => {
        const sorted = [{ date: '2023-01-01' }, { date: '2023-01-02' }];
        const result = calculatePullRequest(sorted);
        expect(result).toEqual({ count: 2 });
    });

    it('should return the count of pull requests when sorted has one element', () => {
        const sorted = [{ date: '2023-01-01' }];
        const result = calculatePullRequest(sorted);
        expect(result).toEqual({ count: 1 });
    });

    it('should return the count of pull requests when sorted has multiple elements, in the same day', () => {
        const sorted = [
            { date: '2023-01-01' },
            { date: '2023-01-01' },
            { date: '2023-01-01' }
        ];
        const result = calculatePullRequest(sorted);
        expect(result).toEqual({ count: 3 });
    });
})