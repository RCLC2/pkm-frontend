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
            const methodology = project.methodology?.toLowerCase();
            const badgeLabel = (() => {
              if (!methodology) return "GENERAL";
              if (["zettelkasten", "zettel"].includes(methodology)) {
                return "ZETTEL";
              }
              if (["para", "code_para", "code/para"].includes(methodology)) {
                return "PARA";
              }
              return project.methodology.toUpperCase();
            })();

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
                  <B.BookModeBadge>{badgeLabel}</B.BookModeBadge>
                </B.BookSpine>
                <B.BookEdge $thickness={thickness} />
                <B.BookGlow />
                <B.BookIcon>
                  {template?.icon || <BookOpen size={20} />}
                </B.BookIcon>
                <B.BookHoverInfo>
                  <B.BookHoverHeader>
                    <B.BookHoverTitle>{project.title}</B.BookHoverTitle>
                    <B.BookHoverMode>{badgeLabel}</B.BookHoverMode>
                  </B.BookHoverHeader>
                  <B.BookHoverMeta>
                    <span>
                      <strong>{noteCount}</strong> {DEFAULT_NOTE_COUNT_LABEL}
                    </span>
                    <span>Last edited {formatDate(project.updatedAt)}</span>
                  </B.BookHoverMeta>
                  <B.BookHoverActions>
                    <span>Click to open</span>
                    <B.BookActionButton
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onDeleteProject(project.id);
                      }}
                    >
                      <Trash2 size={14} />
                    </B.BookActionButton>
                  </B.BookHoverActions>
                </B.BookHoverInfo>
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
