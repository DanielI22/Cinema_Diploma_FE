import { toast } from "react-toastify";
import { GENERAL_ADD, GENERAL_DELETE, GENERAL_ERROR, GENERAL_UPDATE } from "../utils/constants";
import axiosInstance from "../config/axiosInstance";

export const getByDate = async (formattedDate) => {
    try {
        const response = await axiosInstance.get(`/showtimes?date=${formattedDate}`);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};

export const getByMovieDate = async (movieId, formattedDate) => {
    try {
        const response = await axiosInstance.get(`/movies/${movieId}/showtimes?date=${formattedDate}`);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};


export const getOne = async (showtimeId) => {
    try {
        const response = await axiosInstance.get(`/showtimes/${showtimeId}`);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};

export const addShowtime = async (showtime) => {
    try {
        const response = await axiosInstance.post(`/showtimes`, showtime);
        toast.success(GENERAL_ADD);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
}

export const editShowtime = async (showtimeId, showtime) => {
    try {
        const response = await axiosInstance.put(`/showtimes/${showtimeId}`, showtime);
        toast.success(GENERAL_UPDATE);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};

export const deleteShowtime = async (showtimeId) => {
    try {
        const response = await axiosInstance.delete(`/showtimes/${showtimeId}`);
        toast.success(GENERAL_DELETE);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};