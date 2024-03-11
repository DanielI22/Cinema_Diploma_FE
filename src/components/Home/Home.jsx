import { useTranslation } from 'react-i18next';
import styles from './Home.module.css'
// import MovieCarousel from '../../components/MovieCarousel/MovieCarousel';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 min-h-[90vh]">
      <h1 className={styles.welcomeTitle}>{t('welcomeMessage')}</h1>
      <p className={styles.welcomeDescription}>
      {t('descriptionMessage')}
      </p>
      <h2 className={styles.upcomingShowingsTitle}>{t('upcomingMessage')}</h2>
      {/* <MovieCarousel /> */}
    </div>
  );
}