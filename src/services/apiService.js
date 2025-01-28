// Import axios for fetching HTTP requests to external APIs
import axios from 'axios';

// Vytvoření Axios instance s výchozím nastavením
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL_BASE,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add an interceptor to intercept requests
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

// Add an interceptor to capture responses
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
