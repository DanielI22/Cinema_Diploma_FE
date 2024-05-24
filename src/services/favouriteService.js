import { toast } from "react-toastify";
import { GENERAL_ADD, GENERAL_DELETE, GENERAL_ERROR } from "../utils/constants";
import axiosInstance from "../config/axiosInstance";

export const getFavourites = async () => {
    try {
        const response = await axiosInstance.get(`/favourites`);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};

export const verifyFavourite = async (movieId) => {
    const response = await axiosInstance.get(`/favourites/${movieId}`);
    return response.data;
};

export const addFavourite = async (movieId) => {
    try {
        const response = await axiosInstance.post(`/favourites/${movieId}`);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
}

export const deleteFavourite = async (movieId) => {
    try {
        const response = await axiosInstance.delete(`/favourites/${movieId}`);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};