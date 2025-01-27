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
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #c3c3c3;
    border-radius: 5px;
    overflow-x: hidden;
    overflow-y: scroll;

    /* Media query for small devices */
    @media (max-width: 768px) {
        max-width: 60%;
    } 

    @media (max-width: 580px) {
        max-width: 50%;
    }
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
