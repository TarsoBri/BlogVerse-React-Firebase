import styles from "./Dashboard.module.css";
import PostDetail from "../../components/PostDetail";

//hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useAuthValue } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const {
    documents: posts,
    loading,
    error,
  } = useFetchDocuments("posts", null, uid);

  return (
    <div>
      <h1>Painel</h1>

      {loading && <p>Carregando...</p>}
      {posts && posts.length !== 0 ? (
        <div className={styles.post}>
          <p>Gerencie seus posts aqui:</p>
          {posts.map((post) => (
            <PostDetail post={post} url="dashboard" key={post.id} />
          ))}
        </div>
      ) : (
        <div className={styles.nopost}>
          <p>Você não possui nenhum post ainda</p>
          <Link to="/posts/create" className="btn">
            Criar seu primeiro post
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
