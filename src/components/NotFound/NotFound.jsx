import { Link } from "react-router-dom";
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.header}>404</h1>
      <p className={styles.description}>The page you are looking for does not exist.</p>
      <Link to="/" className={styles.homeLink}>Back to Home</Link>
    </div>
  );
}