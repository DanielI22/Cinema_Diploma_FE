import { toast } from "react-toastify";
import { GENERAL_ADD, GENERAL_DELETE, GENERAL_ERROR, GENERAL_UPDATE } from "../utils/constants";
import axiosInstance from "../config/axiosInstance";

export const getAll = async () => {
    try {
        const response = await axiosInstance.get(`/users`);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};

export const addUser = async (user) => {
    try {
        const response = await axiosInstance.post(`/users`, user);
        toast.success(GENERAL_ADD);
        return response.data;
    } catch (error) {
        if (error.response?.status == 409) {
            toast.error("This username or email already exists. Please try another one.");
        }
        else {
            toast.error(GENERAL_ERROR);
        }
    }
}

export const updateUsername = async (username) => {
    try {
        const response = await axiosInstance.put(`/users/change-username`, username);
        toast.success(GENERAL_UPDATE);
        return response.data;
    } catch (error) {
        if (error.response?.status == 409) {
            toast.error("This username already exists. Please try another one.");
        }
        else {
            toast.error(GENERAL_ERROR);
        }
    }
};

export const updatePassword = async (password) => {
    try {
        const response = await axiosInstance.put(`/users/change-password`, password);
        toast.success(GENERAL_UPDATE);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};



export const deleteUser = async (userId) => {
    try {
        const response = await axiosInstance.delete(`/users/${userId}`);
        toast.success(GENERAL_DELETE);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};

