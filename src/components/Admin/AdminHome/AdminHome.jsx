import { Link } from 'react-router-dom';
import { PATHS } from '../../../utils/constants';
import styles from './AdminHome.module.css';

const AdminHome = () => {
  return (
    <div className={styles.dashboard}>
    <h1 className={styles.header}>Manage Your Cinemas</h1>
    <div className={styles.dashboardGrid}>
      <Link to={PATHS.MANAGE_CINEMAS} className={styles.dashboardItem}>Manage Cinemas</Link>
      <Link to={PATHS.MANAGE_HALLS} className={styles.dashboardItem}>Manage Halls</Link>
      <Link to={PATHS.MANAGE_MOVIES} className={styles.dashboardItem}>Manage Movies</Link>
      <Link to={PATHS.MANAGE_GENRES} className={styles.dashboardItem}>Manage Genres</Link>
      <Link to={PATHS.MANAGE_SHOWTIMES} className={styles.dashboardItem}>Manage Showtimes</Link>
      <Link to={PATHS.MANAGE_BOOKINGS} className={styles.dashboardItem}>Manage Bookings</Link>
      <Link to={PATHS.MANAGE_TICKETS} className={styles.dashboardItem}>Manage Tickets</Link>
      <Link to={PATHS.MANAGE_USERS} className={styles.dashboardItem}>Manage Users</Link>
    </div>
  </div>
  );
}

export default AdminHome;