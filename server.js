const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import database connection to initialize
require('./config/db');

// Import routes
const storeRoutes = require('./routes/storeRoutes');
const cityRoutes = require('./routes/cityRoutes');
const salesRoutes = require('./routes/salesRoutes');
const plannedStoreRoutes = require('./routes/plannedStoreRoutes');

// Import middleware
const errorHandler = require('./middlewares/errorHandler');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Middleware Configuration
 */
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

/**
 * API Routes
 * All API routes are prefixed with /api
 */
app.use('/api/stores', storeRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/planned-stores', plannedStoreRoutes);

/**
 * Health Check Endpoint
 */
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Migros DSS API is running',
        timestamp: new Date().toISOString()
    });
});

/**
 * Root Endpoint
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/**
 * 404 Handler
 */
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: {
            message: 'Route not found',
            path: req.originalUrl
        }
    });
});

/**
 * Error Handler Middleware (must be last)
 */
app.use(errorHandler);

/**
 * Start Server
 */
app.listen(PORT, () => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  🚀 Migros DSS Backend Server Started');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`  📡 Server: http://localhost:${PORT}`);
    console.log(`  🏥 Health: http://localhost:${PORT}/api/health`);
    console.log(`  📚 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
});

module.exports = app;
