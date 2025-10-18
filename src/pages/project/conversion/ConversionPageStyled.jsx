import styled from "styled-components";

export const ConversionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.foreground};
  min-height: 100%;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  font-weight: 600;
  margin: 0;
`;

export const Subtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes.base};
  max-width: 48rem;
`;

export const ModeToggle = styled.div`
  display: inline-flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 0.25rem;
  gap: 0.25rem;
  width: fit-content;
`;

export const ModeButton = styled.button`
  border: none;
  outline: none;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : "transparent"};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primaryForeground : theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? theme.colors.primary : theme.colors.muted};
    color: ${({ theme }) => theme.colors.primaryForeground};
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InfoBanner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const BannerIconSlot = styled.div`
  color: ${({ theme }) => theme.colors.accent};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BannerText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const BannerTitle = styled.span`
  color: ${({ theme }) => theme.colors.foreground};
  font-weight: 600;
`;

export const BannerDescription = styled.span`
  line-height: 1.4;
`;

export const ZettelParaLayout = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 1.5rem;
  align-items: start;
  min-height: 28rem;
`;

export const NoteColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1.25rem;
`;

export const NoteColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const NoteColumnTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
`;

export const NoteCount = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

export const NoteList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const NoteItem = styled.button`
  background: ${({ $active, theme }) =>
    $active ? theme.colors.muted : theme.colors.secondary};
  border: 1px solid
    ${({ $assigned, theme }) =>
      $assigned ? theme.colors.accent : theme.colors.border};
  color: ${({ theme }) => theme.colors.foreground};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0.75rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.muted};
    transform: translateY(-1px);
  }
`;

export const NoteItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const NoteItemTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
`;

export const NoteAssignmentBadge = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.accentForeground};
  background: ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 0.125rem 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const NoteTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
`;

export const Tag = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
  background: ${({ theme }) => theme.colors.muted};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 0.125rem 0.5rem;
`;

export const NoteDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 1rem;
`;

export const NoteDetailsHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const NoteDetailsLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export const NoteDetailsTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 600;
`;

export const NoteDetailsTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
`;

export const QuadrantSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const QuadrantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: minmax(180px, 1fr);
  gap: 1rem;
`;

export const Quadrant = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem;
  background: ${({ theme }) => theme.colors.card};
  border: 2px dashed
    ${({ $isTarget, theme }) =>
      $isTarget ? theme.colors.accent : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

export const QuadrantHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const QuadrantTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
`;

export const QuadrantDescription = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

export const Assignments = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const AssignedNote = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0.75rem;
`;

export const AssignedNoteHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const AssignedTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
`;

export const RemoveAssignment = styled.button`
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  cursor: pointer;
  padding: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.destructive};
  }
`;

export const AssignedTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
`;

export const ActionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const FinalizeButton = styled.button`
  border: none;
  outline: none;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accentForeground};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primaryForeground};
    transform: translateY(-1px);
  }
`;

export const UnassignedInfo = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

export const StatusMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid
    ${({ $variant }) =>
      $variant === "success"
        ? "rgba(34, 197, 94, 0.4)"
        : "rgba(234, 179, 8, 0.4)"};
  background:
    ${({ $variant }) =>
      $variant === "success"
        ? "rgba(34, 197, 94, 0.1)"
        : "rgba(253, 224, 71, 0.08)"};
  color:
    ${({ $variant }) =>
      $variant === "success" ? "#4ade80" : "#facc15"};
`;

export const PlaceholderCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: flex-start;
  background: ${({ theme }) => theme.colors.card};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1.5rem;
  max-width: 40rem;
`;

export const PlaceholderTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: 600;
`;

export const PlaceholderText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
  line-height: 1.5;
`;

export const HintText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

export const ResetButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.mutedForeground};
`;
