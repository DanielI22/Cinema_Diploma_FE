import { Link } from 'react-router-dom';
import { PATHS } from '../../../utils/constants';
import styles from './ValidatorHome.module.css';
import { useTranslation } from 'react-i18next';

const ValidatorHome = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.dashboard}>
            <h1 className={styles.header}>{t('validator')}</h1>
            <div className={styles.dashboardGrid}>
                <Link to={`${PATHS.VALIDATE_TICKET}`} className={styles.dashboardItem}>
                    {t('validateTicket')}
                </Link>
            </div>
        </div>
    );
}

export default ValidatorHome;
