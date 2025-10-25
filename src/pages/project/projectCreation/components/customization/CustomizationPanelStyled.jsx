import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  background: rgba(7, 10, 20, 0.7);
  backdrop-filter: blur(6px);
  z-index: 1200;
`;

export const ModalContent = styled.div`
  position: relative;
  width: min(720px, 100%);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.colors.card};
  border-radius: ${(props) => props.theme.borderRadius.xl};
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.shadows.xl || "0 32px 80px rgba(0, 0, 0, 0.32)"};
  overflow: hidden;
`;

export const ModalHeader = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${(props) => props.theme.spacing[4]};
  padding: ${(props) => props.theme.spacing[6]};
  background: linear-gradient(
      140deg,
      ${(props) => props.theme.colors.accent}15,
      transparent 60%
    ),
    ${(props) => props.theme.colors.card};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

export const ModalTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[3]};
  margin: 0;
  font-size: ${(props) => props.theme.fontSizes.xl};
  font-weight: 600;
`;

export const ModalSubtitle = styled.p`
  margin: ${(props) => props.theme.spacing[3]} 0 0 0;
  color: ${(props) => props.theme.colors.mutedForeground};
  font-size: ${(props) => props.theme.fontSizes.sm};
  line-height: 1.5;
`;

export const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.25rem;
  width: 2.25rem;
  border-radius: ${(props) => props.theme.borderRadius.round || "9999px"};
  border: none;
  background: transparent;
  color: ${(props) => props.theme.colors.mutedForeground};
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.colors.muted};
    color: ${(props) => props.theme.colors.foreground};
  }
`;

export const ModalMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 ${(props) => props.theme.spacing[6]};
  margin-top: ${(props) => props.theme.spacing[4]};
`;

export const CustomizationPoints = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[2]};
  padding: ${(props) => props.theme.spacing[2]}
    ${(props) => props.theme.spacing[3]};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  background: ${(props) => props.theme.colors.accent}1a;
  color: ${(props) => props.theme.colors.accent};
  font-weight: 600;
  font-size: ${(props) => props.theme.fontSizes.sm};
`;

export const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${(props) => props.theme.spacing[6]};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[8]};

  @media (max-width: 640px) {
    padding: ${(props) => props.theme.spacing[5]}
      ${(props) => props.theme.spacing[4]};
  }
`;

export const CustomizationGroups = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${(props) => props.theme.spacing[6]};

  @media (min-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const CustomizationGroup = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[4]};
`;

export const CustomizationGroupTitle = styled.h4`
  margin: 0;
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: 600;
`;

export const CustomizationOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[4]};
`;

export const CustomizationOption = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: ${(props) => props.theme.spacing[4]};
  padding: ${(props) => props.theme.spacing[5]};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  border: 1px solid
    ${(props) =>
      props.$active
        ? props.theme.colors.accent
        : props.theme.colors.border};
  background: ${(props) => props.theme.colors.muted}19;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  ${(props) =>
    props.$active &&
    `box-shadow: 0 0 0 2px ${props.theme.colors.accent}33;`}

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    align-items: center;
    text-align: center;
  }
`;

export const CustomizationPreview = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${(props) => props.theme.borderRadius.md};
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
`;

export const CustomizationInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[1]};
  justify-content: center;
`;

export const CustomizationName = styled.span`
  font-weight: 600;
`;

export const CustomizationCost = styled.span`
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => props.theme.colors.mutedForeground};
`;

export const CustomizationAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
