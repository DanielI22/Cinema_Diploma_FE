import styles from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';
import { PATHS, ROLES } from '../../utils/constants';
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

    const location = useLocation();
    const { selectedCinema } = useCinema();

    const renderUserRoleSpecificOptions = () => {
        if (userDetails.role === ROLES.USER) {
            return (
                <>
                    <Link to={PATHS.FAVOURITES}>Favourites</Link>
                    <Link to={PATHS.MY_BOOKINGS}>Bookings</Link>
                    <Link to={PATHS.MY_TICKETS}>Tickets</Link>
                </>
            );
        }
        if (userDetails.role === ROLES.OPERATOR) {
            return (
                <>
                    <Link to={PATHS.TICKET_HISTORY}>Tickets History</Link>
                    <Link to={PATHS.SELECT_CINEMA}>Change Cinema</Link>
                </>
            );
        }
        if ([ROLES.VALIDATOR, ROLES.PROJECTOR].includes(userDetails.role)) {
            return <Link to={PATHS.SELECT_CINEMA}>Change Cinema</Link>;
        }
        return null;
    };

    const renderProfileDropdown = () => {
        const cinemaName = selectedCinema ? ` - ${selectedCinema.name}` : '';
        return (
            <div className={styles.profileDropdown}>
                <Link to={PATHS.MY_PROFILE}>{userDetails.username}{cinemaName} <FontAwesomeIcon icon={faCaretDown} /></Link>
                <div className={styles.dropdownContent}>
                    {renderUserRoleSpecificOptions()}
                </div>
            </div>
        );
    };


    const renderMiddleSection = () => {
        switch (userDetails.role) {
            case ROLES.ADMIN:
            case ROLES.OPERATOR:
            case ROLES.VALIDATOR:
            case ROLES.PROJECTOR:
                return <Link to={PATHS.HOME}>Dashboard</Link>;
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
                        <Link to={{ pathname: PATHS.LOGIN, state: { from: location } }}>Login</Link>
                        <Link to={PATHS.REGISTER}>Register</Link>
                    </>
                )}
                <LanguageToggleButton />
            </div>
        </header>
    );
}
