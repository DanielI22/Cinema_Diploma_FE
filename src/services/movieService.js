import { toast } from "react-toastify";
import { GENERAL_ADD, GENERAL_DELETE, GENERAL_ERROR, GENERAL_UPDATE } from "../utils/constants";
import axiosInstance from "../config/axiosInstance";

export const getAll = async () => {
    try {
        const response = await axiosInstance.get(`/movies`);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};

export const getOne = async (movieId) => {
    try {
        const response = await axiosInstance.get(`/movies/${movieId}`);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};

export const addMovie = async (movie) => {
    try {
        const response = await axiosInstance.post(`/movies`, movie);
        toast.success(GENERAL_ADD);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
}

export const editMovie = async (movieId, movie) => {
    try {
        const response = await axiosInstance.put(`/movies/${movieId}`, movie);
        toast.success(GENERAL_UPDATE);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};


export const deleteMovie = async (movieId) => {
    try {
        const response = await axiosInstance.delete(`/movies/${movieId}`);
        toast.success(GENERAL_DELETE);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};

export const searchMovies = async (query) => {
    try {
        const response = await axiosInstance.get(`/movies/search/${query}`);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
        throw error;
    }
};