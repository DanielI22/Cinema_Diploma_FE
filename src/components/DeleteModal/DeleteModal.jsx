import React from 'react';
import styles from './DeleteModal.module.css';
import { useTranslation } from 'react-i18next';

export default function DeleteModal({ showModal, onConfirm, onCancel }) {
    const { t } = useTranslation();

    if (!showModal) return null;

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };

    return (
        <div className={styles.modalBackground} onClick={handleBackgroundClick}>
            <div className={styles.modalContent}>
                <h2>{t('deleteConfirmation')}</h2>
                <p>{t('deleteConfirmationMessage')}</p>
                <button className={styles.deleteButton} onClick={onConfirm}>{t('confirm')}</button>
                <button className={styles.cancelButton} onClick={onCancel}>{t('cancel')}</button>
            </div>
        </div>
    );
}
