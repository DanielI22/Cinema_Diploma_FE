import { useState } from 'react';
import styles from './ForgotPassword.module.css';
import { sendForgotPasswordEmail } from '../../services/authService';
import Spinner from '../Spinner/Spinner';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await sendForgotPasswordEmail(email);
        setIsLoading(false);
    };

    if(isLoading) {
        return <Spinner />
    }
    return (
        <div className={styles.forgotPasswordContainer}>
            <form onSubmit={handleSubmit} className={styles.forgotPasswordForm}>
                <h2>Forgot Password</h2>
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
                    Send Reset Link
                </button>
            </form>
        </div>
    );
}
