import { showToast } from "../utils/toast";
import axiosInstance from "../config/axiosInstance";
import { GENERAL_ADD, GENERAL_DELETE, GENERAL_ERROR, GENERAL_UPDATE, TOAST_ERROR, TOAST_SUCCESS } from "../utils/constants";

export const getAll = async () => {
    try {
        const response = await axiosInstance.get(`/genres`);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const addGenre = async (genre) => {
    try {
        const response = await axiosInstance.post(`/genres`, genre);
        showToast(TOAST_SUCCESS, GENERAL_ADD);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const editGenre = async (genreId, genre) => {
    try {
        const response = await axiosInstance.put(`/genres/${genreId}`, genre);
        showToast(TOAST_SUCCESS, GENERAL_UPDATE);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const deleteGenre = async (genreId) => {
    try {
        const response = await axiosInstance.delete(`/genres/${genreId}`);
        showToast(TOAST_SUCCESS, GENERAL_DELETE);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};
