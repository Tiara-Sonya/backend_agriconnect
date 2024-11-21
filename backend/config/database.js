const mysql = require("mysql");
const dotenv = require('dotenv');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_agriconnect",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL database.");
});

module.exports = db;