import axios from 'axios';

const baseURL = 'http://localhost:3000/api/mystical';

// Create a configured axios instance
const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle expired token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        const response = await axios.post(`${baseURL}/auth/refresh-token`, {}, {
          withCredentials: true // Important for cookies
        });
        
        if (response.data && response.data.data && response.data.data.token) {
          // Save the new token
          localStorage.setItem('token', response.data.data.token);
          
          // Update the header
          originalRequest.headers.Authorization = `Bearer ${response.data.data.token}`;
          
          // Retry the original request
          return axiosClient(originalRequest);
        }
      } catch (refreshError) {
        // If refresh token fails, redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosClient; 