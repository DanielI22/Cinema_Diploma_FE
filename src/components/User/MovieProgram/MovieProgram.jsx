import React, { useState, useEffect } from 'react';
import styles from './MovieProgram.module.css';
import * as showtimeService from '../../../services/showtimeService';
import { Link } from 'react-router-dom';

function MovieProgram({ movieId }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [groupedShowtimes, setGroupedShowtimes] = useState({});

    useEffect(() => {
        const fetchShowtimes = async () => {
            const formattedDate = selectedDate.toISOString().slice(0, 10);
            const response = await showtimeService.getByMovieDate(movieId, formattedDate);
            groupShowtimes(response.showtimes);
        };
        fetchShowtimes();
    }, [movieId, selectedDate]);

    const groupShowtimes = (showtimes) => {
        // Group by cinemaName
        const grouped = showtimes.reduce((acc, showtime) => {
            acc[showtime.cinemaName] = acc[showtime.cinemaName] || [];
            acc[showtime.cinemaName].push(showtime);
            return acc;
        }, {});

        setGroupedShowtimes(grouped);
    };

    // Generate a list of dates for navigation
    const renderDateNavigation = () => {
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            dates.push(date);
        }
        return dates.map((date) => (
            <button
                key={date.toISOString()}
                className={selectedDate.toISOString().slice(0, 10) === date.toISOString().slice(0, 10) ? styles.selectedDate : styles.dateButton}
                onClick={() => setSelectedDate(date)}
            >
                {date.toLocaleDateString('en-GB', {
                    weekday: 'short',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                })}
            </button>
        ));
    };



    const renderCinemaShowtimes = () => {
        const now = new Date();
        return Object.entries(groupedShowtimes).map(([cinemaName, showtimes]) => (
            <div key={cinemaName} className={styles.cinema}>
                <h3>{cinemaName}</h3>
                {showtimes.map((showtime) => {
                    const showtimeDate = new Date(showtime.startTime);
                    const isActive = (showtimeDate - now) / 60000 > 15;
                    return (
                        <div key={showtime.id} className={isActive ? styles.showtime : styles.showtimeInactive}>
                            {isActive ? (
                                <Link to={`/booking/${showtime.id}`}>
                                    {showtimeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                                    <span className={styles.priceTag}>{`${showtime.ticketPrice.toFixed(2)} BGN`}</span>
                                </Link>
                            ) : (
                                <span>{showtimeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                            )}
                        </div>
                    );
                })}
            </div>
        ));
    };

    return (
        <div className={styles.movieProgram}>
            <h2 className={styles.programLabel}>Program</h2>
            <div className={styles.dateNavigation}>
                {renderDateNavigation()}
            </div>
            <div className={styles.cinemaShowtimes}>
                {Object.keys(groupedShowtimes).length > 0 ? renderCinemaShowtimes() : <p>No showtimes available.</p>}
            </div>
        </div>
    );
}

export default MovieProgram;
