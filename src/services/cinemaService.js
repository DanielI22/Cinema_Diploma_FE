import { toast } from "react-toastify";
import { GENERAL_ADD, GENERAL_DELETE, GENERAL_ERROR, GENERAL_UPDATE } from "../utils/constants";
import axiosInstance from "../config/axiosInstance";

export const getAll = async () => {
    try {
        const response = await axiosInstance.get(`/cinemas`);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};

export const getOne = async (cinemaId) => {
    try {
        const response = await axiosInstance.get(`/cinemas/${cinemaId}`);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};

export const addCinema = async (cinema) => {
    try {
        const response = await axiosInstance.post(`/cinemas`, cinema);
        toast.success(GENERAL_ADD);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
}

export const editCinema = async (cinemaId, cinema) => {
    try {
        const response = await axiosInstance.put(`/cinemas/${cinemaId}`, cinema);
        toast.success(GENERAL_UPDATE);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};

export const deleteCinema = async (cinemaId) => {
    try {
        const response = await axiosInstance.delete(`/cinemas/${cinemaId}`);
        toast.success(GENERAL_DELETE);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};

export const getHalls = async (cinemaId) => {
    try {
        const response = await axiosInstance.get(`/cinemas/${cinemaId}/halls`);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};