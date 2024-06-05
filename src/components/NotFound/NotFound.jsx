import { Link } from "react-router-dom";
import styles from './NotFound.module.css';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.header}>{t('notFoundTitle')}</h1>
      <p className={styles.description}>{t('notFoundDescription')}</p>
      <Link to="/" className={styles.homeLink}>{t('backToHome')}</Link>
    </div>
  );
}
