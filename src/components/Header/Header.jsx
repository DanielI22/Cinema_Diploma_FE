import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { PATHS } from '../../utils/constants';
import { useAuth } from '../../contexts/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import LanguageToggleButton from '../LanguageToggleButton/LanguageToggleButton';
import { useCinema } from '../../contexts/cinemaContext';

export default function Header() {
    const {
        isAuthenticated,
        userDetails
    } = useAuth();

    const { selectedCinema } = useCinema();

    const renderUserRoleSpecificOptions = () => {
        if (userDetails.role === 'user') {
            return (
                <>
                    <Link to={PATHS.RESERVATIONS}>Reservations</Link>
                    <Link to={PATHS.FAVOURITES}>Favourites</Link>
                </>
            );
        }
        if (['operator', 'validator', 'projector'].includes(userDetails.role) && selectedCinema) {
            return <Link to={PATHS.SELECT_CINEMA}>Change Cinema</Link>;
        }
        return null;
    };

    const renderProfileDropdown = () => {
        const cinemaName = selectedCinema ? ` - ${selectedCinema.name}` : '';
        return (
            <div className={styles.profileDropdown}>
                <button className={styles.profileButton}>
                    {userDetails.username}{cinemaName} <FontAwesomeIcon icon={faCaretDown} />
                </button>
                <div className={styles.dropdownContent}>
                    {renderUserRoleSpecificOptions()}
                </div>
            </div>
        );
    };


    const renderMiddleSection = () => {
        switch (userDetails.role) {
            case 'admin':
                return <Link to={PATHS.HOME}>Dashboard</Link>;
            case 'operator':
            case 'validator':
            case 'projector':
                return <div>{userDetails.role.toUpperCase()}</div>;
            default:
                return (
                    <div className={styles.navLeft}>
                        <Link to={PATHS.MOVIES}>Movies</Link>
                        <Link to={PATHS.PROGRAM}>Program</Link>
                    </div>
                );
        }
    };


    return (
        <header className={styles.header}>
            <Link to={PATHS.HOME}><img className={styles.logo} src="/logo.png" alt="YourCinema" /></Link>
            {renderMiddleSection()}
            <div className={styles.navRight}>
                {isAuthenticated ? (
                    <>
                        {renderProfileDropdown()}
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
