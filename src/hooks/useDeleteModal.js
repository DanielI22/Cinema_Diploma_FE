import { useState } from "react";

export default function useDeleteModal() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const showDeleteModal = (itemId) => {
        setItemToDelete(itemId);
        setIsModalVisible(true);
    };

    const hideDeleteModal = () => {
        setIsModalVisible(false);
        setItemToDelete(null);
    };

    const confirmDeletion = (deleteAction) => {
        if (itemToDelete && deleteAction) {
            deleteAction(itemToDelete);
        }
        hideDeleteModal();
    };

    return {
        isModalVisible,
        showDeleteModal,
        hideDeleteModal,
        confirmDeletion
    };
}
