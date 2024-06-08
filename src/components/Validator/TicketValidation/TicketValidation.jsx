import React, { useRef, useState } from 'react';
import styles from './TicketValidation.module.css';
import * as ticketService from '../../../services/ticketService';
import Spinner from '../../Spinner/Spinner';
import { useCinema } from '../../../contexts/cinemaContext';
import { formatLocalDate } from '../../../utils/functions';
import { useTranslation } from 'react-i18next';

const TicketValidation = () => {
    const { selectedCinema } = useCinema();
    const [ticketCode, setTicketCode] = useState('');
    const [isValid, setIsValid] = useState(null); // null for no validation, true for valid, false for invalid
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ticket, setTicket] = useState(null);
    const inputRef = useRef(null);
    const { t } = useTranslation();

    const handleChange = (e) => {
        setTicketCode(e.target.value);
        setIsValid(null);
        setError(null);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleValidate();
        }
    };

    const handleValidate = async () => {
        if (ticketCode.length !== 5 || isNaN(ticketCode)) {
            setError(t('invalidTicketCode'));
            setIsValid(false);
            return;
        }

        setIsLoading(true);
        try {
            const response = await ticketService.validateTicket(ticketCode, selectedCinema.id);
            if (response.status === 200) {
                setIsValid(true);
                setError(null);
                const ticket = response.data.ticket;
                setTicket(ticket);
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data);
            } else {
                setError(t('validationError'));
            }
            setIsValid(false);
        } finally {
            setIsLoading(false);
            setTicketCode('');
            inputRef.current.focus(); // Set focus on input
        }
    };

    return (
        <div className={styles.container}>
            <h2>{t('validateTicket')}</h2>
            <input
                ref={inputRef}
                type="text"
                value={ticketCode}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder={t('enterTicketCode')}
                className={styles.input}
            />
            <button onClick={handleValidate} className={styles.validateButton} disabled={isLoading}>{t('validate')}</button>
            {isLoading && <Spinner />}
            {isValid && !isLoading && (
                <div className={styles.success}>
                    <span className={styles.checkMark}>&#10004;</span>
                    <p className={styles.ticketInfo}>
                        {t('validTicket')}<br />
                        {ticket.movieTitle} - {formatLocalDate(ticket.showtimeStartTime)}<br />
                        {t('hall')}: {ticket.hallName}<br />
                        {t('row')}: {ticket.seat.rowNumber}<br />
                        {t('seat')}: {ticket.seat.seatNumber}<br />
                    </p>
                </div>
            )}
            {isValid === false && !isLoading && (
                <div className={styles.errorContainer}>
                    <span className={styles.errorMark}>&#10060;</span>
                    <p className={styles.error}>{error}</p>
                </div>
            )}
        </div>
    );
};

export default TicketValidation;
