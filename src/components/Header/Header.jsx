import styles from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';
import { PATHS, ROLES } from '../../utils/constants';
import { useAuth } from '../../contexts/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import LanguageToggleButton from '../LanguageToggleButton/LanguageToggleButton';
import { useCinema } from '../../contexts/cinemaContext';
import { useTranslation } from 'react-i18next';

export default function Header() {
    const { t } = useTranslation();
    const { isAuthenticated, userDetails } = useAuth();
    const location = useLocation();
    const { selectedCinema } = useCinema();

    const renderUserRoleSpecificOptions = () => {
        if (userDetails.role === ROLES.USER) {
            return (
                <>
                    <Link to={PATHS.FAVOURITES}>{t('favourites')}</Link>
                    <Link to={PATHS.MY_BOOKINGS}>{t('bookings')}</Link>
                    <Link to={PATHS.MY_TICKETS}>{t('tickets')}</Link>
                </>
            );
        }
        if (userDetails.role === ROLES.OPERATOR) {
            return (
                <>
                    <Link to={PATHS.TICKET_HISTORY}>{t('ticketsHistory')}</Link>
                    <Link to={PATHS.SELECT_CINEMA}>{t('changeCinema')}</Link>
                </>
            );
        }
        if ([ROLES.VALIDATOR, ROLES.PROJECTOR].includes(userDetails.role)) {
            return <Link to={PATHS.SELECT_CINEMA}>{t('changeCinema')}</Link>;
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
                return <Link to={PATHS.HOME}>{t('dashboard')}</Link>;
            default:
                return (
                    <div className={styles.navLeft}>
                        <Link to={PATHS.MOVIES}>{t('movies')}</Link>
                        <Link to={PATHS.PROGRAM}>{t('program')}</Link>
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
                        <Link to={PATHS.LOGOUT}>{t('logout')}</Link>
                    </>
                ) : (
                    <>
                        <Link to={{ pathname: PATHS.LOGIN, state: { from: location } }}>{t('login')}</Link>
                        <Link to={PATHS.REGISTER}>{t('register')}</Link>
                    </>
                )}
                <LanguageToggleButton />
            </div>
        </header>
    );
}
