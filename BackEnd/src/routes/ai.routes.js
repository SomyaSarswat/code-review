const express = require('express');
const aiController = require("../controllers/ai.controller");

const router = express.Router();

/**
 * @route POST /ai/get-review
 * @desc Get AI review for code
 * @access Public
 * @body {code: string}
 */
router.post("/get-review", aiController.getReview);

/**
 * @route GET /ai/health
 * @desc Check AI service health
 * @access Public
 */
router.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "AI service is operational",
        timestamp: new Date().toISOString(),
        model: "Groq Mixtral-8x7b"
    });
});

module.exports = router;