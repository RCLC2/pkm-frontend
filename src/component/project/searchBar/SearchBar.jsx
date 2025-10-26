"use client";

import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../styled/thema";
import * as S from "./SearchBarStyled";
import { Search, Filter } from "lucide-react";

export function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <S.SearchContainer>
        <S.SearchInputContainer>
          <S.SearchIcon>
            <Search size={16} />
          </S.SearchIcon>
          <S.SearchInput
            placeholder="Search notes, tags, content..."
            value={searchQuery}
            onChange={handleChange}
          />
        </S.SearchInputContainer>
        <S.FilterButton>
          <Filter size={16} />
        </S.FilterButton>
      </S.SearchContainer>
    </ThemeProvider>
  );
}
