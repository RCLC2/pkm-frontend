"use client";

import { useState } from "react";
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
  searchKeyword,
}) {
  const getInitialSections = () => {
    return methodology === "zettelkasten"
      ? ["zettelkasten"]
      : ["projects", "areas"];
  };

  const [openSections, setOpenSections] = useState(getInitialSections());

  const toggleSection = (section) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const { data: recentNotes = [] } = useGetRecentNotes({ workspaceId });
  const { data: searchResults = [] } = useSearchNotesByKeyword({
    workspaceId,
    keyword: searchKeyword,
  });

  const displayedNotes = searchKeyword ? searchResults : recentNotes;

  const renderNoteList = (notes) => (
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
              {note.tags.map((tag) => (
                <S.Tag key={tag}>{tag}</S.Tag>
              ))}
            </S.TagsContainer>
          </S.NoteContent>
        </S.NoteButton>
      ))}
    </S.NotesList>
  );

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
          <S.MethodologyInfo>
            <S.MethodologyTitle>
              {methodology === "zettelkasten"
                ? "Zettelkasten Method"
                : "CODE/PARA Method"}
            </S.MethodologyTitle>
            <S.MethodologyDescription>
              {methodology === "zettelkasten"
                ? "Atomic notes with bidirectional links for knowledge discovery"
                : "Capture, Organize, Distill, Express - Projects, Areas, Resources, Archive"}
            </S.MethodologyDescription>
          </S.MethodologyInfo>

          {sections.map((section) => {
            const Icon = section.icon;
            const isOpen = openSections.includes(section.key);

            return (
              <S.SectionContainer key={section.key}>
                <S.SectionHeader onClick={() => toggleSection(section.key)}>
                  <S.SectionIcon>
                    {isOpen ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </S.SectionIcon>
                  <S.SectionIcon>
                    <Icon size={16} />
                  </S.SectionIcon>
                  <S.SectionTitle>{section.title}</S.SectionTitle>
                  <S.SectionCount>{section.notes.length}</S.SectionCount>
                </S.SectionHeader>
                {isOpen && renderNoteList(section.notes)}
              </S.SectionContainer>
            );
          })}
        </S.SidebarContent>
      </S.SidebarContainer>
    </ThemeProvider>
  );
}
