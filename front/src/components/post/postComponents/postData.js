import PropTypes from "prop-types";
import React from "react";

const PostDate = ({ time, date }) => (
  <p className="date">
    {time} - {date}
  </p>
);

PostDate.propTypes = {
  time: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default PostDate;
