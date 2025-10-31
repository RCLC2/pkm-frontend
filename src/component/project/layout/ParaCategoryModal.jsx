import React, { useState } from "react";
import styled from "styled-components";
import { X, Briefcase, Target, BookOpen, Archive } from "lucide-react";

const ParaCategoryModal = ({ isOpen, onClose, onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: "PROJECTS",
      label: "Projects",
      icon: Briefcase,
      description: "Short-term efforts with a specific goal",
      color: "#3b82f6",
    },
    {
      id: "AREAS",
      label: "Areas",
      icon: Target,
      description: "Long-term responsibilities to maintain",
      color: "#10b981",
    },
    {
      id: "RESOURCES",
      label: "Resources",
      icon: BookOpen,
      description: "Topics of ongoing interest",
      color: "#a855f7",
    },
    {
      id: "ARCHIVE",
      label: "Archive",
      icon: Archive,
      description: "Inactive items from other categories",
      color: "#6b7280",
    },
  ];

  const handleConfirm = () => {
    if (selectedCategory) {
      onSelect(selectedCategory);
      setSelectedCategory(null);
    }
  };

  const handleClose = () => {
    setSelectedCategory(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Backdrop onClick={handleClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Select PARA Category</Title>
          <CloseButton onClick={handleClose}>
            <X size={24} />
          </CloseButton>
        </Header>

        <CategoryGrid>
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;

            return (
              <CategoryCard
                key={category.id}
                $isSelected={isSelected}
                onClick={() => setSelectedCategory(category.id)}
              >
                <IconWrapper $color={category.color}>
                  <Icon size={24} />
                </IconWrapper>
                <CategoryContent>
                  <CategoryLabel $isSelected={isSelected}>
                    {category.label}
                  </CategoryLabel>
                  <CategoryDescription $isSelected={isSelected}>
                    {category.description}
                  </CategoryDescription>
                </CategoryContent>
              </CategoryCard>
            );
          })}
        </CategoryGrid>

        <Footer>
          <CancelButton onClick={handleClose}>Cancel</CancelButton>
          <ConfirmButton onClick={handleConfirm} disabled={!selectedCategory}>
            Create Note
          </ConfirmButton>
        </Footer>
      </ModalContainer>
    </Backdrop>
  );
};

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  padding: 24px;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const CategoryCard = styled.button`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.cardHover : theme.colors.card};
  border: 2px solid
    ${({ theme, $isSelected }) =>
      $isSelected ? theme.colors.primary : theme.colors.border};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.cardHover};
  }
`;

const IconWrapper = styled.div`
  background-color: ${({ $color }) => $color};
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const CategoryContent = styled.div`
  flex: 1;
`;

const CategoryLabel = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.textSecondary : theme.colors.accentForeground};
  margin-bottom: 4px;
`;

const CategoryDescription = styled.p`
  font-size: 14px;
  color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.textSecondary : theme.colors.accentForeground};
  line-height: 1.4;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
`;

const CancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.accentForeground};

  &:hover {
    background-color: ${({ theme }) => theme.colors.cardHover};
  }
`;

const ConfirmButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: black;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.textSecondary};
    cursor: not-allowed;
  }
`;

export default ParaCategoryModal;
