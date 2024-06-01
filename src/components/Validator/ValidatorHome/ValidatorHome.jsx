import { Link } from 'react-router-dom';
import { PATHS } from '../../../utils/constants';
import styles from './ValidatorHome.module.css';
import { useCinema } from '../../../contexts/cinemaContext';

const ValidatorHome = () => {
    const { selectedCinema } = useCinema();

    return (
        <div className={styles.dashboard}>
            <h1 className={styles.header}>Validator</h1>
            <div className={styles.dashboardGrid}>
                <Link to={`${PATHS.PROGRAM}/${selectedCinema.id}`} className={styles.dashboardItem}>Validate a ticket</Link>
            </div>
        </div>
    );
}

export default ValidatorHome;