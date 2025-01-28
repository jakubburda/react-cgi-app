// Import axios client config
import apiClient from './service';

// Function to get a random joke
export const fetchJokeByRandom = async () => {
    try {
        const response = await apiClient.get(process.env.REACT_APP_ENDPOINT_RANDOM);
        return response.data.value;
    } catch (error) {
        console.error('Error fetching random joke:', error);
        throw error;
    }
};

// Functions to get a joke by category
export const fetchJokeByCategory = async (category) => {
    try {
        const response = await apiClient.get(`${process.env.REACT_APP_ENDPOINT_CATEGORY}${category}`);
        return response.data.value;
    } catch (error) {
        console.error('Error fetching joke by category:', error);
        throw error;
    }
};

// Function to get text query joke
export const fetchJokeBySearch = async (query) => {
    try {
        const response = await apiClient.get(`${process.env.REACT_APP_ENDPOINT_SEARCH}${query}`);
        if (response.data.result && response.data.result.length > 0) {
            return response.data.result[0].value;
        } else {
            return 'No joke found with that query.';
        }
    } catch (error) {
        console.error('Error searching for joke:', error);
        throw error;
    }
};

// Functions to get all categories of jokes
export const fetchJokeCategories = async () => {
    try {
        const response = await apiClient.get(process.env.REACT_APP_ENDPOINT_CATEGORIES);
        return response.data;
    } catch (error) {
        console.error('Error fetching joke categories:', error);
        throw error;
    }
};