import { fetchUserLanguages } from "../../lib/github/githubClient.js";
import { ValidationError } from "../../lib/shared/errors/ValidationError.js";
import { renderLanguagesSvg } from "../../lib/render/renderLanguagesSvg.js";
import { sendSvgResponse } from "../../lib/render/sendSvgResponse.js";
import { handleSvgError } from "../../lib/http/handleSvgError.js";
import { getCachedLanguages } from "../../lib/cache/languagesCache.js";
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

        const languagesData = await getCachedLanguages(fetchUserLanguages, user);   

        const svg = renderLanguagesSvg(languagesData, selectedTheme, t);

        sendSvgResponse({
            res,
            status: 200,
            svgString: svg
        });

    } catch (error) {
        handleSvgError(res, error, lang);
    }

}