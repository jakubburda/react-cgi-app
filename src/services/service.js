// Import axios for fetching HTTP requests to external APIs
import axios from 'axios';

// Create an Axios instance with default settings
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL_BASE,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor (to add a token, if available)
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Add an interceptor for responses (error response handling)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error('Response error:', error.response.data);
        } else {
            console.error('Network error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default apiClient;
