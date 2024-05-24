import React, { useState, useEffect } from 'react';
import styles from './FavouritesPage.module.css';
import * as favouriteService from '../../../services/favouriteService';
import MovieCard from '../MovieCard/MovieCard';
import Spinner from '../../Spinner/Spinner';
import Sidebar from '../Sidebar/Sidebar';

const FavouritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            const response = await favouriteService.getFavourites();
            setFavorites(response.movies);
            setIsLoading(false);
        };

        fetchFavorites();
    }, []);

    const handleRemoveFavorite = async (movieId) => {
        await favouriteService.deleteFavourite(movieId);
        setFavorites(favorites.filter(movie => movie.id !== movieId));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className={styles.favoritesPage}>
            <Sidebar />
            <div className={styles.content}>
                <h1 className={styles.header}>My Favourites</h1>
                <div className={styles.moviesGrid}>
                    {favorites.length > 0 ? (
                        favorites.map(movie => (
                            <div key={movie.id} className={styles.movieCard}>
                                <MovieCard movie={movie} />
                                <button
                                    className={styles.removeButton}
                                    onClick={() => handleRemoveFavorite(movie.id)}
                                >
                                    Remove from Favourites
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No favorite movies yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FavouritesPage;
