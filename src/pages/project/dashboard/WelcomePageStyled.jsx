import styled from "styled-components";

export const WelcomeContainer = styled.div`
  flex: 1;
  padding: ${(props) => props.theme.spacing[8]};
  overflow-y: auto;
  background-color: ${(props) => props.theme.colors.background};
`;

export const WelcomeHeader = styled.div`
  margin-bottom: ${(props) => props.theme.spacing[8]};
  text-align: center;
`;

export const WelcomeTitle = styled.h1`
  font-size: ${(props) => props.theme.fontSizes["3xl"]};
  font-weight: 700;
  margin: 0 0 ${(props) => props.theme.spacing[4]} 0;
  color: ${(props) => props.theme.colors.foreground};
`;

export const WelcomeSubtitle = styled.p`
  font-size: ${(props) => props.theme.fontSizes.lg};
  color: ${(props) => props.theme.colors.mutedForeground};
  margin: 0;
  max-width: 48rem;
  margin: 0 auto;
  line-height: 1.6;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${(props) => props.theme.spacing[6]};
  margin-bottom: ${(props) => props.theme.spacing[8]};
`;

export const StatCard = styled.div`
  background: ${(props) => props.theme.colors.card};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing[6]};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[4]};
  transition: all 0.2s;

  &:hover {
    box-shadow: ${(props) => props.theme.shadows.md};
    border-color: ${(props) => props.theme.colors.accent}80;
  }
`;

export const StatIcon = styled.div`
  padding: ${(props) => props.theme.spacing[3]};
  background: ${(props) => props.theme.colors.primary}1a;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StatContent = styled.div`
  flex: 1;
`;

export const StatValue = styled.div`
  font-size: ${(props) => props.theme.fontSizes["2xl"]};
  font-weight: 700;
  color: ${(props) => props.theme.colors.foreground};
  margin-bottom: ${(props) => props.theme.spacing[1]};
`;

export const StatLabel = styled.div`
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => props.theme.colors.mutedForeground};
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacing[8]};
  margin-bottom: ${(props) => props.theme.spacing[8]};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Section = styled.div`
  background: ${(props) => props.theme.colors.card};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing[6]};
`;

export const SectionHeader = styled.div`
  margin-bottom: ${(props) => props.theme.spacing[4]};
  padding-bottom: ${(props) => props.theme.spacing[4]};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

export const SectionTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.xl};
  font-weight: 600;
  margin: 0;
  color: ${(props) => props.theme.colors.foreground};
`;

export const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[4]};
`;

export const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[3]};
  padding: ${(props) => props.theme.spacing[3]};
  border-radius: ${(props) => props.theme.borderRadius.md};
  transition: all 0.2s;

  &:hover {
    background: ${(props) => props.theme.colors.muted};
  }
`;

export const ActivityIcon = styled.div`
  padding: ${(props) => props.theme.spacing[2]};
  background: ${(props) => props.theme.colors.secondary}1a;
  border-radius: ${(props) => props.theme.borderRadius.md};
  color: ${(props) => props.theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ActivityContent = styled.div`
  flex: 1;
`;

export const ActivityTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: 500;
  color: ${(props) => props.theme.colors.foreground};
  margin-bottom: ${(props) => props.theme.spacing[1]};
`;

export const ActivityMeta = styled.div`
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: ${(props) => props.theme.colors.mutedForeground};
`;

export const QuickActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[3]};
`;

export const ActionCard = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[3]};
  padding: ${(props) => props.theme.spacing[4]};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => props.theme.colors.accent}0a;
    border-color: ${(props) => props.theme.colors.accent};
    transform: translateY(-1px);
  }
`;

export const ActionIcon = styled.div`
  padding: ${(props) => props.theme.spacing[2]};
  background: ${(props) => props.theme.colors.accent}1a;
  border-radius: ${(props) => props.theme.borderRadius.md};
  color: ${(props) => props.theme.colors.accent};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ActionContent = styled.div`
  flex: 1;
`;

export const ActionTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: 500;
  color: ${(props) => props.theme.colors.foreground};
  margin-bottom: ${(props) => props.theme.spacing[1]};
`;

export const ActionDescription = styled.div`
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: ${(props) => props.theme.colors.mutedForeground};
`;

export const TipSection = styled.div`
  display: flex;
  align-items: start;
  gap: ${(props) => props.theme.spacing[4]};
  padding: ${(props) => props.theme.spacing[6]};
  background: ${(props) => props.theme.colors.primary}0a;
  border: 1px solid ${(props) => props.theme.colors.primary}33;
  border-radius: ${(props) => props.theme.borderRadius.lg};
`;

export const TipIcon = styled.div`
  padding: ${(props) => props.theme.spacing[2]};
  background: ${(props) => props.theme.colors.primary}1a;
  border-radius: ${(props) => props.theme.borderRadius.md};
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TipContent = styled.div`
  flex: 1;
`;

export const TipTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: 600;
  color: ${(props) => props.theme.colors.foreground};
  margin-bottom: ${(props) => props.theme.spacing[2]};
`;

export const TipText = styled.div`
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => props.theme.colors.mutedForeground};
  line-height: 1.5;
`;