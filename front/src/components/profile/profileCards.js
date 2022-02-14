import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";

const userPropTypes = require("../../PropTypes/UserPropTypes");

const ProfilesComponent = ({ profile }) => (
  <Paper sx={{ p: 2, margin: "auto", maxWidth: 500, flexGrow: 1 }}>
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Avatar alt="Avatar" src={profile.avatar} />
      </Grid>
      <Grid item>
        <Typography component="div">{profile.name && profile.name}</Typography>
      </Grid>
      <Grid item>
        <Button variant="contained">Add</Button>
      </Grid>
    </Grid>
  </Paper>
);

ProfilesComponent.propTypes = {
  profile: PropTypes.shape(userPropTypes),
};

export default ProfilesComponent;
