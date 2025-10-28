import styled from "styled-components";

export const EditorContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Toolbar = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding: ${(props) => props.theme.spacing[4]};
`;

export const ToolbarButtons = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[2]};
  margin-bottom: ${(props) => props.theme.spacing[4]};
`;

export const ToolbarButton = styled.button`
  padding: ${(props) => props.theme.spacing[2]};
  border: none;
  background: transparent;
  color: ${(props) => props.theme.colors.foreground};
  border-radius: ${(props) => props.theme.borderRadius.md};
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

export const ToolbarDivider = styled.div`
  width: 1px;
  height: 1.5rem;
  background-color: ${(props) => props.theme.colors.border};
  margin: 0 ${(props) => props.theme.spacing[2]};
`;

export const SaveButton = styled.button`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[2]};
  padding: ${(props) => props.theme.spacing[2]}
    ${(props) => props.theme.spacing[4]};
  border: none;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.primaryForeground};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: ${(props) => props.theme.fontSizes.sm};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary}e6;
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[2]};
  flex-wrap: wrap;
`;

export const TagBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[1]};
  padding: ${(props) => props.theme.spacing[1]}
    ${(props) => props.theme.spacing[2]};
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.secondaryForeground};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-size: ${(props) => props.theme.fontSizes.xs};
`;

export const TagRemoveButton = styled.button`
  border: none;
  background: none;
  color: inherit;
  cursor: pointer;
  margin-left: ${(props) => props.theme.spacing[1]};

  &:hover {
    color: ${(props) => props.theme.colors.destructive};
  }
`;

export const TagInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[2]};
`;

export const TagInput = styled.input`
  width: 6rem;
  height: 1.5rem;
  padding: 0 ${(props) => props.theme.spacing[2]};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.foreground};
  font-size: ${(props) => props.theme.fontSizes.xs};

  &::placeholder {
    color: ${(props) => props.theme.colors.mutedForeground};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.ring};
  }
`;

export const TagAddButton = styled.button`
  padding: ${(props) => props.theme.spacing[1]};
  border: none;
  background: transparent;
  color: ${(props) => props.theme.colors.foreground};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(props) => props.theme.colors.accent};
    color: ${(props) => props.theme.colors.accentForeground};
  }
`;

export const EditorContent = styled.div`
  flex: 1;
  padding: ${(props) => props.theme.spacing[6]};
  display: flex;
  flex-direction: column;
`;

export const TitleInput = styled.input`
  font-size: ${(props) => props.theme.fontSizes["2xl"]};
  font-weight: bold;
  border: none;
  background: transparent;
  color: ${(props) => props.theme.colors.foreground};
  margin-bottom: ${(props) => props.theme.spacing[6]};
  padding: 0;

  &::placeholder {
    color: ${(props) => props.theme.colors.mutedForeground};
  }

  &:focus {
    outline: none;
  }
`;

export const ContentTextarea = styled.textarea`
  flex: 1;
  min-height: 500px;
  border: none;
  background: transparent;
  color: ${(props) => props.theme.colors.foreground};
  font-family: ${(props) => props.theme.fonts.mono};
  font-size: ${(props) => props.theme.fontSizes.sm};
  line-height: 1.6;
  resize: none;
  padding: 0;

  &::placeholder {
    color: ${(props) => props.theme.colors.mutedForeground};
  }

  &:focus {
    outline: none;
  }
`;

export const Metadata = styled.div`
  margin-top: ${(props) => props.theme.spacing[6]};
  padding-top: ${(props) => props.theme.spacing[4]};
  border-top: 1px solid ${(props) => props.theme.colors.border};
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: ${(props) => props.theme.colors.mutedForeground};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[4]};
`;

export const MetadataItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[1]};
`;

export const EmptyStateIcon = styled.div`
  color: ${(props) => props.theme.colors.mutedForeground};
  margin-bottom: ${(props) => props.theme.spacing[4]};
`;

export const EmptyState = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 100vh;
  color: ${(props) => props.theme.colors.mutedForeground};
`;

export const EmptyStateContent = styled.div`
  text-align: center;
`;

export const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[2]};
  padding: ${(props) => props.theme.spacing[2]}
    ${(props) => props.theme.spacing[4]};
  border: none;
  background-color: ${(props) => props.theme.colors.destructive};
  color: ${(props) => props.theme.colors.destructiveForeground};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: ${(props) => props.theme.fontSizes.sm};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.destructive}e6;
  }
`;

// 회전 스피너
export const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid ${(props) => props.theme.colors.border};
  border-top-color: ${(props) => props.theme.colors.primary};
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
