import axiosInstance from '../config/axiosInstance';
import { API_BASE_URL, GENERAL_ERROR, TOAST_ERROR, TOAST_SUCCESS } from '../utils/constants';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { showToast } from '../utils/toast';
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
        if (error.response?.status === 409) {
            showToast(TOAST_ERROR, 'errors.usernameOrEmailExists');
        }
        else {
            showToast(TOAST_ERROR, 'errors.general');
        }
    }
};

export const login = async ({ email, password }) => {
    try {
        const response = await axiosInstance.post(`/users/login`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 404 || error.response?.status === 400) {
            showToast(TOAST_ERROR, 'errors.badCredentials');
        } else if (error.response?.status === 401) {
            showToast('warning', 'errors.verifyMail');
        } else {
            showToast(TOAST_ERROR, GENERAL_ERROR);
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
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            emitEvent('sessionExpired');
            showToast(TOAST_ERROR, 'errors.sessionExpired');
        } else {
            showToast(TOAST_ERROR, GENERAL_ERROR);
        }
        return null;
    }
};

export const sendForgotPasswordEmail = async (email) => {
    try {
        await axiosInstance.post(`/users/forgot-password`, { email });
        showToast(TOAST_SUCCESS, 'messages.send');
    } catch (error) {
        if (error.response && error.response.status === 404) {
            showToast(TOAST_ERROR, 'errors.badEmail');
        }
        else {
            showToast(TOAST_ERROR, 'errors.failSend');
        }
    }
};

export const sendVerificationEmail = async (email) => {
    try {
        await axiosInstance.post(`/users/resend-verification`, { email });
        showToast(TOAST_SUCCESS, 'messages.send');
    } catch (error) {
        if (error.response && error.response.status === 404) {
            showToast(TOAST_ERROR, 'errors.badEmail');
        }
        else {
            showToast(TOAST_ERROR, 'errors.failSend');
        }
    }
};
