const mysql = require('mysql2');
require('dotenv').config();

// Pool WITHOUT database selected.
// initDB.js will create the database first, then this pool is
// recreated WITH the database name in server.js
const pool = mysql.createPool({
  host:              process.env.DB_HOST,
  user:              process.env.DB_USER,
  password:          process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit:   10,
  queueLimit:        0
});

module.exports = pool.promise();
