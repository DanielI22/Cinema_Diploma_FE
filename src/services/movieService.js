import { toast } from "react-toastify";
import { GENERAL_ERROR } from "../utils/constants";
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
    const response = await axiosInstance.get(`/movies/${movieId}`);
    return response.data;
};