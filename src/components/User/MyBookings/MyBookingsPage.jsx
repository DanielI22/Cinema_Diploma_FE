import React, { useState, useEffect } from 'react';
import styles from './MyBookingsPage.module.css';
import * as bookingService from '../../../services/bookingService';
import Spinner from '../../Spinner/Spinner';
import Sidebar from '../Sidebar/Sidebar';
import Barcode from 'react-barcode';
import { generatePDF } from '../../../utils/pdfGenerator';
import useDeleteModal from '../../../hooks/useDeleteModal';
import DeleteModal from '../../DeleteModal/DeleteModal';

const ITEMS_PER_PAGE = 2;

const MyBookingsPage = () => {
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
        const { movieTitle, moviePoster, cinemaName, showtimeStartTime, tickets, status, shortcode, totalPrice } = booking;
        return (
            <div key={booking.id} className={styles.bookingCard}>
                <img src={moviePoster} alt={movieTitle} className={styles.moviePoster} />
                <div className={styles.bookingDetails}>
                    <h3 className={styles.movieTitle}>{movieTitle}</h3>
                    <p><strong>{cinemaName}</strong></p>
                    <p>
                        <strong>Showtime:</strong> {new Date(showtimeStartTime).toLocaleString('en-GB', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        })}
                    </p>
                    <p><strong>Seats:</strong> {tickets.map(ticket => (
                        <div key={ticket.id} className={styles.ticketDetails}>
                            Row {ticket.seat.rowNumber} Seat {ticket.seat.seatNumber} ({ticket.type} - {ticket.price} BGN)
                        </div>
                    ))}</p>
                    <p><strong>Status:</strong> {status}</p>
                    <p><strong>Total Price:</strong> {totalPrice} BGN</p>
                    <div className={styles.actionButtons}>
                        <button onClick={() => generatePDF(booking)} className={styles.downloadButton}>Download as PDF</button>
                        {status === 'available' && (
                            <button onClick={() => showDeleteModal(booking.id)} className={styles.cancelButton}>
                                Cancel Booking
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
            <Sidebar />
            <div className={styles.content}>
                <h1 className={styles.header}>My Bookings</h1>
                <div className={styles.section}>
                    <h2>Upcoming</h2>
                    {upcomingBookings.length > 0 ? (
                        upcomingBookings.map(renderBooking)
                    ) : (
                        <p>No upcoming bookings.</p>
                    )}
                    <DeleteModal
                        showModal={isModalVisible}
                        onConfirm={() => confirmDeletion(handleCancelBooking)}
                        onCancel={hideDeleteModal}
                    />
                </div>
                <div className={styles.section}>
                    <h2>Already Passed</h2>
                    {currentBookings.length > 0 ? (
                        currentBookings.map(renderBooking)
                    ) : (
                        <p>No already passed bookings.</p>
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
