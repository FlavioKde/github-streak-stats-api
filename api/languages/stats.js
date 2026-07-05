import { fetchUserLanguages } from '../../lib/github/githubClient.js';
import { ValidationError } from '../../lib/shared/errors/index.js';
import { formatJsonResponse } from '../../lib/render/formatJsonResponse.js';
import { handleJsonError } from '../../lib/http/handleJsonError.js';
import { getCachedLanguages, setCachedLanguages } from '../../lib/cache/languagesCache.js';
import { calculateLanguagesPorcentages } from '../../lib/languages/calculateLanguagesPorcentages.js';

export default async function handler(req, res) {
  try {
    const { user } = req.query;

    if (!user) {
      throw new ValidationError('Missing required query parameter: user');
    }

    let languagesStats = getCachedLanguages(user);

    if (!languagesStats) {

        const languagesData = await fetchUserLanguages(user);
        languagesStats = calculateLanguagesPorcentages(languagesData);

        setCachedLanguages(user, languagesStats);
    }

    const formattedResponse = formatJsonResponse(languagesStats);
      
      res.setHeader('Cache-Control', 'public, max-age=43200, s-maxage=43200, stale-while-revalidate=3600');
      
      return res.status(200).json(formattedResponse);
    }
    catch (error) {
      return handleJsonError(res, error);
    }   

}
