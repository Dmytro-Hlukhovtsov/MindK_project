import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";
import ChangeProfileForm from "./changeProfileForm";
import userPropTypes from "../../PropTypes/UserPropTypes";

const ChangeProfileFormDialog = ({ isDialogOpened, closeDialog, user }) => {
  const handleClose = () => {
    closeDialog(false);
  };
  return (
    <Dialog open={isDialogOpened} onClose={handleClose}>
      <DialogTitle>Изменить пост</DialogTitle>
      <DialogContent>
        <ChangeProfileForm user={user} />
      </DialogContent>
    </Dialog>
  );
};
ChangeProfileFormDialog.propTypes = {
  isDialogOpened: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  user: PropTypes.shape(userPropTypes),
};
export default ChangeProfileFormDialog;
