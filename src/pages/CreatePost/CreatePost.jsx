import styles from "./CreatePost.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../contexts/AuthContext";

const CreatePost = () => {
  const { title, setTitle } = useState("");
  const { image, setImage } = useState("");
  const { body, setBody } = useState("");
  const { tags, setTags } = useState([]);
  const { formError, setFormError } = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className={styles.create_post}>
      <h2>Criar Post</h2>
      <p>Compartilhe momentos!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Insira um título..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            name="image"
            required
            placeholder="Insira uma imagem..."
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            required
            placeholder="Insira um conteúdo..."
            onChange={(e) => setBody(e.target.value)}
            value={body}
            rows={5}
          ></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira as tags separadas por vírgula."
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>

        {/* {!loading && (
          <input type="submit" value={"Cadastrar-se"} className="btn" />
        )}
        {loading && (
          <input type="submit" value={"Aguarde..."} className="btn" disabled />
        )}
        {error && <span className="error">{error}</span>} */}
      </form>
    </div>
  );
};

export default CreatePost;
