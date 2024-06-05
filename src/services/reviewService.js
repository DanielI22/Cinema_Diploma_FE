import axiosInstance from "../config/axiosInstance";
import { GENERAL_ADD, GENERAL_DELETE, GENERAL_ERROR, TOAST_ERROR, TOAST_SUCCESS } from "../utils/constants";
import { showToast } from "../utils/toast";

export const getReviewsByMovieId = async (movieId) => {
    try {
        const response = await axiosInstance.get(`/reviews/${movieId}`);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const addMovieReview = async (movieId, review) => {
    try {
        const response = await axiosInstance.post(`/reviews/${movieId}`, review);
        showToast(TOAST_SUCCESS, GENERAL_ADD);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const deleteReview = async (reviewId) => {
    try {
        const response = await axiosInstance.delete(`/reviews/${reviewId}`);
        showToast(TOAST_SUCCESS, GENERAL_DELETE);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const deleteMyReview = async (reviewId) => {
    try {
        const response = await axiosInstance.delete(`/reviews/${reviewId}/my`);
        showToast(TOAST_SUCCESS, GENERAL_DELETE);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};
