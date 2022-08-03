import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import PostContainer from "./post";
import { getOnePost } from "./api/crudPosts";

const OnePostContainer = () => {
  const { id } = useParams();
  const { isFetching, data } = useQuery("posts", () => getOnePost(id));
  const post = data?.data[0] || null;

  return (
    <>
      {isFetching && <h3>Loading...</h3>}
      {post && <PostContainer post={post} commentBtn={false} />}
    </>
  );
};

export default OnePostContainer;
