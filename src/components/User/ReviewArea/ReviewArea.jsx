import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as reviewService from '../../../services/reviewService';
import ReviewList from '../ReviewList/ReviewList';
import { PATHS, REVIEWS_PER_PAGE } from '../../../utils/constants';
import { useAuth } from '../../../contexts/authContext';
import styles from './ReviewArea.module.css';
import DeleteModal from '../../DeleteModal/DeleteModal';
import useDeleteModal from '../../../hooks/useDeleteModal';
import Spinner from '../../Spinner/Spinner';

export default function ReviewArea() {
    const { movieId } = useParams();
    const [reviewText, setReviewText] = useState('');
    const [allReviews, setAllReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { isAuthenticated, userDetails } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const { isModalVisible, showDeleteModal, hideDeleteModal, confirmDeletion } = useDeleteModal();

    useEffect(() => {
        fetchReviews(movieId)
    }, [movieId]);

    const fetchReviews = async (movieId) => {
        setIsLoading(true);
        const response = await reviewService.getReviewsByMovieId(movieId);
        setAllReviews(response.reviews);
        setIsLoading(false);
    };


    const onSubmitReview = async () => {
        if (!reviewText.trim()) return;
        setIsLoading(true);
        const response = await reviewService.addMovieReview(movieId, { reviewText });
        setIsLoading(false);
        response.review.username = userDetails.username;
        setAllReviews([response.review, ...allReviews]);
        setReviewText('');
    };

    const onDeleteReview = async (reviewId) => {
        await reviewService.deleteReview(reviewId);
        setCurrentPage(1);
        setAllReviews(allReviews.filter(review => review.id !== reviewId));
    };

    const reviewsPerPage = REVIEWS_PER_PAGE;
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = allReviews.slice(indexOfFirstReview, indexOfLastReview);

    return (
        <div className={styles.reviewArea}>
           <h2 className={styles.reviewLabel}>Reviews</h2>
            {isAuthenticated ? (
                <>
                    <textarea
                        className={styles.reviewTextarea}
                        placeholder="Leave a review..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    ></textarea>
                    <button onClick={onSubmitReview} className={styles.submitButton}>Send</button>
                </>
            ) : (
                <p className={styles.noSignIn}><a href={PATHS.LOGIN}>Sign in to leave a review.</a></p>
            )}
            {isLoading ? <Spinner /> :  <ReviewList reviews={currentReviews} onDeleteReview={showDeleteModal} />}
            <DeleteModal
                showModal={isModalVisible}
                onConfirm={() => confirmDeletion(onDeleteReview)}
                onCancel={hideDeleteModal}
            />

            {allReviews.length > reviewsPerPage && (
                <nav className={styles.pagination}>
                    {Array.from({ length: Math.ceil(allReviews.length / reviewsPerPage) }, (_, i) => i + 1).map(number => (
                        <button
                            key={number}
                            onClick={() => setCurrentPage(number)}
                            className={`${styles.pageLink} ${number === currentPage ? styles.currentPageLink : ''}`}
                        >
                            {number}
                        </button>
                    ))}
                </nav>
            )}
        </div>
    );
}
