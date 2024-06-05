import { Link } from 'react-router-dom';
import { PATHS } from '../../../utils/constants';
import styles from './AdminHome.module.css';
import { useTranslation } from 'react-i18next';

const AdminHome = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.header}>{t('manageYourCinemas')}</h1>
      <div className={styles.dashboardGrid}>
        <Link to={PATHS.MANAGE_CINEMAS} className={styles.dashboardItem}>{t('manageCinemas')}</Link>
        <Link to={PATHS.MANAGE_HALLS} className={styles.dashboardItem}>{t('manageHalls')}</Link>
        <Link to={PATHS.MANAGE_MOVIES} className={styles.dashboardItem}>{t('manageMovies')}</Link>
        <Link to={PATHS.MANAGE_GENRES} className={styles.dashboardItem}>{t('manageGenres')}</Link>
        <Link to={PATHS.MANAGE_SHOWTIMES} className={styles.dashboardItem}>{t('manageShowtimes')}</Link>
        <Link to={PATHS.MANAGE_USERS} className={styles.dashboardItem}>{t('manageUsers')}</Link>
      </div>
    </div>
  );
}

export default AdminHome;
