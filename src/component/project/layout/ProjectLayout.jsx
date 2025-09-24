"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../styled/thema";
import { Sidebar } from "../Sidebar";
import { SearchBar } from "../SearchBar";
import * as S from "./ProjectLayoutStyled";
import {
  FileText,
  Network,
  Plus,
  BookOpen,
  Briefcase,
  ArrowLeft,
} from "lucide-react";

export function ProjectLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentProject, setCurrentProject] = useState(null);
  const [activeNote, setActiveNote] = useState("welcome-note");
  const [methodology, setMethodology] = useState("zettelkasten");

  // Get active view from current route
  const getActiveView = () => {
    if (location.pathname.includes("/editor")) return "editor";
    if (location.pathname.includes("/graph")) return "graph";
    return "dashboard";
  };

  const activeView = getActiveView();

  useEffect(() => {
    // Load project data from localStorage or URL params
    const savedProjects = JSON.parse(
      localStorage.getItem("knowledgebase-projects") || "[]"
    );
    if (savedProjects.length > 0) {
      setCurrentProject(savedProjects[0]); // Load first project for demo
      setMethodology(savedProjects[0].methodology);
    }
  }, []);

  const handleBackToProjects = () => {
    navigate("/projects");
  };

  const handleViewChange = (view) => {
    if (view === "editor") {
      navigate(`/dashboard/editor/${activeNote}`);
    } else if (view === "graph") {
      navigate("/dashboard/graph");
    } else {
      navigate("/dashboard");
    }
  };

  const handleNoteSelect = (noteId) => {
    setActiveNote(noteId);
    navigate(`/dashboard/editor/${noteId}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <S.AppContainer>
        <S.SidebarContainer>
          <S.SidebarHeader>
            <S.SidebarHeaderTop>
              <S.SidebarTitleSection>
                <S.BackButton
                  onClick={handleBackToProjects}
                  title="Back to Projects"
                >
                  <ArrowLeft size={16} />
                </S.BackButton>
                <S.SidebarTitle>
                  {currentProject?.name || "Knowledge Base"}
                </S.SidebarTitle>
              </S.SidebarTitleSection>
              <S.AddButton>
                <Plus size={16} />
              </S.AddButton>
            </S.SidebarHeaderTop>

            <S.MethodologySelector>
              <S.Select
                value={methodology}
                onChange={(e) => setMethodology(e.target.value)}
              >
                <option value="zettelkasten">📚 Zettelkasten</option>
                <option value="code-para">💼 CODE/PARA</option>
              </S.Select>
            </S.MethodologySelector>

            <SearchBar />
          </S.SidebarHeader>
          <Sidebar
            activeNote={activeNote}
            onNoteSelect={handleNoteSelect}
            methodology={methodology}
          />
        </S.SidebarContainer>

        <S.MainContent>
          <S.MainHeader>
            <S.HeaderContent>
              <S.TabsContainer>
                <S.TabButton
                  active={activeView === "dashboard"}
                  onClick={() => handleViewChange("dashboard")}
                >
                  <BookOpen size={16} />
                  Dashboard
                </S.TabButton>
                <S.TabButton
                  active={activeView === "editor"}
                  onClick={() => handleViewChange("editor")}
                >
                  <FileText size={16} />
                  Editor
                </S.TabButton>
                <S.TabButton
                  active={activeView === "graph"}
                  onClick={() => handleViewChange("graph")}
                >
                  <Network size={16} />
                  Graph
                </S.TabButton>
              </S.TabsContainer>

              <S.MethodologyIndicator>
                {methodology === "zettelkasten" ? (
                  <>
                    <BookOpen size={16} />
                    Zettelkasten Mode
                  </>
                ) : (
                  <>
                    <Briefcase size={16} />
                    CODE/PARA Mode
                  </>
                )}
              </S.MethodologyIndicator>
            </S.HeaderContent>
          </S.MainHeader>

          <S.ContentArea>
            <Outlet context={{ activeNote, methodology, currentProject }} />
          </S.ContentArea>
        </S.MainContent>
      </S.AppContainer>
    </ThemeProvider>
  );
}