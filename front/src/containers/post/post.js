import { ShowPost } from "../../components/post/post";

const postPropTypes = require("../../PropTypes/PostPropTypes");

const PostContainer = ({
  logo,
  username,
  tag,
  text,
  timestamp,
  retweet,
  likes,
}) => {
  const headerVars = {
    logo,
    username,
    tag,
  };

  const bodyVars = {
    text,
    timestamp,
  };

  const footerVars = {
    retweet,
    likes,
  };

  return <ShowPost header={headerVars} body={bodyVars} footer={footerVars} />;
};

PostContainer.propTypes = postPropTypes;

PostContainer.defaultProps = {
  tag: null,
};

export default PostContainer;
