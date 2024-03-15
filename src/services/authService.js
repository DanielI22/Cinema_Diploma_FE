import axiosInstance from '../config/axiosInstance';

export const register = async ({ username, email, password }) => {
    await axiosInstance.post(`/users/register`, {
      username,
      email,
      password,
    });
};

export const login = async ({ email, password }) => {
    await axiosInstance.post(`/users/login`, {
      email,
      password,
    });
};

export const logout = async () => {
    await axiosInstance.post(`/users/logout`);
};

export const refreshToken = async (refreshToken) => {
    await axiosInstance.post(`/users/refreshToken`, refreshToken);
};