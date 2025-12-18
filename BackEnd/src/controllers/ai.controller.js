const aiService = require("../services/ai.service");

/**
 * Controller for getting AI code review
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.getReview = async (req, res) => {
    try {
        const startTime = Date.now();
        
        // Validate request body
        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).json({
                success: false,
                error: "Invalid request body"
            });
        }

        const { code } = req.body;

        // Validate code parameter
        if (!code) {
            return res.status(400).json({
                success: false,
                error: "Code parameter is required"
            });
        }

        if (typeof code !== 'string') {
            return res.status(400).json({
                success: false,
                error: "Code must be a string"
            });
        }

        if (code.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: "Code cannot be empty"
            });
        }

        // Call AI service
        const review = await aiService(code);
        
        const processingTime = Date.now() - startTime;

        // Success response
        return res.json({
            success: true,
            review: review,
            metadata: {
                processingTime: `${processingTime}ms`,
                codeLength: code.length,
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Controller error:', error);
        
        // Determine appropriate status code
        let statusCode = 500;
        let errorMessage = error.message || "Internal server error";
        
        if (error.message.includes('API authentication') || error.message.includes('GROQ_API_KEY')) {
            statusCode = 503; // Service unavailable
            errorMessage = "Service configuration error";
        } else if (error.message.includes('Rate limit')) {
            statusCode = 429; // Too many requests
        } else if (error.message.includes('network') || error.message.includes('connection')) {
            statusCode = 503; // Service unavailable
        }

        return res.status(statusCode).json({
            success: false,
            error: errorMessage,
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};