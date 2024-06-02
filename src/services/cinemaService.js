import { showToast } from "../utils/toast";
import axiosInstance from "../config/axiosInstance";
import { GENERAL_ADD, GENERAL_DELETE, GENERAL_ERROR, GENERAL_UPDATE, TOAST_ERROR, TOAST_SUCCESS } from "../utils/constants";

export const getAll = async () => {
    try {
        const response = await axiosInstance.get(`/cinemas`);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const getOne = async (cinemaId) => {
    try {
        const response = await axiosInstance.get(`/cinemas/${cinemaId}`);
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            showToast(TOAST_ERROR, 'errors.cinemaNotFound');
        } else {
            showToast(TOAST_ERROR, GENERAL_ERROR);
        }
    }
};

export const addCinema = async (cinema) => {
    try {
        const response = await axiosInstance.post(`/cinemas`, cinema);
        showToast(TOAST_SUCCESS, GENERAL_ADD);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const editCinema = async (cinemaId, cinema) => {
    try {
        const response = await axiosInstance.put(`/cinemas/${cinemaId}`, cinema);
        showToast(TOAST_SUCCESS, GENERAL_UPDATE);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const deleteCinema = async (cinemaId) => {
    try {
        const response = await axiosInstance.delete(`/cinemas/${cinemaId}`);
        showToast(TOAST_SUCCESS, GENERAL_DELETE);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const getHalls = async (cinemaId) => {
    try {
        const response = await axiosInstance.get(`/cinemas/${cinemaId}/halls`);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};
