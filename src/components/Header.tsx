import { Link } from "react-router-dom";
import styles from "../styles/header.module.css";
export default function Header() {
  return (
    <div className={styles.header}>
      <Link className={styles.link} to={"/"}>
        Noti
      </Link>
    </div>
  );
}
