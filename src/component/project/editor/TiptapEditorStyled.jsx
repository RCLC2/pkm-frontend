import styled from "styled-components";

export const EditorContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.background};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  border: 1px solid ${(props) => props.theme.colors.border};
  overflow: hidden;
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing[3]};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.muted};
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing[2]};
`;

export const ToolbarSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[1]};
`;

export const ToolbarButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing[2]};
  border: none;
  background: ${(props) => props.active ? props.theme.colors.accent : "transparent"};
  color: ${(props) => props.active
    ? props.theme.colors.accentForeground
    : props.theme.colors.foreground};
  border-radius: ${(props) => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s;
  min-width: 2rem;
  min-height: 2rem;

  &:hover {
    background-color: ${(props) => props.theme.colors.accent};
    color: ${(props) => props.theme.colors.accentForeground};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.active {
    background-color: ${(props) => props.theme.colors.accent};
    color: ${(props) => props.theme.colors.accentForeground};
  }
`;

export const ToolbarDivider = styled.div`
  width: 1px;
  height: 1.5rem;
  background-color: ${(props) => props.theme.colors.border};
  margin: 0 ${(props) => props.theme.spacing[2]};
`;

export const EditorTextarea = styled.textarea`
  flex: 1;
  padding: ${(props) => props.theme.spacing[6]};
  border: none;
  background: transparent;
  color: ${(props) => props.theme.colors.foreground};
  font-family: ${(props) => props.theme.fonts.mono};
  font-size: ${(props) => props.theme.fontSizes.sm};
  line-height: 1.6;
  resize: none;
  overflow-y: auto;
  min-height: 400px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.mutedForeground};
    font-style: italic;
  }
`;

export const EditorContent = styled.div`
  flex: 1;
  padding: ${(props) => props.theme.spacing[6]};
  overflow-y: auto;
  min-height: 400px;
  color: ${(props) => props.theme.colors.foreground};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.sm};
  line-height: 1.6;

  &:focus {
    outline: none;
  }

  &[contenteditable]:empty:before {
    content: attr(data-placeholder);
    color: ${(props) => props.theme.colors.mutedForeground};
    font-style: italic;
  }

  /* Rich text styling */
  h1 {
    font-size: ${(props) => props.theme.fontSizes["2xl"]};
    font-weight: 700;
    margin: ${(props) => props.theme.spacing[4]} 0 ${(props) => props.theme.spacing[2]} 0;
    line-height: 1.2;
  }

  h2 {
    font-size: ${(props) => props.theme.fontSizes.xl};
    font-weight: 600;
    margin: ${(props) => props.theme.spacing[4]} 0 ${(props) => props.theme.spacing[2]} 0;
    line-height: 1.3;
  }

  h3 {
    font-size: ${(props) => props.theme.fontSizes.lg};
    font-weight: 600;
    margin: ${(props) => props.theme.spacing[3]} 0 ${(props) => props.theme.spacing[2]} 0;
    line-height: 1.4;
  }

  p {
    margin: ${(props) => props.theme.spacing[2]} 0;
    line-height: 1.6;
    color: ${(props) => props.theme.colors.foreground};
  }

  strong {
    font-weight: 700;
  }

  em {
    font-style: italic;
  }

  ul, ol {
    margin: ${(props) => props.theme.spacing[2]} 0;
    padding-left: ${(props) => props.theme.spacing[6]};
  }

  li {
    margin: ${(props) => props.theme.spacing[1]} 0;
    line-height: 1.6;
  }

  blockquote {
    margin: ${(props) => props.theme.spacing[4]} 0;
    padding: ${(props) => props.theme.spacing[4]};
    border-left: 4px solid ${(props) => props.theme.colors.accent};
    background-color: ${(props) => props.theme.colors.muted};
    border-radius: ${(props) => props.theme.borderRadius.md};
    font-style: italic;
  }

  pre {
    margin: ${(props) => props.theme.spacing[4]} 0;
    padding: ${(props) => props.theme.spacing[4]};
    background-color: ${(props) => props.theme.colors.muted};
    border-radius: ${(props) => props.theme.borderRadius.md};
    font-family: ${(props) => props.theme.fonts.mono};
    font-size: ${(props) => props.theme.fontSizes.sm};
    overflow-x: auto;
    white-space: pre;
  }

  code {
    background-color: ${(props) => props.theme.colors.muted};
    padding: ${(props) => props.theme.spacing[1]};
    border-radius: ${(props) => props.theme.borderRadius.sm};
    font-family: ${(props) => props.theme.fonts.mono};
    font-size: ${(props) => props.theme.fontSizes.sm};
  }

  a {
    color: ${(props) => props.theme.colors.primary};
    text-decoration: underline;

    &:hover {
      color: ${(props) => props.theme.colors.primary}e6;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    margin: ${(props) => props.theme.spacing[4]} 0;
    border-radius: ${(props) => props.theme.borderRadius.md};
  }

  table {
    width: 100%;
    margin: ${(props) => props.theme.spacing[4]} 0;
    border-collapse: collapse;
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.md};
  }

  th, td {
    padding: ${(props) => props.theme.spacing[2]} ${(props) => props.theme.spacing[3]};
    border: 1px solid ${(props) => props.theme.colors.border};
    text-align: left;
  }

  th {
    background-color: ${(props) => props.theme.colors.muted};
    font-weight: 600;
  }
`;

export const LinkModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const LinkModalContent = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  border: 1px solid ${(props) => props.theme.colors.border};
  min-width: 400px;
  max-width: 90vw;
  box-shadow: ${(props) => props.theme.shadows.lg};
`;

export const LinkModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing[4]};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};

  h3 {
    margin: 0;
    font-size: ${(props) => props.theme.fontSizes.lg};
    font-weight: 600;
  }
`;

export const LinkModalClose = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  background: transparent;
  border-radius: ${(props) => props.theme.borderRadius.md};
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSizes.xl};
  color: ${(props) => props.theme.colors.mutedForeground};
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.accent};
    color: ${(props) => props.theme.colors.accentForeground};
  }
`;

export const LinkModalBody = styled.div`
  padding: ${(props) => props.theme.spacing[4]};
`;

export const LinkInput = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.spacing[3]};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.foreground};
  font-size: ${(props) => props.theme.fontSizes.sm};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.ring};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.ring}33;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.mutedForeground};
  }
`;

export const LinkModalFooter = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing[2]};
  padding: ${(props) => props.theme.spacing[4]};
  border-top: 1px solid ${(props) => props.theme.colors.border};
  justify-content: flex-end;
`;

export const LinkModalButton = styled.button`
  padding: ${(props) => props.theme.spacing[2]} ${(props) => props.theme.spacing[4]};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background-color: ${(props) => props.primary
    ? props.theme.colors.primary
    : props.theme.colors.background};
  color: ${(props) => props.primary
    ? props.theme.colors.primaryForeground
    : props.theme.colors.foreground};
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.primary
      ? `${props.theme.colors.primary}e6`
      : props.theme.colors.accent};
    color: ${(props) => props.primary
      ? props.theme.colors.primaryForeground
      : props.theme.colors.accentForeground};
  }
`;