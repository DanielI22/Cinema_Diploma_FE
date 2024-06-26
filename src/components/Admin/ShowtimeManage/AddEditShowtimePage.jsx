import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './AddEditShowtimePage.module.css';
import Select from 'react-select';
import { PATHS } from '../../../utils/constants';
import Spinner from '../../Spinner/Spinner';
import BackButton from '../../BackButton/BackButton';
import * as movieService from '../../../services/movieService';
import * as cinemaService from '../../../services/cinemaService';
import * as showtimeService from '../../../services/showtimeService';
import { useTranslation } from 'react-i18next';

export default function AddEditShowtimePage() {
    const { t } = useTranslation();
    const [cinemas, setCinemas] = useState([]);
    const [selectedCinema, setSelectedCinema] = useState(null);
    const [halls, setHalls] = useState([]);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedHall, setSelectedHall] = useState(null);
    const [startingTime, setStartingTime] = useState('');
    const [ticketPrice, setTicketPrice] = useState('');
    const [showtimeType, setShowtimeType] = useState(null);
    const [addNext7Days, setAddNext7Days] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { showtimeId } = useParams();

    const showtimeTypeOptions = [
        { value: 'TWO_D', label: t('twoD') },
        { value: 'THREE_D', label: t('threeD') },
        { value: 'IMAX', label: 'IMAX' },
        { value: 'FOUR_DX', label: '4DX' },
    ];

    useEffect(() => {
        fetchCinemas();
        fetchMovies();
        if (showtimeId) {
            fetchShowtimeDetails(showtimeId);
        }
    }, [showtimeId]);

    const fetchCinemas = async () => {
        setIsLoading(true);
        const response = await cinemaService.getAll();
        setCinemas(response.cinemas.map(cinema => ({ value: cinema.id, label: cinema.name })));
        setIsLoading(false);
    };

    const fetchMovies = async () => {
        setIsLoading(true);
        const response = await movieService.getAll();
        setMovies(response.movies);
        setIsLoading(false);
    };

    const fetchShowtimeDetails = async (id) => {
        setIsLoading(true);
        const response = await showtimeService.getOne(id);
        setSelectedCinema({ value: response.cinemaId, label: response.showtime.cinemaName });
        setSelectedHall({ value: response.hallId, label: response.showtime.hallName });
        setSelectedMovie({ value: response.movieId, label: response.showtime.movieName });
        setStartingTime(response.showtime.startTime);
        setTicketPrice(response.showtime.ticketPrice);
        setShowtimeType(showtimeTypeOptions.find(option => option.label === response.showtime.type));
        setIsLoading(false);
    };

    const handleCinemaChange = async (selectedOption) => {
        setSelectedCinema(selectedOption);
        setSelectedHall(null);
        setIsLoading(true);
        const response = await cinemaService.getHalls(selectedOption.value);
        setHalls(response.halls.map(hall => ({ value: hall.id, label: hall.name })));
        setIsLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const showtimeData = {
            cinemaId: selectedCinema.value,
            hallId: selectedHall.value,
            movieId: selectedMovie.value,
            startingTime,
            ticketPrice,
            type: showtimeType.value,
            addNext7Days: showtimeId ? undefined : addNext7Days,
        };
        if (showtimeId) {
            await showtimeService.editShowtime(showtimeId, showtimeData);
        } else {
            await showtimeService.addShowtime(showtimeData);
        }
        navigate(PATHS.MANAGE_SHOWTIMES);
        setIsLoading(false);
    };

    return (
        <div className={styles.container}>
            <BackButton />
            <h2>{showtimeId ? t('editShowtime') : t('addNewShowtime')}</h2>
            {isLoading ? <Spinner /> : (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <Select
                        options={cinemas}
                        onChange={handleCinemaChange}
                        value={selectedCinema}
                        placeholder={t('selectCinema')}
                        required
                    />
                    <Select
                        options={halls}
                        onChange={selected => setSelectedHall(selected)}
                        value={selectedHall}
                        placeholder={t('selectHall')}
                        required
                    />
                    <Select
                        options={movies.map(movie => ({ value: movie.id, label: movie.title }))}
                        onChange={selected => setSelectedMovie(selected)}
                        value={selectedMovie}
                        placeholder={t('selectMovie')}
                        required
                    />
                    <Select
                        options={showtimeTypeOptions}
                        onChange={selected => setShowtimeType(selected)}
                        value={showtimeType}
                        placeholder={t('selectShowtimeType')}
                        required
                    />
                    <input
                        type="datetime-local"
                        value={startingTime}
                        onChange={e => setStartingTime(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder={t('ticketPrice')}
                        value={ticketPrice}
                        onChange={e => setTicketPrice(e.target.value)}
                        step="0.01"
                        required
                    />

                    {!showtimeId && (
                        <div className={styles.checkboxContainer}>
                            <label htmlFor="addNext7Days">{t('addForNext7Days')}</label>
                            <input
                                type="checkbox"
                                id="addNext7Days"
                                checked={addNext7Days}
                                onChange={e => setAddNext7Days(e.target.checked)}
                            />
                        </div>
                    )}
                    <button type="submit" className="submit-button">{showtimeId ? t('updateShowtime') : t('addShowtime')}</button>
                </form>
            )}
        </div>
    );
}
