const PropTypes = require("prop-types");
const FilePropTypes = require("./FilePropTypes");
const AddressPropTypes = require("./AddressPropTypes");

module.exports = {
  name: PropTypes.string,
  age: PropTypes.string,
  avatar: PropTypes.shape({
    file: PropTypes.shape(FilePropTypes).isRequired,
  }).isRequired,
  files: PropTypes.arrayOf(PropTypes.shape(FilePropTypes).isRequired),
  addrr: PropTypes.shape({
    main: PropTypes.shape(AddressPropTypes).isRequired,
    alt: PropTypes.shape(AddressPropTypes),
  }),
};
