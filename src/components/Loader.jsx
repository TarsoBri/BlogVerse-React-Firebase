import styles from "./Loader.module.css";
import { Oval } from "react-loading-icons";

const Loader = () => {
  return (
    <div className={styles.loading_icon}>
      <Oval />
    </div>
  );
};

export default Loader;
