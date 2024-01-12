import styles from "./EditPost.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../contexts/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const { id } = useParams();

  
  const { document: post } = useFetchDocument("posts", id);
  
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);
      const textTags = post.tagsArray.join(", ");
      setTags(textTags);
    }
  }, [post]);
  
  const { updateDocument, response } = useUpdateDocument("posts");

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

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    }

    updateDocument(id, data);
  };

  useEffect(() => {
    navigate(response.go);
  }, [response.go]);

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editar post: {post.title}</h2>

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
            <p className={styles.text_img}>Imagem atual:</p>
            <img src={post.image} className={styles.img} />
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
              <p className={styles.obs}>
                Obs: Insira as tags separadas por vírgula.
              </p>
            </label>

            {!response.loading && (
              <input type="submit" value={"Editar"} className="btn" />
            )}
            {response.loading && (
              <input
                type="submit"
                value={"Aguarde..."}
                className="btn"
                disabled
              />
            )}
            {(response.error || formError) && (
              <p className="error">{response.error || formError}</p>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
