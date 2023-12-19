import styles from "./Login.module.css";
import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      password,
    };

    await login(user);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div>
      <h1>Entrar</h1>
      <p>Faça seu Login de usuário!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            placeholder="E-mail do usuário"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            placeholder="Insira sua senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <p>
          Não possui conta?{" "}
          <Link to="/register" className={styles.link}>
            Cadastra-se aqui!
          </Link>
        </p>

        {!loading && <input type="submit" value={"Entrar"} className="btn" />}
        {loading && (
          <input type="submit" value={"Aguarde..."} className="btn" disabled />
        )}
        {error && <span className="error">{error}</span>}
      </form>
    </div>
  );
};

export default Login;
