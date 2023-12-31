// CSS
import styles from "./Home.module.css";

// hooks
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

// components
import PostDetail from "../../components/PostDetail";

const Home = () => {
  const [query, setQuery] = useState("");

  const { documents: posts, loading, error } = useFetchDocuments("posts", query);

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
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

      <div>
        {loading && <p>Carregando...</p>}
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
