import { toast } from 'react-toastify';
import axiosInstance from '../config/axiosInstance';
import { API_BASE_URL, AUTH_TOKEN_HEADER, GENERAL_ERROR, PATHS } from '../utils/constants';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { emitEvent } from '../utils/eventEmitter';

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

export const logout = async (authToken) => {
    const decodedToken = jwtDecode(authToken);
    const userId = decodedToken.sub;
    await axios.post(`${API_BASE_URL}/users/logout`, { userId });
};

export const refreshToken = async (refreshToken) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/refresh`, { refreshToken });
        toast.success("Token refreshed");
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            emitEvent('sessionExpired');
            toast.error('Session expired. Please log in again.');
        }
        return null;
    }
};