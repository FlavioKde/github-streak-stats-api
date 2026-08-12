import { describe, it, expect } from "vitest";
import { isConsecutiveDays } from "../../lib/streak/isConsecutiveDays.js";

describe("isConsecutiveDays", () => {
    it("returns true for consecutive days", () => {
        expect(isConsecutiveDays("2024-01-01", "2024-01-02")).toBe(true);
    });

    it("returns false for non-consecutive days", () => {
        expect(isConsecutiveDays("2024-01-01", "2024-01-03")).toBe(false);
    });

    it("returns false for the same day", () => {
        expect(isConsecutiveDays("2024-01-01", "2024-01-01")).toBe(false);
    });

    it("returns false for reversed order", () => {
        expect(isConsecutiveDays("2024-01-02", "2024-01-01")).toBe(false);
    });

    it("ignores time differences", () => {
        expect(isConsecutiveDays("2024-01-01T23:59:59", "2024-01-02T00:00:00")).toBe(true);
    });

})