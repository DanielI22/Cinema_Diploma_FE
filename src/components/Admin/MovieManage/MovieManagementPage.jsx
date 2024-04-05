import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './MovieManagementPage.module.css';
import * as movieService from '../../../services/movieService';
import MovieCard from '../../User/MovieCard/MovieCard';
import { PATHS } from '../../../utils/constants';
import Spinner from '../../Spinner/Spinner';
import DeleteModal from '../../DeleteModal/DeleteModal';
import useDeleteModal from '../../../hooks/useDeleteModal';

const MovieManagementPage = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { isModalVisible, showDeleteModal, hideDeleteModal, confirmDeletion } = useDeleteModal();

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        setIsLoading(true);
        const response = await movieService.getAll();
        setMovies(response.movies);
        setIsLoading(false);
    };

    const handleConfirmDeletion = async (movieId) => {
        setIsLoading(true);
        await movieService.deleteMovie(movieId);
        fetchMovies();
        setIsLoading(false);
    }

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <div className={styles.movieManagementScreen}>
            <DeleteModal
                showModal={isModalVisible}
                onConfirm={() => confirmDeletion(handleConfirmDeletion)}
                onCancel={hideDeleteModal}
            />
            <div className={styles.manageHeader}>
                <h2>Manage Movies</h2>
                <div className={styles.actionButtons}>
                    <Link to={PATHS.MANAGE_MOVIE} className={styles.addButton}>Add Movie Manually</Link>
                    <Link to={PATHS.MANAGE_MOVIE_API} className={styles.addButton}>Add Movie via API</Link>
                </div>
            </div>
            <div className={styles.movieList}>
                {movies.map(movie => (
                    <div key={movie.id} className={styles.movieItemWrapper}>
                        <MovieCard movie={movie} />
                        <div className={styles.movieActions}>
                            <Link to={`${PATHS.MANAGE_MOVIE}/${movie.id}`} className={styles.editButton}>Edit</Link>
                            <button onClick={() => showDeleteModal(movie.id)} className={styles.deleteButton}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default MovieManagementPage;
