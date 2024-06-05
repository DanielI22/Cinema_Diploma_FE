import { Link } from 'react-router-dom';
import styles from './ShowtimeGroup.module.css';
import { PATHS } from '../../../utils/constants';
import { useTranslation } from 'react-i18next';

const ShowtimeGroup = ({ groupedShowtimes, showDeleteModal }) => {
    const { t } = useTranslation();

    return (
        <>
            {groupedShowtimes.map((cinema) => (
                <div key={cinema.cinemaName} className={styles.cinemaGroup}>
                    <h3 className={styles.cinemaName}>{cinema.cinemaName}</h3>
                    {cinema.movies.map((movie) => (
                        <div key={movie.movieName} className={styles.movieGroup}>
                            <h4 className={styles.movieName}>{movie.movieName}</h4>
                            {movie.showtimes.map((showtime) => (
                                <div key={showtime.id} className={styles.showtimeItemWrapper}>
                                    <div className={styles.showtimeDetails}>
                                        {new Date(showtime.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} - {showtime.hallName}
                                    </div>
                                    <div className={styles.showtimeActions}>
                                        <Link to={`${PATHS.MANAGE_BOOKINGS}/${showtime.id}`} className={styles.viewButton}>
                                            {t('view')}
                                        </Link>
                                        <Link to={`${PATHS.MANAGE_SHOWTIME}/${showtime.id}`} className={styles.editButton}>
                                            {t('edit')}
                                        </Link>
                                        <button onClick={() => showDeleteModal(showtime.id)} className={styles.deleteButton}>
                                            {t('delete')}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
};

export default ShowtimeGroup;
