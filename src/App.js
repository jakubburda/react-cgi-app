// React hooks and core functionality
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import JokeCard from './components/JokeCard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<JokeCard />} />
      </Routes>
    </Router>
  );
};

export default App;
