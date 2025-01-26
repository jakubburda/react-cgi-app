// React hooks and core functionality
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import SharedLayout from './components/layout/SharedLayout';
import MainPage from './pages/MainPage';

/**
 * App Component
 *
 * The root component of the application responsible for routing and rendering views.
 * It defines the routing structure using `react-router-dom` to render different pages
 * based on the URL path.
 * 
 * Features:
 * - Sets up routing with `Router` and `Routes` from React Router.
 * - Uses `SharedLayout` as the base layout for the main pages.
 * - Defines a route for the homepage (`/`) that renders the `MainPage` component.
 *
 * @returns {JSX.Element} The router configuration and layout for the app.
 */
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<MainPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
