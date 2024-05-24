import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../../utils/constants';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.sidebar}>
            <button onClick={() => navigate(PATHS.MY_PROFILE)}>Profile</button>
            <button onClick={() => navigate(PATHS.FAVOURITES)}>Favourites</button>
            <button onClick={() => navigate(PATHS.MY_BOOKINGS)}>Bookings</button>
            <button onClick={() => navigate(PATHS.MY_TICKETS)}>Tickets</button>
        </div>
    );
};

export default Sidebar;
