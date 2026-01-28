import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST ,
  port: process.env.DB_PORT,
  user: 'nutx_svc',
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  max: 10,              // max connections
  idleTimeoutMillis: 30000,
});

pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL");
});

export default pool;
