import { toast } from "react-toastify";
import { GENERAL_ADD, GENERAL_DELETE, GENERAL_ERROR, GENERAL_UPDATE } from "../utils/constants";
import axiosInstance from "../config/axiosInstance";

export const getAll = async () => {
    try {
        const response = await axiosInstance.get(`/halls`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};

export const getAvailable = async () => {
    try {
        const response = await axiosInstance.get(`/halls/available`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};