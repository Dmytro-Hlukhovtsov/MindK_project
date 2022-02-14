import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import PostContainer from "./post";
import { getOnePost } from "./api/crudPosts";

const OnePostContainer = () => {
  const postID = useParams().id;
  const { isFetching, data } = useQuery("posts", () => getOnePost(postID));
  const post = data?.data[0] || null;

  return (
    <>
      {isFetching && <h3>Loading...</h3>}
      {post && <PostContainer post={post} />}
    </>
  );
};

export default OnePostContainer;
