import { fetchUserLanguages } from '../../lib/github/githubClient.js';
import { ValidationError } from '../../lib/shared/errors/index.js';
import { formatLanguagesJsonResponse } from '../../lib/render/formatLanguagesJsonResponse.js';
import { handleJsonError } from '../../lib/http/handleJsonError.js';
import { getCachedLanguages, setCachedLanguages } from '../../lib/cache/languagesCache.js';
import { buildLanguagesStats } from '../../lib/languages/buildLanguagesStats.js';


export default async function handler(req, res) {
  try {
    const { user } = req.query;

    if (!user) {
      throw new ValidationError('Missing required query parameter: user');
    }

    let languagesStats = getCachedLanguages(user);

    if (!languagesStats) {

        const repositories = await fetchUserLanguages(user);

        languagesStats = buildLanguagesStats(repositories);

        setCachedLanguages(user, languagesStats);
    }

    const formattedResponse = formatLanguagesJsonResponse(languagesStats);
      
      res.setHeader('Cache-Control', 'public, max-age=43200, s-maxage=43200, stale-while-revalidate=3600');
      
      return res.status(200).json(formattedResponse);
    }
    catch (error) {
      return handleJsonError(res, error);
    }   

}
