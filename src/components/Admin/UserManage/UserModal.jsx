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

    const handleAddUser = async (event) => {
        event.preventDefault();
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
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <button className={styles.submitButton}>{t('add')} {t(role)}</button>
            </form>
        </Modal>
    );
};

export default UserModal;
