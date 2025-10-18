"use client";

import { useOutletContext } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../styled/thema";
import { sidebarMockNotes } from "../../../mocks/component/project/sidebarMock";
import * as S from "./ConversionPageStyled";
import {
  ArrowRightLeft,
  ArrowLeftRight,
  Info,
  CheckCircle2,
  Briefcase,
  Target,
  BookOpen,
  Archive,
  ListChecks,
} from "lucide-react";

const conversionModes = [
  {
    id: "zettel-to-para",
    label: "Zettelkasten → PARA",
    icon: ArrowRightLeft,
    description: "Group atomic notes into action-focused PARA buckets.",
  },
  {
    id: "para-to-zettel",
    label: "PARA → Zettelkasten",
    icon: ArrowLeftRight,
    description: "Distill PARA projects back into linked atomic notes.",
  },
];

const paraCategories = [
  {
    id: "projects",
    label: "Projects",
    description: "Short-term efforts with a clear outcome.",
    icon: Briefcase,
  },
  {
    id: "areas",
    label: "Areas",
    description: "Ongoing responsibilities that need standards.",
    icon: Target,
  },
  {
    id: "resources",
    label: "Resources",
    description: "Topics or assets you reference when needed.",
    icon: BookOpen,
  },
  {
    id: "archive",
    label: "Archive",
    description: "Inactive material kept for future reference.",
    icon: Archive,
  },
];

