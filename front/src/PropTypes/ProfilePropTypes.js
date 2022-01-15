const PropTypes = require("prop-types");
const UserPropTypes = require("./UserPropTypes");

UserPropTypes.friends = PropTypes.arrayOf(PropTypes.shape(UserPropTypes));

module.exports = {
  user: PropTypes.shape(UserPropTypes).isRequired,
};
