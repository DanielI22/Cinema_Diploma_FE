import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './CinemaManagementPage.module.css';
import * as cinemaService from '../../../services/cinemaService'
import CinemaCard from '../../User/CinemaCard/CinemaCard';
import { PATHS } from '../../../utils/constants';
import Spinner from '../../Spinner/Spinner';
import { toast } from 'react-toastify';
import DeleteModal from '../../DeleteModal/DeleteModal';
import useDeleteModal from '../../../hooks/useDeleteModal';
import BackButton from '../../BackButton/BackButton';

const CinemaManagementPage = () => {
    const [cinemas, setCinemas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { isModalVisible, showDeleteModal, hideDeleteModal, confirmDeletion } = useDeleteModal();

    useEffect(() => {
        fetchCinemas();
    }, []);

    const fetchCinemas = async () => {
        setIsLoading(true);
        const response = await cinemaService.getAll();
        setCinemas(response.cinemas);
        setIsLoading(false);
    };

    const handleConfirmDeletion = async (cinemaId) => {
        await cinemaService.deleteCinema(cinemaId);
        fetchCinemas();
    };

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <div className={styles.cinemaManagementScreen}>
            <BackButton />
            <DeleteModal
                showModal={isModalVisible}
                onConfirm={() => confirmDeletion(handleConfirmDeletion)}
                onCancel={hideDeleteModal}
            />
            <div className={styles.manageHeader}>
                <h2>Manage Cinemas</h2>
                <Link to={PATHS.MANAGE_CINEMA} className={styles.addButton}>Add New Cinema</Link>
            </div>
            <div className={styles.cinemaList}>
                {cinemas.map(cinema => (
                    <div key={cinema.id} className={styles.cinemaItemWrapper}>
                        <CinemaCard cinema={cinema} />
                        <div className={styles.cinemaActions}>
                            <Link to={`${PATHS.MANAGE_CINEMA}/${cinema.id}`} className={styles.editButton}>Edit</Link>
                            <button onClick={() => showDeleteModal(cinema.id)} className={styles.deleteButton}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CinemaManagementPage;