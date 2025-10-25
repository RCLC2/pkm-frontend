import { useEffect } from "react";
import { Paintbrush, Star, X } from "lucide-react";
import { Button } from "../../ProjectCreationStyled";
import * as C from "./CustomizationPanelStyled";

const CUSTOMIZATION_SECTIONS = [
  {
    key: "shelf",
    title: "Bookshelf Finish",
  },
  {
    key: "background",
    title: "Background Ambience",
  },
];

export const CustomizationPanel = ({
  isOpen,
  onClose,
  points,
  bookshelfOptions,
  bookshelfTheme,
  unlockedCustomizations,
  onApplyCustomization,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <C.ModalOverlay onClick={onClose}>
      <C.ModalContent
        role="dialog"
        aria-modal="true"
        aria-label="책장 꾸미기"
        onClick={(event) => event.stopPropagation()}
      >
        <C.ModalHeader>
          <div>
            <C.ModalTitle>
              <Paintbrush size={20} />책장 꾸미기
            </C.ModalTitle>
            <C.ModalSubtitle>
              포인트를 사용해 책장의 분위기와 배경을 원하는 스타일로 꾸며보세요.
            </C.ModalSubtitle>
          </div>
          <C.CloseButton type="button" onClick={onClose} aria-label="닫기">
            <X size={16} />
          </C.CloseButton>
        </C.ModalHeader>

        <C.ModalMeta>
          <C.CustomizationPoints>
            <Star size={16} /> {points} pts available
          </C.CustomizationPoints>
        </C.ModalMeta>

        <C.ScrollArea>
          <C.CustomizationGroups>
            {CUSTOMIZATION_SECTIONS.map(({ key, title }) => (
              <C.CustomizationGroup key={key}>
                <C.CustomizationGroupTitle>{title}</C.CustomizationGroupTitle>
                <C.CustomizationOptions>
                  {bookshelfOptions[key].map((option) => {
                    const isActive = bookshelfTheme[key] === option.id;
                    const isUnlocked = unlockedCustomizations[key].includes(option.id);
                    const canAfford = points >= option.cost;

                    return (
                      <C.CustomizationOption key={option.id} $active={isActive}>
                        <C.CustomizationPreview
                          style={{ background: option.preview }}
                        />
                        <C.CustomizationInfo>
                          <C.CustomizationName>{option.name}</C.CustomizationName>
                          <C.CustomizationCost>
                            {option.cost === 0 ? "Free" : `${option.cost} pts`}
                          </C.CustomizationCost>
                        </C.CustomizationInfo>
                        <C.CustomizationAction>
                          <Button
                            type="button"
                            variant={isActive ? "primary" : "outline"}
                            disabled={
                              isActive ||
                              (!isUnlocked && option.cost > 0 && !canAfford)
                            }
                            onClick={() => onApplyCustomization(key, option)}
                          >
                            {isActive
                              ? "Equipped"
                              : isUnlocked
                              ? "Equip"
                              : option.cost === 0
                              ? "Equip"
                              : canAfford
                              ? `Unlock (-${option.cost})`
                              : "Need points"}
                          </Button>
                        </C.CustomizationAction>
                      </C.CustomizationOption>
                    );
                  })}
                </C.CustomizationOptions>
                  </C.CustomizationGroup>
                ))}
          </C.CustomizationGroups>
        </C.ScrollArea>
      </C.ModalContent>
    </C.ModalOverlay>
  );
};
