import styles from "./CreatePost.module.css";
import { useEffect, useState } from "react";
import { useAuthValue } from "../../contexts/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormError("");

    if (!title || !image || !body || !tags) {
      setFormError("Por favor, preencha todos os campos!");
      return;
    }

    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
      return;
    }

    const tagsArray = tags
      .split(",")
      .map((tag) => "#" + tag.trim().toLowerCase());

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });
  };

  useEffect(() => {
    navigate(response.go);
  }, [response.go]);

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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            rows={4}
          ></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira tags.."
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
          <p className={styles.obs}>Obs: Insira as tags separadas por vírgula.</p>
        </label>

        {!response.loading && (
          <input type="submit" value={"Criar Post"} className="btn" />
        )}
        {response.loading && (
          <input type="submit" value={"Aguarde..."} className="btn" disabled />
        )}
        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
