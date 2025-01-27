// React hooks and external libraries 
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchResult, setSearchQuery, setSearchError, setSearchLoading } from '../../redux/slices/jokeSearchSlice'; 
import { TextField, Button, Box } from '@mui/material';
import styled from '@emotion/styled';

// Utility function
import { fetchJokeBySearch } from '../../utils/apiUtils';

// Animations
import { CircularProgress } from '@mui/material';

// Components
import ErrorMessage from '../notifications/ErrorMessage';

/**
 * Styled components for SearchInput
 */
const SearchWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 300px;
    margin-bottom: 10px;
`;

const SearchButton = styled(Button)`
    background-color: #1976d2;
    color: white;
    &:hover {
        background-color: #1565c0;
    }
`;

/**
 * SearchInput Component
 * 
 * This component allows users to input a search term and submit it for searching.
 * It consists of a text input field and a search button. When the user types into the input,
 * the search term is stored in the local state. Upon clicking the search button, 
 * the entered term is passed to the parent component via the `onSearch` callback.
 * 
 * Props:
 * - `onSearch` (function): A callback function that is called when the user clicks the search button. 
 *   It receives the search term as an argument.
 * 
 * Features:
 * - Allows users to input a search term.
 * - Updates the local state with the input value as the user types.
 * - Triggers the search process by calling the `onSearch` function when the search button is clicked.
 * 
 * Example Usage:
 * <SearchInput onSearch={(searchTerm) => console.log(searchTerm)} />
 */
const SearchInput = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchSearch = useCallback(async () => {
        dispatch(setSearchLoading(true));
        setLoading(true);
        try {
            const searchedJoked = await fetchJokeBySearch(searchTerm);
            dispatch(setSearchResult(searchedJoked));
        } catch (error) {
            dispatch(setSearchError('Error while searching for a joke'));
            dispatch(setSearchLoading(false));
        } finally {
            dispatch(setSearchLoading(false));
            setLoading(false);
        }
    },[dispatch, searchTerm])

    /**
     * handleChange Function
     * 
     * This function is called whenever the user types into the search input field.
     * It updates the `searchTerm` state with the new value entered by the user.
     * 
     * Params:
     * - `event` (object): The event object that is passed when the input value changes.
     *   - `event.target.value` contains the new value entered in the input field.
     * 
     * It ensures that the input field's value is reflected in the component's state.
     * @function handleChange
     */
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    /**
     * handleSearch Function
     * 
     * This function is called when the user clicks the "Search" button.
     * It triggers the `onSearch` callback function, passing the current `searchTerm` as an argument.
     * 
     * If the `onSearch` function is provided, it is called with the `searchTerm` value,
     * allowing the parent component to perform a search operation or handle the value.
     * 
     * It ensures that the search term is passed to the external search logic.
     * @function handleSearch
     */
    const handleSearch = () => {
        if (!searchTerm) {
            dispatch(setSearchError("Please enter the search string"));
            return;
        }    
        dispatch(setSearchError(""));
        dispatch(setSearchQuery(searchTerm));
        fetchSearch(searchTerm);
    };

    return (
        <>
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
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
                </SearchButton>
            </SearchWrapper>

            {searchTerm === "" && 
                <ErrorMessage message={"Please enter a search string"} />
            }
        </>
    );
};

export default SearchInput;
