// React hooks and external libraries 
import { Box, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import styled from '@emotion/styled';

// Styled components for ErrorMessage
const ErrorWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  background-color:#ef5350;
  border-radius: 8px;
  border: 1px solid #f5c6cb;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const ErrorText = styled(Typography)`
  color:white;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
`;

/**
 * ErrorMessage Component
 * 
 * This component displays an error message with a red background and white text.
 * It is styled to match the general design of other components in the app.
 * 
 * Props:
 * - `message` (string): The error message to display.
 * 
 * Example Usage:
 * <ErrorMessage message="An error occurred. Please try again." />
 */
const ErrorMessage = ({ message }) => {
  return (
    <ErrorWrapper>
          <ErrorOutline sx={{ marginRight: '5px' }} />
        <ErrorText>{message}</ErrorText>
    </ErrorWrapper>
  );
};

export default ErrorMessage;
