// React hooks and external libraries 
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, CircularProgress, Typography, Box } from '@mui/material';
import styled from '@emotion/styled';

// Redux slices
import { setLoading, setJoke, setError } from '../redux/slices/jokeSlice';

// Utility functions for API calls
import { fetchJokeByRandom } from '../utils/apiUtils';

/**
 * Styled components (using Emotion)
 */
const JokeCardWrapper = styled(Box)`
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80px;
`;

const JokeText = styled(Typography)`
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
`;

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
     * Asynchronously fetches a random joke from the API
     * when the component is first rendered and updating the Redux state with the 
     * fetched joke, loading state, and error state.
     * 
     * - It dispatches `setLoading(true)` before the API call to indicate loading.
     * - It fetches the joke asynchronously using `fetchJokeByRandom()`.
     * - If successful, it dispatches `setJoke` to store the joke in Redux state.
     * - If an error occurs, it dispatches `setError` with an error message.
     * - It ensures the loading state is turned off after the joke has been fetched or an error has occurred.
     * 
     * @function fetchJoke
     * @@returns {Promise<void>} Returns a promise that resolves when the joke has been fetched and Redux state is updated.
     */
    const fetchJoke = useCallback(async () => {
        try {
            dispatch(setLoading(true));
            const fetchedJoke = await fetchJokeByRandom();
            dispatch(setJoke(fetchedJoke));
        } catch (error) {
            dispatch(setError('Error fetching joke'));
        } finally {
            dispatch(setLoading(false));
        }
    },[dispatch]);

    /**
     * The useEffect hook that triggers the fetching of a random joke when the component is mounted
     * and when the `fetchJoke` function changes.
     * 
     * This hook is responsible for calling the `fetchJoke` function on the initial render and 
     * every time the `fetchJoke` function is updated (which happens when `dispatch` changes).
     * It ensures that the joke is fetched as soon as the component is mounted, keeping the 
     * state in sync with the latest version of the `fetchJoke` function.
     * 
     * @returns {void}
     */
    useEffect(() => {
        fetchJoke();
    }, [fetchJoke]);

    if (isLoading) {
        return (
            <JokeCardWrapper>
                <CircularProgress />
            </JokeCardWrapper>
        )  
    }
    
      if (error) {
        return (
            <JokeCardWrapper>
                <Typography color="error">Error: {error}</Typography>
            </JokeCardWrapper>
        )
      }
    
      return (
        <JokeCardWrapper>
            <JokeText variant="h6">{joke}</JokeText>
            <Button 
                variant="contained"
                color="primary"
                onClick={fetchJoke}
            >
                Another joke
            </Button>
        </JokeCardWrapper>
      );
};

export default JokeCard;

