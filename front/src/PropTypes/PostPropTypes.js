const PropTypes = require("prop-types");

module.exports = {
  logo: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  tag: PropTypes.string,
  text: PropTypes.string.isRequired,
  timestamp: PropTypes.instanceOf(Date).isRequired,
  retweet: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
};
