import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../../utils/constants';
import styles from './UserSidebar.module.css';
import { useTranslation } from 'react-i18next';

const UserSidebar = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className={styles.sidebar}>
            <button onClick={() => navigate(PATHS.MY_PROFILE)}>{t('profile')}</button>
            <button onClick={() => navigate(PATHS.FAVOURITES)}>{t('favourites')}</button>
            <button onClick={() => navigate(PATHS.MY_BOOKINGS)}>{t('bookings')}</button>
            <button onClick={() => navigate(PATHS.MY_TICKETS)}>{t('tickets')}</button>
        </div>
    );
};

export default UserSidebar;
