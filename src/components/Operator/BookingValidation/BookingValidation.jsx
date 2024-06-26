import React, { useState } from 'react';
import styles from './BookingValidation.module.css';
import * as bookingService from '../../../services/bookingService';
import Spinner from '../../Spinner/Spinner';
import { useCinema } from '../../../contexts/cinemaContext';
import PhysicalPaymentModal from '../PhysicalPaymentModal/PhysicalPaymentModal';
import { formatLocalDate } from '../../../utils/functions';
import { useTranslation } from 'react-i18next';

const BookingValidation = () => {
    const { t } = useTranslation();
    const { selectedCinema } = useCinema();
    const [bookingCode, setBookingCode] = useState('');
    const [isValid, setIsValid] = useState(null); // null for no validation, true for valid, false for invalid
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [booking, setBooking] = useState(null);
    const [orderInfo, setOrderInfo] = useState(null);

    const handleChange = (e) => {
        setBookingCode(e.target.value);
        setIsValid(null);
        setError(null);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleValidate();
        }
    };

    const handleValidate = async () => {
        if (bookingCode.length !== 5 || isNaN(bookingCode)) {
            setError(t('invalidBookingCode'));
            setIsValid(false);
            return;
        }

        setIsLoading(true);
        try {
            const response = await bookingService.validateBooking(bookingCode, selectedCinema.id);
            if (response.status === 200) {
                setIsValid(true);
                setError(null);
                const booking = response.data.booking;
                setBooking(booking);
                const orderInfo = {
                    bookingId: booking.id,
                    totalPrice: booking.totalPrice
                };
                setOrderInfo(orderInfo);
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data);
            } else {
                setError(t('failedValidation'));
            }
            setIsValid(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div className={styles.container}>
            <h2>{t('validateBooking')}</h2>
            <input
                type="text"
                value={bookingCode}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder={t('enterBookingCode')}
                className={styles.input}
            />
            <button onClick={handleValidate} className={styles.validateButton} disabled={isLoading}>
                {t('validate')}
            </button>
            {isLoading && <Spinner />}
            {isValid && !isLoading && (
                <div className={styles.success}>
                    <span className={styles.checkMark}>&#10004;</span>
                    <p className={styles.bookingInfo}>
                        {t('validBooking')} <br />
                        {booking.tickets.length} {t('tickets')} <br />
                        {booking.movieTitle} - {formatLocalDate(booking.showtimeStartTime)}
                    </p>
                    <button onClick={handleOpenModal} className={styles.createTicketsButton}>
                        {t('payment')}
                    </button>
                </div>
            )}
            {isValid === false && !isLoading && (
                <div className={styles.errorContainer}>
                    <span className={styles.errorMark}>&#10060;</span>
                    <p className={styles.error}>{error}</p>
                </div>
            )}
            <PhysicalPaymentModal isOpen={isModalOpen} onClose={handleModalClose} orderInfo={orderInfo} />
        </div>
    );
};

export default BookingValidation;
