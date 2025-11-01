import styled from "styled-components";

export const SidebarContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const SidebarContent = styled.div`
  padding: ${(props) => props.theme.spacing[4]};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[2]};
`;

export const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing[2]};
  margin-bottom: ${(props) => props.theme.spacing[2]};
`;

export const FilterChip = styled.button`
  padding: ${(props) => props.theme.spacing[1]}
    ${(props) => props.theme.spacing[2]};
  border-radius: ${(props) => props.theme.borderRadius.md};
  border: 1px solid
    ${(props) =>
      props.$active
        ? props.theme.colors.accent
        : props.theme.colors.border};
  background-color: ${(props) =>
    props.$active ? props.theme.colors.accent : "transparent"};
  color: ${(props) =>
    props.$active
      ? props.theme.colors.accentForeground
      : props.theme.colors.sidebarForeground};
  font-size: ${(props) => props.theme.fontSizes.xs};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${(props) => props.theme.colors.accent};
    color: ${(props) => props.theme.colors.accentForeground};
  }
`;

export const MethodologyInfo = styled.div`
  margin-bottom: ${(props) => props.theme.spacing[4]};
  padding: ${(props) => props.theme.spacing[3]};
  background-color: ${(props) => props.theme.colors.muted};
  border-radius: ${(props) => props.theme.borderRadius.lg};
`;

export const MethodologyTitle = styled.h3`
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: 500;
  color: ${(props) => props.theme.colors.foreground};
  margin: 0 0 ${(props) => props.theme.spacing[1]} 0;
`;

export const MethodologyDescription = styled.p`
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: ${(props) => props.theme.colors.mutedForeground};
  margin: 0;
  line-height: 1.4;
`;

export const SectionContainer = styled.div`
  margin-bottom: ${(props) => props.theme.spacing[1]};
  border: ${(props) =>
    props.$isDroppable
      ? `1px dashed ${
          props.$isDragTarget
            ? props.theme.colors.accent
            : props.theme.colors.border
        }`
      : "none"};
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: ${(props) => (props.$isDroppable ? props.theme.spacing[2] : 0)};
  background-color: ${(props) =>
    props.$isDroppable && props.$isDragTarget
      ? `${props.theme.colors.accent}22`
      : "transparent"};
  transition: background-color 0.2s ease, border-color 0.2s ease;
`;

export const SectionHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing[2]}
    ${(props) => props.theme.spacing[3]};
  border: none;
  background: transparent;
  color: ${(props) => props.theme.colors.sidebarForeground};
  border-radius: ${(props) => props.theme.borderRadius.md};
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSizes.sm};
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.accent};
    color: ${(props) => props.theme.colors.accentForeground};
  }
`;

export const SectionIcon = styled.div`
  margin-right: ${(props) => props.theme.spacing[2]};
  display: flex;
  align-items: center;
`;

export const SectionTitle = styled.span`
  font-weight: 500;
  flex: 1;
  text-align: left;
`;

export const SectionCount = styled.span`
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: ${(props) => props.theme.colors.mutedForeground};
  margin-left: auto;
`;

export const NotesList = styled.div`
  margin-left: ${(props) => props.theme.spacing[6]};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[1]};
  margin-top: ${(props) => props.theme.spacing[1]};
`;

export const NoteButton = styled.button`
  width: 100%;
  padding: ${(props) => props.theme.spacing[2]};
  border: none;
  background: ${(props) =>
    props.active ? props.theme.colors.accent : "transparent"};
  color: ${(props) =>
    props.active
      ? props.theme.colors.accentForeground
      : props.theme.colors.sidebarForeground};
  border-radius: ${(props) => props.theme.borderRadius.md};
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.accent};
    color: ${(props) => props.theme.colors.accentForeground};
  }
`;

export const NoteContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[1]};
`;

export const NoteTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[2]};
`;

export const NoteTitle = styled.span`
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const NoteDescription = styled.span`
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: ${(props) => props.theme.colors.mutedForeground};
  line-height: 1.3;
  display: block;
`;

export const NoteCategoryBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 6px;
  margin-right: ${(props) => props.theme.spacing[2]};
  background-color: ${(props) => props.theme.colors.accent};
  color: ${(props) => props.theme.colors.accentForeground};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-size: ${(props) => props.theme.fontSizes.xs};
  font-weight: 600;
  letter-spacing: 0.03em;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing[1]};
`;

export const Tag = styled.span`
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: ${(props) => props.theme.colors.mutedForeground};
  background-color: ${(props) => props.theme.colors.muted};
  padding: ${(props) => props.theme.spacing[1]};
  border-radius: ${(props) => props.theme.borderRadius.sm};
`;
