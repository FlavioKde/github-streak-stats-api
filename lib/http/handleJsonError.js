import { NotFoundError, ValidationError, ConfigurationError, GithubApiError } from "../shared/errors/index.js"; 
import { createTranslator, translateError } from "../i18n/index.js"; 

/*

export function handleJsonError(res, error) {
    console.error('Stats endpoint error:', error);
    if (error instanceof NotFoundError) {
        res.setHeader('Cache-Control', 'no-store');
        return res.status(404).json({
            error: 'Not Found',
            message: error.message
        });
    }   
    if (error instanceof ValidationError) {
        res.setHeader('Cache-Control', 'no-store');
        return res.status(400).json({
            error: 'Bad Request',
            message: error.message
        });
    }
    if (error instanceof ConfigurationError) {
        res.setHeader('Cache-Control', 'no-store');
        return res.status(500).json({
            error: 'Configuration Error',
            message: error.message
        });
    }
    res.setHeader('Cache-Control', 'no-store');
    return res.status(500).json({
        error: 'Internal Server Error',
        message: error.message || "Unexpected error"
    });
    
    */

export function handleJsonError(res, error, lang) {

    const t = createTranslator(lang);

    console.error('Stats endpoint error:', error);

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
    return res.status(status).json({
        error: errorType,
        message: message
    }); 
    
}  