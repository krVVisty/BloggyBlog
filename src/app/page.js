import Link from "next/link";
import { query } from "@/lib/db";

export default async function HomePage() {
  // pobranie wszystkich postów z bazy
  const result = await query("SELECT * FROM posts ORDER BY created_at DESC");
  const posts = result.rows;

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      <h1 style={{ borderBottom: "1px solid #ccc", paddingBottom: "0.5rem" }}>
        BloggyBlog
      </h1>

      {posts.length === 0 && <p>No posts yet.</p>}

      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            background: "#f5f5f5",
            borderRadius: "5px",
          }}
        >
          <Link
            href={`/posts/${post.id}`}
            style={{ textDecoration: "none", color: "#333" }}
          >
            <h2 style={{ margin: 0 }}>{post.title}</h2>
            <p style={{ margin: "0.5rem 0 0", color: "#555" }}>
              {post.content.substring(0, 100)}...
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}
