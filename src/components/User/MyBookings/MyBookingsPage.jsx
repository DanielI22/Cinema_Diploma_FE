import React, { useState, useEffect } from 'react';
import styles from './MyBookingsPage.module.css';
import * as bookingService from '../../../services/bookingService';
import Spinner from '../../Spinner/Spinner';
import Barcode from 'react-barcode';
import { generateBookingPDF } from '../../../utils/pdfGenerator';
import useDeleteModal from '../../../hooks/useDeleteModal';
import DeleteModal from '../../DeleteModal/DeleteModal';
import UserSidebar from '../UserSidebar/UserSidebar';
import { formatLocalDate, mapBookingStatus } from '../../../utils/functions';
import { useTranslation } from 'react-i18next';

const ITEMS_PER_PAGE = 2;

const MyBookingsPage = () => {
    const { t } = useTranslation();
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [passedBookings, setPassedBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const { isModalVisible, showDeleteModal, hideDeleteModal, confirmDeletion } = useDeleteModal();

    const fetchBookings = async () => {
        const response = await bookingService.getMyBookings();
        const now = new Date();

        const upcoming = response.bookings.filter(booking => new Date(booking.showtimeStartTime) > now);
        const passed = response.bookings.filter(booking => new Date(booking.showtimeStartTime) <= now);

        setUpcomingBookings(upcoming);
        setPassedBookings(passed);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleCancelBooking = async (bookingId) => {
        await bookingService.cancelBooking(bookingId);
        fetchBookings();
    };

    const indexOfLastBooking = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstBooking = indexOfLastBooking - ITEMS_PER_PAGE;
    const currentBookings = passedBookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (isLoading) {
        return <Spinner />;
    }

    const renderBooking = (booking) => {
        const { movieTitle, moviePoster, cinemaName, hallName, showtimeStartTime, tickets, status, shortcode, totalPrice } = booking;
        return (
            <div key={booking.id} className={styles.bookingCard}>
                <img src={moviePoster} alt={movieTitle} className={styles.moviePoster} />
                <div className={styles.bookingDetails}>
                    <h3 className={styles.movieTitle}>{movieTitle}</h3>
                    <p><strong>{cinemaName}</strong></p>
                    <p><strong>{t('hall')}:</strong> {hallName}</p>
                    <p>
                        <strong>{t('showtime')}:</strong> {formatLocalDate(showtimeStartTime)}
                    </p>
                    <p><strong>{t('seats')}:</strong> {tickets.map(ticket => (
                        <div key={ticket.id} className={styles.ticketDetails}>
                            {t('row')} {ticket.seat.rowNumber} {t('seat')} {ticket.seat.seatNumber} ({ticket.type} - {ticket.price.toFixed(2)} {t('BGN')})
                        </div>
                    ))}</p>
                    <p><strong>{t('status')}:</strong> {mapBookingStatus(status)}</p>
                    <p><strong>{t('totalPrice')}:</strong> {totalPrice.toFixed(2)} {t('BGN')}</p>
                    <div className={styles.actionButtons}>
                        <button onClick={() => generateBookingPDF(booking)} className={styles.downloadButton}>{t('downloadAsPDF')}</button>
                        {status === 'available' && (
                            <button onClick={() => showDeleteModal(booking.id)} className={styles.cancelButton}>
                                {t('cancelBooking')}
                            </button>
                        )}
                    </div>
                </div>
                <div className={styles.barcodeContainer}>
                    <Barcode value={shortcode} />
                </div>
            </div>
        );
    };

    return (
        <div className={styles.myBookingsPage}>
            <UserSidebar />
            <div className={styles.content}>
                <h1 className={styles.header}>{t('myBookings')}</h1>
                <div className={styles.section}>
                    <h2>{t('upcoming')}</h2>
                    {upcomingBookings.length > 0 ? (
                        upcomingBookings.map(renderBooking)
                    ) : (
                        <p>{t('noUpcomingBookings')}</p>
                    )}
                    <DeleteModal
                        showModal={isModalVisible}
                        onConfirm={() => confirmDeletion(handleCancelBooking)}
                        onCancel={hideDeleteModal}
                    />
                </div>
                <div className={styles.section}>
                    <h2>{t('alreadyPassed')}</h2>
                    {currentBookings.length > 0 ? (
                        currentBookings.map(renderBooking)
                    ) : (
                        <p>{t('noAlreadyPassedBookings')}</p>
                    )}
                    <div className={styles.pagination}>
                        {Array.from({ length: Math.ceil(passedBookings.length / ITEMS_PER_PAGE) }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => paginate(i + 1)}
                                className={`${styles.pageButton} ${currentPage === i + 1 ? styles.activePageButton : ''}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyBookingsPage;
