// CSS
import styles from "./Home.module.css";

// hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

// components

const Home = () => {
  const [query, setQuery] = useState("");
  const [posts] = useState([]);

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
        <h1>Posts...</h1>
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
