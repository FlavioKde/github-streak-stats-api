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
        res.setHeader('Content-Type', 'application/json');
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

         expect(res.statusCode).toBe(200);
         expect(res.body).toEqual({
            current_streak: { length: 5 },
            longest_streak: { length: 10 },
            total_contributions: 20,
            first_contribution_date: "2024-01-01",
            last_contribution_date: "2024-01-02",
            
        }); 
        expect(res.getHeader('Cache-Control')).toBe('public, max-age=43200, s-maxage=43200, stale-while-revalidate=3600');  
        expect(res.getHeader('Content-Type')).toBe('application/json');
        

        
    });
});