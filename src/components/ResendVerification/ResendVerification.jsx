import { useState } from 'react';
import styles from './ResendVerification.module.css';
import { sendVerificationEmail } from '../../services/authService';
import Spinner from '../Spinner/Spinner';
import { useTranslation } from 'react-i18next';

export default function ResendVerification() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await sendVerificationEmail(email);
        setIsLoading(false);
    };

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <div className={styles.resendVerificationContainer}>
            <form onSubmit={handleSubmit} className={styles.resendVerificationForm}>
                <h2>{t('resendVerificationLink')}</h2>
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
                    {t('sendVerificationLink')}
                </button>
            </form>
        </div>
    );
}
