import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddSearchMovieApiPage.module.css';
import { PATHS } from '../../../utils/constants';
import * as movieService from '../../../services/movieService';
import MovieCard from '../../User/MovieCard/MovieCard';
import Spinner from '../../Spinner/Spinner';
import BackButton from '../../BackButton/BackButton';
import { useTranslation } from 'react-i18next';

export default function AddSearchMovieApiPage() {
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setHasSearched(true);
        try {
            const response = await movieService.searchMovies(query);
            setSearchResults(response.movies);
        } catch (error) {
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddMovie = async (movieData) => {
        console.log(movieData);
        setIsLoading(true);
        await movieService.addMovie(movieData);
        navigate(PATHS.MANAGE_MOVIES);
        setIsLoading(false);
    };

    return (
        <>
            <BackButton />
            <div className={styles.searchAddMovieContainer}>
                <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                    <input
                        type="text"
                        placeholder={t('searchPlaceholder')}
                        value={query}
                        onChange={handleSearchChange}
                        required
                    />
                    <button type="submit" className="submit-button">{t('search')}</button>
                </form>
                <div className={styles.searchResults}>
                    {isLoading ? (
                        <Spinner />
                    ) : hasSearched && searchResults.length === 0 ? (
                        <p>{t('noResults')}</p>
                    ) : (
                        searchResults.map((movie) => (
                            <div key={movie.id} className={styles.resultItem}>
                                <MovieCard movie={movie} redirect={false} />
                                <button onClick={() => handleAddMovie(movie)} className={styles.addButton}>{t('add')}</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
