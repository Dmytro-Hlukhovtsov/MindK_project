import PropTypes from "prop-types";

const profilePropTypes = require("../../PropTypes/ProfilePropTypes");

const ProfileComponent = ({ user }) => (
  <div className="profile-block">
    <div className="profile-block-header">
      <div className="profile-block-avatar">
        <img src={user.avatar} alt="avatar" />
        <form
          className="add-avatar-form"
          action={`http://localhost:3001/files/${user.user_id}/avatar`}
          encType="multipart/form-data"
          method="POST"
        >
          <input type="file" name="user-avatar" />
          <button type="submit"> Добавить аватар </button>
        </form>
      </div>
      <div className="profile-block-naming">
        <h3>{user.username}</h3>
        <h3>{user.name}</h3>
      </div>
      <button type="button">Добавить</button>
    </div>
    <div className="profile-block-contacts">
      <h3>Phone</h3>
      <h3>{user.email}</h3>
    </div>
  </div>
);

ProfileComponent.propTypes = {
  user: PropTypes.shape(profilePropTypes),
};

ProfileComponent.defaultProps = {
  user: {
    avatar: "http://localhost:3001/uploads/avatars/default.png",
    name: null,
    email: null,
  },
};

export default ProfileComponent;
