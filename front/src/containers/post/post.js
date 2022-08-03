import PropTypes from "prop-types";
import ShowPost from "../../components/post/post";

const postPropTypes = require("../../PropTypes/PostPropTypes");

const PostContainer = ({ post, commentBtn }) => (
  <ShowPost post={post} commentBtn={commentBtn} />
);

PostContainer.propTypes = {
  post: PropTypes.shape(postPropTypes),
  commentBtn: PropTypes.bool,
};

PostContainer.defaultProps = {
  post: {
    tag: null,
  },
};

export default PostContainer;
