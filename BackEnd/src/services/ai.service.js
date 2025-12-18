const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const systemPrompt = `You are an expert Senior Code Reviewer with 7+ years of experience. Your task is to analyze, review, and improve code.

**ROLE & RESPONSIBILITIES:**
1. Analyze code for quality, best practices, and potential issues
2. Provide constructive, actionable feedback
3. Suggest optimizations for performance and efficiency
4. Identify security vulnerabilities and bugs
5. Ensure code follows DRY, SOLID, and clean code principles
6. Check for scalability and maintainability
7. Verify proper error handling and edge cases
8. Suggest better alternatives when appropriate

**REVIEW FORMAT:**
Please provide your review in this structured format:

📊 **OVERALL ASSESSMENT:**
[Brief summary of code quality]

✅ **STRENGTHS:**
- List what's done well
- Good practices followed

⚠️ **ISSUES FOUND:**
**Category: [e.g., Performance, Security, Readability]**
- Specific issue 1 with explanation
- Specific issue 2 with explanation

🔧 **RECOMMENDATIONS:**
**For [Issue Category]:**
1. Suggestion 1 with code example if applicable
2. Suggestion 2 with code example if applicable

📝 **CODE IMPROVEMENTS:**
\`\`\`[language]
// Before - Problematic code
[problematic code snippet]

// After - Improved code
[improved code snippet]
\`\`\`

🎯 **KEY TAKEAWAYS:**
- Main improvement areas
- Priority fixes

**Be specific, provide examples, and explain the "why" behind each recommendation.**
`;

async function generateContent(code) {
    try {
        // Validate API key
        if (!process.env.GROQ_API_KEY) {
            throw new Error('GROQ_API_KEY is not configured. Add it to your .env file');
        }

        // Validate input
        if (!code || typeof code !== 'string' || code.trim().length === 0) {
            throw new Error('Code cannot be empty');
        }

        // Limit code length
        const maxCodeLength = 8000;
        if (code.length > maxCodeLength) {
            code = code.substring(0, maxCodeLength) + '\n\n[Code truncated due to length limits]';
        }

        console.log('Sending request to Groq API...');
        
        // Using currently available model - choose ONE of these:
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: `Please review this code and provide a detailed code review:\n\n${code}`
                }
            ],
            // 🔄 CHANGE THIS LINE - Use ONE of these models:
            model: "llama-3.3-70b-versatile", // ✅ RECOMMENDED - works as of Dec 2024
            
            // Alternative models (uncomment ONE if the above doesn't work):
            // model: "llama-3.1-8b-instant",     // ✅ Fast and cheap
            // model: "llama-3.2-90b-vision-preview", // ✅ Large, capable
            // model: "llama-3.2-11b-vision-preview", // ✅ Medium
            // model: "llama-3.2-3b-preview",     // ✅ Fastest
            // model: "llama-4-scout-17b",        // ✅ New preview model
            
            temperature: 0.7,
            max_tokens: 3000,
            top_p: 1,
            stream: false
        });

        const response = chatCompletion.choices[0]?.message?.content;
        
        if (!response) {
            return "No review generated. The AI returned an empty response.";
        }

        console.log('✅ Review generated successfully');
        return response;
        
    } catch (error) {
        console.error('❌ Groq API Error:', error.message);
        
        // Handle specific error cases
        if (error.message.includes('model_decommissioned') || error.message.includes('model not found')) {
            throw new Error(`The model is no longer available. Please update the model name in ai.service.js to a current model from https://console.groq.com/docs/models`);
        } else if (error.message.includes('API key') || error.message.includes('authentication')) {
            throw new Error('Invalid or missing GROQ_API_KEY. Check your .env file');
        } else if (error.message.includes('rate limit')) {
            throw new Error('Rate limit exceeded. Please wait a minute and try again.');
        } else if (error.message.includes('network') || error.message.includes('connection')) {
            throw new Error('Network error. Check your internet connection.');
        } else {
            // Show more details for debugging
            console.error('Full error details:', error);
            throw new Error(`API Error: ${error.message}. Check console for details.`);
        }
    }
}

module.exports = generateContent;