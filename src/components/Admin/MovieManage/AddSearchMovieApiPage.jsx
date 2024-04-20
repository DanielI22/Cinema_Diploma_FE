import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddSearchMovieApiPage.module.css';
import { PATHS } from '../../../utils/constants';
import * as movieService from '../../../services/movieService';
import MovieCard from '../../User/MovieCard/MovieCard';
import Spinner from '../../Spinner/Spinner';
import BackButton from '../../BackButton/BackButton';

export default function AddSearchMovieApiPage() {
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
                        placeholder="Search by title or IMDb ID..."
                        value={query}
                        onChange={handleSearchChange}
                        required
                    />
                    <button type="submit" className="submit-button">Search</button>
                </form>
                <div className={styles.searchResults}>
                    {isLoading ? (
                        <Spinner />
                    ) : hasSearched && searchResults.length === 0 ? (
                        <p>No results found.</p>
                    ) : (
                        searchResults.map((movie) => (
                            <div key={movie.id} className={styles.resultItem}>
                                <MovieCard movie={movie} redirect={false} />
                                <button onClick={() => handleAddMovie(movie)} className={styles.addButton}>Add</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
