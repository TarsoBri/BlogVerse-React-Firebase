import styles from "./PostDetail.module.css";
import { Link } from "react-router-dom";

const PostDetail = ({ post }) => {
  return (
    <div className={styles.post}>
      <p className={styles.post_createdby}>Por: {post.createdBy}</p>
      <img src={post.image} alt={post.title}></img>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <ul className={styles.tagsArray}>
        {post.tagsArray.map((tag) => (
          <li key={tag}><span>#</span>{tag}</li>
        ))}
      </ul>
      <Link to={`/posts/${post.id}`} className="btn btn-outline">
        Ler
      </Link>
    </div>
  );
};

export default PostDetail;
