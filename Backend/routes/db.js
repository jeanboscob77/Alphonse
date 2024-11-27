// db.js
const mysql = require('mysql2');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,  // Change to your MySQL username
  password: process.env.MYSQL_PASSWORD,  // Change to your MySQL password
  database: process.env.MYSQL_DATABASE // Change to your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;
