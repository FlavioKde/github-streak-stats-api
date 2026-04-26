import { NotFoundError, ValidationError, ConfigurationError, GithubApiError } from '../shared/errors/index.js';
import { errorSvg } from '../render/error_svg.js';
import { sendSvgResponse } from '../render/sendSvgResponse.js';
import { createTranslator ,translateError } from '../i18n/index.js'; 



export function handleSvgError(res, error) {

    const lang = res.req.query.lang;
    const t = createTranslator(lang);

    console.error('SVG endpoint error:', error);  


    let status = 500;
    let errorType = "Internal Server Error";
    let message = t("errors.UnknownError");

    if (error instanceof NotFoundError) {
        status = 404;
        errorType = "Not Found";
        message = t("errors.NotFoundError");
    } else if (error instanceof ValidationError) {
        status = 400;
        errorType = "Bad Request";
        message = t("errors.ValidationError");
    } else if (error instanceof ConfigurationError) {
        status = 500;
        errorType = "Configuration Error";
        message = t("errors.ConfigurationError");
    } else if (error instanceof GithubApiError) {
        status = 500;
        errorType = "GitHub API Error";
        message = t("errors.GithubApiError");
    }


    res.setHeader('Cache-Control', 'no-store');
    sendSvgResponse({
        res,
        status,
        svgString: errorSvg({ errorType, message })
    }); 

}