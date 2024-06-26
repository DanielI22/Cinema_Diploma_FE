import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './ReviewList.module.css';
import { useAuth } from '../../../contexts/authContext';
import { ROLES } from '../../../utils/constants';


export default function ReviewList({ reviews, onDeleteReview }) {
    const { userDetails } = useAuth();
    const getSentimentEmoji = (sentiment) => {

        switch (sentiment) {
            case 'positive':
                return '😊';
            case 'negative':
                return '😞';
            case 'happy':
                return '😄';
            case 'angry':
                return '😡';
            case 'neutral':
            default:
                return '😐';
        }
    };
    return (
        <div className={styles.reviewList}>
            {reviews.map(review => (
                <div key={review.id} className={styles.review}>
                    <p className={styles.author}>{review.username}</p>
                    <div className={styles.contentWrapper}>
                        <p className={styles.content}>{review.reviewText}</p>
                        <span className={styles.sentimentEmoji}>
                            {getSentimentEmoji(review.sentiment)}
                        </span>
                    </div>
                    {(userDetails.userId === review.userId || userDetails.role === ROLES.ADMIN) && (
                        <button onClick={() => onDeleteReview(review.id)} className={styles.deleteButton}>
                            <FontAwesomeIcon icon={faTrashAlt} color="red" />
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
