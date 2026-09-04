vi.mock('../../lib/github/githubMapper.js', () => ({
  mapGitHubActivity: vi.fn()
}));

vi.mock('../../lib/github/githubHandlers.js', () => ({
  handleGitHubApiResponse: vi.fn(),
  handleGraphQLErrors: vi.fn(),
  handleMissingUserData: vi.fn()
}));


import { describe, it, expect, afterEach, vi} from 'vitest';
import { ConfigurationError, GithubApiError, NotFoundError, ValidationError } from '../../lib/shared/errors/index.js'; 
import { fetchUserActivity } from '../../lib/github/githubClient.js';
import { getUserActivityQuery } from '../../lib/github/githubQueries.js';
import { mapGitHubActivity } from '../../lib/github/githubMapper.js';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('fetchUserActivity', () => {


    it('should throw an error when username is invalid', async () => {
        await expect(fetchUserActivity('')).rejects.toThrow(ValidationError);
     });

    it('should throw ConfigurationError when user does not exist', async () => {
        const invalidUsername = 'nonexistentuser1234567890';
        await expect(fetchUserActivity(invalidUsername)).rejects.toThrow(ConfigurationError);
    });

    it('should throw ConfigurationError when GITHUB_TOKEN is not set', async () => {
        const originalToken = process.env.GITHUB_TOKEN;
        delete process.env.GITHUB_TOKEN; 

        await expect(fetchUserActivity('flavio')).rejects.toThrow(ConfigurationError);

        process.env.GITHUB_TOKEN = originalToken; 
    });

    it ('should throw GithubApiError when fetch fails', async () => {
        const username = "flavio";
        const GITHUB_TOKEN = "dummy";
        process.env.GITHUB_TOKEN = GITHUB_TOKEN;

        const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValueOnce({
            ok: false,
            status: 500,
            statusText: "Internal Server Error",
            json: async () => ({ message: "Internal Server Error" })
        });

        await expect(fetchUserActivity(username)).rejects.toThrow(GithubApiError);

        expect(fetchSpy).toHaveBeenCalledWith(
            "https://api.github.com/graphql",
            expect.objectContaining({
                method: "POST",
                headers: expect.objectContaining({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${GITHUB_TOKEN}`
                }),
                body: JSON.stringify({
                    query: getUserActivityQuery,
                    variables: { username }
                })
            })
        );
    });

    it('should throw NotFoundError when user data is missing in the response', async () => {
        const username = "flavio";
        const GITHUB_TOKEN = "dummy";
        process.env.GITHUB_TOKEN = GITHUB_TOKEN;

        const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                data: {
                    user: null
                }
            })
        });

        await expect(fetchUserActivity(username)).rejects.toThrow(NotFoundError);

        expect(fetchSpy).toHaveBeenCalledWith(
            "https://api.github.com/graphql",
            expect.objectContaining({
                method: "POST",
                headers: expect.objectContaining({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${GITHUB_TOKEN}`
                }),
                body: JSON.stringify({
                    query: getUserActivityQuery,
                    variables: { username }
                })
            })
        );
    });

    it("should return mapped activity when fetch succeeds", async () => {
        const username = "flavio";
        const GITHUB_TOKEN = "dummy";
        process.env.GITHUB_TOKEN = GITHUB_TOKEN;

        const userMock = { any: "thing" };
        const mappedActivityMock = { ok: true };

        const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                data: {
                    user: userMock
                }
            })
        });

        mapGitHubActivity.mockReturnValue(mappedActivityMock);

        const result = await fetchUserActivity(username);

        expect(fetchSpy).toHaveBeenCalledWith(
            "https://api.github.com/graphql",
            expect.objectContaining({
                method: "POST",
                headers: expect.objectContaining({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${GITHUB_TOKEN}`
                }),
                body: JSON.stringify({
                    query: getUserActivityQuery,
                    variables: { username }
                })
            })
        );

        expect(mapGitHubActivity).toHaveBeenCalledWith(userMock);
        expect(result).toEqual(mappedActivityMock);
    });

});

