import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './ShowtimeManagementPage.module.css';
import * as showtimeService from '../../../services/showtimeService';
import { PATHS } from '../../../utils/constants';
import { groupShowtimesByCinemaAndMovie } from '../../../utils/functions';
import Spinner from '../../Spinner/Spinner';
import DeleteModal from '../../DeleteModal/DeleteModal';
import useDeleteModal from '../../../hooks/useDeleteModal';
import ShowtimeGroup from './ShowtimeGroup';
import { useTranslation } from 'react-i18next';

const ShowtimeManagementPage = () => {
    const { t } = useTranslation();
    const [showtimes, setShowtimes] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);
    const { isModalVisible, showDeleteModal, hideDeleteModal, confirmDeletion } = useDeleteModal();

    useEffect(() => {
        fetchShowtimesByDate(selectedDate);
    }, [selectedDate]);

    const fetchShowtimesByDate = async (date) => {
        setIsLoading(true);
        const formattedDate = date.toISOString().split('T')[0];
        const response = await showtimeService.getByDate(formattedDate);
        setShowtimes(response.showtimes);
        setIsLoading(false);
    };

    const handleDeleteShowtime = async (showtimeId) => {
        setIsLoading(true);
        await showtimeService.deleteShowtime(showtimeId);
        fetchShowtimesByDate(selectedDate);
        setIsLoading(false);
    };

    if (isLoading) {
        return <Spinner />;
    }

    const groupedShowtimes = groupShowtimesByCinemaAndMovie(showtimes);
    return (
        <div className={styles.showtimeManagementScreen}>
            <div className={styles.manageHeader}>
                <h2>{t('manageShowtimes')}</h2>
                <Link to={PATHS.MANAGE_SHOWTIME} className={styles.addButton}>
                    {t('addShowtime')}
                </Link>
            </div>
            <div className={styles.datePickerContainer}>
                <h4>{t('selectDate')}:</h4>
                <input
                    type="date"
                    value={selectedDate.toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                />
            </div>
            {groupedShowtimes.length > 0 ? (
                <div className={styles.showtimeList}>
                    <ShowtimeGroup groupedShowtimes={groupedShowtimes} showDeleteModal={showDeleteModal} />
                </div>
            ) : (
                <p className={styles.noShowtimes}>{t('noShowtimesAvailable')}</p>
            )}
            <DeleteModal
                showModal={isModalVisible}
                onConfirm={() => confirmDeletion(handleDeleteShowtime)}
                onCancel={hideDeleteModal}
            />
        </div>
    );
};

export default ShowtimeManagementPage;
