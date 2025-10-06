"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PostComponent({ post, comments: initialComments }) {
  const [comments, setComments] = useState(initialComments);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      post_id: post.id,
      author: form.author.value,
      content: form.content.value,
    };

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to add comment");

      const newComment = await res.json();
      // refresh the page to show the new comment
      setComments([newComment, ...comments]);
      form.reset();
    } catch (err) {
      alert(err.message);
    }
  };

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
        {post.title}
      </h1>
      <p style={{ marginTop: "1rem", lineHeight: "1.6", color: "#555" }}>
        {post.content}
      </p>

      <section style={{ marginTop: "2rem" }}>
        <h2
          style={{
            fontSize: "1.2rem",
            borderBottom: "1px solid #ccc",
            paddingBottom: "0.25rem",
          }}
        >
          Comments
        </h2>
        {comments.length === 0 && <p>No comments yet.</p>}
        {comments.map((c) => (
          <div
            key={c.id}
            style={{
              marginTop: "1rem",
              padding: "0.5rem",
              background: "#f5f5f5",
              borderRadius: "5px",
            }}
          >
            <strong style={{ color: "#333" }}>{c.author}</strong>
            <p style={{ margin: "0.25rem 0 0", color: "#555" }}>{c.content}</p>
          </div>
        ))}
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Add Comment</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <input
            type="text"
            name="author"
            placeholder="Your name"
            required
            style={{
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          <textarea
            name="content"
            placeholder="Your comment"
            required
            style={{
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "0.5rem",
              border: "none",
              borderRadius: "5px",
              background: "#333",
              color: "#fff",
              cursor: "pointer",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#555")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#333")}
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}
