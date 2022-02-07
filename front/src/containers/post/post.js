import PropTypes from "prop-types";
import { ShowPost } from "../../components/post/post";

const postPropTypes = require("../../PropTypes/PostPropTypes");

const PostContainer = ({ post }) => <ShowPost post={post} />;

PostContainer.propTypes = {
  post: PropTypes.shape(postPropTypes),
};

PostContainer.defaultProps = {
  post: {
    tag: null,
  },
};

export default PostContainer;
