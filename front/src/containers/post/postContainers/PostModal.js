import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Modal,
  Typography,
} from "@mui/material";
import TimeAgo from "react-timeago";
import { PostFooter } from "../../../components/post/postComponents/postFooter";
import CommentsBlock from "../../../components/comment/commentsBlock";

const PostModal = ({ handleClose, open, post }) => (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    className="modal-post"
    sx={{
      display: "flex",
      p: 1,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Box className="post-modal-wrapper">
      <Card className="post-modal">
        <CardHeader
          avatar={
            <Avatar
              sx={{ width: 75, height: 75 }}
              alt="avatar"
              src={post.avatar}
            />
          }
          title={post.username}
          subheader={<TimeAgo date={post.created_time} />}
        />
        <CardContent>
          {post.link && (
            <CardMedia
              component="img"
              height="194"
              image={post.link}
              alt="oops..."
            />
          )}
          <Typography
            variant="body2"
            color="text.secondary"
            fontSize="14pt"
            textAlign="left"
            marginBottom="25px"
          >
            {post.text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <PostFooter commentable={post.commentable} likes={post.total_likes} />
        </CardActions>
      </Card>
      <CommentsBlock id={post.post_id} />
    </Box>
  </Modal>
);

export default PostModal;
