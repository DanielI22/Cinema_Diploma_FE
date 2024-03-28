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


export const refreshAccessToken = async (refreshToken) => {
    const clientId="cinema-quarkus";
    const clientSecret="6XU73V4dJNGWDmuXwq0WnIIJtys9PBI5";
    const serverUrl = "http://localhost:8080";
    const realmName = "cinema";

    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);
  
    try {
      const response = await axiosInstance.post(serverUrl + '/realms/' + realmName + '/protocol/openid-connect/token', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      toast.success("Token refresh");
      return response.data;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw error;
    }
  };