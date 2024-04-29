import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './AddEditShowtimePage.module.css';
import Select from 'react-select';
import axios from 'axios';
import { PATHS } from '../../../utils/constants';
import Spinner from '../../Spinner/Spinner';
import BackButton from '../../BackButton/BackButton';
import * as movieService from '../../../services/movieService';
import * as cinemaService from '../../../services/cinemaService';
import * as showtimeService from '../../../services/showtimeService';

export default function AddEditShowtimePage() {
    const [cinemas, setCinemas] = useState([]);
    const [selectedCinema, setSelectedCinema] = useState(null);
    const [halls, setHalls] = useState([]);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedHall, setSelectedHall] = useState(null);
    const [startingTime, setStartingTime] = useState('');
    const [ticketPrice, setTicketPrice] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { showtimeId } = useParams();

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
            ticketPrice
        };
        console.log(showtimeData);
        if (showtimeId) {
            await showtimeService.editShowtime(showtimeId, showtimeData);
        }
        else {
            await showtimeService.addShowtime(showtimeData);
        }
        navigate(PATHS.MANAGE_SHOWTIMES);
        setIsLoading(false);
    };

    return (
        <div className={styles.container}>
            <BackButton />
            <h2>{showtimeId ? 'Edit Showtime' : 'Add New Showtime'}</h2>
            {isLoading ? <Spinner /> : (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <Select
                        options={cinemas}
                        onChange={handleCinemaChange}
                        value={selectedCinema}
                        placeholder="Select Cinema"
                        required
                    />
                    <Select
                        options={halls}
                        onChange={selected => setSelectedHall(selected)}
                        value={selectedHall}
                        placeholder="Select Hall"
                        required
                    />
                    <Select
                        options={movies.map(movie => ({ value: movie.id, label: movie.title }))}
                        onChange={selected => setSelectedMovie(selected)}
                        value={selectedMovie}
                        placeholder="Select Movie"
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
                        placeholder="Ticket Price"
                        value={ticketPrice}
                        onChange={e => setTicketPrice(e.target.value)}
                        step="0.01"
                        required
                    />
                    <button type="submit" className="submit-button">{showtimeId ? 'Update Showtime' : 'Add Showtime'}</button>
                </form>
            )}
        </div>
    );
}