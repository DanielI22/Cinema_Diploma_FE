import axios from 'axios';
import { API_BASE_URL, AUTH_TOKEN_HEADER } from '../utils/constants';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const getAccessToken = () => {
  return localStorage.getItem(AUTH_TOKEN_HEADER);
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

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      sessionStorage.clear();
      toast.error('Session expired. Please log in again.');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;