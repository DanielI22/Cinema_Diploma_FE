import { useTranslation } from 'react-i18next';
import styles from './Home.module.css';
import MovieCarousel from '../MovieCarousel/MovieCarousel';
import { PATHS } from '../../../utils/constants';
import { Link } from 'react-router-dom';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4">
      <h1 className={styles.welcomeTitle}>{t('welcome')}</h1>
      <p className={styles.welcomeDescription}>
        {t('description')}
      </p>
      <h2 className={styles.upcomingShowingsTitle}>{t('upcoming')}</h2>
      <MovieCarousel />
      <div className={styles.programButtonContainer}>
        <Link to={PATHS.PROGRAM} className={styles.programButton}>{t('getTickets')}</Link>
      </div>
    </div>
  );
}
