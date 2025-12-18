const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');

const app = express();

// Enable CORS for frontend on port 5173
app.use(cors({
    origin: 'http://localhost:5173', // React dev server
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/', (req, res) => {
    res.json({
        status: 'running',
        message: 'Code Reviewer API',
        version: '1.0.0',
        port: 5000,
        timestamp: new Date().toISOString(),
        endpoints: {
            health: '/ai/health',
            review: '/ai/get-review'
        }
    });
});

// API routes
app.use('/ai', aiRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found',
        requestedUrl: req.originalUrl,
        availableEndpoints: [
            'GET /',
            'GET /ai/health',
            'POST /ai/get-review'
        ]
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined,
        port: 5000
    });
});

module.exports = app;