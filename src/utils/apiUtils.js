// Import axios for fetching HTTP requests to external APIs
import axios from 'axios';

// Features to get a potential joke
export const fetchJokeByRandom = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL_RANDOM);
      return response.data.value;
    } catch (error) {
      console.error('Error fetching joke:', error);
      throw error;
    }
};

// Function to get a joke from a category
export const fetchJokeByCategory = async (category) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL_CATEGORY}${category}`);
        return response.data.value;
    } catch (error) {
        console.error('Error fetching joke by category:', error);
        throw error;
    }
};

// Feature to search joke based on text query
export const fetchJokeBySearch = async (query) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL_SEARCH}${query}`);
        if (response.data.result && response.data.result.length > 0) {
            return response.data.result[0].value;
        } else {
            return "No joke found with that query.";
        }
    } catch (error) {
        console.error('Error searching for joke:', error);
        throw error;
    }
};

// Feature to get joke categories in array
export const fetchJokeCategories = async () => {
    try {
        const respose = await axios.get(`${process.env.REACT_APP_API_URL_CATEGORIES}`);
        return respose.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};