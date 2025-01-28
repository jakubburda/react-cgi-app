// React hooks and external libraries 
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchResult, setSearchQuery, setSearchError, setSearchLoading } from '../../redux/slices/jokeSearchSlice'; 
import { TextField, Button, Box } from '@mui/material';
import styled from '@emotion/styled';

// Utility function
import { fetchJokeBySearch } from '../../services/jokeService';

// Animations
import { CircularProgress } from '@mui/material';

/**
 * Styled components for SearchInput
 */
const SearchWrapper = styled(Box)`
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 20px;
    border-radius: 5px;
    width: 250px;
    margin-bottom: 10px;
`;

const SearchButton = styled(Button)`
    background-color: #1976d2;
    height: 40px;
    color: white;
    border-radius: 5px;
    &:hover {
        background-color: #1565c0;
    }
`;

/**
 * `SearchInput` Component
 * 
 * This component provides a search input field that allows users to enter a search term to look for jokes. It dispatches Redux actions to manage the search process and displays the results when a search is performed.
 * 
 * Features:
 * - Allows users to input a search term.
 * - Triggers the search action when the search button is clicked.
 * - Displays a loading spinner while the search request is in progress.
 * - Displays an error message if the search term is empty or if there is an error during the search.
 */
const SearchInput = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    /**
     * `fetchSearch` Function
     * 
     * This function handles the process of fetching a joke based on the current search term. It is called when the user submits a search request.
     * It triggers the necessary Redux actions to manage the loading state, store the search result, and handle any errors that occur during the search.
     * 
     * It performs the following tasks:
     * - Sets the loading state to `true` before making the API request.
     * - Calls the `fetchJokeBySearch` utility function to fetch a joke based on the current search term (`searchTerm`).
     * - If the request is successful, it dispatches the `setSearchResult` action to store the joke in the Redux state.
     * - If an error occurs during the API request, it dispatches the `setSearchError` action to set an error message in the Redux state.
     * - Finally, it resets the loading state to `false` after the search operation is completed, regardless of success or failure.
     * 
     * This function is wrapped in `useCallback` to prevent unnecessary re-creations of the function during re-renders. It depends on the `dispatch` function from Redux and the current `searchTerm`.
     * 
     * @returns {void} This function does not return any value, but it updates the Redux state based on the search results or any errors encountered.
     */
    const fetchSearch = useCallback(async () => {
        dispatch(setSearchLoading(true));
        setLoading(true);
        try {
            const searchedJoked = await fetchJokeBySearch(searchTerm);
            dispatch(setSearchResult(searchedJoked));
        } catch (error) {
            dispatch(setSearchError('Error while searching for a joke'));
        } finally {
            dispatch(setSearchLoading(false));
            setLoading(false);
        }
    }, [dispatch, searchTerm]);

    /**
     * `handleChange` Function
     * 
     * This function is called whenever the user types into the search input field. It updates the `searchTerm` state with the new value entered by the user.
     * Additionally, if the input is not empty, it clears any existing search error by dispatching the `setSearchError` action with an empty string.
     * 
     * This function ensures that the value in the input field is always reflected in the component's state (`searchTerm`), and it manages error handling by removing the error message
     * once the user begins typing again.
     * 
     * @function handleChange
     * @param {Object} event - The event object triggered by the input field change.
     * @param {string} event.target.value - The updated value entered in the input field.
     * @returns {void} 
     */
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        if (event.target.value !== '') {
            dispatch(setSearchError(''));
        }
    };

    /**
     * `handleSearch` Function
     * 
     * This function is called when the user clicks the "Search" button. It validates the input and initiates the search process.
     * If the `searchTerm` is empty, it dispatches the `setSearchError` action to display an error message asking the user to enter a search term.
     * If the input is valid, it clears the error message by dispatching the `setSearchError` action with an empty string, then sets the search query
     * in the Redux store with `setSearchQuery` and calls the `fetchSearch` function to perform the search.
     * 
     * This function ensures that the search is only triggered when the user has entered a valid search term, and it handles error display for invalid or empty input.
     * @function handleSearch
     * @returns {void}
     */
    const handleSearch = () => {
        if (!searchTerm) {
            dispatch(setSearchError("Please enter the search string"));
            return;
        }    
        dispatch(setSearchError(""));
        dispatch(setSearchQuery(searchTerm));
        fetchSearch();
    };

    return (
        <SearchWrapper>
            <TextField
                label="Search for a Joke"
                variant="outlined"
                value={searchTerm}
                onChange={handleChange}
                fullWidth
            />

            <SearchButton
                onClick={handleSearch}
                variant="contained"
                size="large"
                fullWidth
                disabled={loading || !searchTerm.trim()}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
            </SearchButton>
        </SearchWrapper>
    );
};

export default SearchInput;
