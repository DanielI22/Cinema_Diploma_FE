import React, { useState, useEffect } from 'react';
import styles from './BookingManagementPage.module.css';
import * as bookingService from '../../../services/bookingService';
import Spinner from '../../Spinner/Spinner';
import DeleteModal from '../../DeleteModal/DeleteModal';
import useDeleteModal from '../../../hooks/useDeleteModal';

const BookingManagementPage = () => {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { isModalVisible, showDeleteModal, hideDeleteModal, confirmDeletion } = useDeleteModal();
    const [selectedBookingId, setSelectedBookingId] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setIsLoading(true);
        const response = await bookingService.getAll();
        setBookings(response.bookings);
        setIsLoading(false);
    };

    const handleDeleteClick = async () => {
        if (selectedBookingId) {
            setIsLoading(true);
            await bookingService.deleteBooking(selectedBookingId);
            fetchBookings();
            hideDeleteModal();
            setIsLoading(false);
        }
    };

    const bookingsGroupedByShowtime = bookings.reduce((acc, booking) => {
        (acc[booking.showtime.id] = acc[booking.showtime.id] || []).push(booking);
        return acc;
    }, {});

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className={styles.bookingManagementScreen}>
            <h2>Manage Bookings</h2>
            {Object.entries(bookingsGroupedByShowtime).map(([showtimeId, bookings]) => (
                <div key={showtimeId}>
                    <h3>{bookings[0].showtime.movieName} - {bookings[0].showtime.startTime}</h3>
                    <ul>
                        {bookings.map((booking) => (
                            <li key={booking.id}>
                                {booking.userMail} 
                                <button 
                                    className={styles.deleteButton}
                                    onClick={() => {
                                        showDeleteModal();
                                        setSelectedBookingId(booking.id);
                                    }}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <DeleteModal
                showModal={isModalVisible}
                onConfirm={() => confirmDeletion(handleDeleteClick)}
                onCancel={hideDeleteModal}
            />
        </div>
    );
};

export default BookingManagementPage;
