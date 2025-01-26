// React hooks and external libraries 
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Redux slices
import { setLoading, setJoke, setError } from '../redux/slices/jokeSlice';

// Utility functions for API calls
import { fetchJokeByRandom } from '../utils/apiUtils';

/**
 * JokeCard Component
 * 
 * This component fetches and displays a random Chuck Norris joke by calling an external API.
 * It manages the loading, error, and joke states using Redux.
 * 
 * Features:
 * - Fetches a random Chuck Norris joke on initial render.
 * - Displays a loading message while the joke is being fetched.
 * - Displays an error message if the API call fails.
 * - Displays the fetched joke once the data is successfully retrieved.
 */
const JokeCard = () => {
    const dispatch = useDispatch();
    const joke = useSelector((state) => state.joke.joke);
    const isLoading = useSelector((state) => state.joke.isLoading);
    const error = useSelector((state) => state.joke.error);

    /**
     * This `useEffect` hook is responsible for fetching a random joke from the API
     * when the component is first rendered and updating the Redux state with the 
     * fetched joke, loading state, and error state.
     * 
     * - It dispatches `setLoading(true)` before the API call to indicate loading.
     * - It fetches the joke asynchronously using `fetchJokeByRandom()`.
     * - If successful, it dispatches `setJoke` to store the joke in Redux state.
     * - If an error occurs, it dispatches `setError` with an error message.
     * - It ensures the loading state is turned off after the joke has been fetched or an error has occurred.
     * 
     * This effect runs only once when the component is first mounted (due to the empty 
     * dependency array with `dispatch`).
     * 
     * @returns {void}
     */
    useEffect(() => {
        const fetchJoke = async () => {
            try {
                dispatch(setLoading(true));
                const fetchedJoke = await fetchJokeByRandom();
                dispatch(setJoke(fetchedJoke));
            } catch (error) {
                dispatch(setError('Error fetching joke'));
            } finally {
                dispatch(setLoading(false));
            }
        };
        fetchJoke();
    }, [dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return <div>Vtip: {joke}</div>;
};

export default JokeCard;

