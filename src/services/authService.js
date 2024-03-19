import { toast } from 'react-toastify';
import axiosInstance from '../config/axiosInstance';
import { GENERAL_ERROR } from '../utils/constants';

export const register = async ({ username, email, password }) => {
    try {
        const response = await axiosInstance.post(`/users/register`, {
            username,
            email,
            password,
        });
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

export const login = async ({ email, password }) => {
    try {
        const response = await axiosInstance.post(`/users/login`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        if (error.response?.status == 404 || error.response?.status == 400) {
            toast.error("Bad credentials")
        }
        else {
            toast.error(GENERAL_ERROR)
        }
    }
};

export const logout = async () => {
    await axiosInstance.post(`/users/logout`);
};

export const refreshToken = async (refreshToken) => {
    try {
        const response = await axiosInstance.post(`/users/refresh`, { refreshToken });
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR)
    }
};