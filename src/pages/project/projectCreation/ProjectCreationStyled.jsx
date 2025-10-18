import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.foreground};
  font-family: ${(props) => props.theme.fonts.sans};
`;

export const Header = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

export const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing[4]}
    ${(props) => props.theme.spacing[6]};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[3]};
`;

export const LogoIcon = styled.div`
  height: 2rem;
  width: 2rem;
  background-color: ${(props) => props.theme.colors.accent};
  border-radius: ${(props) => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.accentForeground};
`;

export const LogoText = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.xl};
  font-weight: 600;
  margin: 0;
`;

export const HeaderNav = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[4]};
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => props.theme.colors.mutedForeground};

  span {
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.colors.foreground};
    }
  }
`;

export const PointsBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[2]};
  padding: ${(props) => props.theme.spacing[1]}
    ${(props) => props.theme.spacing[2]};
  background: ${(props) => props.theme.colors.accent};
  color: ${(props) => props.theme.colors.accentForeground};
  border-radius: 9999px;
  font-weight: 600;
  font-size: ${(props) => props.theme.fontSizes.xs};
`;

export const MainContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing[12]}
    ${(props) => props.theme.spacing[6]};
`;

export const TitleSection = styled.div`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing[12]};
`;

export const MainTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSizes["4xl"]};
  font-weight: bold;
  margin-bottom: ${(props) => props.theme.spacing[4]};
  margin: 0 0 ${(props) => props.theme.spacing[4]} 0;
`;

export const MainSubtitle = styled.p`
  font-size: ${(props) => props.theme.fontSizes.xl};
  color: ${(props) => props.theme.colors.mutedForeground};
  max-width: 32rem;
  margin: 0 auto;
  line-height: 1.6;
`;

export const TabsContainer = styled.div`
  width: 100%;
`;

export const TabsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 24rem;
  margin: 0 auto ${(props) => props.theme.spacing[8]} auto;
  background-color: ${(props) => props.theme.colors.muted};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing[1]};
`;

export const TabTrigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing[2]};
  padding: ${(props) => props.theme.spacing[2]}
    ${(props) => props.theme.spacing[4]};
  border-radius: ${(props) => props.theme.borderRadius.md};
  border: none;
  background: ${(props) =>
    props.active ? props.theme.colors.background : "transparent"};
  color: ${(props) =>
    props.active
      ? props.theme.colors.foreground
      : props.theme.colors.mutedForeground};
  font-size: ${(props) => props.theme.fontSizes.sm};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${(props) => props.theme.colors.foreground};
  }
`;

export const TabContent = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
`;

export const SearchContainer = styled.div`
  max-width: 24rem;
  margin: 0 auto ${(props) => props.theme.spacing[8]} auto;
  position: relative;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 3rem;
  padding-left: 2.5rem;
  padding-right: ${(props) => props.theme.spacing[4]};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.foreground};
  font-size: ${(props) => props.theme.fontSizes.base};

  &::placeholder {
    color: ${(props) => props.theme.colors.mutedForeground};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.ring};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.ring}33;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: ${(props) => props.theme.spacing[3]};
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => props.theme.colors.mutedForeground};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${(props) => props.theme.spacing[6]};
  margin-bottom: ${(props) => props.theme.spacing[12]};

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;


export const Card = styled.div`
  background-color: ${(props) => props.theme.colors.card};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing[6]};
  cursor: pointer;
  transition: all 0.2s;

  ${(props) =>
    props.selected &&
    `
    border-color: ${props.theme.colors.accent};
    box-shadow: 0 0 0 2px ${props.theme.colors.accent}33;
  `}

  &:hover {
    border-color: ${(props) => props.theme.colors.accent}80;
    box-shadow: ${(props) => props.theme.shadows.lg};
  }
`;

export const CardHeader = styled.div`
  margin-bottom: ${(props) => props.theme.spacing[4]};
`;

export const CardHeaderContent = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
`;

export const CardIconSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[3]};
`;

export const CardIcon = styled.div`
  padding: ${(props) => props.theme.spacing[2]};
  background-color: ${(props) => props.theme.colors.accent}1a;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  color: ${(props) => props.theme.colors.accent};
`;

export const CardTitleSection = styled.div``;

export const CardTitle = styled.h3`
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: 600;
  margin: 0 0 ${(props) => props.theme.spacing[1]} 0;
`;

export const Badge = styled.span`
  display: inline-block;
  padding: ${(props) => props.theme.spacing[1]}
    ${(props) => props.theme.spacing[2]};
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.secondaryForeground};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-size: ${(props) => props.theme.fontSizes.xs};
  font-weight: 500;
`;

export const CardContent = styled.div``;

export const PreviewImage = styled.img`
  width: 100%;
  height: 8rem;
  object-fit: cover;
  border-radius: ${(props) => props.theme.borderRadius.md};
  background-color: ${(props) => props.theme.colors.muted};
  margin-bottom: ${(props) => props.theme.spacing[4]};
`;

export const CardDescription = styled.p`
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => props.theme.colors.mutedForeground};
  line-height: 1.5;
  margin: 0 0 ${(props) => props.theme.spacing[4]} 0;
`;

export const FeaturesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing[2]};
`;

