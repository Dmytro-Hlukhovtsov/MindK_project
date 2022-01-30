const PropTypes = require("prop-types");

module.exports = {
  logo: PropTypes.string,
  username: PropTypes.string.isRequired,
  tag: PropTypes.string,
  text: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  retweet: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
};
