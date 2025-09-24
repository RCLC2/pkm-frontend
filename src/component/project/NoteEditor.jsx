"use client";

import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styled/thema";
import * as S from "./NoteEditorStyled";
import TiptapEditor from "./editor/TiptapEditor";
import {
  Save,
  Tag,
  Calendar,
  FileText,
} from "lucide-react";

const mockNoteContent = {
  "welcome-note": {
    title: "Welcome to Zettelkasten",
    content: `# Welcome to Your Zettelkasten

This is your digital knowledge management system that combines the power of **Zettelkasten** methodology with the **CODE/PARA** organizational system.

## What is Zettelkasten?

Zettelkasten (German for "slip box") is a method of knowledge management that emphasizes:

- **Atomic notes**: Each note contains one idea
- **Linking**: Notes are connected through meaningful relationships
- **Emergence**: New insights emerge from the network of connected ideas

## CODE/PARA System

Your notes are organized using the CODE/PARA method:

- **Projects**: Things with deadlines and specific outcomes
- **Areas**: Ongoing responsibilities to maintain
- **Resources**: Topics of ongoing interest
- **Archive**: Inactive items from the other categories

## Getting Started

1. Create atomic notes with single concepts
2. Use [[double brackets]] to link to other notes
3. Add #tags to categorize your thoughts
4. Let your knowledge graph grow organically

Start exploring and building your second brain!`,
    tags: ["#intro", "#zettelkasten", "#getting-started"],
    created: "2024-01-15",
    modified: "2024-01-15",
  },
  "note-1": {
    title: "Knowledge Management Systems",
    content: `# Knowledge Management Systems

Knowledge management systems are structured approaches to capturing, organizing, and retrieving information.

## Key Principles

1. **Capture**: Collect information from various sources
2. **Organize**: Structure information for easy retrieval
3. **Connect**: Link related concepts together
4. **Review**: Regularly revisit and update information

## Popular Systems

- [[Zettelkasten]] - Atomic notes with linking
- **Getting Things Done (GTD)** - Task and project management
- **Building a Second Brain (BASB)** - Digital knowledge capture
- **CODE/PARA** - Organizational framework

## Benefits

- Improved learning retention
- Better idea generation
- Enhanced creativity through connections
- Reduced cognitive load

Connected to: [[Atomic Notes Concept]], [[Linking Ideas Together]]`,
    tags: ["#knowledge", "#systems", "#productivity"],
    created: "2024-01-16",
    modified: "2024-01-18",
  },
};

export function NoteEditor({ noteId }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (noteId && mockNoteContent[noteId]) {
      const note = mockNoteContent[noteId];
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags);
    } else {
      setTitle("");
      setContent("");
      setTags([]);
    }
  }, [noteId]);

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag.startsWith("#") ? newTag : `#${newTag}`]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  if (!noteId) {
    return (
      <ThemeProvider theme={theme}>
        <S.EmptyState>
          <S.EmptyStateContent>
            <S.EmptyStateIcon>
              <FileText size={48} />
            </S.EmptyStateIcon>
            <p>Select a note to start editing</p>
          </S.EmptyStateContent>
        </S.EmptyState>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <S.EditorContainer>
        <S.Toolbar>
          <S.ToolbarButtons>
            <S.SaveButton>
              <Save size={16} />
              Save
            </S.SaveButton>
          </S.ToolbarButtons>

          <S.TagsContainer>
            {tags.map((tag) => (
              <S.TagBadge key={tag}>
                {tag}
                <S.TagRemoveButton onClick={() => removeTag(tag)}>
                  ×
                </S.TagRemoveButton>
              </S.TagBadge>
            ))}
            <S.TagInputContainer>
              <S.TagInput
                placeholder="Add tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTag()}
              />
              <S.TagAddButton onClick={addTag}>
                <Tag size={12} />
              </S.TagAddButton>
            </S.TagInputContainer>
          </S.TagsContainer>
        </S.Toolbar>

        <S.EditorContent>
          <S.TitleInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title..."
          />

          <TiptapEditor
            content={content}
            onChange={setContent}
            placeholder="Start writing your note... Use [[double brackets]] to link to other notes."
          />

          <S.Metadata>
            <S.MetadataItem>
              <Calendar size={12} />
              Created: Jan 15, 2024
            </S.MetadataItem>
            <S.MetadataItem>
              <Calendar size={12} />
              Modified: Jan 18, 2024
            </S.MetadataItem>
          </S.Metadata>
        </S.EditorContent>
      </S.EditorContainer>
    </ThemeProvider>
  );
}
