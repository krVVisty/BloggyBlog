import { query } from "@/lib/db";

export async function POST(req) {
  const { title, content } = await req.json();

  if (!title || !content) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
    });
  }

  const insert = await query(
    "INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *",
    [title, content]
  );

  return new Response(JSON.stringify(insert.rows[0]), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
