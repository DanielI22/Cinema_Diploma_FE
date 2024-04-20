import { toast } from "react-toastify";
import { GENERAL_ADD, GENERAL_DELETE, GENERAL_ERROR } from "../utils/constants";
import axiosInstance from "../config/axiosInstance";

export const getReviewsByMovieId = async (movieId) => {
    try {
        const response = await axiosInstance.get(`/reviews/${movieId}`);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};

export const addMovieReview = async (movieId, review) => {
    try {
        const response = await axiosInstance.post(`/reviews/${movieId}`, review);
        toast.success(GENERAL_ADD);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
}

export const deleteReview = async (reviewId) => {
    try {
        const response = await axiosInstance.delete(`/reviews/${reviewId}`);
        toast.success(GENERAL_DELETE);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};