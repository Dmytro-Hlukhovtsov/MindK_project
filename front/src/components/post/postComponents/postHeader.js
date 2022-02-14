import { Avatar, CardHeader } from "@mui/material";
import PostActionsBtn from "../postActionsBtn";

export function PostHeader({ post }) {
  return (
    <CardHeader
      avatar={
        <Avatar sx={{ width: 75, height: 75 }} alt="avatar" src={post.avatar} />
      }
      action={<PostActionsBtn post={post} />}
      title={post.username}
    />
  );
}
