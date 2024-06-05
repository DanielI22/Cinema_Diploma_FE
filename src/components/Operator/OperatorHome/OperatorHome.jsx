import { Link } from 'react-router-dom';
import { PATHS } from '../../../utils/constants';
import styles from './OperatorHome.module.css';
import { useCinema } from '../../../contexts/cinemaContext';
import { useTranslation } from 'react-i18next';

const OperatorHome = () => {
    const { selectedCinema } = useCinema();
    const { t } = useTranslation();

    return (
        <div className={styles.dashboard}>
            <h1 className={styles.header}>{t('operator')}</h1>
            <div className={styles.dashboardGrid}>
                <Link to={`${PATHS.PROGRAM}/${selectedCinema.id}`} className={styles.dashboardItem}>{t('sellTickets')}</Link>
                <Link to={PATHS.VALIDATE_BOOKING} className={styles.dashboardItem}>{t('validateBooking')}</Link>
            </div>
        </div>
    );
}

export default OperatorHome;
