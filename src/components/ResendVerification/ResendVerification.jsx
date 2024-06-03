import { useState } from 'react';
import styles from './ResendVerification.module.css';
import { sendVerificationEmail } from '../../services/authService';
import Spinner from '../Spinner/Spinner';

export default function ResendVerification() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await sendVerificationEmail(email);
        setIsLoading(false);
    };

    if (isLoading) {
        return <Spinner />
    }
    return (
        <div className={styles.resendVerificationContainer}>
            <form onSubmit={handleSubmit} className={styles.resendVerificationForm}>
                <h2>Resend Verification Link</h2>
                <div className={styles.inputGroup}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button className={styles.submitButton} disabled={isLoading}>
                    Send Verification Link
                </button>
            </form>
        </div>
    );
}
