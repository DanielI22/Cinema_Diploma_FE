import React, { useState } from 'react';
import Modal from 'react-modal';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styles from './PaymentModal.module.css';
import * as paymentService from "../../../services/paymentService";
import * as ticketService from "../../../services/ticketService";
import { GENERAL_ERROR, PATHS, STRIPE_PK } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';

// Load your publishable key from the Stripe dashboard
const stripePromise = loadStripe(STRIPE_PK);

// Style the modal
Modal.setAppElement('#root'); // This is important for accessibility

const CheckoutForm = ({ onClose, setSuccess, orderInfo }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        // Create a payment method
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setError(error.message);
            setIsLoading(false);
            return;
        }

        // Send payment method id to your server
        const response = await paymentService.pay({
            paymentMethodId: paymentMethod.id,
            orderInfo: orderInfo
        })

        if (response.status !== 200) {
            setError(GENERAL_ERROR);
            return;
        }

        const { clientSecret } = response.data.paymentResponse;
        // Confirm the payment on the client
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret);

        if (confirmError) {
            setError(confirmError.message);
            setIsLoading(false);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            setSuccess(true);
            setTimeout(onClose, 2000);
            const ticketInfo = {
                orderInfo
            }
            await ticketService.buyTickets(ticketInfo);
            navigate(PATHS.MY_TICKETS);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <CardElement />
            <button type="submit" disabled={!stripe || isLoading} className={styles.payButton}>
                {isLoading ? 'Processing...' : 'Pay'}
            </button>
            {error && <div className={styles.error}>{error}</div>}
        </form>
    );
};

const PaymentModal = ({ isOpen, onClose, orderInfo }) => {
    const [success, setSuccess] = useState(false);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Payment Modal"
            className={styles.Modal}
            overlayClassName={styles.Overlay}
        >
            <h2>Complete Your Payment</h2>
            <Elements stripe={stripePromise}>
                <CheckoutForm onClose={onClose} setSuccess={setSuccess} orderInfo={orderInfo} />
            </Elements>
            {success && <div className={styles.success}>Payment Successful!</div>}
        </Modal>
    );
};

export default PaymentModal;