import styled from "styled-components";

export const GraphContainer = styled.div`
  flex: 1;
  position: relative;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Controls = styled.div`
  position: absolute;
  top: ${(props) => props.theme.spacing[4]};
  right: ${(props) => props.theme.spacing[4]};
  z-index: 10;
  display: flex;
  gap: ${(props) => props.theme.spacing[2]};
`;

export const ControlButton = styled.button`
  padding: ${(props) => props.theme.spacing[2]};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.foreground};
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

export const GraphCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

export const Legend = styled.div`
  position: absolute;
  bottom: ${(props) => props.theme.spacing[4]};
  left: ${(props) => props.theme.spacing[4]};
  background-color: ${(props) => props.theme.colors.card};
  padding: ${(props) => props.theme.spacing[4]};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.shadows.sm};
`;

export const LegendTitle = styled.h3`
  font-weight: 600;
  margin: 0 0 ${(props) => props.theme.spacing[2]} 0;
  font-size: ${(props) => props.theme.fontSizes.sm};
`;

export const LegendItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[2]};
  font-size: ${(props) => props.theme.fontSizes.xs};
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[2]};
`;

export const LegendIcon = styled.div`
  width: 1rem;
  height: 1rem;
  background-color: ${(props) => props.color || props.theme.colors.accent};
  border-radius: ${(props) => (props.round ? "50%" : "0")};
`;

export const LegendLine = styled.div`
  width: 1rem;
  height: 2px;
  background-color: ${(props) => props.theme.colors.border};
`;