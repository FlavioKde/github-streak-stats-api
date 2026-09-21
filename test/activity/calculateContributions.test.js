import { describe, it, expect } from 'vitest';
import { calculateContributions } from '../../lib/activity/calculateContributions'; 


describe('calculateContributions', () => {
    it('should return an empty object when contributions is null', () => {
        const result = calculateContributions(null);
        expect(result).toEqual({});
    });

    it('should return an empty object when contributions is undefined', () => {
        const result = calculateContributions(undefined);
        expect(result).toEqual({});
    });

    it('should return an empty object when contributions is an empty array', () => {
        const result = calculateContributions([]);
        expect(result).toEqual({});
    });

    it('should return the total count of contributions when contributions is a valid array', () => {
        const contributions = [
            { contributionCount: 5 },
            { contributionCount: 10 },
            { contributionCount: 15 }
        ];
        const result = calculateContributions(contributions);
        expect(result).toEqual({ count: 30 });
    });
});