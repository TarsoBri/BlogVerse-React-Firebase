// CSS
import { Link } from "react-router-dom";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o Blog<span>Verse</span>
      </h2>
      <p>
        O BlogVerse é um projeto com o objetivo de criar e navegar por posts de
        diversos usuários.
      </p>
      <p>
        Este é um projeto que foi feito com React no Front-end e Firebase para
        parte do Back-end.
      </p>
      <Link to="/posts/create" className="btn">
        Crie seu post!
      </Link>
    </div>
  );
};

export default About;
