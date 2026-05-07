import { fetchUserContributions } from '../../lib/github/githubClient.js';
import { ValidationError } from '../../lib/shared/errors/index.js';
import { formatJsonResponse } from '../../lib/render/formatJsonResponse.js';
import { handleJsonError } from '../../lib/http/handleJsonError.js';
import { getCachedContributions } from '../../lib/cache/contributionsCache.js';
import { calculateStreak } from '../../lib/streak/calculateStreak.js';
import { createTranslator } from '../../lib/i18n/index.js'; 



export default async function handler(req, res) {

    const lang = req.query.lang;
    const t = createTranslator(lang);

  try {
    const { user } = req.query;

    if (!user) {
      
      throw new ValidationError("Missing required query parameter: user");
    }
   
    const contributions = await getCachedContributions(fetchUserContributions, user);
    //const streakData = formatJsonResponse(contributions);
    const streakData = calculateStreak(contributions);
    const formattedResponse = formatJsonResponse(streakData, t);

   res.setHeader('Cache-Control', 'public, max-age=43200, s-maxage=43200, stale-while-revalidate=3600');
   //res.status(200).json(streakData);
    res.status(200).json(formattedResponse);
    
  } catch (error) {
   
    handleJsonError(res, error);

  }  

  
}