import styled from "styled-components";
import { TextField } from "@material-ui/core";

export const WhiteBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: var(--dark-primary); // Update text color
  }
  & .MuiOutlinedInput-root {
    background-color: white;
    &.Mui-focused fieldset {
      border-color: var(--dark-primary); // Update border color
    }
  }
`;