export function ConversionPage() {
  const { methodology } = useOutletContext();
  const [mode, setMode] = useState("zettel-to-para");
  const zettelkastenNotes = sidebarMockNotes.zettelkasten;
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [assignments, setAssignments] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [statusVariant, setStatusVariant] = useState("warning");

  useEffect(() => {
    if (!activeNoteId && zettelkastenNotes.length > 0) {
      setActiveNoteId(zettelkastenNotes[0].id);
    }
  }, [activeNoteId, zettelkastenNotes]);

  const activeNote = useMemo(
    () => zettelkastenNotes.find((note) => note.id === activeNoteId) || null,
    [activeNoteId, zettelkastenNotes]
  );

  const categoryLabelMap = useMemo(() => {
    return paraCategories.reduce((acc, category) => {
      acc[category.id] = category.label;
      return acc;
    }, {});
  }, []);

  const groupedAssignments = useMemo(() => {
    const base = {
      projects: [],
      areas: [],
      resources: [],
      archive: [],
    };

    Object.entries(assignments).forEach(([noteId, categoryId]) => {
      const target = zettelkastenNotes.find((note) => note.id === noteId);
      if (target && base[categoryId]) {
        base[categoryId].push(target);
      }
    });

    return base;
  }, [assignments, zettelkastenNotes]);

  const unassignedNotes = useMemo(
    () =>
      zettelkastenNotes.filter((note) => !assignments[note.id]),
    [assignments, zettelkastenNotes]
  );

  const handleSelectNote = (noteId) => {
    setActiveNoteId(noteId);
    setStatusMessage("");
  };

  const handleAssignCategory = (categoryId) => {
    if (!activeNoteId) return;

    setAssignments((prev) => {
      const updated = { ...prev };
      if (updated[activeNoteId] === categoryId) {
        delete updated[activeNoteId];
      } else {
        updated[activeNoteId] = categoryId;
      }
      return updated;
    });
    setStatusMessage("");
  };

  const handleRemoveAssignment = (noteId) => {
    setAssignments((prev) => {
      const updated = { ...prev };
      delete updated[noteId];
      return updated;
    });
    setActiveNoteId(noteId);
    setStatusMessage("");
  };

  const handleFinalizeConversion = () => {
    if (zettelkastenNotes.length === 0) {
      setStatusVariant("warning");
      setStatusMessage("No Zettelkasten notes available to convert.");
      return;
    }

    if (unassignedNotes.length > 0) {
      setStatusVariant("warning");
      const remaining = unassignedNotes.length;
      const noun = remaining === 1 ? "note" : "notes";
      setStatusMessage(`Assign ${remaining} more ${noun} to complete the mapping.`);
      return;
    }

    setStatusVariant("success");
    setStatusMessage(
      "All notes assigned. PARA workspace is ready for export or syncing."
    );
  };

  const resetAssignments = () => {
    setAssignments({});
    setStatusMessage("");
  };

  const renderZettelkastenToPara = () => {
    if (zettelkastenNotes.length === 0) {
      return <S.EmptyState>No Zettelkasten notes found.</S.EmptyState>;
    }

    const assignedCount = zettelkastenNotes.length - unassignedNotes.length;

    return (
      <>
        <S.InfoBanner>
          <S.BannerIconSlot>
            <Info size={18} />
          </S.BannerIconSlot>
          <S.BannerText>
            <S.BannerTitle>Convert atomic notes into PARA structure</S.BannerTitle>
            <S.BannerDescription>
              Select a Zettelkasten note, then click one of the PARA quadrants to
              place it. Each quadrant represents a workspace so you can review
              and adjust before committing the conversion.
            </S.BannerDescription>
          </S.BannerText>
        </S.InfoBanner>

        <S.ZettelParaLayout>
          <S.NoteColumn>
            <S.NoteColumnHeader>
              <S.NoteColumnTitle>Zettelkasten Notes</S.NoteColumnTitle>
              <S.NoteCount>
                {assignedCount}/{zettelkastenNotes.length} assigned
              </S.NoteCount>
            </S.NoteColumnHeader>

            <S.NoteList>
              {zettelkastenNotes.map((note) => {
                const assignedCategory = assignments[note.id];
                return (
                  <S.NoteItem
                    key={note.id}
                    onClick={() => handleSelectNote(note.id)}
                    $active={activeNoteId === note.id}
                    $assigned={Boolean(assignedCategory)}
                  >
                    <S.NoteItemHeader>
                      <S.NoteItemTitle>{note.title}</S.NoteItemTitle>
                      {assignedCategory && (
                        <S.NoteAssignmentBadge>
                          {categoryLabelMap[assignedCategory]}
                        </S.NoteAssignmentBadge>
                      )}
                    </S.NoteItemHeader>
                    <S.NoteTags>
                      {note.tags.map((tag) => (
                        <S.Tag key={`${note.id}-${tag}`}>{tag}</S.Tag>
                      ))}
                    </S.NoteTags>
                  </S.NoteItem>
                );
              })}
            </S.NoteList>

            {activeNote ? (
              <S.NoteDetails>
                <S.NoteDetailsHeader>
                  <S.NoteDetailsLabel>Currently assigning</S.NoteDetailsLabel>
                  <S.NoteDetailsTitle>{activeNote.title}</S.NoteDetailsTitle>
                </S.NoteDetailsHeader>
                <S.NoteDetailsTags>
                  {activeNote.tags.map((tag) => (
                    <S.Tag key={`active-${tag}`}>{tag}</S.Tag>
                  ))}
                </S.NoteDetailsTags>
                <S.HintText>
                  Tip: Click one of the PARA quadrants to place this note. Click
                  the same quadrant again to unassign.
                </S.HintText>
              </S.NoteDetails>
            ) : (
              <S.NoteDetails>
                <S.NoteDetailsHeader>
                  <S.NoteDetailsLabel>Selection</S.NoteDetailsLabel>
                  <S.NoteDetailsTitle>No note selected</S.NoteDetailsTitle>
                </S.NoteDetailsHeader>
                <S.HintText>
                  Pick a note from the list to start the assignment process.
                </S.HintText>
              </S.NoteDetails>
            )}
          </S.NoteColumn>

          <S.QuadrantSection>
            <S.QuadrantGrid>
              {paraCategories.map((category) => {
                const Icon = category.icon;
                const assignedNotes = groupedAssignments[category.id];
                const isTarget = assignments[activeNoteId || ""] === category.id;

                return (
                  <S.Quadrant
                    key={category.id}
                    onClick={() => handleAssignCategory(category.id)}
                    $isTarget={isTarget}
                    title={`Assign to ${category.label}`}
                  >
                    <S.QuadrantHeader>
                      <S.QuadrantTitle>
                        <Icon size={18} />
                        {category.label}
                      </S.QuadrantTitle>
                      <S.QuadrantDescription>
                        {category.description}
                      </S.QuadrantDescription>
                    </S.QuadrantHeader>

                    <S.Assignments>
                      {assignedNotes.length === 0 ? (
                        <S.HintText>
                          No notes assigned yet. Click to send the active note
                          here.
                        </S.HintText>
                      ) : (
                        assignedNotes.map((note) => (
                          <S.AssignedNote key={`${category.id}-${note.id}`}>
                            <S.AssignedNoteHeader>
                              <S.AssignedTitle>{note.title}</S.AssignedTitle>
                              <S.RemoveAssignment
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleRemoveAssignment(note.id);
                                }}
                                aria-label={`Remove ${note.title} from ${category.label}`}
                              >
                                remove
                              </S.RemoveAssignment>
                            </S.AssignedNoteHeader>
                            <S.AssignedTags>
                              {note.tags.map((tag) => (
                                <S.Tag key={`${note.id}-${category.id}-${tag}`}>
                                  {tag}
                                </S.Tag>
                              ))}
                            </S.AssignedTags>
                          </S.AssignedNote>
                        ))
                      )}
                    </S.Assignments>
                  </S.Quadrant>
                );
              })}
            </S.QuadrantGrid>

            <S.ActionsRow>
              <S.FinalizeButton onClick={handleFinalizeConversion}>
                <ListChecks size={16} />
                Finalize PARA Mapping
              </S.FinalizeButton>
              <S.UnassignedInfo>
                {unassignedNotes.length === 0
                  ? "All notes assigned"
                  : `${unassignedNotes.length} remaining to assign`}
              </S.UnassignedInfo>
            </S.ActionsRow>
            <S.HintText>
              Need a reset? {" "}
              <S.ResetButton onClick={resetAssignments}>
                Clear assignments
              </S.ResetButton>
            </S.HintText>

            {statusMessage && (
              <S.StatusMessage $variant={statusVariant}>
                {statusVariant === "success" ? (
                  <CheckCircle2 size={16} />
                ) : (
                  <Info size={16} />
                )}
                {statusMessage}
              </S.StatusMessage>
            )}
          </S.QuadrantSection>
        </S.ZettelParaLayout>
      </>
    );
  };

  const renderParaToZettelkasten = () => {
    return (
      <S.PlaceholderCard>
        <S.PlaceholderTitle>PARA → Zettelkasten</S.PlaceholderTitle>
        <S.PlaceholderText>
          We are designing guided flows that break PARA projects into atomic,
          linked notes. This workspace will let you preview project material,
          pick the narrative thread, and stage backlinks before publishing.
        </S.PlaceholderText>
        <S.PlaceholderText>
          Stay tuned—this feature is next on the roadmap once the PARA export
          workflow is validated.
        </S.PlaceholderText>
      </S.PlaceholderCard>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <S.ConversionContainer>
        <S.Header>
          <S.Title>Methodology Conversion</S.Title>
          <S.Subtitle>
            Align your knowledge base by moving between Zettelkasten and PARA
            modes. You are currently working in {methodology} context.
          </S.Subtitle>
          <S.ModeToggle>
            {conversionModes.map((modeOption) => {
              const Icon = modeOption.icon;
              return (
                <S.ModeButton
                  key={modeOption.id}
                  onClick={() => {
                    setMode(modeOption.id);
                    setStatusMessage("");
                  }}
                  $active={mode === modeOption.id}
                >
                  <Icon size={16} />
                  {modeOption.label}
                </S.ModeButton>
              );
            })}
          </S.ModeToggle>
        </S.Header>

        <S.Content>
          {mode === "zettel-to-para"
            ? renderZettelkastenToPara()
            : renderParaToZettelkasten()}
        </S.Content>
      </S.ConversionContainer>
    </ThemeProvider>
  );
}
