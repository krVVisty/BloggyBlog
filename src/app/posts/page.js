import Link from "next/link";
import { query } from "@/lib/db";

export default async function HomePage() {
  // downloading all posts from the database
  const postsResult = await query(
    "SELECT * FROM posts ORDER BY created_at DESC"
  );
  const posts = postsResult.rows;

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "2rem auto",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #ccc",
          paddingBottom: "0.5rem",
          marginBottom: "2rem",
        }}
      >
        <h1>My Minimalist Blog</h1>

        {/* Link to add post */}
        <Link
          href="/add-post"
          style={{
            padding: "0.5rem 1rem",
            background: "#333",
            color: "#fff",
            borderRadius: "5px",
            textDecoration: "none",
          }}
        >
          Add Post
        </Link>
      </header>

      {/* list */}
      {posts.length === 0 && <p>No posts yet. Be the first to add one!</p>}
      {posts.map((p) => (
        <div
          key={p.id}
          style={{
            borderBottom: "1px solid #ddd",
            marginBottom: "1rem",
            paddingBottom: "1rem",
          }}
        >
          <h2 style={{ margin: 0 }}>
            <Link
              href={`/posts/${p.id}`}
              style={{ textDecoration: "none", color: "#333" }}
            >
              {p.title}
            </Link>
          </h2>
          <p style={{ color: "#555", marginTop: "0.5rem" }}>
            {p.content.slice(0, 100)}...
          </p>
          <Link
            href={`/posts/${p.id}`}
            style={{
              fontSize: "0.9rem",
              color: "#666",
              textDecoration: "underline",
            }}
          >
            Read more →
          </Link>
        </div>
      ))}
    </div>
  );
}

// forcing server-side rendering to avoid prerender errors
export const dynamic = "force-dynamic";
