import Select, { SelectProps } from "@mui/material/Select";
import MenuItem, { MenuItemProps } from "@mui/material/MenuItem";
import styled from "styled-components";

export const StyledSelect = styled(Select)<SelectProps>`
  && {
    background-color: var(--color-background-container);
    border-radius: 14px;
    font-family: "Golos Text", sans-serif;
  }
  fieldset {
    border: none;
  }
`;

export const StyledMenuItem = styled(MenuItem)<MenuItemProps>`
  && {
    background: var(--color-background-container);
  }
`;
