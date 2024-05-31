import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './PhysicalPaymentModal.module.css';
import { useNavigate } from 'react-router-dom';
import * as ticketService from "../../../services/ticketService";
import * as bookingService from "../../../services/bookingService";
import Spinner from '../../Spinner/Spinner';
import { generateTicketsPDF } from '../../../utils/pdfGenerator';

// Style the modal
Modal.setAppElement('#root'); // This is important for accessibility

const PhysicalPaymentModal = ({ isOpen, onClose, orderInfo }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    const [ticketIds, setTicketIds] = useState([]);
    const navigate = useNavigate();

    const handleFinishPayment = async () => {
        let result;
        if (orderInfo.bookingId) {
            result = await bookingService.takeBooking(orderInfo.bookingId);
        } else {
            result = await ticketService.buyTickets({ orderInfo });
        }
        setTicketIds(result.ticketIds);
        setIsLoading(false);
        setPaymentCompleted(true);
    };

    const handleGetTickets = async () => {
        const tickets = [];
        for (const ticketId of ticketIds) {
            const result = await ticketService.getOne(ticketId);
            tickets.push(result.ticket);
        }
        generateTicketsPDF(tickets);
        onClose();
        navigate(0);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Physical Payment Modal"
            className={styles.Modal}
            overlayClassName={styles.Overlay}
        >
            <h2>Complete Your Payment</h2>
            <div className={styles.form}>
                {isLoading && <Spinner />}
                {!paymentCompleted ? (
                    <>
                        <p>Please complete the payment process.
                            <br />Total Price: <strong>{orderInfo?.totalPrice.toFixed(2) || 0} BGN</strong></p>
                        <button onClick={handleFinishPayment} className={styles.payButton}>Finish Payment</button>
                    </>
                ) : (
                    <button onClick={handleGetTickets} className={styles.getTicketsButton}>
                        Get Tickets
                    </button>
                )}
            </div>
        </Modal>
    );
};

export default PhysicalPaymentModal;
