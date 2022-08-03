import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import { getAllPosts } from "./api/crudPosts";
import PostContainer from "./post";

const PostsContainer = () => {
  const { isFetching, data } = useQuery("posts", () => getAllPosts());

  const posts = data?.data;
  const postsList = posts?.map((post) => (
    <Link
      to={`/posts/${post.post_id}`}
      key={post.post_id}
      className="post-link"
    >
      <PostContainer post={post} commentBtn />
    </Link>
  ));

  return (
    <>
      {isFetching && <div>Loading...</div>}
      {posts && <Container className="posts-container">{postsList}</Container>}
    </>
  );
};

export default PostsContainer;
