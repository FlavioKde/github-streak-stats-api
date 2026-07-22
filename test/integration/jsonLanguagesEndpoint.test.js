import { describe, it, expect, vi } from 'vitest';
import { GithubApiError } from '../../lib/shared/errors/githubApiError.js';

vi.mock('../../lib/github/githubClient.js', () => ({
  fetchUserLanguages: vi.fn()
}));

import { fetchUserLanguages } from '../../lib/github/githubClient.js';
import handler from '../../api/languages/stats.js';

fetchUserLanguages.mockResolvedValue([
  {
    languages: [
      {
        name: 'JavaScript',
        size: 100,
        color: '#f1e05a'
      }
    ]
  },
  {
    languages: [
      {
        name: 'Python',
        size: 200,
        color: '#3572A5'
      }
    ]
  },
  {
    languages: [
      {
        name: 'Java',
        size: 150,
        color: '#b07219'
      }
    ]
  },
  {
    languages: [
      {
        name: 'HTML',
        size: 50,
        color: '#e34c26'
      }
    ]
  }
]);

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
    }

    res.json = (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.body = data;
        return res;
    }

    return res;
};

describe('JSON Languages Endpoint(integration)', () => {
    it('should return the correct JSON response for a valid user', async () => {
        const req = {
            query: { user: 'octocat' },
            headers: {},
        };
        const res = createMockRes();

        await handler(req, res);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            totalLanguages: 4,
            totalBytes: 500,
            languages: [
                {
          name: 'Python',
          color: '#3572A5',
          size: 200,
          percentage: 40
        },
        {
          name: 'Java',
          color: '#b07219',
          size: 150,
          percentage: 30
        },
        {
          name: 'JavaScript',
          color: '#f1e05a',
          size: 100,
          percentage: 20
        },
        {
          name: 'HTML',
          color: '#e34c26',
          size: 50,
          percentage: 10
        }
    ]
 });

        expect(res.getHeader('Content-Type')).toBe('application/json');
        expect(res.getHeader('Cache-Control')).toBe('public, max-age=43200, s-maxage=43200, stale-while-revalidate=3600');

    });

    it("should return 400 for missing user parameter", async () => {
        const req = {
            query: {},
            headers: {},
        };
        const res = createMockRes();

        await handler(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: "Bad Request", message: "Username is required" });
        expect(res.getHeader('Content-Type')).toBe('application/json');
});

    it("should handle GITHUB errors", async () => {
        fetchUserLanguages.mockRejectedValueOnce(new GithubApiError("GitHub API error"));

        const req = {
            query: { user: "notfound" },
            headers: {},
        };
        const res = createMockRes();

        await handler(req, res);

        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({ error: "Internal Server Error", message: "An unknown error occurred" });
        expect(res.getHeader('Content-Type')).toBe('application/json');
    });



});
