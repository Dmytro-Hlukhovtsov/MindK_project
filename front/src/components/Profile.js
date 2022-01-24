const ProfilePropTypes = require("../PropTypes/ProfilePropTypes");

const Profile = (user) => (
  <h3>
    User Object:
    {JSON.stringify(user)}
  </h3>
);

Profile.propTypes = ProfilePropTypes;

export default Profile;
