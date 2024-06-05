import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import { GENERAL_ERROR, PATHS } from '../../utils/constants';
import { useAuth } from "../../contexts/authContext"
import Spinner from '../Spinner/Spinner';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { registerSubmitHandler } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username.length < 3) {
            setError(t("errors.usernameLength"));
            return;
        }

        if (password.length < 3) {
            setError(t("errors.passwordLength"));
            return;
        }

        if (confirmPassword !== password) {
            setError(t("errors.passwordsMismatch"));
            return;
        }

        setError('');
        setIsLoading(true);
        await registerSubmitHandler({ username, email, password });
        toast.warning(t('messages.verifyMail'));
        setIsLoading(false);
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className={styles.registerContainer}>
            <form onSubmit={handleSubmit} className={styles.registerForm}>
                <h2>{t('register')}</h2>
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        placeholder={t('username')}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <input
                        type="email"
                        placeholder={t('email')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <input
                        type="password"
                        placeholder={t('password')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <input
                        type="password"
                        placeholder={t('confirmPassword')}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className={styles.errorMessage}>{error}</div>}
                <button type="submit" className={styles.registerButton}>{t('register')}</button>
                <div className={styles.loginPrompt}>
                    {t('alreadyHaveAccount')} <Link to={PATHS.LOGIN} className={styles.loginLink}>{t('login')}</Link>
                </div>
            </form>
        </div>
    );
}
