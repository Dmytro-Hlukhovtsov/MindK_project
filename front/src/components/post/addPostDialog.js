import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";
import AddPost from "./AddPost";
import postPropTypes from "../../PropTypes/PostPropTypes";

const AddPostDialog = ({ isDialogOpened, closeDialog, post }) => {
  const handleClose = () => {
    closeDialog(false);
  };

  return (
    <Dialog open={isDialogOpened} onClose={handleClose}>
      <DialogTitle>Изменить пост</DialogTitle>
      <DialogContent>
        <AddPost post={post} />
      </DialogContent>
    </Dialog>
  );
};

AddPostDialog.propTypes = {
  isDialogOpened: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  post: PropTypes.shape(postPropTypes),
};

export default AddPostDialog;
