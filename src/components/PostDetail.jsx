import styles from "./PostDetail.module.css";
import { Link } from "react-router-dom";
import { useDeleteDocument } from "../hooks/useDeleteDocument";

const PostDetail = ({ post, url }) => {
  const { deleteDocument, response } = useDeleteDocument("posts");
  
  return (
    <div className={styles.posts}>
      <div className={styles.post}>
        {response.loading && <p>Carregando...</p>}
        {response.error && <p>Houve algum erro!</p>}
        <p className={styles.post_createdby}>Por: {post.createdBy}</p>
        <img src={post.image} alt={post.title}></img>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <ul className={styles.tagsArray}>
          {post.tagsArray.map((tag) => (
            <li key={tag}>
              <span>#</span>
              {tag}
            </li>
          ))}
        </ul>
        {!url && url !== "postFocus" && (
          <Link to={`/posts/${post.id}`} className="btn btn-outline">
            Ver
          </Link>
        )}

        {url && url === "dashboard" && (
          <>
            <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">
              Editar
            </Link>
            <Link
              onClick={() => deleteDocument(post.id)}
              className="btn btn-outline btn-danger"
            >
              Excluír
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
