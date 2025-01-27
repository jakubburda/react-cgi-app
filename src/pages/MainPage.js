// React hooks and external libraries 
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { setSelectedCategory } from '../redux/slices/categorySlice';

// Components
import Title from "../components/elements/Title";
import NavButton from "../components/elements/NavButton";
import SearchInput from "../components/elements/SearchInput";
import JokeCard from "../components/modules/JokeCard";
import JokeCategoryMenu from '../components/menus/JokeCategoryMenu';

const MainPage = () => {
  const dispatch = useDispatch();
  const [activeComponent, setActiveComponent] = useState("JokeCard"); 

  return (
    <>
      <Title />

      {/* Control logic to change the component */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>

        <NavButton
          active={activeComponent === "JokeCard"}
          onClick={() => {
            setActiveComponent("JokeCard");
            dispatch(setSelectedCategory(null));
          }}
        >
          Random
        </NavButton>

        <NavButton
          active={activeComponent === "JokeCategoryMenu"}
          onClick={() => setActiveComponent("JokeCategoryMenu")}
        >
          Categories
        </NavButton>

        <NavButton
          active={activeComponent === "SearchInput"}
          onClick={() => {
            setActiveComponent("SearchInput");
            dispatch(setSelectedCategory(null));
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