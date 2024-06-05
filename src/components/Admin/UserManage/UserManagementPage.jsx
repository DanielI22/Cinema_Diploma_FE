import React, { useState, useEffect } from 'react';
import styles from './UserManagementPage.module.css';
import * as userService from '../../../services/userService';
import Spinner from '../../Spinner/Spinner';
import { useAuth } from '../../../contexts/authContext';
import UserModal from './UserModal';
import useDeleteModal from '../../../hooks/useDeleteModal';
import DeleteModal from '../../DeleteModal/DeleteModal';
import { useTranslation } from 'react-i18next';

const UserManagementPage = () => {
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');
    const { isModalVisible, showDeleteModal, hideDeleteModal, confirmDeletion } = useDeleteModal();
    const { userDetails } = useAuth();

    const fetchUsers = async () => {
        setIsLoading(true);
        const response = await userService.getAll();
        setUsers(response.users);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const openModal = (role) => {
        setSelectedRole(role === 'user' ? '' : role);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmDeletion = async (userId) => {
        setIsLoading(true);
        await userService.deleteUser(userId);
        await fetchUsers();
        setIsLoading(false);
    }

    const renderTable = (role, roleName) => (
        <div className={styles.userTable}>
            <h2>{t(`${roleName}s`)}</h2>
            <table>
                <thead>
                    <tr>
                        <th>{t('username')}</th>
                        <th>{t('email')}</th>
                        <th>{t('actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {users.filter(user => user.role === role).map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                {user.id !== userDetails.userId && (
                                    <button onClick={() => showDeleteModal(user.id)} className={styles.deleteButton}>
                                        {t('delete')}
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => openModal(role)} className={styles.addButton}>{t('add')} {t(roleName)}</button>
        </div>
    );

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className={styles.userManagementPage}>
            {renderTable('admin', 'admin')}
            {renderTable('operator', 'operator')}
            {renderTable('validator', 'validator')}
            {renderTable('projector', 'projector')}
            {renderTable('user', 'user')}
            {isModalOpen && <UserModal isOpen={isModalOpen} onClose={closeModal} role={selectedRole} refreshUsers={fetchUsers} />}
            <DeleteModal
                showModal={isModalVisible}
                onConfirm={() => confirmDeletion(handleConfirmDeletion)}
                onCancel={hideDeleteModal}
            />
        </div>
    );
};

export default UserManagementPage;
