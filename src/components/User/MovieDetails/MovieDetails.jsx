import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MovieDetails.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import * as movieService from "../../../services/movieService";
import * as favouriteService from "../../../services/favouriteService";
import Spinner from '../../Spinner/Spinner';
import { useAuth } from '../../../contexts/authContext';
import NotFound from '../../NotFound/NotFound';
import { genresToString, isValidUUID } from '../../../utils/functions';
import BackButton from '../../BackButton/BackButton';
import ReviewArea from '../ReviewArea/ReviewArea';
import MovieProgram from '../MovieProgram/MovieProgram';

export default function MovieDetails() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [favourite, setFavourite] = useState(null);
    const [isValidId, setIsValidId] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const { userDetails, isAuthenticated } = useAuth();

    useEffect(() => {
        if (!movieId || !isValidUUID(movieId)) {
            setIsValidId(false);
            setIsLoading(false);
            return;
        }
        const fetchMovie = async () => {
            try {
                const result = await movieService.getOne(movieId)
                setMovie(result.movie);
                setIsLoading(false);
            } catch (error) {
                setIsValidId(false);
            }
        }
        fetchMovie();
    }, [movieId]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchFavourite();
        }
    }, [movieId, isAuthenticated]);

    const fetchFavourite = async () => {
        const result = await favouriteService.verifyFavourite(movieId);
        setFavourite(result.isFavourite);
    };

    if (!isValidId) {
        return <NotFound />;
    }

    if (isLoading) {
        return <Spinner />;
    }
    const handleFavouriteClick = async () => {
        if (favourite) {
            await favouriteService.deleteFavourite(movieId)
            setFavourite(null);
        } else {
            const favourite = await favouriteService.addFavourite(movieId);
            setFavourite(favourite);
        }
    };
    return (
        <><BackButton />
            <div className={styles.movieDetails}>
                <div className={styles.detailsContainer}>
                    <img src={movie.imageUrl} alt={movie.title} className={styles.poster} />
                    <div className={styles.info}>
                        <h1 className={styles.title}>{movie.title} ({movie.releaseYear})</h1>
                        <p className={styles.genre}>{genresToString(movie.genres)}</p>
                        <p className={styles.description}>{movie.description}</p>
                        <p className={styles.duration}>{`Duration: ${movie.duration} minutes`}</p>
                        {userDetails.role === 'user' && (
                            <div className={styles.favouritesContainer}>
                                <p>Add to Favourites</p>
                                <button className={`${styles.favouritesButton} ${favourite ? styles.favouriteActive : ''}`}
                                    onClick={handleFavouriteClick}>
                                    <FontAwesomeIcon icon={faStar} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <MovieProgram movieId={movieId} />
                <div className={styles.trailerContainer}>
                    <iframe
                        className={styles.trailer}
                        src={`https://www.youtube.com/embed/${movie.trailerUrl}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <ReviewArea />
            </div>
        </>
    );
}