// React hooks and external libraries 
import styled from '@emotion/styled';

/**
 * Styled components (using Emotion)
 */
const MainWrapper = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 1200px;
    padding: 20px;
    background-color: #f9f9f9;
    min-height: 80vh;
    border: 1px solid #c3c3c3;
    border-radius: 5px;
`;

/**
 * Main Component
 *
 * This component serves as the primary content wrapper for the application.
 * It wraps all child components and provides a styled environment for the main content layout.
 *
 * Features:
 * - Ensures consistent styling and layout for the main content area.
 * - Acts as a parent wrapper for the content rendered within the app.
 *
 * @param {React.ReactNode} children - The content to be rendered inside the main area.
 *
 * @returns {JSX.Element} A styled container that wraps and displays the provided children content.
 */
const Main = ({ children }) => {
    return (
        <MainWrapper>
            {children}
        </MainWrapper>
    );
};

export default Main;
