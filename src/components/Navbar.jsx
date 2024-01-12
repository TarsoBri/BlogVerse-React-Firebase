import styles from "./Navbar.module.css";

import { useState } from "react";
import { NavLink } from "react-router-dom";

import { useAuthValue } from "../contexts/AuthContext";

import { useAuthentication } from "../hooks/useAuthentication";

const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  const [menu, setMenu] = useState();

  const updateMenu = () {

  }

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.logo}>
        Blog<span>Verse</span>
      </NavLink>

      <div className={styles.menu} onClick={updateMenu}>
        <div className={styles.menu_icon}></div>
        <div className={styles.menu_icon}></div>
        <div className={styles.menu_icon}></div>
      </div>

      {/* <ul className={styles.navbar_list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Início
          </NavLink>
        </li>

        {!user && (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Cadastrar-se
              </NavLink>
            </li>
          </>
        )}

        {user && (
          <>
            <li>
              <NavLink
                to="/posts/create"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Novo post
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Painel
              </NavLink>
            </li>
          </>
        )}

        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>
        </li>

        {user && (
          <li>
            <button onClick={logout}>Sair</button>
          </li>
        )}
      </ul> */}
    </nav>
  );
};

export default Navbar;
