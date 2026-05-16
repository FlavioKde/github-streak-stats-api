import { NotFoundError, ValidationError, ConfigurationError, GithubApiError } from "../shared/errors/index.js"; 


export function handleJsonError(res, error) {

    console.error('Stats endpoint error:', error);

    let status = 500;
    let errorType = "Internal Server Error";
    let message = "An unknown error occurred";

    if (error instanceof NotFoundError) {
        status = 404;
        errorType = "Not Found";
        message = "The requested resource was not found";
    } else if (error instanceof ValidationError) {
        status = 400;
        errorType = "Bad Request";
        message = "Username is required";
    } else if (error instanceof ConfigurationError) {
        status = 500;
        errorType = "Configuration Error";
        message = "Configuration error occurred";
    } else if (error instanceof GithubApiError) {
        status = 500;
        errorType = "GitHub API Error";
        message = "Error occurred while fetching GitHub API data";
    }

    res.setHeader('Cache-Control', 'no-store');
    return res.status(status).json({
        error: errorType,
        message: message
    }); 
    
}  