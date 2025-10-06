import { query } from "@/lib/db";

export async function POST(req) {
  const { post_id, author, content } = await req.json();

  if (!post_id || !author || !content) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
    });
  }

  const insert = await query(
    "INSERT INTO comments (post_id, author, content) VALUES ($1, $2, $3) RETURNING *",
    [post_id, author, content]
  );

  return new Response(JSON.stringify(insert.rows[0]), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
