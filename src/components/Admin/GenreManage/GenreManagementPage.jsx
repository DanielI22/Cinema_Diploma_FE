import React, { useState, useEffect } from 'react';
import styles from './GenreManagementPage.module.css';
import * as genreService from '../../../services/genreService';
import Spinner from '../../Spinner/Spinner';
import DeleteModal from '../../DeleteModal/DeleteModal';
import useDeleteModal from '../../../hooks/useDeleteModal';
import { useTranslation } from 'react-i18next';

const GenreManagementPage = () => {
    const { t } = useTranslation();
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [editGenreId, setEditGenreId] = useState(null);
    const [genreName, setGenreName] = useState('');
    const { isModalVisible, showDeleteModal, hideDeleteModal, confirmDeletion } = useDeleteModal();

    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = async () => {
        setIsLoading(true);
        const response = await genreService.getAll();
        setGenres(response.genres);
        setIsLoading(false);
    };

    const handleAddGenre = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (editGenreId) {
            await genreService.editGenre(editGenreId, { name: genreName });
        } else {
            await genreService.addGenre({ name: genreName });
        }
        setGenreName('');
        setEditGenreId(null);
        fetchGenres();
        setIsLoading(false);
    };

    const handleEditClick = (genre) => {
        setEditGenreId(genre.id);
        setGenreName(genre.name);
    };

    const handleInputChange = (e) => {
        setGenreName(e.target.value);
        if (e.target.value === '') {
            setEditGenreId(null);
        }
    };

    const handleDeleteClick = async (genreId) => {
        setIsLoading(true);
        await genreService.deleteGenre(genreId);
        fetchGenres();
        setIsLoading(false);
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className={styles.genreManagementScreen}>
            <h2>{t('manageGenres')}</h2>
            <form onSubmit={handleAddGenre} className={styles.addEditForm}>
                <input
                    type="text"
                    placeholder={t('genreName')}
                    value={genreName}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit" className="submit-button">
                    {editGenreId ? t('updateGenre') : t('addGenre')}
                </button>
            </form>
            <table className={styles.genresTable}>
                <thead>
                    <tr>
                        <th>{t('name')}</th>
                        <th>{t('actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {genres.map((genre) => (
                        <tr key={genre.id}>
                            <td>{genre.name}</td>
                            <td>
                                <button className={styles.editButton} onClick={() => handleEditClick(genre)}>{t('edit')}</button>
                                <button className={styles.deleteButton} onClick={() => showDeleteModal(genre.id)}>{t('delete')}</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <DeleteModal
                showModal={isModalVisible}
                onConfirm={() => confirmDeletion(handleDeleteClick)}
                onCancel={hideDeleteModal}
            />
        </div>
    );
};

export default GenreManagementPage;
