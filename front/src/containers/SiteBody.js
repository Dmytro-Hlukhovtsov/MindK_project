import avatar from "../img/avatar.png";
import PostContainer from "./post/post";
import AddPost from "../components/AddPost";

const post = {
  logo: avatar,
  username: "username",
  tag: "tag",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  timestamp: new Date(),
  retweet: 34,
  likes: 260,
};

function SiteBody({ viewBlock }) {
  if (viewBlock === "posts") {
    return (
      <PostContainer
        logo={post.logo}
        username={post.username}
        tag={post.tag}
        text={post.text}
        timestamp={post.timestamp}
        retweet={post.retweet}
        likes={post.likes}
      />
    );
  }
  if (viewBlock === "addPost") {
    return <AddPost />;
  }
  return "Здесь будет Профиль";
}
export default SiteBody;
