import { CardActions, IconButton } from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";

export function PostFooter({
  totalComments,
  likes,
  commentable,
  handleOpen,
  commentBtn,
}) {
  const onCommBtnClick = (e) => {
    e.preventDefault();
    handleOpen(true);
  };
  return (
    <CardActions disableSpacing className="comment-btn-block">
      {commentable && handleOpen && commentBtn && (
        <IconButton aria-label="comments" onClick={onCommBtnClick}>
          <ChatBubbleIcon />
          <p>{totalComments}</p>
        </IconButton>
      )}
      <IconButton>
        <FavoriteIcon />
        <p>{likes}</p>
      </IconButton>
    </CardActions>
  );
}

PostFooter.propTypes = {
  totalComments: PropTypes.number,
  likes: PropTypes.number.isRequired,
  commentable: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func,
  commentBtn: PropTypes.bool,
};
