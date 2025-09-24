import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.foreground};
  font-family: ${(props) => props.theme.fonts.sans};
`;

export const SidebarContainer = styled.div`
  width: 20rem;
  border-right: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.sidebar};
`;

export const SidebarHeader = styled.div`
  padding: ${(props) => props.theme.spacing[4]};
  border-bottom: 1px solid ${(props) => props.theme.colors.sidebarBorder};
`;

export const SidebarHeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spacing[4]};
`;

export const SidebarTitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[2]};
`;

export const BackButton = styled.button`
  height: 2rem;
  width: 2rem;
  padding: 0;
  border: none;
  background: transparent;
  color: ${(props) => props.theme.colors.sidebarForeground};
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

export const SidebarTitle = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.xl};
  font-weight: bold;
  color: ${(props) => props.theme.colors.sidebarForeground};
  margin: 0;
`;

export const AddButton = styled.button`
  height: 2rem;
  width: 2rem;
  padding: 0;
  border: none;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.primaryForeground};
  border-radius: ${(props) => props.theme.borderRadius.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary}e6;
  }
`;

export const MethodologySelector = styled.div`
  margin-bottom: ${(props) => props.theme.spacing[4]};
  position: relative;
`;

export const Select = styled.select`
  width: 100%;
  padding: ${(props) => `${props.theme.spacing[2]} ${props.theme.spacing[3]}`};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.foreground};
  font-size: ${(props) => props.theme.fontSizes.sm};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.ring};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.ring}33;
  }
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const MainHeader = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding: ${(props) => props.theme.spacing[4]};
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TabsContainer = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.colors.muted};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing[1]};
  width: fit-content;
`;

export const TabButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[2]};
  padding: ${(props) => `${props.theme.spacing[2]} ${props.theme.spacing[3]}`};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.md};
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

export const MethodologyIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[2]};
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => props.theme.colors.mutedForeground};
`;

export const ContentArea = styled.div`
  flex: 1;
  overflow: hidden;
`;