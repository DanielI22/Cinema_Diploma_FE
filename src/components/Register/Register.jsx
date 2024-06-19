import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import { GENERAL_ERROR, PATHS } from '../../utils/constants';
import { useAuth } from "../../contexts/authContext";
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
    const [showCriteria, setShowCriteria] = useState(false);
    const [criteria, setCriteria] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        digit: false,
        specialChar: false,
    });
    const { t } = useTranslation();

    const handlePasswordChange = (e) => {
        const { value } = e.target;
        setPassword(value);
        setCriteria({
            length: value.length >= 8,
            uppercase: /[A-Z]/.test(value),
            lowercase: /[a-z]/.test(value),
            digit: /\d/.test(value),
            specialChar: /[@$!%*?&]/.test(value),
        });
    };

    const validatePassword = (password) => {
        const { length, uppercase, lowercase, digit, specialChar } = criteria;
        return length && uppercase && lowercase && digit && specialChar;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username.length < 3) {
            setError(t("errors.usernameLength"));
            return;
        }

        if (!validatePassword(password)) {
            setError(t("errors.passwordCriteria"));
            return;
        }

        if (confirmPassword !== password) {
            setError(t("errors.passwordsMismatch"));
            return;
        }

        setError('');
        setIsLoading(true);
        const result = await registerSubmitHandler({ username, email, password });
        if (result) {
            toast.warning(t('errors.verifyMail'));
        }
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
                        onChange={handlePasswordChange}
                        onFocus={() => setShowCriteria(true)}
                        onBlur={() => setShowCriteria(false)}
                        required
                    />
                </div>
                <div className={`${styles.criteriaBox} ${showCriteria ? styles.show : ''}`}>
                    <p className={criteria.length ? styles.valid : styles.invalid}>
                        {criteria.length ? '✔' : '✘'} {t('passwordCriteria.length')}
                    </p>
                    <p className={criteria.uppercase ? styles.valid : styles.invalid}>
                        {criteria.uppercase ? '✔' : '✘'} {t('passwordCriteria.uppercase')}
                    </p>
                    <p className={criteria.lowercase ? styles.valid : styles.invalid}>
                        {criteria.lowercase ? '✔' : '✘'} {t('passwordCriteria.lowercase')}
                    </p>
                    <p className={criteria.digit ? styles.valid : styles.invalid}>
                        {criteria.digit ? '✔' : '✘'} {t('passwordCriteria.digit')}
                    </p>
                    <p className={criteria.specialChar ? styles.valid : styles.invalid}>
                        {criteria.specialChar ? '✔' : '✘'} {t('passwordCriteria.specialChar')}
                    </p>
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
