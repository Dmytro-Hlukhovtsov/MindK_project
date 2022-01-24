const PropTypes = require("prop-types");

module.exports = {
  line1: PropTypes.string.isRequired,
  line2: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  zip: PropTypes.number.isRequired,
};
