// React hooks and external libraries
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, setLoading, setError, setSelectedCategory } from "../../redux/slices/categorySlice";
import { Box, Typography } from "@mui/material";
import styled from '@emotion/styled';

// Utility functions
import { fetchJokeCategories } from "../../utils/apiUtils";

// Animations
import { CircularProgress } from "@mui/material";

// Components
import ErrorMessage from "../notifications/ErrorMessage";

/**
 * Styled components for categories menu
 */
const CategoriesContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const Title = styled(Typography)`
  margin: 40px 5px 10px 5px;
  font-weight: bold;
  text-align: center;
  color: #1976d2;
`;

const Sidebar = styled.aside`
  width: 250px;
  background-color: #fff;
  overflow-y: scroll;
  border-radius: 10px;
  border: 1px solid #c3c3c3;
  opacity: ${(props) => (props.isSidebarActive ? 1 : 0.5)};
  pointer-events: ${(props) => (props.isSidebarActive ? 'auto' : 'none')};
`;

const CategoryItem = styled(Box)`
  display: flex;
  width: 100%;
  margin: 0px 4px 4px 4px;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#1976d2" : "#e0e0e0")};
  color: ${(props) => (props.selected ? "#fff" : "#000")};
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${(props) => (props.selected ? "#1565c0" : "#cfcfcf")};
  }
`;

/**
 * JokeCategoryMenu Component
 * 
 * This component is responsible for displaying a list of joke categories and allowing the user 
 * to select a category. Upon selection, it fetches a joke from the selected category using 
 * the `JokeCard` component.
 * 
 * It uses Redux to manage the loading state, selected category, available categories, and any errors 
 * that may occur during data fetching.
 * 
 * Features:
 * - Fetches a list of joke categories when the component is mounted.
 * - Displays a loading indicator while fetching categories.
 * - Displays an error message if there is an issue fetching categories.
 * - Displays the available joke categories as a list of clickable items.
 * - Highlights the selected category and fetches jokes based on the selected category.
 * - Displays the selected category's joke through the `JokeCard` component.
 * - Prompts the user to select a category if none is selected.
 */
const SideBar = ({ isSidebarActive }) => {
  const dispatch = useDispatch();
  const { selectedCategory, categories, isLoading, error } = useSelector((state) => state.category);

  /**
   * handleCategorySelect Function
   * 
   * Dispatches the `setSelectedCategory` action to update the selected category in Redux state.
   * 
   * @function handleCategorySelect
   * @param {string} category - The selected category.
   */
  const handleCategorySelect = (category) => {
    dispatch(setSelectedCategory(category));
  };

  /**
   * getCategories Function
   * 
   * Fetches joke categories from the API and updates Redux state. 
   * Displays loading and error states while fetching data.
   * 
   * @function fetchCategories
   * @returns {Promise<void>} Resolves once the fetch is completed and the Redux state is updated.
   */
  const fetchCategories = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const categoriesData = await fetchJokeCategories();
      dispatch(setCategories(categoriesData));
    } catch (error) {
      dispatch(setError("Failed to fetch categories."));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  /**
   * Triggers the `fetchCategories` function when the component is mounted or when the `fetchCategories` function is updated.
   * 
   * - The `fetchCategories` function is called inside the `useEffect` hook to fetch joke categories from the API.
   * - It ensures that the categories are fetched as soon as the component is rendered and anytime the `fetchCategories` function changes.
   * 
   * @returns {void}
   */
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <ErrorMessage message={error}>
        Error: {error}
      </ErrorMessage>
    );
  }

  return (
    <>
      {/* Categories menu */}
      <Sidebar isSidebarActive={isSidebarActive}>
        <Title>
          Categories Menu
        </Title>

        <CategoriesContainer>
          {categories.map((category) => (
            <CategoryItem
              key={category}
              selected={category === selectedCategory}
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </CategoryItem>
          ))}
        </CategoriesContainer>
      </Sidebar>
    </>
  );
};

export default SideBar;
