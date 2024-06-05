import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import styles from './ProfilePage.module.css';
import * as userService from '../../services/userService';
import ChangePasswordModal from './ChangePasswordModal';
import { useNavigate } from 'react-router-dom';
import { PATHS, ROLES } from '../../utils/constants';
import OperatorSidebar from '../Operator/OperatorSidebar/OperatorSidebar';
import UserSidebar from '../User/UserSidebar/UserSidebar';
import { useTranslation } from 'react-i18next';

const ProfilePage = () => {
    const { userDetails, logoutHandler } = useAuth();
    const [username, setUsername] = useState(userDetails.username);
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t } = useTranslation();

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
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleCancelEdit = () => {
        setUsername(userDetails.username);
        setIsEditingUsername(false);
    };

    return (
        <div className={styles.profilePage}>
            {userDetails.role === ROLES.USER && <UserSidebar />}
            {userDetails.role === ROLES.OPERATOR && <OperatorSidebar />}
            <div className={styles.content}>
                <h1 className={styles.header}>{t('profile')}</h1>
                <div className={styles.formGroup}>
                    <label>{t('email')}</label>
                    <p>{userDetails.email}</p>
                </div>
                <div className={styles.formGroup}>
                    <label>{t('username')}</label>
                    {isEditingUsername ? (
                        <>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <button onClick={handleUsernameChange} className={styles.submitButton}>{t('submit')}</button>
                            <button onClick={handleCancelEdit} className={styles.cancelButton}>{t('cancel')}</button>
                        </>
                    ) : (
                        <>
                            <p>{username}</p>
                            <button onClick={() => setIsEditingUsername(true)} className={styles.editButton}>{t('edit')}</button>
                        </>
                    )}
                </div>
                <button onClick={openModal} className={styles.changePasswordButton}>{t('changePassword')}</button>
            </div>
            <ChangePasswordModal
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </div>
    );
};

export default ProfilePage;
