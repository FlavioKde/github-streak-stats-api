import { describe, it, expect } from "vitest";
import { calculateCurrentStreak } from "../../lib/streak/calculateCurrentStreak.js";


describe("calculateCurrentStreak", () => {
    it("calculates the current streak correctly", () => {
        const contributions = [
            { date: "2024-01-01", count: 1 },
            { date: "2024-01-02", count: 3 },
            { date: "2024-01-03", count: 3 },
            { date: "2024-01-04", count: 2 },
            { date: "2024-01-05", count: 1 },
        ];
        const result = calculateCurrentStreak(contributions);
        expect(result).toEqual({ start: "2024-01-01", end: "2024-01-05", length: 5 });
    });

    it("calculates the current streak correctly with a break", () => {
        const contributions = [
            { date: "2024-01-01", count: 1 },
            { date: "2024-01-02", count: 0 },
            { date: "2024-01-03", count: 3 },
            { date: "2024-01-04", count: 1 },
        ];
        const result = calculateCurrentStreak(contributions);
        expect(result).toEqual({ start: "2024-01-03", end: "2024-01-04", length: 2 });
    });

    it("returns zero streak when the last day has zero contributions", () => {
        const contributions = [
            { date: "2024-01-01", count: 1 },
            { date: "2024-01-02", count: 3 },
            { date: "2024-01-03", count: 0 },
        ];
        const result = calculateCurrentStreak(contributions);
        expect(result).toEqual({ start: null, end: null, length: 0 });
    });

    it("returns zero streak when there are no contributions", () => {
        const contributions = [];
        const result = calculateCurrentStreak(contributions);
        expect(result).toEqual({ start: null, end: null, length: 0 });
    });

    it("returns only one day streak when there is only one contribution", () => {
        const contributions = [
            { date: "2024-01-01", count: 1 },
        ];
        const result = calculateCurrentStreak(contributions);
        expect(result).toEqual({ start: "2024-01-01", end: "2024-01-01", length: 1 });
    });

    it("returns stops the streak when date is not consecutive", () => {
        const contributions = [
            { date: "2024-01-01", count: 1 },
            { date: "2024-01-02", count: 1 },
            { date: "2024-01-04", count: 1 },
            { date: "2024-01-05", count: 1 },
        ];
        const result = calculateCurrentStreak(contributions);
        expect(result).toEqual({ start: "2024-01-04", end: "2024-01-05", length: 2 });
    });
})
