import { fetchUserLanguages } from "../../lib/github/githubClient.js";
import { ValidationError } from "../../lib/shared/errors/ValidationError.js";
import { renderLanguagesSvg } from "../../lib/render/renderLanguagesSvg.js";
import { sendSvgResponse } from "../../lib/render/sendSvgResponse.js";
import { handleSvgError } from "../../lib/http/handleSvgError.js";
import { getCachedLanguages, setCachedLanguages } from "../../lib/cache/languagesCache.js";
import { buildLanguagesStats } from "../../lib/languages/buildLanguagesStats.js";
import { getTheme } from "../../lib/themes/themes.js";
import { createTranslator } from "../../lib/i18n/index.js";


export default async function handler(req, res) {

  const lang = req.query.lang;
  const t = createTranslator(lang);

    try {
        const { user, theme = "dark" } = req.query;
        if (!user) {
            throw new ValidationError("Missing required query parameter: user");
        }


        const selectedTheme = getTheme(theme) || getTheme("dark");

        let languagesStats = getCachedLanguages(user);

        if (!languagesStats) {

            const repositories = await fetchUserLanguages(user);
            languagesStats = buildLanguagesStats(repositories);
            setCachedLanguages(user, languagesStats);
        }

        const svg = renderLanguagesSvg(languagesStats, selectedTheme, t);

        sendSvgResponse({
            res,
            status: 200,
            svgString: svg
        });

    } catch (error) {
        handleSvgError(res, error, lang);
    }

}