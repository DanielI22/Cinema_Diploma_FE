import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './CinemaManagementPage.module.css';
import * as cinemaService from '../../../services/cinemaService';
import CinemaCard from '../../User/CinemaCard/CinemaCard';
import { PATHS } from '../../../utils/constants';
import Spinner from '../../Spinner/Spinner';
import DeleteModal from '../../DeleteModal/DeleteModal';
import useDeleteModal from '../../../hooks/useDeleteModal';
import { useTranslation } from 'react-i18next';

const CinemaManagementPage = () => {
    const { t } = useTranslation();
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
        setIsLoading(true);
        await cinemaService.deleteCinema(cinemaId);
        fetchCinemas();
        setIsLoading(false);
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className={styles.cinemaManagementScreen}>
            <DeleteModal
                showModal={isModalVisible}
                onConfirm={() => confirmDeletion(handleConfirmDeletion)}
                onCancel={hideDeleteModal}
            />
            <div className={styles.manageHeader}>
                <h2>{t('manageCinemas')}</h2>
                <Link to={PATHS.MANAGE_CINEMA} className={styles.addButton}>{t('addNewCinema')}</Link>
            </div>
            <div className={styles.cinemaList}>
                {cinemas.map(cinema => (
                    <div key={cinema.id} className={styles.cinemaItemWrapper}>
                        <CinemaCard cinema={cinema} />
                        <div className={styles.cinemaActions}>
                            <Link to={`${PATHS.MANAGE_CINEMA}/${cinema.id}`} className={styles.editButton}>{t('edit')}</Link>
                            <button onClick={() => showDeleteModal(cinema.id)} className={styles.deleteButton}>{t('delete')}</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CinemaManagementPage;
