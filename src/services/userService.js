import { GENERAL_ADD, GENERAL_DELETE, GENERAL_ERROR, GENERAL_UPDATE, TOAST_ERROR, TOAST_SUCCESS } from "../utils/constants";
import axiosInstance from "../config/axiosInstance";
import { showToast } from "../utils/toast";

export const getAll = async () => {
    try {
        const response = await axiosInstance.get(`/users`);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const addUser = async (user) => {
    try {
        const response = await axiosInstance.post(`/users`, user);
        showToast(TOAST_SUCCESS, GENERAL_ADD);
        return response.data;
    } catch (error) {
        if (error.response?.status == 409) {
            showToast(TOAST_ERROR, "errors.usernameOrEmailExists");
        }
        else {
            showToast(TOAST_ERROR, GENERAL_ERROR);
        }
    }
}

export const updateUsername = async (username) => {
    try {
        const response = await axiosInstance.put(`/users/change-username`, username);
        showToast(TOAST_SUCCESS, GENERAL_UPDATE);
        return response.data;
    } catch (error) {
        if (error.response?.status == 409) {
            showToast(TOAST_ERROR, "errors.usernameExists");
        }
        else {
            showToast(TOAST_ERROR, GENERAL_ERROR);
        }
    }
};

export const updatePassword = async (password) => {
    try {
        const response = await axiosInstance.put(`/users/change-password`, password);
        showToast(TOAST_SUCCESS, GENERAL_UPDATE);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};



export const deleteUser = async (userId) => {
    try {
        const response = await axiosInstance.delete(`/users/${userId}`);
        showToast(TOAST_SUCCESS, GENERAL_DELETE);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

