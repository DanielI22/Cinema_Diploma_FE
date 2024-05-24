import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './UserModal.module.css';
import * as userService from '../../../services/userService';

const UserModal = ({ isOpen, onClose, role, refreshUsers }) => {
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
            <h2>Add {role}</h2>
            <form onSubmit={handleAddUser} className={styles.form}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <button className={styles.submitButton}>Add {role}</button>
            </form>
        </Modal>
    );
};

export default UserModal;
