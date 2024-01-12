import styles from "./PostFocus.module.css";

//hooks
import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import PostDetail from "../../components/PostDetail";

const PostFocus = () => {
  const { id } = useParams();
  const { document: post, loading, error } = useFetchDocument("posts", id);

  return (
    <>
      {loading && <p>Carregando...</p>}
      {error && <p>Houve algum erro!</p>}
      {post && <PostDetail post={post} url="postFocus"/>}
    </>
  );
};

export default PostFocus;
