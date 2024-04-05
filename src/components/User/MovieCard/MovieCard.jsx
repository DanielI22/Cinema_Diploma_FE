import styles from './MovieCard.module.css';
import { Link } from 'react-router-dom';
import { PATHS } from '../../../utils/constants';
import { genresToString } from '../../../utils/functions';

export default function MovieCard({ movie, redirect = true }) {
  const cardContent = (
    <div className={styles.card}>
      <img src={movie.imageUrl} alt={movie.title} className={styles.poster} />
      <div className={styles.info}>
        <h3 className={styles.title}>{movie.title}</h3>
        <p className={styles.genre}>{genresToString(movie.genres)}</p>
      </div>
    </div>
  );

  return redirect ? (
    <Link to={`${PATHS.MOVIES}/${movie.id}`} className={styles.cardLink}>
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
}