import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { PATHS } from '../../utils/constants';
import { useAuth } from '../../contexts/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import LanguageToggleButton from '../LanguageToggleButton/LanguageToggleButton';

export default function Header() {
    const {
        isAuthenticated,
        userDetails,
    } = useAuth();
    return (
        <header className={styles.header}>
            <Link to={PATHS.HOME}><img className={styles.logo} src="/logo.png" alt="YourCinema" /></Link>
            <div className={styles.navLeft}>
                <Link to={PATHS.MOVIES}>Our Movies</Link>
            </div>
            <div className={styles.navRight}>
                {isAuthenticated ? (
                    <>
                        <div className={styles.profileDropdown}>
                            <button className={styles.profileButton}>
                                {userDetails.username} <FontAwesomeIcon icon={faCaretDown} />
                            </button>
                            <div className={styles.dropdownContent}>
                                <Link to={PATHS.RESERVATIONS}>Reservations</Link>
                                <Link to={PATHS.FAVOURITES}>Favourites</Link>
                            </div>
                        </div>
                        <Link to={PATHS.LOGOUT}>Log out</Link>
                    </>
                ) : (
                    <>
                        <Link to={PATHS.LOGIN}>Login</Link>
                        <Link to={PATHS.REGISTER}>Register</Link>
                    </>
                )}
                <LanguageToggleButton />
            </div>
        </header>
    );
}
