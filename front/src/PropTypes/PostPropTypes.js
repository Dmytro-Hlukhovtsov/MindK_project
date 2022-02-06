const PropTypes = require("prop-types");

module.exports = {
  avatar: PropTypes.string,
  username: PropTypes.string.isRequired,
  tag: PropTypes.string,
  text: PropTypes.string.isRequired,
  created_time: PropTypes.string.isRequired,
  total_comments: PropTypes.number.isRequired,
  total_likes: PropTypes.number.isRequired,
};
