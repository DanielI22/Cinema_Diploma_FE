import { Link } from 'react-router-dom';
import { PATHS } from '../../../utils/constants';
import styles from './ValidatorHome.module.css';
import { useCinema } from '../../../contexts/cinemaContext';
import { useTranslation } from 'react-i18next';

const ValidatorHome = () => {
    const { selectedCinema } = useCinema();
    const { t } = useTranslation();

    return (
        <div className={styles.dashboard}>
            <h1 className={styles.header}>{t('validator')}</h1>
            <div className={styles.dashboardGrid}>
                <Link to={`${PATHS.PROGRAM}/${selectedCinema.id}`} className={styles.dashboardItem}>
                    {t('validateTicket')}
                </Link>
            </div>
        </div>
    );
}

export default ValidatorHome;
