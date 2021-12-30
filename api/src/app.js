const express = require("express");

const app = express();

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "123456",
  port: 5432,
});

app.get("/", (req, res) => {
  pool.query("SELECT * FROM uset;", (error, results) => {
    if (error) {
      throw error;
    }

    res.status(200).json(results.rows);
  });
});

console.log(process.env.APP_PORT);
app.listen(process.env.APP_PORT);

// docker-compose --env-file .env up -d
