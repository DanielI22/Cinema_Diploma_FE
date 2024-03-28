import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './HallManagementPage.module.css';
import * as hallService from '../../../services/hallService';
import { PATHS } from '../../../utils/constants';
import Spinner from '../../Spinner/Spinner';
import { toast } from 'react-toastify';
import DeleteModal from '../../DeleteModal/DeleteModal';
import useDeleteModal from '../../../hooks/useDeleteModal';
import BackButton from '../../BackButton/BackButton';

const HallManagementPage = () => {
    const [halls, setHalls] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { isModalVisible, showDeleteModal, hideDeleteModal, confirmDeletion } = useDeleteModal();

    useEffect(() => {
        fetchHalls();
    }, []);

    const fetchHalls = async () => {
        setIsLoading(true);
        const response = await hallService.getAll();
        setHalls(response.halls);
        setIsLoading(false);
    };

    const handleConfirmDeletion = async (hallId) => {
        await hallService.deleteHall(hallId);
        fetchHalls();
    };

    const groupHallsByCinema = (halls) => {
        const grouped = halls.reduce((acc, hall) => {
            const key = hall.cinemaName ? hall.cinemaName : 'Available';
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(hall);
            return acc;
        }, {});

        return grouped;
    };

    const groupedHalls = groupHallsByCinema(halls);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className={styles.hallManagementScreen}>
            <BackButton />
            <DeleteModal
                showModal={isModalVisible}
                onConfirm={() => confirmDeletion(handleConfirmDeletion)}
                onCancel={hideDeleteModal}
            />
            <div className={styles.manageHeader}>
                <h2>Manage Halls</h2>
                <Link to={PATHS.MANAGE_HALL} className={styles.addButton}>Add New Hall</Link>
            </div>
            {Object.entries(groupedHalls).map(([group, halls]) => (
                <div key={group}>
                    <h3>{group}</h3>
                    <div className={styles.hallList}>
                        {halls.map(hall => (
                            <div key={hall.id} className={styles.hallItemWrapper}>
                                <div className={styles.hallDetails}>
                                    <p>{hall.name}</p>
                                </div>
                                <div className={styles.hallActions}>
                                    <Link to={`${PATHS.MANAGE_HALL}/${hall.id}`} className={styles.editButton}>Edit</Link>
                                    <button onClick={() => showDeleteModal(hall.id)} className={styles.deleteButton}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HallManagementPage;