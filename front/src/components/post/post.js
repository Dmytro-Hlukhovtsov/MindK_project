import { Card } from "@mui/material";
import { PostHeader } from "./postComponents/postHeader";
import { PostBody } from "./postComponents/postBody";
import { PostFooter } from "./postComponents/postFooter";

export function ShowPost({ post }) {
  return (
    <Card className="post-card" sx={{ maxWidth: 500, minWidth: 400 }}>
      <PostHeader post={post} />
      <PostBody
        text={post.text}
        timestamp={post.created_time}
        link={post.link}
      />
      <PostFooter
        totalComments={post.total_comments}
        likes={post.total_likes}
      />
    </Card>
  );
}
