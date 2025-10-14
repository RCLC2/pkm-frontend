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
            const thickness = getBookThickness(project.noteCount);
            const height = 160 + Math.min(80, (project.noteCount || 0) * 5);
            const template = templates.find((item) => item.id === project.templateId);
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
                  <B.BookTitle>{project.name}</B.BookTitle>
                  <B.BookBadge>
                    {project.noteCount} {DEFAULT_NOTE_COUNT_LABEL}
                  </B.BookBadge>
                  <B.BookBadgeSecondary>{badgeLabel}</B.BookBadgeSecondary>
                </B.BookSpine>
                <B.BookEdge />
                <B.BookFooter>
                  <span>Last edited {formatDate(project.lastModified)}</span>
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
                <B.BookIcon>{template?.icon || <BookOpen size={20} />}</B.BookIcon>
              </B.Book>
            );
          })}
        </B.BookshelfShelf>
        <B.BookshelfOverlay />
      </B.BookshelfScene>

      <B.ProjectInsightGrid>
        {projects.map((project) => (
          <B.ProjectInsightCard key={`${project.id}-insight`}>
            <B.ProjectInsightTitle>{project.name}</B.ProjectInsightTitle>
            <B.ProjectInsightMeta>
              <span>
                <strong>{project.noteCount}</strong> linked {DEFAULT_NOTE_COUNT_LABEL}
              </span>
              <span>{formatDate(project.lastModified)}</span>
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
        ))}
      </B.ProjectInsightGrid>
    </>
  );
};
