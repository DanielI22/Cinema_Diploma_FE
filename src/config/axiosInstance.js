import axios from 'axios';
import { ACCESS_TOKEN_EXPIRE, API_BASE_URL, AUTH_TOKEN_HEADER, REFRESH_TOKEN_HEADER } from '../utils/constants';
import * as authService from '../services/authService';
import { jwtDecode } from 'jwt-decode';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const getAccessToken = () => {
  return localStorage.getItem(AUTH_TOKEN_HEADER);
};

const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_HEADER);
};

const isTokenExpiring = (token) => {
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000; // Current time in seconds
  console.log(decodedToken.exp - currentTime)
  return decodedToken.exp - currentTime < ACCESS_TOKEN_EXPIRE; // Less than 1 minute
};

// Request Interceptor
axiosInstance.interceptors.request.use(async config => {
  let accessToken = getAccessToken();
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${JSON.parse(accessToken)}`;
    if (isTokenExpiring(accessToken)) {
      const result = await authService.refreshToken(JSON.parse(getRefreshToken()));
      const newToken = result.accessToken;
      localStorage.setItem(AUTH_TOKEN_HEADER, JSON.stringify(newToken))
      localStorage.setItem(REFRESH_TOKEN_HEADER, JSON.stringify(result.refreshToken))
      if (newToken) {
        config.headers['Authorization'] = `Bearer ${newToken}`;
      }
    }
  }

  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;