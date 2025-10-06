"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) throw new Error("Failed to create post");

      setTitle("");
      setContent("");
      router.push("/"); // redirect to home page after adding a post
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
        Add New Post
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <textarea
          placeholder="Post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={6}
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
        >
          Add Post
        </button>
      </form>
    </div>
  );
}
