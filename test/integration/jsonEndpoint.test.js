import { describe, it, expect, vi } from "vitest";

vi.mock("../../lib/cache/contributionsCache.js", () => ({
  getCachedContributions: async () => [
    { date: "2024-01-01", count: 1 },
    { date: "2024-01-02", count: 2 },
  ],
}));

vi.mock("../../lib/streak/calculateStreak.js", () => ({
  calculateStreak: () => ({
    currentStreak: { length: 5 },   
    longestStreak: { length: 10 },
    totalContributions: 20,
    firstContributionDate: "2024-01-01",
    lastContributionDate: "2024-01-02",
  }),
}));

import handler from "../../api/streak/stats.js";

const createMockRes = () => {
    const res = {
        statusCode: 200,
        headers: {},
        body: null,
    };
    res.setHeader = (key, value) => {
        res.headers[key] = value;
    };
    res.getHeader = (key) => res.headers[key];
    res.status = (code) => {
        res.statusCode = code;
        return res;
    };
    res.json = (data) => {
        res.body = data;
        return res;
    };
    return res;
};

describe("JSON Endpoint (integration)", () => {
    it("should return json response", async () => {
        const req = {
            query: { user: "octocat" },
            headers: {},
        };
        const res = createMockRes();
        await handler(req, res);

      //  expect(res.status).toBe(200);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.getHeader("Content-Type")).toBe("application/json");
        expect(res.json).toHaveBeenCalledWith({
            current_streak: 5,
            longest_streak: 10,
            total_contributions: 20,
            first_contribution_date: "2024-01-01",
            last_contribution_date: "2024-01-02",
          /*  labels: {
                title: "GitHub Streak",
                current_streak: "Current Streak",
                longest_streak: "Longest Streak",
                total_contributions: "Total Contributions",
            },
            */
        });
    });
});