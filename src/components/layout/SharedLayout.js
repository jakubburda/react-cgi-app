
// React hooks and external libraries 
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';

// Layout components
import AppContainer from './AppContainer';
import Main from './Main';
import Sidebar from './Sidebar'

/**
 * Styled components for categories menu
 */
const Wrapper = styled.div`
  display: flex;
  height: 80%;
  overflow: hidden;
`;

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
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  return (
    <AppContainer>
      <Wrapper >
        <Sidebar isSidebarActive={isSidebarActive} />
        <Main>
          <Outlet context={{setIsSidebarActive}}/>
        </Main>
      </Wrapper>
    </AppContainer>
  );
};

export default SharedLayout;