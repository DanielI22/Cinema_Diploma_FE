import axiosInstance from "../config/axiosInstance";
import { GENERAL_ADD, GENERAL_DELETE, GENERAL_ERROR, GENERAL_UPDATE, TOAST_ERROR, TOAST_SUCCESS } from "../utils/constants";
import { showToast } from "../utils/toast";

export const getByDate = async (formattedDate) => {
    try {
        const response = await axiosInstance.get(`/showtimes?date=${formattedDate}`);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const getByMovieDate = async (movieId, formattedDate) => {
    try {
        const response = await axiosInstance.get(`/movies/${movieId}/showtimes?date=${formattedDate}`);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const getByCinemaDate = async (cinemaId, formattedDate) => {
    try {
        const response = await axiosInstance.get(`/cinemas/${cinemaId}/showtimes?date=${formattedDate}`);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const getByHallAndDate = async (hallId, date) => {
    try {
        const response = await axiosInstance.get(`/showtimes/halls/${hallId}?date=${date}`);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const getOne = async (showtimeId) => {
    try {
        const response = await axiosInstance.get(`/showtimes/${showtimeId}`);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const addShowtime = async (showtime) => {
    try {
        const response = await axiosInstance.post(`/showtimes`, showtime);
        showToast(TOAST_SUCCESS, GENERAL_ADD);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const editShowtime = async (showtimeId, showtime) => {
    try {
        const response = await axiosInstance.put(`/showtimes/${showtimeId}`, showtime);
        showToast(TOAST_SUCCESS, GENERAL_UPDATE);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const deleteShowtime = async (showtimeId) => {
    try {
        const response = await axiosInstance.delete(`/showtimes/${showtimeId}`);
        showToast(TOAST_SUCCESS, GENERAL_DELETE);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const setCurrentShowtime = async (showtimeId) => {
    try {
        const response = await axiosInstance.put(`/showtimes/${showtimeId}/current`);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const endShowtime = async (showtimeId) => {
    try {
        const response = await axiosInstance.put(`/showtimes/${showtimeId}/end`);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const setUpcomingShowtime = async (showtimeId) => {
    try {
        const response = await axiosInstance.put(`/showtimes/${showtimeId}/upcoming`);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};
