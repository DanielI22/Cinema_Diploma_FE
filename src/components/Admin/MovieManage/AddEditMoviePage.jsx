import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './AddEditMoviePage.module.css';
import { PATHS } from '../../../utils/constants';
import * as movieService from '../../../services/movieService';
import * as genreService from '../../../services/genreService';
import BackButton from '../../BackButton/BackButton';
import Spinner from '../../Spinner/Spinner';
import GenreSelect from './GenreSelect';
import { useTranslation } from 'react-i18next';

export default function AddEditMoviePage() {
    const { t } = useTranslation();
    const [movie, setMovie] = useState({
        title: '',
        description: '',
        imageUrl: '',
        releaseYear: '',
        duration: '',
        trailerUrl: '',
        genres: []
    });
    const { movieId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [allGenres, setAllGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);

    useEffect(() => {
        genreService.getAll().then(response => {
            setAllGenres(response.genres);
        });

        if (movieId) {
            movieService.getOne(movieId).then(response => {
                setMovie({
                    title: response.movie.title,
                    description: response.movie.description,
                    imageUrl: response.movie.imageUrl,
                    releaseYear: response.movie.releaseYear,
                    duration: response.movie.duration,
                    trailerUrl: response.movie.trailerUrl,
                    genres: response.movie.genres.map(g => g.id)
                });
                setSelectedGenres(response.movie.genres);
            });
        }
    }, [movieId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleChangeGenre = (selectedOptions) => {
        const updatedSelectedGenres = selectedOptions.map(option => ({ id: option.value, name: option.label }));
        setSelectedGenres(updatedSelectedGenres);
        setMovie(prevMovie => ({
            ...prevMovie,
            genres: updatedSelectedGenres.map(genre => genre.id)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        let movieData = { ...movie };
        if (movieId) {
            movieData.genres = selectedGenres.map(genre => genre.id);
            await movieService.editMovie(movieId, movieData);
        } else {
            movieData.genres = selectedGenres.map(genre => ({ id: genre.id, name: genre.name }));
            await movieService.addMovie(movieData);
        }
        setIsLoading(false);
        navigate(PATHS.MANAGE_MOVIES);
    };

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <div className={styles.addEditMovieContainer}>
            <BackButton />
            <h2>{movieId ? t('editMovie') : t('addNewMovie')}</h2>
            <form onSubmit={handleSubmit} className={styles.addEditMovieForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">{t('title')}:</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={movie.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description">{t('movieDescription')}:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={movie.description}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="imageUrl">{t('imageUrl')}:</label>
                    <input
                        id="imageUrl"
                        name="imageUrl"
                        type="text"
                        value={movie.imageUrl}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="genres">{t('genres')}:</label>
                    <GenreSelect
                        allGenres={allGenres}
                        selectedGenres={selectedGenres}
                        handleGenreChange={handleChangeGenre}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="releaseYear">{t('releaseYear')}:</label>
                    <input
                        id="releaseYear"
                        name="releaseYear"
                        type="number"
                        value={movie.releaseYear}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="duration">{t('duration')} ({t('minutes')}):</label>
                    <input
                        id="duration"
                        name="duration"
                        type="number"
                        value={movie.duration}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="trailerUrl">{t('trailerUrl')}:</label>
                    <input
                        id="trailerUrl"
                        name="trailerUrl"
                        type="text"
                        value={movie.trailerUrl}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="submit-button">
                    {movieId ? t('updateMovie') : t('addMovie')}
                </button>
            </form>
        </div>
    );
}
