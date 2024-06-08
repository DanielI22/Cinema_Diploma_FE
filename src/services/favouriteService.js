import { showToast } from "../utils/toast";
import axiosInstance from "../config/axiosInstance";
import { GENERAL_ERROR, TOAST_ERROR } from "../utils/constants";

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
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const deleteFavourite = async (movieId) => {
    try {
        const response = await axiosInstance.delete(`/favourites/${movieId}`);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};
