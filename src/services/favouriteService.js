import { showToast } from "../utils/toast";
import axiosInstance from "../config/axiosInstance";
import { GENERAL_ADD, GENERAL_DELETE, GENERAL_ERROR, TOAST_ERROR, TOAST_SUCCESS } from "../utils/constants";

export const getFavourites = async () => {
    try {
        const response = await axiosInstance.get(`/favourites`);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const verifyFavourite = async (movieId) => {
    try {
        const response = await axiosInstance.get(`/favourites/${movieId}`);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const addFavourite = async (movieId) => {
    try {
        const response = await axiosInstance.post(`/favourites/${movieId}`);
        showToast(TOAST_SUCCESS, GENERAL_ADD);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const deleteFavourite = async (movieId) => {
    try {
        const response = await axiosInstance.delete(`/favourites/${movieId}`);
        showToast(TOAST_SUCCESS, GENERAL_DELETE);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};
