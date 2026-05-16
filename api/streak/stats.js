import { fetchUserContributions } from '../../lib/github/githubClient.js';
import { ValidationError } from '../../lib/shared/errors/index.js';
import { formatJsonResponse } from '../../lib/render/formatJsonResponse.js';
import { handleJsonError } from '../../lib/http/handleJsonError.js';
import { getCachedContributions } from '../../lib/cache/contributionsCache.js';
import { calculateStreak } from '../../lib/streak/calculateStreak.js';




export default async function handler(req, res) {


  try {
    const { user } = req.query;

    if (!user) {
      
      throw new ValidationError("Missing required query parameter: user");
    }
   
    const contributions = await getCachedContributions(fetchUserContributions, user);

    const streakData = calculateStreak(contributions);
    const formattedResponse = formatJsonResponse(streakData);

   res.setHeader('Cache-Control', 'public, max-age=43200, s-maxage=43200, stale-while-revalidate=3600');
   
    res.status(200).json(formattedResponse);
    
  } catch (error) {
   
    handleJsonError(res, error);

  }  

  
}