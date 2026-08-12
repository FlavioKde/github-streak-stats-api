import { describe, it, expect  } from "vitest";
import { calculateLongestStreak } from "../../lib/streak/calculateLongestStreak.js";

describe("calculateLongestStreak", () => {
  it("calculates the longest streak correctly", () => {
    const contributions = [
      { date: "2023-01-01", count: 5 },
      { date: "2023-01-02", count: 3 },
      { date: "2023-01-03", count: 7 },
      { date: "2023-01-04", count: 2 },
      { date: "2023-01-05", count: 8 }
    ];
    const result = calculateLongestStreak(contributions);
    expect(result).toEqual({ start: "2023-01-01", end: "2023-01-05", length: 5 });
  });

    it("calculates the longest streak correctly with a break", () => {
        const contributions = [
            { date: "2023-01-01", count: 5 },
            { date: "2023-01-02", count: 0 },
            { date: "2023-01-03", count: 7 },
            { date: "2023-01-04", count: 2 },
            { date: "2023-01-05", count: 8 }
        ];
        const result = calculateLongestStreak(contributions);
        expect(result).toEqual({ start: "2023-01-03", end: "2023-01-05", length: 3 });
    });

    it("returns zero streak when there are no contributions", () => {
        const contributions = [];
        const result = calculateLongestStreak(contributions);
        expect(result).toEqual({ start: null, end: null, length: 0 });
    });

    it("returns only one day streak when there is only one contribution", () => {
        const contributions = [
            { date: "2023-01-01", count: 5 },
        ];
        const result = calculateLongestStreak(contributions);
        expect(result).toEqual({ start: "2023-01-01", end: "2023-01-01", length: 1 });
    }); 

    it("returns the longest when it is not the last streak", () => {
        const contributions = [
            { date: "2023-01-01", count: 5 },
            { date: "2023-01-02", count: 3 },
            { date: "2023-01-03", count: 2 },
            { date: "2023-01-04", count: 0 },
            { date: "2023-01-04", count: 2 },
            { date: "2023-01-05", count: 8 }
        ];
        const result = calculateLongestStreak(contributions);
        expect(result).toEqual({ start: "2023-01-01", end: "2023-01-03", length: 3 });
    });

    it("returns zero streak for all zero contributions", () => {
        const contributions = [
            { date: "2023-01-01", count: 0 },
            { date: "2023-01-02", count: 0 },
            { date: "2023-01-03", count: 0 }
        ];
        const result = calculateLongestStreak(contributions);
        expect(result).toEqual({ start: null, end: null, length: 0 });
    });
});