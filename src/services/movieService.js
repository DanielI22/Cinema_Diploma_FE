import { showToast } from "../utils/toast";
import axiosInstance from "../config/axiosInstance";
import { GENERAL_ADD, GENERAL_DELETE, GENERAL_ERROR, GENERAL_UPDATE, TOAST_ERROR, TOAST_SUCCESS } from "../utils/constants";

export const getAll = async () => {
    try {
        const response = await axiosInstance.get(`/movies`);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const getOne = async (movieId) => {
    try {
        const response = await axiosInstance.get(`/movies/${movieId}`);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const addMovie = async (movie) => {
    try {
        const response = await axiosInstance.post(`/movies`, movie);
        showToast(TOAST_SUCCESS, GENERAL_ADD);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const editMovie = async (movieId, movie) => {
    try {
        const response = await axiosInstance.put(`/movies/${movieId}`, movie);
        showToast(TOAST_SUCCESS, GENERAL_UPDATE);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const deleteMovie = async (movieId) => {
    try {
        const response = await axiosInstance.delete(`/movies/${movieId}`);
        showToast(TOAST_SUCCESS, GENERAL_DELETE);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const searchMovies = async (query) => {
    try {
        const response = await axiosInstance.get(`/movies/search/${query}`);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
        throw error;
    }
};
