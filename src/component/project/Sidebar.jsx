"use client";

import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styled/thema";
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

const mockNotes = {
  projects: [
    { id: "project-1", title: "AI Research Paper", tags: ["#research", "#ai"] },
    { id: "project-2", title: "Website Redesign", tags: ["#design", "#web"] },
  ],
  areas: [
    { id: "area-1", title: "Personal Development", tags: ["#growth"] },
    { id: "area-2", title: "Health & Fitness", tags: ["#health"] },
  ],
  resources: [
    {
      id: "resource-1",
      title: "Design Principles",
      tags: ["#design", "#reference"],
    },
    {
      id: "resource-2",
      title: "Programming Best Practices",
      tags: ["#coding"],
    },
  ],
  archive: [
    { id: "archive-1", title: "Old Project Notes", tags: ["#archived"] },
  ],
  zettelkasten: [
    { id: "welcome-note", title: "Welcome to Zettelkasten", tags: ["#intro"] },
    {
      id: "note-1",
      title: "Knowledge Management Systems",
      tags: ["#knowledge", "#systems"],
    },
    {
      id: "note-2",
      title: "Atomic Notes Concept",
      tags: ["#atomic", "#notes"],
    },
    { id: "note-3", title: "Linking Ideas Together", tags: ["#connections"] },
  ],
};

export function Sidebar({ activeNote, onNoteSelect, methodology }) {
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
          notes: mockNotes.zettelkasten,
        },
      ];
    } else {
      return [
        {
          key: "projects",
          title: "Projects",
          icon: Briefcase,
          notes: mockNotes.projects,
        },
        { key: "areas", title: "Areas", icon: Target, notes: mockNotes.areas },
        {
          key: "resources",
          title: "Resources",
          icon: BookOpen,
          notes: mockNotes.resources,
        },
        {
          key: "archive",
          title: "Archive",
          icon: Archive,
          notes: mockNotes.archive,
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
