import { Card } from "@mui/material";
import { useState } from "react";
import { PostHeader } from "./postComponents/postHeader";
import { PostBody } from "./postComponents/postBody";
import { PostFooter } from "./postComponents/postFooter";
import PostModal from "../../containers/post/postContainers/PostModal";
import CommentsBlock from "../comment/commentsBlock";

const ShowPost = ({ post, commentBtn }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
          commentable={post.commentable}
          handleOpen={handleOpen}
          commentBtn={commentBtn}
        />
        <PostModal
          open={open}
          handleOpen={setOpen}
          handleClose={handleClose}
          post={post}
        />
      </Card>
      {!commentBtn && <CommentsBlock id={post.post_id} />}
    </>
  );
};

export default ShowPost;
