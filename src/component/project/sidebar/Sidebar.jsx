"use client";

import { useMemo, useCallback, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../styled/thema";
import * as S from "./SidebarStyled";
import {
  FileText,
  Briefcase,
  Target,
  BookOpen,
  Archive,
  Hash,
  Search as SearchIcon,
} from "lucide-react";
import { useGetRecentNotes } from "../../../hooks/note/useGetRecentNotes";
import { useSearchNotesByKeyword } from "../../../hooks/note/useSearchNotesByKeyword";
import { useGetNotesByIds } from "../../../hooks/note/useGetNotesByIds";
import { useUpdateParaMapping } from "../../../hooks/note/useUpdateParaMapping";

const PARA_FILTER_OPTIONS = [
  "ALL",
  "PROJECTS",
  "AREAS",
  "RESOURCES",
  "ARCHIVE",
];

export function Sidebar({
  activeNote,
  onNoteSelect,
  methodology,
  workspaceId,
  workspaceTitle,
  searchKeyword,
}) {
  const lowerMethodology = methodology?.toLowerCase() || "";
  const isParaMode = lowerMethodology.includes("para");
  const [paraFilter, setParaFilter] = useState("ALL");
  const [draggingNoteId, setDraggingNoteId] = useState(null);
  const [dragTarget, setDragTarget] = useState(null);
  const updateParaMappingMutation = useUpdateParaMapping();

  const { data: recentNotes = [] } = useGetRecentNotes(
    workspaceId && !isParaMode ? { workspaceId } : {}
  );

  const { data: searchResults = [] } = useSearchNotesByKeyword({
    workspaceId,
    keyword: searchKeyword,
    page: 0,
    size: 50,
    sort: "updatedAt",
    direction: "DESC",
  });

  const paraWorkspaceId = isParaMode && workspaceId ? workspaceId : null;

  const { data: paraNotes = [] } = useGetNotesByIds(paraWorkspaceId);

  const normalizedParaNotes = useMemo(() => {
    if (!isParaMode) return [];
    if (!Array.isArray(paraNotes)) return [];

    const uniqueMap = new Map();

    paraNotes.forEach((note) => {
      if (!note?.id) return;
      const key = String(note.id);
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, {
          ...note,
          id: key,
          paraCategory: String(note.paraCategory || "ARCHIVE").toUpperCase(),
        });
      }
    });

    return Array.from(uniqueMap.values());
  }, [isParaMode, paraNotes]);

  const normalizedSearchNotes = useMemo(() => {
    if (!isParaMode) return [];
    if (!Array.isArray(searchResults)) return [];

    return searchResults.map((note) => ({
      ...note,
      id: String(note.id),
      paraCategory: String(note.paraCategory || "ARCHIVE").toUpperCase(),
    }));
  }, [isParaMode, searchResults]);

  const paraSourceNotes = useMemo(() => {
    if (!isParaMode) return [];
    return searchKeyword ? normalizedSearchNotes : normalizedParaNotes;
  }, [isParaMode, searchKeyword, normalizedSearchNotes, normalizedParaNotes]);

  const filteredParaNotes = useMemo(() => {
    if (paraFilter === "ALL") {
      return paraSourceNotes;
    }
    return paraSourceNotes.filter((note) => note.paraCategory === paraFilter);
  }, [paraSourceNotes, paraFilter]);

  // useEffect(() => {
  //   if (isParaMode) {
  //     console.log("[Sidebar] PARA notes", normalizedParaNotes);
  //   }
  // }, [isParaMode, normalizedParaNotes]);

  useEffect(() => {
    setParaFilter("ALL");
  }, [workspaceId, isParaMode]);

  useEffect(() => {
    if (!isParaMode) {
      setDraggingNoteId(null);
      setDragTarget(null);
    }
  }, [isParaMode, workspaceId]);

  const formatCategoryLabel = useCallback((value) => {
    if (!value) return "";
    const safe = String(value).toLowerCase();
    return safe.charAt(0).toUpperCase() + safe.slice(1);
  }, []);

  const findNoteById = useCallback(
    (id) => {
      const stringId = String(id);
      return (
        paraSourceNotes.find((note) => String(note.id) === stringId) ||
        normalizedParaNotes.find((note) => String(note.id) === stringId) ||
        null
      );
    },
    [paraSourceNotes, normalizedParaNotes]
  );

  const handleDragStart = (event, note) => {
    if (!isParaMode || !note?.id) return;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", String(note.id));
    setDraggingNoteId(String(note.id));
  };

  const handleDragEnd = () => {
    setDraggingNoteId(null);
    setDragTarget(null);
  };

  const handleDragOver = (event, categoryId) => {
    if (!isParaMode || !draggingNoteId) return;
    event.preventDefault();

    const targetCategory = String(categoryId || "").toUpperCase();
    if (!targetCategory) return;

    const note = findNoteById(draggingNoteId);
    if (!note || note.paraCategory === targetCategory) {
      setDragTarget(null);
      return;
    }

    event.dataTransfer.dropEffect = "move";
    setDragTarget(targetCategory);
  };

  const handleDragLeave = (event, categoryId) => {
    if (!isParaMode) return;
    if (event.currentTarget.contains(event.relatedTarget)) return;
    setDragTarget((current) =>
      current === String(categoryId || "").toUpperCase() ? null : current
    );
  };

  const normalizeCategoryValue = (value) => {
    if (!value) return "";
    const lower = String(value).toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const handleDrop = (event, categoryId) => {
    if (!isParaMode || !workspaceId) return;
    event.preventDefault();

    const targetCategoryRaw = String(categoryId || "");
    const targetCategory = targetCategoryRaw.toUpperCase();
    const noteId = event.dataTransfer.getData("text/plain") || draggingNoteId;
    const note = findNoteById(noteId);

    setDraggingNoteId(null);
    setDragTarget(null);

    if (!note || !targetCategory || note.paraCategory === targetCategory) {
      return;
    }

    updateParaMappingMutation.mutate({
      noteId: note.id,
      workspaceId,
      paraCategory: normalizeCategoryValue(targetCategoryRaw),
    });
  };

  const renderNoteList = (notes = []) => {
    if (!notes.length) {
      return (
        <S.NotesList>
          <S.NoteDescription>등록된 문서가 없습니다.</S.NoteDescription>
        </S.NotesList>
      );
    }

    return (
      <S.NotesList>
        {notes.map((note) => (
          <S.NoteButton
            key={note.id}
            active={String(activeNote) === String(note.id)}
            onClick={() => onNoteSelect(String(note.id))}
            draggable={isParaMode}
            onDragStart={(event) => handleDragStart(event, note)}
            onDragEnd={handleDragEnd}
          >
            <S.NoteContent>
              <S.NoteTitleRow>
                <FileText size={12} />
                <S.NoteTitle>{note.title}</S.NoteTitle>
              </S.NoteTitleRow>
              {note.paraCategory && isParaMode && (
                <S.NoteCategoryBadge>
                  {formatCategoryLabel(note.paraCategory)}
                </S.NoteCategoryBadge>
              )}
              {note.description && (
                <S.NoteDescription>{note.description}</S.NoteDescription>
              )}
              {Array.isArray(note.tags) && note.tags.length > 0 && (
                <S.TagsContainer>
                  {note.tags.map((tag) => (
                    <S.Tag key={tag}>{tag}</S.Tag>
                  ))}
                </S.TagsContainer>
              )}
            </S.NoteContent>
          </S.NoteButton>
        ))}
      </S.NotesList>
    );
  };

  const paraSections = useMemo(() => {
    if (!isParaMode) return [];

    const SECTION_META = [
      { id: "PROJECTS", title: "Projects", icon: Briefcase },
      { id: "AREAS", title: "Areas", icon: Target },
      { id: "RESOURCES", title: "Resources", icon: BookOpen },
      { id: "ARCHIVE", title: "Archive", icon: Archive },
    ];

    const knownIds = new Set(SECTION_META.map((item) => item.id));

    const sections = SECTION_META.map((meta) => ({
      key: meta.id.toLowerCase(),
      title: meta.title,
      icon: meta.icon,
      categoryId: meta.id,
      notes: filteredParaNotes.filter((note) => note.paraCategory === meta.id),
    }));

    const extraCategories = Array.from(
      new Set(
        filteredParaNotes
          .map((note) => note.paraCategory)
          .filter((category) => category && !knownIds.has(category))
      )
    );

    extraCategories.forEach((category) => {
      sections.push({
        key: category.toLowerCase(),
        title: formatCategoryLabel(category),
        icon: FileText,
        categoryId: category,
        notes: filteredParaNotes.filter(
          (note) => note.paraCategory === category
        ),
      });
    });

    return sections;
  }, [isParaMode, filteredParaNotes, formatCategoryLabel]);

  const sections = useMemo(() => {
    if (!workspaceId) return [];

    if (isParaMode) {
      return paraSections;
    }

    const maybeFilterNotes = (notes) => (Array.isArray(notes) ? notes : []);

    if (searchKeyword) {
      return [
        {
          key: "search",
          title: `Search Results`,
          icon: SearchIcon,
          notes: maybeFilterNotes(searchResults),
        },
      ];
    }

    return [
      {
        key: "zettelkasten",
        title: workspaceTitle || "Zettelkasten",
        icon: Hash,
        notes: maybeFilterNotes(recentNotes),
      },
    ];
  }, [
    workspaceId,
    searchKeyword,
    searchResults,
    isParaMode,
    paraSections,
    recentNotes,
    workspaceTitle,
  ]);

  return (
    <ThemeProvider theme={theme}>
      <S.SidebarContainer>
        <S.SidebarContent>
          {isParaMode && (
            <S.FilterBar>
              {PARA_FILTER_OPTIONS.map((option) => (
                <S.FilterChip
                  type="button"
                  key={option}
                  $active={paraFilter === option}
                  onClick={() => setParaFilter(option)}
                >
                  {option === "ALL" ? "All" : formatCategoryLabel(option)}
                </S.FilterChip>
              ))}
            </S.FilterBar>
          )}
          {sections.map((section) => {
            const Icon = section.icon;
            const canDrop = isParaMode && Boolean(section.categoryId);
            const categoryId = section.categoryId;

            return (
              <S.SectionContainer
                key={section.key}
                $isDroppable={canDrop}
                $isDragTarget={
                  canDrop && dragTarget === String(categoryId || "").toUpperCase()
                }
                onDragOver={
                  canDrop
                    ? (event) => handleDragOver(event, categoryId)
                    : undefined
                }
                onDragLeave={
                  canDrop
                    ? (event) => handleDragLeave(event, categoryId)
                    : undefined
                }
                onDrop={
                  canDrop ? (event) => handleDrop(event, categoryId) : undefined
                }
              >
                <S.SectionHeader type="button">
                  <S.SectionIcon>
                    <Icon size={16} />
                  </S.SectionIcon>
                  <S.SectionTitle>{section.title}</S.SectionTitle>
                  <S.SectionCount>{section.notes?.length ?? 0}</S.SectionCount>
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
