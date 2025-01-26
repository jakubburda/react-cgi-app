
// React hooks and external libraries 
import { Outlet } from 'react-router-dom';

// Layout components
import AppContainer from './AppContainer';
import Main from './Main';

/**
 * SharedLayout Component
 *
 * This component serves as the common layout for the entire application.
 * It wraps all pages and views with consistent layout elements like the main container and content wrapper.
 *
 * Features:
 * - Provides a consistent layout structure for the app by using `AppContainer` and `Main` components.
 * - Renders dynamic content using the `Outlet` component from React Router.
 *
 * @returns {JSX.Element} A layout that wraps the main content, providing structure and consistent styling.
 */
const SharedLayout = () => {
  return (
    <AppContainer>
        <Main>
            <Outlet />
        </Main>
    </AppContainer>
  );
};

export default SharedLayout;