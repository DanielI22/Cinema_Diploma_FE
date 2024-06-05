import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './PhysicalPaymentModal.module.css';
import { useNavigate } from 'react-router-dom';
import * as ticketService from "../../../services/ticketService";
import * as bookingService from "../../../services/bookingService";
import Spinner from '../../Spinner/Spinner';
import { generateTicketsPDF } from '../../../utils/pdfGenerator';
import { useTranslation } from 'react-i18next';

Modal.setAppElement('#root');

const PhysicalPaymentModal = ({ isOpen, onClose, orderInfo }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    const [ticketIds, setTicketIds] = useState([]);
    const navigate = useNavigate();
    const { t } = useTranslation();

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
            contentLabel={t('physicalPaymentModal')}
            className={styles.Modal}
            overlayClassName={styles.Overlay}
        >
            <h2>{t('completePayment')}</h2>
            <div className={styles.form}>
                {isLoading && <Spinner />}
                {!paymentCompleted ? (
                    <>
                        <p>{t('completePaymentMessage')}<br />{t('totalPrice')}: <strong>{orderInfo?.totalPrice.toFixed(2) || 0} {t("BGN")}</strong></p>
                        <button onClick={handleFinishPayment} className={styles.payButton}>{t('finishPayment')}</button>
                    </>
                ) : (
                    <button onClick={handleGetTickets} className={styles.getTicketsButton}>
                        {t('getTickets')}
                    </button>
                )}
            </div>
        </Modal>
    );
};

export default PhysicalPaymentModal;
