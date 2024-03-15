import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

let cancelTokenSource = null;

// Request Interceptor
axiosInstance.interceptors.request.use(config => {
  // Cancel previous request
  if (cancelTokenSource) {
    cancelTokenSource.cancel("New request, old request canceled");
  }
  // Create a new CancelToken
  cancelTokenSource = axios.CancelToken.source();
  config.cancelToken = cancelTokenSource.token;

  // Set the Authorization header
  const token = getAccessToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  
  return config;
}, error => {
  return Promise.reject(error);
});

// Response Interceptor
axiosInstance.interceptors.response.use(response => {
  // Clear the cancelTokenSource when the request completes
  cancelTokenSource = null;
  return response;
}, error => {
  if (axios.isCancel(error)) {
    console.log('Request canceled:', error.message);
  }
  // Clear the cancelTokenSource on request error
  cancelTokenSource = null;
  return;
});

export default axiosInstance;