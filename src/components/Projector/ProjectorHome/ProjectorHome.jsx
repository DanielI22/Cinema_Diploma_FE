import React, { useState, useEffect } from 'react';
import styles from './ProjectorHome.module.css';
import * as showtimeService from '../../../services/showtimeService';
import * as cinemaService from '../../../services/cinemaService';
import { useCinema } from '../../../contexts/cinemaContext';
import Spinner from '../../Spinner/Spinner';
import { formatLocalDate } from '../../../utils/functions';

const ProjectorHome = () => {
    const { selectedCinema } = useCinema();
    const [halls, setHalls] = useState([]);
    const [selectedHall, setSelectedHall] = useState(null);
    const [showtimes, setShowtimes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentShowtime, setCurrentShowtime] = useState(null);
    const [nextShowtime, setNextShowtime] = useState(null);
    const [viewDate, setViewDate] = useState(new Date());

    useEffect(() => {
        const fetchHalls = async () => {
            const response = await cinemaService.getHalls(selectedCinema.id);
            setHalls(response.halls);
        };

        fetchHalls();
    }, [selectedCinema]);

    const handleHallChange = async (e) => {
        const hallId = e.target.value;
        setSelectedHall(hallId);
        fetchShowtimes(hallId, viewDate.toISOString().slice(0, 10));
    };

    const handleDateChange = (daysOffset) => {
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + daysOffset);
        setViewDate(newDate);
        if (selectedHall) {
            fetchShowtimes(selectedHall, newDate.toISOString().slice(0, 10));
        }
    };

    const fetchShowtimes = async (hallId, date) => {
        setIsLoading(true);
        const response = await showtimeService.getByHallAndDate(hallId, date);
        setShowtimes(response.showtimes);
        setIsLoading(false);
        determineCurrentAndNextShowtime(response.showtimes);
    };

    const handleSetCurrentShowtime = async (showtimeId) => {
        await showtimeService.setCurrentShowtime(showtimeId);
        fetchShowtimes(selectedHall, viewDate.toISOString().slice(0, 10));
    };

    const handleMarkShowtimeAsEnded = async (showtimeId) => {
        await showtimeService.endShowtime(showtimeId);
        fetchShowtimes(selectedHall, viewDate.toISOString().slice(0, 10));
    };

    const handleMarkShowtimeAsUpcoming = async (showtimeId) => {
        await showtimeService.setUpcomingShowtime(showtimeId);
        fetchShowtimes(selectedHall, viewDate.toISOString().slice(0, 10));
    };

    const determineCurrentAndNextShowtime = (showtimes) => {
        const now = new Date();
        let current = null;
        let next = null;

        for (const showtime of showtimes) {
            const showtimeStart = new Date(showtime.startTime);
            const showtimeEnd = new Date(showtimeStart.getTime() + showtime.movieDuration * 60000);

            if (now >= showtimeStart && now <= showtimeEnd) {
                current = showtime;
            }
            if (now < showtimeStart && !next) {
                next = showtime;
            }
        }

        setCurrentShowtime(current);
        setNextShowtime(next);
    };

    const getStatus = (showtime) => {
        if (showtime.isEnded) {
            return 'Ended';
        } else if (showtime.isCurrent) {
            return (
                <div className={styles.liveStatus}>
                    Live <span className={styles.glowingDot}></span>
                </div>
            );
        } else {
            return 'Upcoming';
        }
    };

    return (
        <div className={styles.container}>
            <h2>Projector Control</h2>
            <label htmlFor="hallSelect">Select Hall:</label>
            <select id="hallSelect" onChange={handleHallChange} className={styles.select} value={selectedHall || ''}>
                {!selectedHall && <option value="">Select a hall</option>}
                {halls.map(hall => (
                    <option key={hall.id} value={hall.id}>{hall.name}</option>
                ))}
            </select>

            {selectedHall && <div className={styles.dateToggle}>
                <button onClick={() => handleDateChange(0)} disabled={viewDate.getDate() === new Date().getDate()} className={styles.dateButton}>
                    Today
                </button>
                <button onClick={() => handleDateChange(1)} disabled={viewDate.getDate() === new Date().getDate() + 1} className={styles.dateButton}>
                    Tomorrow
                </button>
            </div>}


            {isLoading && <Spinner />}
            <div className={styles.indicator}>
                {currentShowtime &&
                    <p>
                        Expected Live: {currentShowtime.movieName} - {formatLocalDate(currentShowtime.startTime)}
                    </p>}
                {nextShowtime &&
                    <p>
                        Next Showtime: {nextShowtime.movieName} - {formatLocalDate(nextShowtime.startTime)}
                    </p>}
            </div>
            {showtimes.length > 0 && (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Movie</th>
                            <th>Start Time</th>
                            <th>Duration</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showtimes.map(showtime => (
                            <tr key={showtime.id}>
                                <td>{showtime.movieName}</td>
                                <td>{formatLocalDate(showtime.startTime)}</td>
                                <td>{showtime.movieDuration} mins</td>
                                <td>{showtime.type}</td>
                                <td>{getStatus(showtime)}</td>
                                <td>
                                    {viewDate.getDate() === new Date().getDate() ? (
                                        <>
                                            <button onClick={() => handleSetCurrentShowtime(showtime.id)} disabled={showtime.isCurrent} className={styles.actionButton}>Set Live</button>
                                            <button onClick={() => handleMarkShowtimeAsEnded(showtime.id)} disabled={showtime.isEnded} className={styles.actionButton}>Ended</button>
                                            <button onClick={() => handleMarkShowtimeAsUpcoming(showtime.id)} disabled={!showtime.isEnded && !showtime.isCurrent} className={styles.actionButton}>Upcoming</button>
                                        </>
                                    ) : (
                                        <p className={styles.noActions}>No actions available</p>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProjectorHome;
