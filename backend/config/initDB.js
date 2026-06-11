const mysql = require('mysql2/promise');
require('dotenv').config();

async function initDB() {
  let connection;

  try {
    // Connect to MySQL server (without selecting a database)
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });

    console.log('Connected to MySQL server.');

    // Create database if it doesn't exist
    await connection.query(`
      CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}
      CHARACTER SET utf8mb4
      COLLATE utf8mb4_unicode_ci
    `);

    console.log(`Database '${process.env.DB_NAME}' is ready.`);

    // Select the database
    await connection.query(`USE ${process.env.DB_NAME}`);

    // Create users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Table: users is ready.');

    // Create expenses table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS expenses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(100) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(50) NOT NULL,
        description TEXT,
        date DATE NOT NULL DEFAULT (CURRENT_DATE),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    console.log('Table: expenses is ready.');
    console.log('Database initialization complete.');
  } catch (error) {
    console.error('Database initialization failed:', error.message);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

module.exports = initDB;