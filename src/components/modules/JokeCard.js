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

// Components
import ErrorMessage from '../notifications/ErrorMessage';
import SearchInput from '../elements/SearchInput';

/**
 * Styled components (using Emotion)
 */
const JokeCardWrapper = styled(Box)`
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 100%;
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
    const { joke, error: jokeError, isLoading: jokeIsLoading } = useSelector((state) => state.joke);
    const { selectedCategory, isLoading: isLoadingCategories, error: errorCategories } = useSelector((state) => state.category);
    const { result, isLoading: searchIsLoading, error: searchError } = useSelector((state) => state.jokeSearch);

    /**
     * Asynchronously fetches a joke based on the selected mode (category, search, or random).
     * 
     * This function handles the fetching process for jokes based on different modes:
     * - If the mode is 'category' and a category is selected, it fetches a joke from the selected category.
     * - If the mode is 'search' and there is a search result, it uses the search result as the joke.
     * - If the mode is 'random' or no category/search result is specified, it fetches a random joke.
     * 
     * It manages the loading state and dispatches actions to the Redux store for:
     * - Setting the loading state to `true` while fetching.
     * - Storing the fetched joke or search result in the Redux state.
     * - Handling any errors during the fetching process.
     * - Setting the loading state back to `false` once the fetching process is complete.
     * 
     * The function ensures that the correct joke is fetched based on the current mode and that the UI reflects the current loading/error state.
     * @function fetchJoke
     * @async
     */
    const fetchJoke = useCallback(async () => {
        try {
            dispatch(setLoading(true));
            let fetchedJoke;
            
            if (mode === 'category' && selectedCategory) {
                fetchedJoke = await fetchJokeByCategory(selectedCategory);
            } else if (mode === 'search' && result) {
                fetchedJoke = result;
            } else {
                fetchedJoke = await fetchJokeByRandom();
            }
            
            dispatch(setJoke(fetchedJoke));
        } catch (error) {
            dispatch(setError('Error fetching joke'));
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, mode, selectedCategory, result]);

    /**
     * Effect hook that triggers the `fetchJoke` function when the component mounts
     * or when the `fetchJoke` function changes.
     * 
     * This hook ensures that the joke is fetched as soon as the component is rendered or when the dependencies
     * (in this case, the `fetchJoke` function) change. By having `fetchJoke` as a dependency, the effect will 
     * re-run if the `fetchJoke` function reference changes.
     * 
     * The hook is responsible for initiating the joke-fetching process automatically when the component
     * is mounted or when the `fetchJoke` callback is updated.
     * 
     * @effect
     */
    useEffect(() => {
        fetchJoke();
    }, [fetchJoke]);

    // Display loading animation for the specific mode
    if ((mode === 'random' && jokeIsLoading) || (mode === 'category' && isLoadingCategories) || (mode === 'search' && searchIsLoading)) {
        return (
            <JokeCardWrapper>
                <CircularProgress />
            </JokeCardWrapper>
        );
    }
    
    // Display error for the specific mode
    if ((mode === 'random' && jokeError) || (mode === 'category' && errorCategories) || (mode === 'search' && searchError)) {
        return (
            <ErrorMessage message={jokeError || searchError || errorCategories}>
                <Typography color="error">
                    Error: {jokeError || searchError || errorCategories}
                </Typography>
            </ErrorMessage>
        );
    }

    // Logic for handling category mode
    if (mode === 'category' && !selectedCategory) {
        return (
            <JokeCardWrapper>
                <Typography variant="h6">Please select a category to fetch jokes.</Typography>
            </JokeCardWrapper>
        );
    }

    // Display SearchInput for the 'search' mode
    if (mode === 'search') {
        return (
            <JokeCardWrapper>
                {result && (
                    <JokeText variant="h6">
                        {result}  {/* Display the search result once it's available */}
                    </JokeText>
                )}
                <SearchInput />
            </JokeCardWrapper>
        );
    }

    // Default case: Display the joke for random mode or category if category is selected
    return (
        <JokeCardWrapper>
            <JokeText variant="h6">
                {mode === 'search' ? result : joke}
            </JokeText>

            {mode !== 'search' && (
                <Button variant="contained" color="primary" onClick={fetchJoke}>
                    Another joke
                </Button>
            )}
        </JokeCardWrapper>
    );
};

export default JokeCard;
