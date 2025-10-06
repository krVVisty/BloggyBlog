import pool from "../../src/lib/db";

export default async function handler(req, res) {
  try {
    const result = await pool.query("SELECT NOW()");
    res.status(200).json({ time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  }
}
