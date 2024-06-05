import React, { useState } from 'react';
import styles from './ForgotPassword.module.css';
import { sendForgotPasswordEmail } from '../../services/authService';
import Spinner from '../Spinner/Spinner';
import { useTranslation } from 'react-i18next';

export default function ForgotPassword() {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await sendForgotPasswordEmail(email);
        setIsLoading(false);
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className={styles.forgotPasswordContainer}>
            <form onSubmit={handleSubmit} className={styles.forgotPasswordForm}>
                <h2>{t('forgotPassword')}</h2>
                <div className={styles.inputGroup}>
                    <input
                        type="email"
                        placeholder={t('enterYourEmail')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button className={styles.submitButton} disabled={isLoading}>
                    {t('sendResetLink')}
                </button>
            </form>
        </div>
    );
}
