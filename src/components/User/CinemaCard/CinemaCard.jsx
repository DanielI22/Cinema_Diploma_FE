import styles from './CinemaCard.module.css';

const CinemaCard = ({ cinema }) => {
    return (
        <div className={styles.cinemaItem}>
            <img src={cinema.imageUrl} alt={cinema.name} className={styles.cinemaImage} />
            <div className={styles.cinemaDetails}>
                <h3>{cinema.name}</h3>
                <p>{cinema.location}</p>
            </div>
        </div>
    );
}

export default CinemaCard;