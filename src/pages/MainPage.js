// React hooks and external libraries 
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { setSelectedCategory } from '../redux/slices/categorySlice';
import { setSearchQuery, setSearchResult, setSearchError } from '../redux/slices/jokeSearchSlice';

// Components
import Title from "../components/elements/Title";
import NavButton from "../components/elements/NavButton";
import SearchInput from "../components/elements/SearchInput";
import JokeCard from "../components/modules/JokeCard";
import JokeCategoryMenu from '../components/menus/JokeCategoryMenu';

// Assets
import ChuckNorrisImage from '../../src/assets/images/chuck-norris.jpg'

const MainPage = () => {
  const dispatch = useDispatch();
  const [activeComponent, setActiveComponent] = useState("JokeCard");
  const { setIsSidebarActive } = useOutletContext();

  /**
   * clearSearchState Function
   *
   * This function is responsible for clearing the search-related state in the Redux store.
   * It resets the search query, search results, and any search-related error messages.
   * 
   * Dispatches the following Redux actions:
   * - setSearchQuery: Resets the search query to an empty string.
   * - setSearchResult: Clears the search results by setting them to an empty string.
   * - setSearchError: Resets any existing error messages to `null`.
   * 
   * @function clearSearchState
   */
  const clearSearchState = () => {
    dispatch(setSearchQuery(""));
    dispatch(setSearchResult(""));
    dispatch(setSearchError(null));
  };

  return (
    <>
      <img 
        src={ChuckNorrisImage}
        alt="Chuck Norris" 
        style={{ 
          width: "40%",
          height: "auto",
          borderRadius: "8px",
          marginBottom: "20px" 
        }}
      />

      <Title />

      {/* Control logic to change the component */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>

        <NavButton
          active={activeComponent === "JokeCard"}
          onClick={() => {
            clearSearchState();
            setActiveComponent("JokeCard");
            dispatch(setSelectedCategory(null));
            setIsSidebarActive(false);
          }}
        >
          Random
        </NavButton>

        <NavButton
          active={activeComponent === "JokeCategoryMenu"}
          onClick={() => {
            clearSearchState();
            setActiveComponent("JokeCategoryMenu");
            setIsSidebarActive(true);
          }}
        >
          Categories
        </NavButton>

        <NavButton
          active={activeComponent === "SearchInput"}
          onClick={() => {
            setActiveComponent("SearchInput");
            dispatch(setSelectedCategory(null));
            setIsSidebarActive(false);
          }}
        >
          Search
        </NavButton>
      </div>
          {/* Logic for displaying a search component */}
      {activeComponent === "SearchInput" && <SearchInput />}

      {/* Logic for displaying a component based on its state */}
      {activeComponent === "JokeCategoryMenu" && <JokeCategoryMenu />}
      {activeComponent === "JokeCard" && <JokeCard mode="random" />}
      {activeComponent === "SearchInput" && <JokeCard mode="search" />}
    </>
  );
};

export default MainPage;