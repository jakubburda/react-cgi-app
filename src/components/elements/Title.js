// React hooks and external libraries 
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

/**
 * Styled components (using Emotion)
 */
const StyledTitle = styled(Typography)`
    font-size: 2.5rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 30px;
    text-align: center;
    letter-spacing: 1px;
`;

/**
 * Title Component
 *
 * This component renders the title of the application.
 * It uses a styled `Typography` component from Material UI to display the text.
 *
 * Features:
 * - Displays the main title of the app, "Chuck Norris Jokes."
 * - Uses consistent styling for the title across the app.
 *
 * @returns {JSX.Element} A styled title element for the app.
 */
const Title = () => {
  return (
    <StyledTitle variant="h1">Chuck Norris Jokes</StyledTitle>
  );
};

export default Title;
