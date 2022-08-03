import { Box, Fade, IconButton, Menu, Modal, TextField } from "@mui/material";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const commentHeader = ({ comment, onDelete, onReply, onEdit }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [commentInModal, setCommentInModal] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const open = Boolean(anchorEl);
  const handleModalOpen = (val) => {
    setActionType(val);
    if (val === "edit") {
      setCommentInModal(comment.text);
    }
    setModalOpen(true);
  };
  const handleModalTextChange = (e) => {
    setCommentInModal(e.target.value);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setModalOpen(false);
  };
  const handleModalSend = () => {
    if (actionType === "reply") {
      onReply(comment.comment_id, commentInModal);
    } else {
      onEdit(comment.comment_id, commentInModal, comment.parent);
    }
    setModalOpen(false);
    setAnchorEl(null);
  };
  const handleDelete = () => {
    onDelete(comment.comment_id);
  };

  return (
    <div className="comment-header">
      <Link to={`/profiles/${comment.user_id}`} className="comment-author">
        {comment.name || comment.username}
      </Link>
      <IconButton
        id="comm-action-btn"
        aria-controls={open ? "comm-action-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="comm-action-menu"
        MenuListProps={{
          "aria-labelledby": "comm-action-btn",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => handleModalOpen("edit")}>Edit</MenuItem>
        <MenuItem onClick={() => handleModalOpen("reply")}>Reply</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          p: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box className="comment-modal">
          <div className="comment-modal-header">Comment</div>
          <div className="comment-modal-body">
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={2}
              defaultValue={commentInModal || ""}
              onChange={handleModalTextChange}
            />
            <Button onClick={handleModalSend}>{actionType}</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default commentHeader;
