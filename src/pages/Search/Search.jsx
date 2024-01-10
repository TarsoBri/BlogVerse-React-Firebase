import styles from "./Search.module.css";
import { Link } from "react-router-dom";

// components
import PostDetail from "../../components/PostDetail";

// hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <div>
      <h2>Resultados a partir de: {search}</h2>
      {posts && posts.length === 0 && (
        <>
          <p className={styles.search_p}>
            Não foram encontrados posts com essa busca...
          </p>
          <Link to="/" className="btn btn-dark">
            Voltar
          </Link>
        </>
      )}
      {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
    </div>
  );
};

export default Search;
