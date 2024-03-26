import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MovieDetails.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import * as movieService from "../../../services/movieService";
import Spinner from '../../Spinner/Spinner';
import { useAuth } from '../../../contexts/authContext';
import NotFound from '../../NotFound/NotFound';
import { genresToString } from '../../../utils/functions';

export default function MovieDetails() {
    console.log('test')
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [favourite, setFavourite] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const { isAuthenticated, userId } = useAuth();

    useEffect(() => {
        // favouriteService.getFavourite(userId, movieId)
        //     .then(result => setFavourite(result))
        //     .catch(err => toast.error(err))
    }, [userId, movieId])

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const result = await movieService.getOne(movieId)
                setMovie(result.movie);
                console.log(result)
            }
            catch (err) {
                if (err.code == 404) {
                    setNotFound(true);
                }
            }
        }
        fetchMovie();
    }, [movieId]);

    if (notFound) {
        return <NotFound />
    }
    if (!movie) {
        return <Spinner />;
    }
    const handleFavouriteClick = async () => {
        if (favourite) {
            await favouriteService.deleteFavourite(favourite._id)
            toast.success("Removed from favourites")
            setFavourite(null);
        } else {
            const favouriteData = {
                movieId: movieId,
            };
            const favourite = await favouriteService.addFavourite(favouriteData);
            toast.success("Added to favourites")
            setFavourite(favourite);
        }
    };
console.log(movie.genre)
    return (
        <div className={styles.movieDetails}>
            <div className={styles.detailsContainer}>
                <img src={movie.imageUrl} alt={movie.title} className={styles.poster} />
                <div className={styles.info}>
                    <h1 className={styles.title}>{movie.title} ({movie.releaseYear})</h1>
                    <p className={styles.genre}>{genresToString(movie.genres)}</p>
                    <p className={styles.description}>{movie.description}</p>
                    {isAuthenticated && <div className={styles.favouritesContainer}>
                        <p>Add to Favourites</p>
                        <button className={`${styles.favouritesButton} ${favourite ? styles.favouriteActive : ''}`}
                            onClick={handleFavouriteClick}>
                            <FontAwesomeIcon icon={faStar} />
                        </button>
                    </div>}
                </div>
            </div>
            {/* <ReviewArea /> */}
        </div>
    );
}