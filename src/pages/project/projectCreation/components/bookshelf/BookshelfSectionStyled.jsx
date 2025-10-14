import styled from "styled-components";

export const BookshelfScene = styled.div`
  position: relative;
  padding: ${(props) => props.theme.spacing[10]};
  margin-bottom: ${(props) => props.theme.spacing[12]};
  border-radius: ${(props) => props.theme.borderRadius.xl};
  background: ${(props) =>
    props.$background ||
    "radial-gradient(circle at 20% 20%, #f0f4ff, #d6dcff)"};
  box-shadow: inset 0 0 0 1px ${(props) => props.theme.colors.border};
`;

export const BookshelfShelf = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  gap: ${(props) => props.theme.spacing[6]};
  min-height: 220px;
  padding: ${(props) => props.theme.spacing[4]}
    ${(props) => props.theme.spacing[8]};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  background: ${(props) =>
    props.$shelf || "linear-gradient(135deg, #be9460, #7e5433)"};
  box-shadow: inset 0 12px 35px rgba(0, 0, 0, 0.15);

  &::after {
    content: "";
    position: absolute;
    inset: 12px;
    border-radius: ${(props) => props.theme.borderRadius.md};
    border: 1px solid rgba(255, 255, 255, 0.1);
    pointer-events: none;
  }
`;

export const BookshelfOverlay = styled.div`
  position: absolute;
  left: ${(props) => props.theme.spacing[6]};
  right: ${(props) => props.theme.spacing[6]};
  bottom: ${(props) => props.theme.spacing[4]};
  height: 24px;
  background: rgba(14, 14, 20, 0.2);
  border-radius: ${(props) => props.theme.borderRadius.lg};
  filter: blur(24px);
`;

export const Book = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => `${props.$thickness || 32}px`};
  height: ${(props) => `${props.$height || 180}px`};
  padding: ${(props) => props.theme.spacing[4]};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  background: linear-gradient(
    135deg,
    ${(props) => props.$bookColor || "#6C63FF"},
    ${(props) => props.$bookColor || "#6C63FF"}cc
  );
  cursor: pointer;
  box-shadow: 0 18px 30px rgba(0, 0, 0, 0.25);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  overflow: visible;

  &:hover {
    transform: translateY(-8px) rotate(-1deg);
    box-shadow: 0 28px 40px rgba(0, 0, 0, 0.35);
  }
`;

export const BookSpine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.theme.spacing[2]};
  color: #ffffff;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  text-align: center;
  font-weight: 600;
`;

export const BookTitle = styled.span`
  font-size: ${(props) => props.theme.fontSizes.sm};
  letter-spacing: 0.08em;
`;

export const BookBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing[1]}
    ${(props) => props.theme.spacing[2]};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  background: rgba(255, 255, 255, 0.2);
  font-size: ${(props) => props.theme.fontSizes.xs};
  font-weight: 500;
`;

export const BookBadgeSecondary = styled(BookBadge)`
  background: rgba(0, 0, 0, 0.25);
`;

export const BookEdge = styled.div`
  position: absolute;
  right: -8px;
  top: 8%;
  bottom: 8%;
  width: 14px;
  background: repeating-linear-gradient(
    90deg,
    #f5f5f0,
    #f5f5f0 3px,
    #e8e8e3 3px,
    #e8e8e3 6px
  );
  border-radius: ${(props) => props.theme.borderRadius.sm};
  box-shadow: inset -2px 0 4px rgba(0, 0, 0, 0.2);
`;

export const BookFooter = styled.div`
  position: absolute;
  bottom: ${(props) => props.theme.spacing[3]};
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: rgba(255, 255, 255, 0.85);
`;

export const BookFooterButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 9999px;
  border: none;
  background: rgba(255, 255, 255, 0.18);
  color: #ffffff;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.32);
  }
`;

export const BookGlow = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.08),
    rgba(255, 255, 255, 0)
  );
  pointer-events: none;
`;

export const BookIcon = styled.div`
  position: absolute;
  top: ${(props) => props.theme.spacing[3]};
  left: 50%;
  transform: translate(-50%, -50%) rotate(-90deg);
  color: rgba(255, 255, 255, 0.9);
`;

export const ProjectInsightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: ${(props) => props.theme.spacing[6]};
`;

export const ProjectInsightCard = styled.div`
  position: relative;
  padding: ${(props) => props.theme.spacing[6]};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  background: ${(props) => props.theme.colors.card};
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.shadows.md};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[4]};
`;

export const ProjectInsightTitle = styled.h3`
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: 600;
  margin: 0;
`;

export const ProjectInsightMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[1]};
  color: ${(props) => props.theme.colors.mutedForeground};

  strong {
    color: ${(props) => props.theme.colors.foreground};
  }
`;

export const ProjectInsightActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;
