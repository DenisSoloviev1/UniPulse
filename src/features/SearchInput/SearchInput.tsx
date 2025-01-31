import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import styled from "styled-components";

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export const StyledTextField = styled(TextField)<TextFieldProps>`
  && {
    background-color: var(--color-background-container);
    font-family: "Golos Text", sans-serif;
    position: sticky;
    top: 0;
    margin: 20px 0 0 0;
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
      onKeyDown={(e) => {
        if (e.key === " ") {
          e.preventDefault();
          setSearchQuery(searchQuery + " ");
        }
      }}
      onChange={(e) => {
        setSearchQuery(e.target.value);
      }}
    />
  );
};
