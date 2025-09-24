import styled from "styled-components";

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  border: none;

  ${(props) =>
    props.variant === "default" &&
    `
    background-color: #1f2937;
    color: #ffffff;
    padding: 0.5rem 1rem;

    &:hover {
      background-color: #374151;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `}

  ${(props) =>
    props.variant === "outline" &&
    `
    background-color: transparent;
    color: #1f2937;
    border: 1px solid #e5e7eb;
    padding: 0.5rem 1rem;

    &:hover {
      background-color: #f9fafb;
    }
  `}

  ${(props) =>
    props.variant === "ghost" &&
    `
    background-color: transparent;
    color: #1f2937;
    padding: 0.5rem 1rem;

    &:hover {
      background-color: #f3f4f6;
    }
  `}

  ${(props) =>
    props.size === "sm" &&
    `
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
  `}

  ${(props) =>
    props.size === "lg" &&
    `
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  `}
`;