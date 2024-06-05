import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../../utils/constants';
import styles from './OperatorSidebar.module.css';
import { useTranslation } from 'react-i18next';

const OperatorSidebar = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className={styles.sidebar}>
            <button onClick={() => navigate(PATHS.MY_PROFILE)}>{t('profile')}</button>
            <button onClick={() => navigate(PATHS.TICKET_HISTORY)}>{t('ticketsHistory')}</button>
            <button onClick={() => navigate(PATHS.SELECT_CINEMA)}>{t('changeCinema')}</button>
        </div>
    );
};

export default OperatorSidebar;
