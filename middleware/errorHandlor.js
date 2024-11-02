// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    // Fix 1: statusCode is camelCase and should be checked from both sources
    const statusCode = res.statusCode ? res.statusCode : 500;

    // Fix 2: Set the status code before sending response
    res.status(statusCode);
    
    // Fix 3: Add environment-based error details
    res.json({
        title: getErrorTitle(statusCode),
        message: err.message,
        // Only send stack trace in development
        stackTrace: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

// Helper function to get error titles based on status codes
const getErrorTitle = (statusCode) => {
    switch (statusCode) {
        case 400:
            return "Bad Request";
        case 401:
            return "Unauthorized";
        case 403:
            return "Forbidden";
        case 404:
            return "Not Found";
        case 500:
            return "Server Error";
        default:
            return "Error";
    }
};

module.exports = errorHandler;

