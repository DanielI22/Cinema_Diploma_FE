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
    const { t } = useTranslation();

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (password.length < 3) {
            setErrorMessage(t('passwordTooShort'));
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
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
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
