import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './ChangePasswordModal.module.css';
import * as userService from '../../services/userService';
import { useAuth } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ChangePasswordModal = ({ isOpen, onClose }) => {
    const { logoutHandler } = useAuth();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
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


    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (!validatePassword(password)) {
            setError(t("errors.passwordCriteria"));
            return;
        }

        if (confirmPassword !== password) {
            setErrorMessage(t('passwordsDoNotMatch'));
            return;
        }

        await userService.updatePassword({ password });
        logoutHandler();
        navigate(PATHS.LOGIN);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel={t('changePassword')}
            className={styles.Modal}
            overlayClassName={styles.Overlay}
        >
            <form onSubmit={handleChangePassword}>
                <h2>{t('changePassword')}</h2>
                <div className={styles.formGroup}>
                    <label>{t('newPassword')}</label>
                    <input
                        type="password"
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
                <div className={styles.formGroup}>
                    <label>{t('confirmPassword')}</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button className={styles.submitButton}>{t('submit')}</button>
            </form>
            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
        </Modal>
    );
};

export default ChangePasswordModal;
