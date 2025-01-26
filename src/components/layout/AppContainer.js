// React hooks and external libraries 
import styled from '@emotion/styled';

/**
 * Styled components (using Emotion)
 */
const AppContainerWrapper = styled.div`
    max-width: 100%;
    height: 100vh;
    background: linear-gradient(135deg, #f3f4f6, #e5e7eb); 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

/**
 * AppContainer Component
 *
 * This component serves as the root container for the application.
 * It wraps all child components and provides a styled environment for the app layout.
 *
 * Features:
 * - Applies consistent styling across the entire application.
 * - Acts as a parent wrapper for the main content.
 *
 * @returns {JSX.Element} A styled container wrapping the application content.
 */
const AppContainer = ({ children }) => {
  return (
    <AppContainerWrapper>
        {children}
    </AppContainerWrapper>
  );
};

export default AppContainer;

