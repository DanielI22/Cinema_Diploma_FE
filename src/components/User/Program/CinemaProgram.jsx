import React, { useState, useEffect } from 'react';
import styles from './CinemaProgram.module.css';
import * as showtimeService from '../../../services/showtimeService';
import * as cinemaService from '../../../services/cinemaService';
import * as movieService from '../../../services/movieService';
import { Link, useParams } from 'react-router-dom';
import NotFound from '../../NotFound/NotFound';
import Spinner from '../../Spinner/Spinner';
import DateNavigation from '../DataNavigation/DateNavigation';
import { isValidUUID } from '../../../utils/functions';
import MovieCard from '../MovieCard/MovieCard';
import BackButton from '../../BackButton/BackButton';
import { useAuth } from '../../../contexts/authContext';
import { ROLES } from '../../../utils/constants';
import { useTranslation } from 'react-i18next';

function CinemaProgram() {
    const { userDetails } = useAuth();
    const { t } = useTranslation();
    const [cinema, setCinema] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [movies, setMovies] = useState({});
    const [showtimesByMovie, setShowtimesByMovie] = useState({});
    const [isValidId, setIsValidId] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const { cinemaId } = useParams();

    useEffect(() => {
        async function fetchShowtimes() {
            if (!cinemaId || !isValidUUID(cinemaId)) {
                setIsValidId(false);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const cinemaResponse = await cinemaService.getOne(cinemaId);
                setCinema(cinemaResponse.cinema);
                const formattedDate = selectedDate.toISOString().slice(0, 10);
                const response = await showtimeService.getByCinemaDate(cinemaResponse.cinema.id, formattedDate);
                const showtimes = response.showtimes;

                const movieIds = [...new Set(showtimes.map(showtime => showtime.movieId))];
                const movieDetails = {};
                const groupedShowtimes = {};

                for (const movieId of movieIds) {
                    const movieDetail = await movieService.getOne(movieId);
                    movieDetails[movieId] = movieDetail.movie;
                    groupedShowtimes[movieId] = [];
                }

                showtimes.forEach(showtime => {
                    groupedShowtimes[showtime.movieId].push(showtime);
                });

                setMovies(movieDetails);
                setShowtimesByMovie(groupedShowtimes);
                setIsValidId(true);
            } catch (error) {
                setIsValidId(false);
            } finally {
                setIsLoading(false);
            }
        }

        fetchShowtimes();
    }, [cinemaId, selectedDate]);

    const renderShowtimesByMovie = () => {
        return Object.entries(showtimesByMovie).map(([movieId, showtimes]) => {
            const movie = movies[movieId];
            const now = new Date();
            return (
                <div key={movieId} className={styles.movieSection}>
                    <div className={styles.movieCardWrapper}>
                        <MovieCard movie={movie} />
                    </div>
                    {showtimes.map(showtime => {
                        const showtimeDate = new Date(showtime.startTime);
                        const movieDurationInMs = movie.duration * 60000;
                        const showtimeEndDate = new Date(showtimeDate.getTime() + movieDurationInMs);
                        const linkPath = userDetails.role === ROLES.VALIDATOR
                            ? `/validate-ticket/${showtime.id}`
                            : `/booking/${showtime.id}`;

                        const isActive = userDetails.role === ROLES.VALIDATOR || userDetails.role === ROLES.OPERATOR
                            ? now < showtimeEndDate
                            : (showtimeDate - now) / 60000 > 15;

                        if (isActive) {
                            return (
                                <Link to={linkPath} key={showtime.id} className={styles.showtime}>
                                    <div>
                                        {showtimeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                                        <span className={styles.priceTag}>{t('priceTag', { type: showtime.type, price: showtime.ticketPrice.toFixed(2) })}</span>
                                    </div>
                                </Link>
                            );
                        } else {
                            return (
                                <div key={showtime.id} className={styles.showtimeInactive}>
                                    <span>{showtimeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                                </div>
                            );
                        }
                    })}
                </div>
            );
        });
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (!isValidId) {
        return <NotFound />;
    }

    return (
        <div className={styles.cinemaProgram}>
            <BackButton />
            <h2 className={styles.programLabel}>{cinema.name} {t('programLabel')}</h2>
            <DateNavigation selectedDate={selectedDate} onSelectDate={setSelectedDate} />
            <div className={styles.movieShowtimes}>
                {Object.keys(showtimesByMovie).length > 0 ? renderShowtimesByMovie() : <p>{t('noShowtimesAvailable')}</p>}
            </div>
        </div>
    );
}

export default CinemaProgram;
