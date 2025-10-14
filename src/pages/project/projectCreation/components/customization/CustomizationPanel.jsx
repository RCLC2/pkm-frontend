import { Paintbrush, Star } from "lucide-react";
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
  points,
  bookshelfOptions,
  bookshelfTheme,
  unlockedCustomizations,
  onApplyCustomization,
}) => {
  return (
    <C.CustomizationSection>
      <C.CustomizationHeader>
        <div>
          <C.CustomizationTitle>
            <Paintbrush size={18} />
            Style your shelf
          </C.CustomizationTitle>
          <C.CustomizationDescription>
            Unlock new bookshelf finishes and ambient backgrounds with points
            earned from building your knowledge base.
          </C.CustomizationDescription>
        </div>
        <C.CustomizationPoints>
          <Star size={16} /> {points} pts available
        </C.CustomizationPoints>
      </C.CustomizationHeader>

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
    </C.CustomizationSection>
  );
};
