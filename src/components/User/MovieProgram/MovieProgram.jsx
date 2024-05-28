import React, { useState, useEffect } from 'react';
import styles from './MovieProgram.module.css';
import * as showtimeService from '../../../services/showtimeService';
import { Link } from 'react-router-dom';
import DateNavigation from '../DataNavigation/DateNavigation';

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
        const grouped = showtimes.reduce((acc, showtime) => {
            acc[showtime.cinemaName] = acc[showtime.cinemaName] || [];
            acc[showtime.cinemaName].push(showtime);
            return acc;
        }, {});

        setGroupedShowtimes(grouped);
    };

    const renderCinemaShowtimes = () => {
        const now = new Date();
        return Object.entries(groupedShowtimes).map(([cinemaName, showtimes]) => (
            <div key={cinemaName} className={styles.cinema}>
                <h3>{cinemaName}</h3>
                {showtimes.map((showtime) => {
                    const showtimeDate = new Date(showtime.startTime);
                    const isActive = (showtimeDate - now) / 60000 > 15;
                    if (isActive) {
                        return (
                            <Link to={`/booking/${showtime.id}`} key={showtime.id} className={styles.showtime}>
                                <div>
                                    {showtimeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                                    <span className={styles.priceTag}>{`${showtime.type} | ${showtime.ticketPrice.toFixed(2)} BGN`}</span>
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
        ));
    };

    return (
        <div className={styles.movieProgram}>
            <h2 className={styles.programLabel}>Program</h2>
            <DateNavigation selectedDate={selectedDate} onSelectDate={setSelectedDate} />
            <div className={styles.cinemaShowtimes}>
                {Object.keys(groupedShowtimes).length > 0 ? renderCinemaShowtimes() : <p>No showtimes available.</p>}
            </div>
        </div>
    );
}

export default MovieProgram;
