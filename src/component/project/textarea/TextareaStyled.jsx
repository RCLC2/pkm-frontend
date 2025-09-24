import styled from "styled-components";

export const StyledTextarea = styled.textarea`
  display: flex;
  min-height: 5rem;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
  padding: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.5;
  transition: all 0.2s;
  resize: vertical;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;