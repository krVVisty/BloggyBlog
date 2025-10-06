import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, //ssl requirement for supabase
  },
});

// helpers for queries
export async function query(text, params) {
  const res = await pool.query(text, params);
  return res;
}

export default pool;
