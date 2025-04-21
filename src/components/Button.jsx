import React from "react";
import styled from "styled-components";

// Styled button component
const StyledButton = styled.button`
  background: linear-gradient(135deg, #0077B6, #00B4D8); /* Gradient color */
  color: white;
  border: none;
  padding: 14px 20px;
  border-radius: 30px; /* Soft rounded edges */
  font-size: 16px;
  font-weight: bold;
  width: 100%; /* Full-width button */
  text-align: center;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background: ${(props) =>
      props.disabled ? "linear-gradient(135deg, #E0E0E0, #E0E0E0)" : "linear-gradient(135deg, #0077B6, #00B4D8);"};
    transform: ${(props) => (props.disabled ? "none" : "scale(1.05)")};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const Button = ({ type, onClick, disabled, children }) => {
  return (
    <StyledButton type={type} onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default Button;
