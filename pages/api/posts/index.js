import { getAllPosts, createPost } from "../../../src/lib/queries";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { order } = req.query;
    const posts = await getAllPosts(order === "asc" ? "ASC" : "DESC");
    res.status(200).json(posts);
  }

  if (req.method === "POST") {
    const { title, content } = req.body;
    await createPost(title, content);
    res.status(201).json({ message: "Post created" });
  }
}
