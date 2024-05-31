import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../../utils/constants';
import styles from './OperatorSidebar.module.css';

const OperatorSidebar = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.sidebar}>
            <button onClick={() => navigate(PATHS.MY_PROFILE)}>Profile</button>
            <button onClick={() => navigate(PATHS.TICKET_HISTORY)}>Tickets History</button>
            <button onClick={() => navigate(PATHS.SELECT_CINEMA)}>Change Cinema</button>
        </div>
    );
};

export default OperatorSidebar;
