import PropTypes from "prop-types";
import { Avatar, Grid, Typography } from "@mui/material";
import { useState } from "react";
import AvatarUpload from "../../containers/forms/avatarUpload";
import ChangeProfileFormDialog from "./changeProfileFormDialog";

const profilePropTypes = require("../../PropTypes/ProfilePropTypes");

const ProfileComponent = ({ user }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const openEditingDialog = () => {
    setDialogOpen(true);
  };
  return (
    <Grid container maxWidth="md" className="profile-block">
      <Grid container className="profile-block-header" justifyContent="center">
        <Grid
          container
          className="profile-block-avatar"
          xs={4}
          justifyContent="center"
        >
          <Grid item>
            <Avatar
              alt="logo"
              src={user.avatar}
              sx={{ width: 200, height: 200 }}
            />
          </Grid>
          <Grid item>
            <AvatarUpload user={user} />
          </Grid>
        </Grid>
        <Grid
          container
          className="profile-block-naming-contacts"
          xs={4}
          direction="column"
          justifyContent="space-between"
          textAlign="left"
        >
          <Grid
            container
            spacing={2}
            flexDirection="column"
            alignItems="flexStart"
            xs={4}
          >
            <Grid item>
              {user.username && (
                <Typography component="div">{user.username}</Typography>
              )}
            </Grid>
            <Grid item>
              {user.name && (
                <Typography component="div">{user.name}</Typography>
              )}
            </Grid>
          </Grid>

          <Grid container spacing={2} xs={8}>
            <Grid item>
              <Typography>Email:</Typography>
              {user.email && (
                <Typography component="div">{user.email}</Typography>
              )}
            </Grid>
            <Grid item>
              <Typography>Phone:</Typography>
              {user.phone && (
                <Typography component="div">{user.phone}</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
        <button type="button" onClick={openEditingDialog}>
          Добавить
        </button>
      </Grid>
      <ChangeProfileFormDialog
        isDialogOpened={dialogOpen}
        closeDialog={() => handleDialogClose()}
        user={user}
      />
    </Grid>
  );
};
ProfileComponent.propTypes = {
  user: PropTypes.shape(profilePropTypes),
};

export default ProfileComponent;
