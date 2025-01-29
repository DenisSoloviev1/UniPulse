import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import styled from "styled-components";

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const StyledTextField = styled(TextField)<TextFieldProps>`
  && {
    background-color: var(--color-background-container);
    font-family: "Golos Text", sans-serif;
  }
  && .MuiInputBase-root {
    border-radius: 16px;
    border: none;
  }
`;

export const SearchInput: React.FC<SearchInputProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <StyledTextField
      label="Поиск чатов"
      variant="outlined"
      fullWidth
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};
