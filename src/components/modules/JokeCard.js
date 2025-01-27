// React hooks and external libraries 
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Typography, Box } from '@mui/material';
import styled from '@emotion/styled';

// Redux slices
import { setLoading, setJoke, setError } from '../../redux/slices/jokeSlice';

// Utility functions for API calls
import { fetchJokeByRandom, fetchJokeByCategory } from '../../utils/apiUtils';

// Animations
import { CircularProgress } from '@mui/material';

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
const JokeCard = ({ mode = 'random' }) => {
    const dispatch = useDispatch();
    const {joke, error: jokeError, isLoading: jokeIsLoading} = useSelector((state) => state.joke);
    const {selectedCategory} = useSelector(state => state.category);
    const { result, isLoading: searchIsLoading, error: searchError } = useSelector((state) => state.jokeSearch);

    /**
     * Asynchronously fetches a joke based on the selected mode (random or category) and updates the Redux state.
     * 
     * - If the mode is "category", it fetches a joke based on the selected category using `fetchJokeByCategory`.
     * - If the mode is "random", it fetches a random joke using `fetchJokeByRandom`.
     * - Dispatches `setLoading(true)` before the API request and `setLoading(false)` after the request completes.
     * - On success, the joke is stored in the Redux state using `setJoke`.
     * - In case of an error, an error message is set using `setError`.
     * 
     * @function fetchJoke
     * @returns {Promise<void>} Returns a promise that resolves when the joke has been fetched and Redux state is updated.
     */
    const fetchJoke = useCallback(async () => {
        try {
            dispatch(setLoading(true));
            if (result) {
                dispatch(setJoke(result));
            } else {
                const fetchedJoke = mode === 'category'
                    ? await fetchJokeByCategory(selectedCategory)
                    : await fetchJokeByRandom();
                
                dispatch(setJoke(fetchedJoke));
            }
        } catch (error) {
            dispatch(setError('Error fetching joke'));
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, mode, selectedCategory, result]);

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

    if (jokeIsLoading || searchIsLoading) {
        return (
            <JokeCardWrapper>
                <CircularProgress />
            </JokeCardWrapper>
        )  
    }
    
    if (jokeError || searchError) {
        return (
            <JokeCardWrapper>
                <Typography color="error">Error: {jokeError || searchError}</Typography>
            </JokeCardWrapper>
        )
    }

    if(result) {
        return (
            <JokeCardWrapper>
                <JokeText variant="h6">
                    {result}
                </JokeText>
            </JokeCardWrapper>
        )
    }
    
    return (
        <JokeCardWrapper>
            <JokeText variant="h6">
                {joke}
            </JokeText>

            {mode !== "search" &&
                <Button 
                    variant="contained"
                    color="primary"
                    onClick={fetchJoke}
                >
                    Another joke
                </Button>
            }
        </JokeCardWrapper>
    );
};

export default JokeCard;

