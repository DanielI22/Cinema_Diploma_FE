import { toast } from "react-toastify";
import { GENERAL_ADD, GENERAL_DELETE, GENERAL_ERROR, GENERAL_UPDATE } from "../utils/constants";
import axiosInstance from "../config/axiosInstance";

export const getAll = async () => {
    try {
        const response = await axiosInstance.get(`/genres`);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};

export const addGenre = async (genre) => {
    try {
        const response = await axiosInstance.post(`/genres`, genre);
        toast.success(GENERAL_ADD);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
}

export const editGenre = async (genreId, genre) => {
    try {
        const response = await axiosInstance.put(`/genres/${genreId}`, genre);
        toast.success(GENERAL_UPDATE);
        return response.data;
    } catch (error) {
        toast.error(G);
    }
};


export const deleteGenre = async (genreId) => {
    try {
        const response = await axiosInstance.delete(`/genres/${genreId}`);
        toast.success(GENERAL_DELETE);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};
