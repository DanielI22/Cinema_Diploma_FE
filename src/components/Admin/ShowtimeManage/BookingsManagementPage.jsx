import React, { useState, useEffect } from 'react';
import styles from './BookingsManagementPage.module.css';
import * as hallService from '../../../services/hallService';
import * as bookingService from '../../../services/bookingService';
import * as ticketService from '../../../services/ticketService';
import Spinner from '../../Spinner/Spinner';
import { useParams } from 'react-router-dom';
import BackButton from '../../BackButton/BackButton';
import DeleteModal from '../../DeleteModal/DeleteModal';
import useDeleteModal from '../../../hooks/useDeleteModal';
import { ITEMS_PER_PAGE_BOOKINGS, ITEMS_PER_PAGE_TICKETS } from '../../../utils/constants';
import { useTranslation } from 'react-i18next';
import { mapBookingStatus } from '../../../utils/functions';

const BookingsManagementPage = () => {
    const { t } = useTranslation();
    const { showtimeId } = useParams();
    const [rows, setRows] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { isModalVisible, showDeleteModal, hideDeleteModal, confirmDeletion } = useDeleteModal();
    const [currentPageBookings, setCurrentPageBookings] = useState(1);
    const [currentPageTickets, setCurrentPageTickets] = useState(1);

    const fetchData = async () => {
        const hallResponse = await hallService.getShowtimeHall(showtimeId);
        const bookingsResponse = await bookingService.getShowtimeBookings(showtimeId);
        const ticketsResponse = await ticketService.getShotimePurchasedTickets(showtimeId);

        setRows(hallResponse.rows);
        setBookings(bookingsResponse.bookings);
        setTickets(ticketsResponse.tickets);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [showtimeId]);

    const handleCancelBooking = async (bookingId) => {
        setIsLoading(true);
        await bookingService.cancelBooking(bookingId);
        await fetchData();
        setIsLoading(false);
    };

    if (isLoading) {
        return <Spinner />;
    }

    const indexOfLastBooking = currentPageBookings * ITEMS_PER_PAGE_BOOKINGS;
    const indexOfFirstBooking = indexOfLastBooking - ITEMS_PER_PAGE_BOOKINGS;
    const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const indexOfLastTicket = currentPageTickets * ITEMS_PER_PAGE_TICKETS;
    const indexOfFirstTicket = indexOfLastTicket - ITEMS_PER_PAGE_TICKETS;
    const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

    const paginateBookings = (pageNumber) => setCurrentPageBookings(pageNumber);
    const paginateTickets = (pageNumber) => setCurrentPageTickets(pageNumber);

    return (
        <div className={styles.bookingsManagementPage}>
            <BackButton />
            <div className={styles.screenLabel}>{t('screen')}</div>
            <div className={styles.hall}>
                {rows.map((row) => (
                    <div key={row.id} className={styles.row}>
                        <span className={styles.rowNumber}>{row.rowNumber}</span>
                        {row.seats.map((seat) => (
                            <div
                                key={seat.id}
                                className={`${styles.seat} 
                                            ${seat.isBooked ? styles.bookedSeat : ''}
                                            ${seat.isEmpty ? styles.emptySeat : ''}`}
                            >
                                {seat.isEmpty ? '' : seat.isBooked ? 'X' : seat.seatNumber}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className={styles.bookings}>
                <h2>{t('bookings')}</h2>
                {currentBookings.map((booking, index) => {
                    const totalSum = booking.tickets.reduce((sum, ticket) => sum + ticket.price, 0);
                    return (
                        <div key={booking.id} className={styles.bookingItem}>
                            <div>
                                <strong>{indexOfFirstBooking + index + 1}.</strong>
                            </div>
                            <div>
                                <strong>{t('seats')}:</strong>
                                {booking.tickets.map(ticket => (
                                    <div key={ticket.id} className={styles.ticketItem}>
                                        {t('row')} {ticket.seat.rowNumber}, {t('seat')} {ticket.seat.seatNumber} ({t(ticket.type.toLowerCase())} - {ticket.price.toFixed(2)}  {t("BGN")})
                                    </div>
                                ))}
                            </div>
                            <div>
                                <strong>{t('status')}:</strong> {mapBookingStatus(booking.status)}
                            </div>
                            <div>
                                <strong>{t('userEmail')}:</strong> {booking.userMail}
                            </div>
                            <div>
                                <strong>{t('totalSum')}:</strong> {totalSum.toFixed(2)} {t("BGN")}
                            </div>
                            {booking.status === 'available' && (
                                <button onClick={() => showDeleteModal(booking.id)} className={styles.cancelButton}>
                                    {t('cancelBooking')}
                                </button>
                            )}
                            <DeleteModal
                                showModal={isModalVisible}
                                onConfirm={() => confirmDeletion(handleCancelBooking)}
                                onCancel={hideDeleteModal}
                            />
                        </div>
                    );
                })}
                {bookings.length > ITEMS_PER_PAGE_BOOKINGS && (
                    <div className={styles.pagination}>
                        {Array.from({ length: Math.ceil(bookings.length / ITEMS_PER_PAGE_BOOKINGS) }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => paginateBookings(i + 1)}
                                className={`${styles.pageButton} ${currentPageBookings === i + 1 ? styles.pageButtonActive : ''}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.purchasedTickets}>
                <h2>{t('purchasedTickets')}</h2>
                {currentTickets.map((ticket, index) => (
                    <div key={ticket.id} className={styles.ticketItem}>
                        <div>
                            <strong>{indexOfFirstTicket + index + 1}.</strong>
                        </div>
                        <div>
                            <strong>{t('seat')}:</strong> {t('row')} {ticket.seat.rowNumber}, {t('seat')} {ticket.seat.seatNumber}
                        </div>
                        <div>
                            <strong>{t('userEmail')}:</strong> {ticket.userMail}
                        </div>
                        <div>
                            <strong>{t('type')}:</strong> {t(ticket.type.toLowerCase())}
                        </div>
                        <div>
                            <strong>{t('price')}:</strong> {ticket.price.toFixed(2)} {t("BGN")}
                        </div>
                    </div>
                ))}
                {tickets.length > ITEMS_PER_PAGE_TICKETS && (
                    <div className={styles.pagination}>
                        {Array.from({ length: Math.ceil(tickets.length / ITEMS_PER_PAGE_TICKETS) }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => paginateTickets(i + 1)}
                                className={`${styles.pageButton} ${currentPageTickets === i + 1 ? styles.pageButtonActive : ''}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingsManagementPage;
