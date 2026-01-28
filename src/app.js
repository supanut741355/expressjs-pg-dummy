import express from "express";
import pool from "./db.js";

const app = express();
app.use(express.json());

app.get("/health", async (req, res) => {
  console.log('yo', process.env.DB_HOST);
  console.log('yo', process.env.DB_PORT);
  console.log('yo', process.env.DB_USER);
  console.log('yo', process.env.DB_PASSWORD);
  console.log('yo', process.env.DB_NAME);

  
  const result = await pool.query("SELECT 1");
  res.json({ status: "ok", db: result.rowCount });
});

app.get("/users", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM users");
  res.json(rows);
});

app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  const { rows } = await pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email]
  );

  res.status(201).json(rows[0]);
});

export default app;
