import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddPostDialog from "./addPostDialog";

const PostActionsButton = ({ post }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
    return false;
  };
  const handleCloseMenuWithOpenDialog = (e) => {
    e.preventDefault();

    setAnchorEl(null);
    setDialogOpen(true);
  };
  const handleClose = (e) => {
    e.preventDefault();

    console.log("loh");
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleCloseMenuWithOpenDialog}>Редагувати</MenuItem>
        <MenuItem onClick={handleClose}>Видалити</MenuItem>
      </Menu>
      <AddPostDialog
        isDialogOpened={dialogOpen}
        closeDialog={handleDialogClose}
        post={post}
      />
    </>
  );
};

export default PostActionsButton;
