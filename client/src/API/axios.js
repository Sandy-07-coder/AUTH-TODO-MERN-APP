import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true, // This ensures cookies are sent with every request
    timeout: 10000 // 10 second timeout
});

// Add request interceptor to ensure credentials are always sent
api.interceptors.request.use(
    (config) => {
        config.withCredentials = true;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle authentication errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access - redirect to login or clear auth state
            console.log('Authentication failed');
        }
        return Promise.reject(error);
    }
);

export default api;