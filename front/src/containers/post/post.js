import { ShowPost } from "../../components/post/post";

function PostContainer({
  logo,
  username,
  tag,
  text,
  timestamp,
  retweet,
  likes,
}) {
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
}

export default PostContainer;
