import pool from "./db.js";

// download all posts with sorting
export async function getAllPosts(order = "DESC") {
  const result = await pool.query(
    `SELECT * FROM posts ORDER BY created_at ${order}`
  );
  return result.rows;
}

// Download post with comments
export async function getPostWithComments(id) {
  const post = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);

  const comments = await pool.query(
    "SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at ASC",
    [id]
  );

  return { post: post.rows[0], comments: comments.rows };
}

// add new post
export async function createPost(title, content) {
  await pool.query("INSERT INTO posts (title, content) VALUES ($1, $2)", [
    title,
    content,
  ]);
}

// delete post
export async function deletePost(id) {
  await pool.query("DELETE FROM posts WHERE id = $1", [id]);
}

// add comment to post
export async function createComment(postId, author, content) {
  await pool.query(
    "INSERT INTO comments (post_id, author, content) VALUES ($1, $2, $3)",
    [postId, author, content]
  );
}
