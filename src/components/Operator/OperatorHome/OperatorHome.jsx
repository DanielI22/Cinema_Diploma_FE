import { Link } from 'react-router-dom';
import { PATHS } from '../../../utils/constants';
import styles from './OperatorHome.module.css';
import { useCinema } from '../../../contexts/cinemaContext';

const OperatorHome = () => {
    const { selectedCinema } = useCinema();

    return (
        <div className={styles.dashboard}>
            <h1 className={styles.header}>Operator</h1>
            <div className={styles.dashboardGrid}>
                <Link to={`${PATHS.PROGRAM}/${selectedCinema.id}`} className={styles.dashboardItem}>Sell tickets</Link>
                <Link to={PATHS.VALIDATE_BOOKING} className={styles.dashboardItem}>Validate a booking</Link>
            </div>
        </div>
    );
}

export default OperatorHome;