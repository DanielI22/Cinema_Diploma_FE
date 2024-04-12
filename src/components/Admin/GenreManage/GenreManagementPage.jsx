import React, { useState, useEffect } from 'react';
import styles from './GenreManagementPage.module.css';
import * as genreService from '../../../services/genreService';
import Spinner from '../../Spinner/Spinner';
import DeleteModal from '../../DeleteModal/DeleteModal';
import useDeleteModal from '../../../hooks/useDeleteModal';

const GenreManagementPage = () => {
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
            <h2>Manage Genres</h2>
            <form onSubmit={handleAddGenre} className={styles.addEditForm}>
                <input
                    type="text"
                    placeholder="Genre Name"
                    value={genreName}
                    onChange={(e) => setGenreName(e.target.value)}
                    required
                />
                <button type="submit" className="submit-button">
                    {editGenreId ? 'Update Genre' : 'Add Genre'}
                </button>
            </form>
            <table className={styles.genresTable}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {genres.map((genre) => (
                        <tr key={genre.id}>
                            <td>{genre.name}</td>
                            <td>
                                <button className={styles.editButton} onClick={() => handleEditClick(genre)}>Edit</button>
                                <button className={styles.deleteButton} onClick={() => showDeleteModal(genre.id)}>Delete</button>
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
