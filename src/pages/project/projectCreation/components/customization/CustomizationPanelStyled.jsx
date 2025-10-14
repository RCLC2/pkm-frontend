import styled from "styled-components";

export const CustomizationSection = styled.div`
  margin-top: ${(props) => props.theme.spacing[12]};
  padding: ${(props) => props.theme.spacing[8]};
  border-radius: ${(props) => props.theme.borderRadius.xl};
  background: ${(props) => props.theme.colors.card};
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.shadows.lg};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[8]};
`;

export const CustomizationHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[4]};

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const CustomizationTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[2]};
  font-size: ${(props) => props.theme.fontSizes.xl};
  margin: 0;
`;

export const CustomizationDescription = styled.p`
  margin: ${(props) => props.theme.spacing[2]} 0 0 0;
  color: ${(props) => props.theme.colors.mutedForeground};
`;

export const CustomizationPoints = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[2]};
  padding: ${(props) => props.theme.spacing[2]}
    ${(props) => props.theme.spacing[3]};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  background: ${(props) => props.theme.colors.accent}1a;
  color: ${(props) => props.theme.colors.accent};
  font-weight: 600;
`;

export const CustomizationGroups = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${(props) => props.theme.spacing[8]};

  @media (min-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const CustomizationGroup = styled.div`
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
  padding: ${(props) => props.theme.spacing[4]};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  border: 1px solid
    ${(props) =>
      props.$active
        ? props.theme.colors.accent
        : props.theme.colors.border};
  background: ${(props) => props.theme.colors.muted}1a;

  ${(props) =>
    props.$active &&
    `box-shadow: 0 0 0 2px ${props.theme.colors.accent}33;`}
`;

export const CustomizationPreview = styled.div`
  width: 56px;
  height: 56px;
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
`;
