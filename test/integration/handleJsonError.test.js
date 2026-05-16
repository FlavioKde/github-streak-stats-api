import { describe, it, expect, vi, afterEach } from "vitest";
import handler from "../../api/streak/stats.js";
import * as githubClient from "../../lib/github/githubClient.js";
import { NotFoundError } from "../../lib/shared/errors/NotFoundError.js";   

afterEach(() => {
    vi.restoreAllMocks();
});

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
    }
    return res;
};

describe("JSON Endpoint errors", () => {
    it("should return error when user is missing", async () => {
        const req = {
            query: {},
            headers: {},
        };
        const res = createMockRes();
        await handler(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.headers["Content-Type"]).toBe("application/json");
        expect(res.body).toHaveProperty("error");
        expect(res.body.error).toContain("Bad Request");
        expect(res.body.message).toContain("Username is required");
       
        
    });

    it("should return error when user is not found", async () => {
        const req = {
            query: { user: "nonexistentuser" },
            headers: {},
        };
        const res = createMockRes();
        vi.spyOn(githubClient, "fetchUserContributions").mockRejectedValue(new NotFoundError("User not found"));

        await handler(req, res);
        expect(res.statusCode).toBe(404);
        expect(res.headers["Content-Type"]).toBe("application/json");
        expect(res.body).toHaveProperty("error");
        expect(res.body.error).toContain("Not Found");
        expect(res.body.message).toContain("GitHub user not found");
       
    });

    it("should return error when GitHub API fails", async () => {
        const req = {
            query: { user: "validuser" },
            headers: {},
        };
        const res = createMockRes();
        vi.spyOn(githubClient, "fetchUserContributions").mockRejectedValue(new Error("GitHub API request failed")); 

        await handler(req, res);
        expect(res.statusCode).toBe(500);
        expect(res.headers["Content-Type"]).toBe("application/json");
        expect(res.body).toHaveProperty("error");
        expect(res.body.error).toContain("Internal Server Error");
        expect(res.body.message).toContain("Unexpected error");
    });

    it("should return error when unexpected error occurs", async () => {
        const req = {
            query: { user: "validuser" },
            headers: {},
        };
        const res = createMockRes();
        vi.spyOn(githubClient, "fetchUserContributions").mockRejectedValue(new Error("Unexpected error"));  

        await handler(req, res);
        expect(res.statusCode).toBe(500);
        expect(res.headers["Content-Type"]).toBe("application/json");
        expect(res.body).toHaveProperty("error");
        expect(res.body.error).toContain("Internal Server Error");
        expect(res.body.message).toContain("Unexpected error");
    });

}); 

