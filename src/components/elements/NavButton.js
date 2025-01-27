// React hooks and external libraries 
import styled from '@emotion/styled';

/**
 * Styled components (using Emotion)
 */
const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.active ? '#1976d2' : '#e0e0e0')};
  color: ${(props) => (props.active ? '#fff' : '#000')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.active ? '#1565c0' : '#cfcfcf')};
  }
`;

/**
 * NavButton Component
 * 
 * A simple button component used for navigation or switching views.
 * It accepts `onClick` function to handle the button's click event, 
 * `active` to apply active styles when the button is selected, 
 * and `children` to render the button's label or content.
 * 
 * Props:
 * - `onClick`: Function to be called when the button is clicked.
 * - `active`: Boolean value to indicate if the button is active.
 * - `children`: The content (usually text) displayed on the button.
 * 
 * Features:
 * - Customizable via `StyledButton` with dynamic styles based on `active` state.
 */
const NavButton = ({ onClick, active, children }) => {
    return (
        <StyledButton onClick={onClick} active={active}>
            {children}
        </StyledButton>
    );
};
  
export default NavButton;