import axios from 'axios';
import { API_BASE_URL, AUTH_TOKEN_HEADER } from '../utils/constants';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const getAccessToken = () => {
  return sessionStorage.getItem(AUTH_TOKEN_HEADER);
};

// Request Interceptor
axiosInstance.interceptors.request.use(config => {
  // Set the Authorization header
  const token = getAccessToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`;
  }
  
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;