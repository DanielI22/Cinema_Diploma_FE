import React, { useState, useEffect } from 'react';
import styles from './Booking.module.css';
import * as hallService from "../../../services/hallService";
import * as showtimeService from "../../../services/showtimeService";
import * as bookingService from "../../../services/bookingService";
import { isValidUUID } from '../../../utils/functions';
import { MAX_SEATS_BOOK, NORMAL_TICKET, PATHS, REDUCED_PRICE, REDUCED_TICKET } from '../../../utils/constants';
import Spinner from '../../Spinner/Spinner';
import NotFound from '../../NotFound/NotFound';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import PaymentModal from '../PaymentModal/PaymentModal';
import { useAuth } from '../../../contexts/authContext';
import PhysicalPaymentModal from '../../Operator/PhysicalPaymentModal/PhysicalPaymentModal';

const Booking = () => {
    const { showtimeId } = useParams();
    const [rows, setRows] = useState(null);
    const [showtime, setShowtime] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isValidId, setIsValidId] = useState(true);
    const [orderInfo, setOrderInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCashModalOpen, setIsCashModalOpen] = useState(false);
    const { userDetails } = useAuth();
    const navigate = useNavigate();

    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);
    const closeCashModal = () => setIsCashModalOpen(false);
    const openCashModal = () => setIsCashModalOpen(true);

    useEffect(() => {
        if (!showtimeId || !isValidUUID(showtimeId)) {
            setIsValidId(false);
            setIsLoading(false);
            return;
        }
        const fetchShowtime = async () => {
            try {
                const showtimeResponse = await showtimeService.getOne(showtimeId);
                const hallResponse = await hallService.getShowtimeHall(showtimeId);

                setRows(hallResponse.rows);
                setShowtime(showtimeResponse.showtime);
                setIsLoading(false);
            } catch (error) {
                setIsValidId(false);
            }
        };

        fetchShowtime();
    }, [showtimeId]);

    const handleSeatClick = (rowIndex, seatIndex) => {
        const selectedSeat = rows[rowIndex].seats[seatIndex];
        if (selectedSeat.isBooked || selectedSeat.isEmpty) {
            return;
        }

        const isSelected = selectedSeats.some(seat => seat.id === selectedSeat.id);
        if (isSelected) {
            setSelectedSeats(prevSelected => prevSelected.filter(seat => seat.id !== selectedSeat.id));
        } else {
            if (selectedSeats.length < MAX_SEATS_BOOK) {
                setSelectedSeats(prevSelected => [...prevSelected, { ...selectedSeat, ticketType: NORMAL_TICKET }]);
            } else {
                toast.warning('You can select a maximum of 5 seats');
            }
        }
    };

    const handleTicketTypeChange = (seatId, ticketType) => {
        setSelectedSeats(prevSelected =>
            prevSelected.map(seat => (seat.id === seatId ? { ...seat, ticketType } : seat))
        );
    };

    useEffect(() => {
        calculateTotalPrice();
    }, [selectedSeats]);

    const calculateTotalPrice = () => {
        let price = selectedSeats.reduce((total, seat) => {
            const seatPrice = showtime.ticketPrice;
            if (seat.ticketType === REDUCED_TICKET) {
                return total + seatPrice * (1 - REDUCED_PRICE);
            }
            return total + seatPrice;
        }, 0);
        setTotalPrice(price);
    };

    const handleBooking = async () => {
        setIsLoading(true);
        const orderInfo = {
            orderInfo: {
                showtimeId,
                seats: selectedSeats.map(seat => ({
                    seatId: seat.id,
                    ticketType: seat.ticketType
                }))
            }
        };

        await bookingService.book(orderInfo);
        setIsLoading(false);
        navigate(PATHS.MY_BOOKINGS);
    };

    const handlePayment = async () => {
        const order = {
            showtimeId,
            seats: selectedSeats.map(seat => ({
                seatId: seat.id,
                ticketType: seat.ticketType
            }))
        };
        setOrderInfo(order);
        openModal();
    };

    const handlePhysicalPayment = async () => {
        const order = {
            showtimeId,
            seats: selectedSeats.map(seat => ({
                seatId: seat.id,
                ticketType: seat.ticketType
            }))
        };
        setOrderInfo(order);
        openCashModal();
    };

    if (!isValidId) {
        return <NotFound />;
    }

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className={styles.bookingPage}>
            <div className={styles.screenLabel}>Screen</div>
            <div className={styles.hall}>
                {rows.map((row, rowIndex) => (
                    <div key={row.id} className={styles.row}>
                        <span className={styles.rowNumber}>{row.rowNumber}</span>
                        {row.seats.map((seat, seatIndex) => (
                            <div
                                key={seat.id}
                                className={`${styles.seat} 
                                            ${seat.isBooked ? styles.bookedSeat : ''}
                                            ${seat.isEmpty ? styles.emptySeat : ''}
                                            ${selectedSeats.some(s => s.id === seat.id) ? styles.selectedSeat : ''}`}
                                onClick={() => !seat.isEmptySpace && handleSeatClick(rowIndex, seatIndex)}
                            >
                                {seat.isEmpty ? '' : seat.isBooked ? 'X' : seat.seatNumber}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className={styles.selectedSeats}>
                {selectedSeats.map(seat => (
                    <div key={seat.id} className={styles.selectedSeatRow}>
                        <span>Row {seat.rowNumber} - Seat {seat.seatNumber}:</span>
                        <select
                            value={seat.ticketType}
                            onChange={e => handleTicketTypeChange(seat.id, e.target.value)}
                            className={styles.ticketTypeSelect}
                        >
                            <option value={NORMAL_TICKET}>Normal</option>
                            <option value={REDUCED_TICKET}>Reduced (Student, Child)</option>
                        </select>
                    </div>
                ))}
            </div>
            <div className={styles.totalPrice}>
                Total Price: {totalPrice.toFixed(2)} BGN
            </div>
            <div className={styles.actionButtons}>
                {userDetails.role === 'operator' ? (
                    <button
                        onClick={handlePhysicalPayment}
                        className={styles.paymentButton}
                        disabled={selectedSeats.length === 0}
                    >
                        Get Tickets
                    </button>
                ) : (
                    <>
                        <button
                            onClick={handleBooking}
                            className={styles.bookingButton}
                            disabled={selectedSeats.length === 0}
                        >
                            Book Tickets
                        </button>
                        <button
                            onClick={handlePayment}
                            className={styles.paymentButton}
                            disabled={selectedSeats.length === 0}
                        >
                            Buy Now
                        </button>
                    </>
                )}
                <PaymentModal isOpen={isModalOpen} onClose={closeModal} orderInfo={orderInfo} />
                <PhysicalPaymentModal isOpen={isCashModalOpen} onClose={closeCashModal} orderInfo={{...orderInfo, totalPrice}} />
            </div>
        </div>
    );
};

export default Booking;
