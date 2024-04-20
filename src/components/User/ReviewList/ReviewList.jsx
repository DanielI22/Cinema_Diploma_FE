import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './ReviewList.module.css';
import { useAuth } from '../../../contexts/authContext';


export default function ReviewList({ reviews, onDeleteReview }) {
    const { userDetails } = useAuth();

    return (
        <div className={styles.reviewList}>
            {reviews.map(review => (
                <div key={review.id} className={styles.review}>
                    <p className={styles.author}>{review.username}</p>
                    <p className={styles.content}>{review.reviewText}</p>
                    {(userDetails.userId === review.userId || userDetails.role === "admin") && (
                        <button onClick={() => onDeleteReview(review.id)} className={styles.deleteButton}>
                            <FontAwesomeIcon icon={faTrashAlt} color="red" />
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
