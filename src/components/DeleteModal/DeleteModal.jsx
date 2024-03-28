import styles from './DeleteModal.module.css';

export default function DeleteModal({ showModal, onConfirm, onCancel }) {
    if (!showModal) return null;

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };

    return (
        <div className={styles.modalBackground} onClick={handleBackgroundClick}>
            <div className={styles.modalContent}>
                <h2>Delete Confirmation</h2>
                <p>Are you sure you want to delete this item?</p>
                <button className={styles.deleteButton} onClick={onConfirm}>Confirm</button>
                <button className={styles.cancelButton} onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
}