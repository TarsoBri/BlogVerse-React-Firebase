// CSS
import styles from "./Home.module.css";

// hooks
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

// components
import PostDetail from "../../components/PostDetail";

// loading
import Loader from "../../components/Loader";

const Home = () => {
  const [query, setQuery] = useState("");

  const { documents: posts, loading, error } = useFetchDocuments("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      return navigate(`/search?q=${query.toLowerCase()}`);
    }
  };

  return (
    <div>
      <h1>Navegue pelos posts mais recentes</h1>
      <form className={styles.search} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Busque por tags..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn">Pesquisar</button>
      </form>
      <p className={styles.obs}>Obs: pesquise sem #</p>

      <div>
        {loading && <Loader />}

        {error && <h3>Houve algum erro...</h3>}

        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}

        {posts && posts.length === 0 && (
          <div className={styles.nopost}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">
              Criar post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
