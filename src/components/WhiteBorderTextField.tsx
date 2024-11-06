import styled from "styled-components";
import { TextField } from "@material-ui/core";

export const WhiteBorderTextField = styled(TextField)`
  z-index: 0; // Add z-index
  & label.Mui-focused {
    color: var(--primary-sea-blue); // Update text color
    font-family: "Bebas Neue", sans-serif; // Set font family for placeholder
  }
  & .MuiInputLabel-root {
    color: var(--primary-sea-blue); // Update label color
    font-family: "Bebas Neue", sans-serif; // Set font family for label
  }
  & .MuiOutlinedInput-root {
    background-color: white;
    border-radius: 0; // Add border radius
    font-family: "Bebas Neue", sans-serif; // Set font family
    &.Mui-focused fieldset {
      border-color: var(--primary-sea-blue); // Update border color
    }
  }
  & .MuiInputBase-input::placeholder {
    color: var(--primary-sea-blue); // Update placeholder text color
    font-family: "Bebas Neue", sans-serif; // Set font family for placeholder
  }
`;
