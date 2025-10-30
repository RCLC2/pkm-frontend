import { BookOpen, Trash2 } from "lucide-react";
import { Button } from "../../ProjectCreationStyled";
import * as B from "./BookshelfSectionStyled";

const DEFAULT_NOTE_COUNT_LABEL = "docs";

export const BookshelfSection = ({
  projects,
  templates,
  bookshelfTheme,
  getPreviewStyle,
  getBookThickness,
  bookColors,
  formatDate,
  onOpenProject,
  onDeleteProject,
}) => {
  return (
    <>
      <B.BookshelfScene
        $background={getPreviewStyle("background", bookshelfTheme.background)}
      >
        <B.BookshelfShelf
          $shelf={getPreviewStyle("shelf", bookshelfTheme.shelf)}
        >
          {projects.map((project, index) => {
            const noteCount = Math.max(0, Number(project.noteCount) || 0);
            const thickness = getBookThickness(noteCount);
            const height = 160 + Math.min(80, noteCount * 5);
            const template = templates.find(
              (item) => item.id === project.templateId
            );
            const badgeLabel =
              project.methodology === "zettelkasten"
                ? "Zettelkasten"
                : "CODE/PARA";

            return (
              <B.Book
                key={project.id}
                $thickness={thickness}
                $height={height}
                $bookColor={bookColors[index % bookColors.length]}
                onClick={() => onOpenProject(project)}
              >
                <B.BookSpine>
                  <B.BookTitle>{project.title}</B.BookTitle>
                  <B.BookBadge>
                    {noteCount} {DEFAULT_NOTE_COUNT_LABEL}
                  </B.BookBadge>
                  <B.BookBadgeSecondary>{badgeLabel}</B.BookBadgeSecondary>
                </B.BookSpine>
                <B.BookEdge $thickness={thickness} />
                <B.BookFooter>
                  <span>Last edited {formatDate(project.updatedAt)}</span>
                  <B.BookFooterButton
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onDeleteProject(project.id);
                    }}
                  >
                    <Trash2 size={14} />
                  </B.BookFooterButton>
                </B.BookFooter>
                <B.BookGlow />
                <B.BookIcon>
                  {template?.icon || <BookOpen size={20} />}
                </B.BookIcon>
              </B.Book>
            );
          })}
        </B.BookshelfShelf>
        <B.BookshelfOverlay />
      </B.BookshelfScene>

      <B.ProjectInsightGrid>
        {projects.map((project) => {
          const noteCount = Math.max(0, Number(project.noteCount) || 0);

          return (
            <B.ProjectInsightCard key={`${project.id}-insight`}>
              <B.ProjectInsightTitle>{project.title}</B.ProjectInsightTitle>
              <B.ProjectInsightMeta>
                <span>
                  <strong>{noteCount}</strong> linked {DEFAULT_NOTE_COUNT_LABEL}
                </span>
                <span>{formatDate(project.updatedAt)}</span>
              </B.ProjectInsightMeta>
              <B.ProjectInsightActions>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenProject(project)}
                >
                  Continue
                </Button>
              </B.ProjectInsightActions>
            </B.ProjectInsightCard>
          );
        })}
      </B.ProjectInsightGrid>
    </>
  );
};
