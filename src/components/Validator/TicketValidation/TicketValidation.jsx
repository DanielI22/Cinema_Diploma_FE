import React, { useRef, useState } from 'react';
import styles from './TicketValidation.module.css';
import * as ticketService from '../../../services/ticketService';
import Spinner from '../../Spinner/Spinner';
import { useCinema } from '../../../contexts/cinemaContext';
import { useParams } from 'react-router-dom';
import { formatLocalDate } from '../../../utils/functions';

const TicketValidation = () => {
    const { selectedCinema } = useCinema();
    const [ticketCode, setTicketCode] = useState('');
    const [isValid, setIsValid] = useState(null); // null for no validation, true for valid, false for invalid
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ticket, setTicket] = useState(null);
    const { showtimeId } = useParams();
    const inputRef = useRef(null);

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
            setError('Invalid ticket code. Must be 5 digits.');
            setIsValid(false);
            return;
        }

        setIsLoading(true);
        try {
            const response = await ticketService.validateTicket(ticketCode, selectedCinema.id, showtimeId);
            if (response.status == 200) {
                setIsValid(true);
                setError(null);
                const ticket = response.data.ticket;
                setTicket(ticket);
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data);
            } else {
                setError('Failed to validate ticket. Please try again.');
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
            <h2>Validate Ticket</h2>
            <input
                ref={inputRef}
                type="text"
                value={ticketCode}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder="Enter ticket code"
                className={styles.input}
            />
            <button onClick={handleValidate} className={styles.validateButton} disabled={isLoading}>Validate</button>
            {isLoading && <Spinner />}
            {isValid && !isLoading && (
                <div className={styles.success}>
                    <span className={styles.checkMark}>&#10004;</span>
                    <p className={styles.ticketInfo}>Valid ticket<br />
                        {ticket.movieTitle} - {formatLocalDate(ticket.showtimeStartTime)}<br />
                        Hall: {ticket.hallName}<br />
                        Row: {ticket.seat.rowNumber}<br />
                        Seat: {ticket.seat.seatNumber}<br />
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
