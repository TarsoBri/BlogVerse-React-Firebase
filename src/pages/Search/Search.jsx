import styles from "./Search.module.css";

// hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  return (
    <div>
      <h1>Resultado:</h1>
      <p>{search}</p>
    </div>
  );
};

export default Search;
