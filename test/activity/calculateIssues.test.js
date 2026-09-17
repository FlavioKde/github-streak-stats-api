import { describe, it, expect } from 'vitest';
import { calculateIssues } from '../../lib/activity/calculateIssues.js';

describe('calculateIssues', () => {
    it('should return an empty object when issues is not an array', () => {
        const result = calculateIssues(null);
        expect(result).toEqual({});
    });

    it('should return an empty object when issues is an empty array', () => {
        const result = calculateIssues([]);
        expect(result).toEqual({});
    });

    it('should return the count of issues when issues is a non-empty array', () => {
        const issues = [{ date: '2023-01-01' }, { date: '2023-01-02' }];
        const result = calculateIssues(issues);
        expect(result).toEqual({ count: 2 });
    });

    it('should return the count of issues when issues has one element', () => {
        const issues = [{ date: '2023-01-01' }];
        const result = calculateIssues(issues);
        expect(result).toEqual({ count: 1 });
    });

    it('should return the count of issues when issues has multiple elements, in the same day', () => {
        const issues = [
            { date: '2023-01-01' },
            { date: '2023-01-01' },
            { date: '2023-01-01' }
        ];
        const result = calculateIssues(issues);
        expect(result).toEqual({ count: 3 });
    });

});