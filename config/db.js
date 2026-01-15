const mysql = require('mysql2');
require('dotenv').config();

/**
 * Database Connection Pool Configuration
 * Using connection pool for better performance and resource management
 */
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'migros',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
        process.exit(1);
    }
    console.log('✅ Database connected successfully!');
    connection.release();
});

// Export promise-based pool for async/await usage
const promisePool = pool.promise();

module.exports = promisePool;
