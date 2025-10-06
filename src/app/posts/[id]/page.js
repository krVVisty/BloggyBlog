import { query } from "@/lib/db";
import PostComponent from "./PostComponent"; // import client component

export default async function PostPage({ params }) {
  const postId = params.id;

  // downloading post data
  const postResult = await query("SELECT * FROM posts WHERE id = $1", [postId]);
  const post = postResult.rows[0];

  // downloading comments for the post
  const commentsResult = await query(
    "SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at DESC",
    [postId]
  );
  const comments = commentsResult.rows;

  return <PostComponent post={post} comments={comments} />;
}

export const dynamic = "force-dynamic";
// forcing server-side rendering, to always get fresh data