export const FeatureBadge = styled.span`
  padding: ${(props) => props.theme.spacing[1]}
    ${(props) => props.theme.spacing[2]};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: ${(props) => props.theme.colors.mutedForeground};
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing[2]};
  padding: ${(props) => props.theme.spacing[2]}
    ${(props) => props.theme.spacing[4]};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${(props) =>
    props.variant === "primary" &&
    `
    background-color: ${props.theme.colors.primary};
    color: ${props.theme.colors.primaryForeground};

    &:hover {
      background-color: ${props.theme.colors.primary}e6;
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
    color: ${props.theme.colors.foreground};
    border: 1px solid ${props.theme.colors.border};

    &:hover {
      background-color: ${props.theme.colors.accent};
      color: ${props.theme.colors.accentForeground};
    }
  `}

  ${(props) =>
    props.variant === "ghost" &&
    `
    background-color: transparent;
    color: ${props.theme.colors.foreground};

    &:hover {
      background-color: ${props.theme.colors.accent};
      color: ${props.theme.colors.accentForeground};
    }
  `}
`;

export const FormCard = styled(Card)`
  max-width: 32rem;
  margin: 0 auto;
  cursor: default;

  &:hover {
    border-color: ${(props) => props.theme.colors.border};
    box-shadow: none;
  }
`;

export const FormHeader = styled.div`
  margin-bottom: ${(props) => props.theme.spacing[6]};
`;

export const FormTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[2]};
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: 600;
  margin: 0 0 ${(props) => props.theme.spacing[2]} 0;
`;

export const FormDescription = styled.p`
  color: ${(props) => props.theme.colors.mutedForeground};
  margin: 0;
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[6]};
`;

export const InputGroup = styled.div``;

export const Label = styled.label`
  display: block;
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: 500;
  margin-bottom: ${(props) => props.theme.spacing[2]};
`;

export const Input = styled.input`
  width: 100%;
  height: 3rem;
  padding: 0 ${(props) => props.theme.spacing[3]};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.foreground};
  font-size: ${(props) => props.theme.fontSizes.base};

  &::placeholder {
    color: ${(props) => props.theme.colors.mutedForeground};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.ring};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.ring}33;
  }
`;

export const FormActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${(props) => props.theme.spacing[4]};
`;

export const EmptyState = styled(Card)`
  max-width: 32rem;
  margin: 0 auto;
  text-align: center;
  cursor: default;

  &:hover {
    border-color: ${(props) => props.theme.colors.border};
    box-shadow: none;
  }
`;

export const EmptyStateContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing[12]} 0;
`;

export const EmptyStateIcon = styled.div`
  color: ${(props) => props.theme.colors.mutedForeground};
  margin-bottom: ${(props) => props.theme.spacing[4]};
`;

export const EmptyStateTitle = styled.h3`
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: 600;
  margin: 0 0 ${(props) => props.theme.spacing[2]} 0;
`;

export const EmptyStateDescription = styled.p`
  color: ${(props) => props.theme.colors.mutedForeground};
  text-align: center;
  margin: 0 0 ${(props) => props.theme.spacing[6]} 0;
`;

export const DeleteButton = styled(Button)`
  opacity: 0;
  transition: opacity 0.2s;

  ${Card}:hover & {
    opacity: 1;
  }
`;

export const WizardCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[6]};
  max-width: 960px;
  margin: 0 auto;
`;

export const StepHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const StepList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[6]};
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const StepItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[3]};
  opacity: ${({ $status }) => ($status === "upcoming" ? 0.6 : 1)};
`;

export const StepMarker = styled.span`
  height: 2.25rem;
  width: 2.25rem;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background: ${({ $status, theme }) => {
    if ($status === "complete") return theme.colors.accent;
    if ($status === "active") return theme.colors.primary;
    return theme.colors.secondary;
  }};
  color: ${({ $status, theme }) => {
    if ($status === "complete") return theme.colors.accentForeground;
    if ($status === "active") return theme.colors.primaryForeground;
    return theme.colors.mutedForeground;
  }};
  border: ${({ $status, theme }) =>
    $status === "upcoming" ? `1px solid ${theme.colors.border}` : "none"};
`;

export const StepInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
`;

export const StepTitle = styled.span`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const StepDescription = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

export const WizardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
`;

export const StepIntro = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const StepHeading = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: 600;
`;

export const StepText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

export const SelectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${({ theme }) => theme.spacing[5]};
`;

export const SelectionCard = styled.button`
  border: 1px solid
    ${({ $selected, theme }) =>
      $selected ? theme.colors.accent : theme.colors.border};
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[5]};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[4]};
  cursor: pointer;
  text-align: left;
  color: ${({ theme }) => theme.colors.foreground};
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: ${({ $selected, theme }) =>
    $selected ? `0 0 0 2px ${theme.colors.accent}33` : "none"};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }
`;

export const SelectionIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.accent}22;
  color: ${({ theme }) => theme.colors.accent};
`;

export const SelectionTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
`;

export const SelectionDescription = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

export const SelectionHighlights = styled.ul`
  margin: 0;
  padding-left: ${({ theme }) => theme.spacing[4]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};

  li {
    list-style: disc;
  }
`;

export const WizardActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const StepSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

export const SummaryRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

export const SummaryBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[1]}
    ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.muted};
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const StepEmpty = styled.div`
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing[6]};
  text-align: center;
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;
