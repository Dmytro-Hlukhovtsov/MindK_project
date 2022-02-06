const PropTypes = require("prop-types");

module.exports = {
  user_id: PropTypes.number.isRequired,
  avatar: PropTypes.string,
  username: PropTypes.string.isRequired,
  name: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
};
