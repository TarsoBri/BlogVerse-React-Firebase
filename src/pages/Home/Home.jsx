// CSS
import styles from "./Home.module.css";

// hooks
import { Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

// components

const Home = () => {
  const [query, setQuery] = useState("");

  const { documents: posts, loading, error } = useFetchDocuments("posts");

  const handleSubmit = () => {};

  return (
    <div>
      <h1>Navegue pelos post mais recentes</h1>
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
        {posts && posts.map((post) => (
          <h3>{post.title}</h3>
        ))}

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
