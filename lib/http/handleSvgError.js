import { NotFoundError, ValidationError, ConfigurationError } from '../shared/errors/index.js';
import { errorSvg } from '../render/error_svg.js';
import { sendSvgResponse } from '../render/sendSvgResponse.js';
import { createTranslator ,translateError } from '../i18n/index.js'; 



export function handleSvgError(res, error, t) {

    const lang = res.req.query.lang;
    const t = createTranslator(lang);
    const message = translateError(error, t);


    console.error('SVG endpoint error:', error);  
    
    
    /*prove new error handling logic that uses the translated message and provides more specific SVG responses based on error type. This will enhance the user experience by giving clearer feedback on what went wrong, while also ensuring that the SVG response is appropriately tailored to the error encountered.

    if (error instanceof NotFoundError) {
        res.setHeader('Cache-Control', 'no-store');
        sendSvgResponse({
            res,
            status: 404,    
            svgString: errorSvg({ errorType: "Not Found", message: error.message || "Unexpected error"})
        });
        return; 
    }   
    if (error instanceof ValidationError) {
        res.setHeader('Cache-Control', 'no-store');
        sendSvgResponse({
            res,
            status: 400,
            svgString: errorSvg({ errorType: "Bad Request", message: error.message || "Unexpected error" })
        });
        return;
    }
    if (error instanceof ConfigurationError) {
        res.setHeader('Cache-Control', 'no-store');
        sendSvgResponse({
            res,
            status: 500,    
            svgString: errorSvg({ errorType: "Configuration Error", message: error.message || "Unexpected error" })
        });
        return;
    }
    res.setHeader('Cache-Control', 'no-store');
    sendSvgResponse({
        res,
        status: 500,
        svgString: errorSvg({ errorType: "Internal Server Error", message: error.message || "Unexpected error" })
    });
    
    */


    let status = 500;
    let errorType = "Internal Server Error";

    if (error instanceof NotFoundError) {
        status = 404;
        errorType = "Not Found";
    } else if (error instanceof ValidationError) {
        status = 400;
        errorType = "Bad Request";
    } else if (error instanceof ConfigurationError) {
        status = 500;
        errorType = "Configuration Error";
    }

    res.setHeader('Cache-Control', 'no-store');
    sendSvgResponse({
        res,
        status,
        svgString: errorSvg({ errorType, message })
    }); 

}