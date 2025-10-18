import styled from "styled-components";

export const SearchContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing[2]};
`;

export const SearchInputContainer = styled.div`
  position: relative;
  flex: 1;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: ${(props) => props.theme.spacing[3]};
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => props.theme.colors.mutedForeground};
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 2.5rem;
  padding-left: 2.5rem;
  padding-right: ${(props) => props.theme.spacing[3]};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.foreground};
  font-size: ${(props) => props.theme.fontSizes.sm};

  &::placeholder {
    color: ${(props) => props.theme.colors.mutedForeground};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.ring};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.ring}33;
  }
`;

export const FilterButton = styled.button`
  padding: 0 ${(props) => props.theme.spacing[3]};
  height: 2.5rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background: transparent;
  color: ${(props) => props.theme.colors.foreground};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.accent};
    color: ${(props) => props.theme.colors.accentForeground};
  }
`;