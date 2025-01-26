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