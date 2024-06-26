import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './UserModal.module.css';
import * as userService from '../../../services/userService';
import { useTranslation } from 'react-i18next';

const UserModal = ({ isOpen, onClose, role, refreshUsers }) => {
    const { t } = useTranslation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showCriteria, setShowCriteria] = useState(false);
    const [criteria, setCriteria] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        digit: false,
        specialChar: false,
    });

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

    const validatePassword = () => {
        const { length, uppercase, lowercase, digit, specialChar } = criteria;
        return length && uppercase && lowercase && digit && specialChar;
    };

    const handleAddUser = async (event) => {
        event.preventDefault();

        if (!validatePassword()) {
            setError(t("errors.passwordCriteria"));
            return;
        }

        const userData = { username, email, password };
        if (role) {
            userData.role = role;
        }
        await userService.addUser(userData);
        await refreshUsers();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className={styles.modal}>
            <h2>{t('add')} {t(role)}</h2>
            <form onSubmit={handleAddUser} className={styles.form}>
                <label>
                    {t('username')}:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label>
                    {t('email')}:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    {t('password')}:
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        onFocus={() => setShowCriteria(true)}
                        onBlur={() => setShowCriteria(false)}
                        required
                    />
                </label>
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
                {error && <div className={styles.errorMessage}>{error}</div>}
                <button className={styles.submitButton}>{t('add')} {t(role)}</button>
            </form>
        </Modal>
    );
};

export default UserModal;
