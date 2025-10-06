import { getPostWithComments, deletePost } from "../../../src/lib/queries";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const data = await getPostWithComments(id);
    if (!data.post) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.status(200).json(data);
  }

  if (req.method === "DELETE") {
    await deletePost(id);
    return res.status(200).json({ message: "Post deleted" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
