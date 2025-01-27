// React hooks and external libraries 
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { setSelectedCategory } from '../redux/slices/categorySlice';

// Components
import Title from "../components/elements/Title";
import JokeCard from "../components/modules/JokeCard";
import JokeCategoryMenu from '../components/menus/JokeCategoryMenu';

const MainPage = () => {
  const dispatch = useDispatch();
  const [activeComponent, setActiveComponent] = useState("JokeCard"); 

  return (
    <>
      <Title />

      {/* Control logic to change the component */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setActiveComponent("JokeCategoryMenu")}>
          Kategories
        </button>

        <button onClick={() => {
          setActiveComponent("JokeCard");
          dispatch(setSelectedCategory(null));
        }}>
          Random
        </button>
      </div>

      {/* Logic for displaying a component based on its state */}
      {activeComponent === "JokeCategoryMenu" && <JokeCategoryMenu />}
      {activeComponent === "JokeCard" && <JokeCard mode="random" />}
    </>
  );
};

export default MainPage;