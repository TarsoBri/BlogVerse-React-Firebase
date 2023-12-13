import styles from "./Register.module.css";

import { useState, useEffect } from "react";

import { useAuthentication } from "../../hooks/useAuthentication";

import { Link } from "react-router-dom";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayName,
      email,
      password,
    };

    if (password !== confirmedPassword) {
      setError("As senhas precisam ser iguais!");
      return;
    }

    const res = await createUser(user);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div>
      <h1>Cadastra-se para ingressar</h1>
      <p>Crie seu usuário e compartilhe seus momentos!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            placeholder="Nome do usuário"
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
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
        <label>
          <span>Confirmação de senha:</span>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirme sua senha"
            required
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
          />
        </label>

        <p>
          Já possui cadastro?{" "}
          <Link to="/login" className={styles.link}>
            Entrar aqui!
          </Link>
        </p>

        {!loading && (
          <input type="submit" value={"Cadastrar-se"} className="btn" />
        )}
        {loading && (
          <input type="submit" value={"Aguarde..."} className="btn" disabled />
        )}
        {error && <span className="error">{error}</span>}
      </form>
    </div>
  );
};

export default Register;
