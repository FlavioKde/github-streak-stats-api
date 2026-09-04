import { describe, it, expect } from "vitest";
import { getUserActivityQuery } from "../../lib/github/githubQueries.js";

describe("githubQueries", () => {
    it("should contain getUserActivityQuery", () => {
        expect(getUserActivityQuery).toEqual(expect.any(String));
    });

    it("should contain the required activity fields", () => {
        expect(getUserActivityQuery).toContain("contributionsCollection");
        expect(getUserActivityQuery).toContain("user(login: $username)");
        expect(getUserActivityQuery).toContain("commitContributionsByRepository");
        expect(getUserActivityQuery).toContain("pullRequests");
        expect(getUserActivityQuery).toContain("issues");
        expect(getUserActivityQuery).toContain("repositories");
        expect(getUserActivityQuery).toContain('stargazerCount');
        expect(getUserActivityQuery).toContain('contributionCalendar');
        expect(getUserActivityQuery).toContain('contributionDays');
        expect(getUserActivityQuery).toContain('occurredAt');
        expect(getUserActivityQuery).toContain('createdAt');
        expect(getUserActivityQuery).toContain('contributionCount');
        expect(getUserActivityQuery).toContain('ownerAffiliations: [OWNER]');
        expect(getUserActivityQuery).toContain('isFork: false');
        expect(getUserActivityQuery).toContain('privacy: PUBLIC');
    });

});
