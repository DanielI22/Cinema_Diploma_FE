// ChangePasswordModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './ChangePasswordModal.module.css';
import * as userService from '../../services/userService';
import { useAuth } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';

const ChangePasswordModal = ({ isOpen, onClose }) => {
    const { logoutHandler } = useAuth();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (password.length < 3) {
            setErrorMessage("Password must be at least 3 characters long.")
            return;
        }

        if (confirmPassword !== password) {
            setErrorMessage('Passwords do not match!');
            return
        }
        await userService.updatePassword({password});
        logoutHandler();
        navigate(PATHS.LOGIN);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Change Password"
            className={styles.Modal}
            overlayClassName={styles.Overlay}
        >
            <form onSubmit={handleChangePassword}>
                <h2>Change Password</h2>
                <div className={styles.formGroup}>
                    <label>New Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button className={styles.submitButton}>Submit</button>
            </form>
            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
        </Modal>
    );
};

export default ChangePasswordModal;
