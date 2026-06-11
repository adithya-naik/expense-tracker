const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');
const initDB    = require('./config/initDB');
require('dotenv').config();
const mysql = require('mysql2');
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
async function startServer() {
  try {
    // 1. Auto-create database and tables
    await initDB();

    // 2. NOW create the pool WITH the database name
    //    This pool is what all routes will use for queries
    const pool = mysql.createPool({
      host:               process.env.DB_HOST,
      user:               process.env.DB_USER,
      password:           process.env.DB_PASSWORD,
      database:           process.env.DB_NAME,   // ← DB now exists
      waitForConnections: true,
      connectionLimit:    10,
      queueLimit:         0
    }).promise();

    // 3. Attach pool to app so routes can access it
    app.locals.db = pool;

    // 4. Register routes
    app.use('/api/auth', authRoutes);
    app.use('/api/expenses', expenseRoutes);

    // 5. Health check endpoint
    app.get('/', (req, res) => {
      res.json({ status: 'Expense Management API is running' });
    });

    // 6. Start listening
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);   // Exit if DB setup fails
  }
}

startServer();