"use client";

import { ThemeProvider } from "styled-components";
import { theme } from "../../../styled/thema";
import { sidebarMockNotes } from "../../../mocks/component/project/sidebarMock";
import * as S from "./SidebarStyled";
import {
  ChevronDown,
  ChevronRight,
  FileText,
  Briefcase,
  Target,
  BookOpen,
  Archive,
  Hash,
} from "lucide-react";
import { useGetRecentNotes } from "../../../hooks/note/useGetRecentNotes";
import { useSearchNotesByKeyword } from "../../../hooks/note/useSearchNotesByKeyword";

export function Sidebar({
  activeNote,
  onNoteSelect,
  methodology,
  workspaceId,
  workspaceTitle,
  searchKeyword,
}) {
  const { data: recentNotes = [] } = useGetRecentNotes({ workspaceId });
  const { data: searchResults = [] } = useSearchNotesByKeyword({
    workspaceId,
    keyword: searchKeyword,
  });

  const displayedNotes = searchKeyword ? searchResults : recentNotes;

  const renderNoteList = (notes) => {
    return (
      <S.NotesList>
        {notes.map((note) => (
          <S.NoteButton
            key={note.id}
            active={activeNote === note.id}
            onClick={() => onNoteSelect(note.id)}
          >
            <S.NoteContent>
              <S.NoteTitleRow>
                <FileText size={12} />
                <S.NoteTitle>{note.title}</S.NoteTitle>
              </S.NoteTitleRow>
              <S.TagsContainer>
                {(note.tags || []).map((tag) => (
                  <S.Tag key={tag}>{tag}</S.Tag>
                ))}
              </S.TagsContainer>
            </S.NoteContent>
          </S.NoteButton>
        ))}
      </S.NotesList>
    );
  };

  const getSections = () => {
    if (methodology === "zettelkasten") {
      return [
        {
          key: "zettelkasten",
          title: "Zettelkasten",
          icon: Hash,
          notes: displayedNotes,
        },
      ];
    } else {
      return [
        {
          key: "projects",
          title: "Projects",
          icon: Briefcase,
          notes: sidebarMockNotes.projects,
        },
        {
          key: "areas",
          title: "Areas",
          icon: Target,
          notes: sidebarMockNotes.areas,
        },
        {
          key: "resources",
          title: "Resources",
          icon: BookOpen,
          notes: sidebarMockNotes.resources,
        },
        {
          key: "archive",
          title: "Archive",
          icon: Archive,
          notes: sidebarMockNotes.archive,
        },
      ];
    }
  };

  const sections = getSections();

  return (
    <ThemeProvider theme={theme}>
      <S.SidebarContainer>
        <S.SidebarContent>
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <S.SectionContainer key={section.key}>
                <S.SectionHeader>
                  <S.SectionIcon>
                    <Icon size={16} />
                  </S.SectionIcon>
                  <S.SectionTitle>{workspaceTitle}</S.SectionTitle>
                  <S.SectionCount>{section.notes.length}</S.SectionCount>
                </S.SectionHeader>
                {renderNoteList(section.notes)}
              </S.SectionContainer>
            );
          })}
        </S.SidebarContent>
      </S.SidebarContainer>
    </ThemeProvider>
  );
}
