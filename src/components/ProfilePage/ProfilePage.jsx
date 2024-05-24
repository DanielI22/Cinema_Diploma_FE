import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import styles from './ProfilePage.module.css';
import * as userService from '../../services/userService';
import ChangePasswordModal from './ChangePasswordModal';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../utils/constants';
import Sidebar from '../User/Sidebar/Sidebar';

const ProfilePage = () => {
    const { userDetails, logoutHandler } = useAuth();
    const [username, setUsername] = useState(userDetails.username);
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setUsername(userDetails.username);
    }, [userDetails.username]);

    const handleUsernameChange = async () => {
        if (username === userDetails.username) {
            setIsEditingUsername(false);
            return;
        }
        await userService.updateUsername({ username });
        logoutHandler();
        navigate(PATHS.LOGIN);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleCancelEdit = () => {
        setUsername(userDetails.username);
        setIsEditingUsername(false);
    };

    return (
        <div className={styles.profilePage}>
            {userDetails.role === 'user' && <Sidebar />}
            <div className={styles.content}>
                <h1 className={styles.header}>Profile</h1>
                <div className={styles.formGroup}>
                    <label>Email</label>
                    <p>{userDetails.email}</p>
                </div>
                <div className={styles.formGroup}>
                    <label>Username</label>
                    {isEditingUsername ? (
                        <>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <button onClick={handleUsernameChange} className={styles.submitButton}>Submit</button>
                            <button onClick={handleCancelEdit} className={styles.cancelButton}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <p>{username}</p>
                            <button onClick={() => setIsEditingUsername(true)} className={styles.editButton}>Edit</button>
                        </>
                    )}
                </div>
                <button onClick={openModal} className={styles.changePasswordButton}>Change Password</button>
            </div>
            <ChangePasswordModal
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </div>
    );
};

export default ProfilePage;
