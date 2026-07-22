import { describe, it, expect, vi, afterEach} from 'vitest';
import * as githubClient from "../../lib/github/githubClient.js";
import { NotFoundError } from "../../lib/shared/errors/NotFoundError.js";
import { GithubApiError } from '../../lib/shared/errors/GithubApiError.js';

afterEach(() => {
    vi.restoreAllMocks();
});


vi.mock('../../lib/github/githubClient.js', () => ({
  fetchUserLanguages: vi.fn()
}));

import { fetchUserLanguages } from '../../lib/github/githubClient.js';
import handler from '../../api/languages/svg.js';

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
    }

    res.getHeader = (key) => res.headers[key];

    res.status = (code) => {
        res.statusCode = code;
        return res;
    }

    res.send = (data) => {
        res.setHeader('Content-Type', 'image/svg+xml');
        res.body = data;
        return res;
    }

    return res;
};

describe('SVG Languages Endpoint', () => {

    it('should return SVG with correct data and theme', async () => {
        const req = {
            query: {
                user: 'octocat',
                theme: 'light'
            }
        };
        const res = createMockRes();

        await handler(req, res);

        expect(res.statusCode).toBe(200);
        expect(res.getHeader('Content-Type')).toBe('image/svg+xml');
        expect(res.body).toContain('<svg');
        expect(res.body).toContain('</svg>');
        expect(res.body).toContain('GitHub Language Stats');

        expect(res.body).toContain('JavaScript');
        expect(res.body).toContain('Python');
        expect(res.body).toContain('Java');
        expect(res.body).toContain('HTML');

        expect(res.body).toContain('fill="#f1e05a"');
        expect(res.body).toContain('fill="#3572A5"');
        expect(res.body).toContain('fill="#b07219"');
        expect(res.body).toContain('fill="#e34c26"');

        expect(res.getHeader('Cache-Control'))
        .toBe('public, max-age=43200, s-maxage=43200, stale-while-revalidate=3600');
    });


    it("should return error SVG when user is missing", async () => {
        const req = {
        query: {},
        headers: {},
        };
    
        const res = createMockRes();
    
        await handler(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.headers["Content-Type"]).toBe("image/svg+xml");
        expect(res.body).toContain("<svg");
        expect(res.body.toLowerCase()).toContain("bad request");
    });

    
    it("should return error svg when user is not found", async () => {

    fetchUserLanguages.mockRejectedValueOnce(new NotFoundError("User not found"));

        const req = {
            query: {user:"fakeUser"},
            headers: {},
        };
    
        const res = createMockRes();
    
        await handler(req, res);

        expect(res.statusCode).toBe(404);
        expect(res.headers["Content-Type"]).toBe("image/svg+xml");
        expect(res.body).toContain("<svg");
        expect(res.body.toLowerCase()).toContain("not found"); 
        }); 
  
        
    it("should return error svg when system error", async () => {
          
        fetchUserLanguages.mockRejectedValueOnce(new Error("Configuration error"));
        
        const req = {
            query: {user:"octocat-test"},
            headers: {},
        };

        const res = createMockRes();
    
        await handler(req, res);

        expect(res.statusCode).toBe(500);
        expect(res.headers["Content-Type"]).toBe("image/svg+xml");
        expect(res.body).toContain("<svg");
        expect(res.body.toLowerCase()).toContain("error".toLowerCase()); 
        });  


    it('should handle GitHub API errors', async () => {
        
        fetchUserLanguages.mockRejectedValueOnce(new GithubApiError('GitHub API error'));
        
        const req = {
            query: { user: "notfound" },
            headers: {},
        };
        const res = createMockRes();

        await handler(req, res);

        expect(res.statusCode).toBe(500);
        expect(res.getHeader('Content-Type')).toBe('image/svg+xml');
        expect(res.body).toContain('</svg>');
        expect(res.body.toLowerCase()).toContain("github api error".toLowerCase());
    
    });    
});