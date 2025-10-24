import styled from "styled-components";

export const GraphContainer = styled.div`
  position: relative;
  flex: 1;
  height: 100%;
  background-color: ${(props) => props.theme.colors.background};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  border: 1px solid ${(props) => props.theme.colors.border};
  overflow: hidden;
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
  background-color: ${(props) => `${props.theme.colors.background}e6`};
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
  display: block;

  &:active {
    cursor: grabbing;
  }
`;

export const Hud = styled.div`
  position: absolute;
  top: ${(props) => props.theme.spacing[4]};
  left: ${(props) => props.theme.spacing[4]};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[4]};
  z-index: 10;
`;

export const MetricsPanel = styled.div`
  display: inline-flex;
  gap: ${(props) => props.theme.spacing[3]};
  padding: ${(props) => props.theme.spacing[3]}
    ${(props) => props.theme.spacing[4]};
  background-color: ${(props) => `${props.theme.colors.sidebar}cc`};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.shadows.sm};
  backdrop-filter: blur(10px);
`;

export const MetricItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[1]};
  min-width: 80px;
`;

export const MetricLabel = styled.span`
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: ${(props) => props.theme.colors.mutedForeground};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

export const MetricValue = styled.span`
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: 600;
`;

export const Legend = styled.div`
  position: absolute;
  bottom: ${(props) => props.theme.spacing[4]};
  left: ${(props) => props.theme.spacing[4]};
  background-color: ${(props) => `${props.theme.colors.sidebar}d9`};
  padding: ${(props) => props.theme.spacing[4]};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.shadows.sm};
  backdrop-filter: blur(12px);
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
  border-radius: ${(props) =>
    props.round ? "50%" : props.theme.borderRadius.sm};
  box-shadow: 0 0 0 1px ${(props) => props.theme.colors.border};
`;

export const LegendLine = styled.div`
  width: 1rem;
  height: 2px;
  background-color: ${(props) => props.theme.colors.border};
`;

export const SelectionPanel = styled.div`
  position: absolute;
  bottom: ${(props) => props.theme.spacing[4]};
  right: ${(props) => props.theme.spacing[4]};
  min-width: 220px;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[2]};
  padding: ${(props) => props.theme.spacing[4]};
  background-color: ${(props) => `${props.theme.colors.sidebar}cc`};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.shadows.md};
  backdrop-filter: blur(12px);
  z-index: 10;

  @media (max-width: 960px) {
    display: none;
  }
`;

export const SelectionTitle = styled.h3`
  margin: 0;
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${(props) => props.theme.colors.mutedForeground};
`;

export const SelectionName = styled.span`
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: 600;
  color: ${(props) => props.theme.colors.foreground};
`;

export const SelectionMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[1]};
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: ${(props) => props.theme.colors.mutedForeground};
`;

export const SelectionTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing[1]};
`;

export const SelectionTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[1]};
  padding: ${(props) => props.theme.spacing[1]}
    ${(props) => props.theme.spacing[2]};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  background-color: ${(props) => props.theme.colors.muted};
  color: ${(props) => props.theme.colors.mutedForeground};
  font-size: ${(props) => props.theme.fontSizes.xs};
`;

export const Tooltip = styled.div`
  position: absolute;
  pointer-events: none;
  padding: ${(props) => props.theme.spacing[2]}
    ${(props) => props.theme.spacing[3]};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background-color: ${(props) => `${props.theme.colors.sidebar}f0`};
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.shadows.sm};
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: ${(props) => props.theme.colors.foreground};
  transform: translate(-50%, -120%);
  white-space: nowrap;
  z-index: 11;
`;

export const SelectionHint = styled.span`
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: ${(props) => props.theme.colors.mutedForeground};
  line-height: 1.5;
`;
