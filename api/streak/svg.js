import { fetchUserContributions } from '../../lib/github/githubClient.js';
import { ValidationError } from "../../lib/shared/errors/ValidationError.js";
import { renderStreakSvg } from '../../lib/render/renderStreakSvg.js';
import { sendSvgResponse } from '../../lib/render/sendSvgResponse.js'; 
import { handleSvgError } from '../../lib/http/handleSvgError.js';
import { getCachedContributions } from '../../lib/cache/contributionsCache.js';
import { calculateStreak } from '../../lib/streak/calculateStreak.js';
import { getTheme } from '../../lib/themes/themes.js';
import { createTranslator } from '../../lib/i18n/index.js';



export default async function handler(req, res) {

  const lang = req.query.lang;
  const t = createTranslator(lang);
     
  try {
    const { user, theme = "dark" } = req.query; 
    if (!user) {
        
       throw new ValidationError("Missing required query parameter: user");
      
    }
    const selectedTheme = getTheme(theme) || getTheme("dark");

    const contributions = await getCachedContributions(fetchUserContributions, user);

    const streakData = calculateStreak(contributions);

    const svg = renderStreakSvg( streakData, selectedTheme, t);

        sendSvgResponse({
            res,
            status: 200,
            svgString: svg
        });

  } catch (error) {


    handleSvgError(res, error, lang);
      
  }

}
