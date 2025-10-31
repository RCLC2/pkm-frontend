"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../styled/thema";
import { Sidebar } from "../sidebar/Sidebar";
import { SearchBar } from "../searchBar/SearchBar";
import * as S from "./ProjectLayoutStyled";
import { useCreateNote } from "../../../hooks/note/useCreateNote";
import ParaCategoryModal from "./ParaCategoryModal"; // 모달 컴포넌트 import
import {
  FileText,
  Network,
  Plus,
  BookOpen,
  Briefcase,
  ArrowLeft,
  ArrowRightLeft,
} from "lucide-react";

export function ProjectLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentProject, setCurrentProject] = useState({});
  const [activeNote, setActiveNote] = useState("welcome-note");

  const [methodology, setMethodology] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const createNoteMutation = useCreateNote();

  // Get active view from current route
  const getActiveView = () => {
    if (location.pathname.includes("/editor")) return "editor";
    if (location.pathname.includes("/graph")) return "graph";
    if (location.pathname.includes("/convert")) return "convert";
    return "dashboard";
  };

  const activeView = getActiveView();

  useEffect(() => {
    const storedCurrent =
      typeof window !== "undefined"
        ? window.localStorage.getItem("current_workspace")
        : null;

    if (storedCurrent) {
      try {
        const parsed = JSON.parse(storedCurrent);
        if (parsed && parsed.id) {
          setCurrentProject(parsed);
          setMethodology(
            parsed.methodology ||
              (parsed.type === "zettel" ? "zettelkasten" : "code-para")
          );
          return;
        }
      } catch (error) {
        console.warn("[ProjectLayout] stored workspace parse 실패", error);
      }
    }

    const fallbackList =
      typeof window !== "undefined"
        ? window.localStorage.getItem("knowledgebase-projects")
        : null;

    if (fallbackList) {
      try {
        const parsedList = JSON.parse(fallbackList);
        if (Array.isArray(parsedList) && parsedList.length > 0) {
          const fallback = parsedList[0];
          setCurrentProject(fallback);
          setMethodology(
            fallback.methodology ||
              (fallback.type === "zettel" ? "zettelkasten" : "code-para")
          );
        }
      } catch (error) {
        console.warn("[ProjectLayout] fallback workspace parse 실패", error);
      }
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
    } else if (view === "convert") {
      navigate("/dashboard/convert");
    } else {
      navigate("/dashboard");
    }
  };

  const handleNoteSelect = (noteId) => {
    setActiveNote(noteId);
    navigate(`/dashboard/editor/${noteId}`);
  };

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

  const handleQuickActionClick = () => {
    if (currentProject.type === "zettel") {
      // 제텔카스텐: 바로 노트 생성
      handleCreateNote();
    } else {
      // PARA: 모달 열기
      setIsModalOpen(true);
    }
  };

  const handleCategorySelect = (category) => {
    handleCreateNote(category);
  };

  const handleCreateNote = (paraCategory = null) => {
    if (!currentProject?.id) {
      alert("워크스페이스 ID가 없습니다.");
      return;
    }

    const noteData = {
      workspaceId: currentProject.id,
      title: "새 노트",
      description: "",
      contents: "",
    };

    // PARA 방법론인 경우 카테고리 추가
    if (paraCategory) {
      noteData.paraCategory = paraCategory;
    }

    createNoteMutation.mutate(noteData, {
      onSuccess: (data) => {
        console.log(`노트가 생성되었습니다: ${data.title}`);
        // ✅ 필요하다면 생성된 noteId로 페이지 이동도 가능
        navigate(`/dashboard/editor/${data.id}`);
      },
      onError: () => {
        alert("노트 생성 실패");
      },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <ParaCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleCategorySelect}
      />
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
                  {currentProject?.title || "Knowledge Base"}
                </S.SidebarTitle>
              </S.SidebarTitleSection>
              <S.AddButton onClick={handleQuickActionClick}>
                <Plus size={16} />
              </S.AddButton>
            </S.SidebarHeaderTop>
            <SearchBar onSearch={setSearchKeyword} />
          </S.SidebarHeader>
          <Sidebar
            activeNote={activeNote}
            onNoteSelect={handleNoteSelect}
            methodology={methodology}
            workspaceId={currentProject?.id}
            searchKeyword={searchKeyword}
            workspaceTitle={currentProject?.title}
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
                <S.TabButton
                  active={activeView === "convert"}
                  onClick={() => handleViewChange("convert")}
                >
                  <ArrowRightLeft size={16} />
                  Convert
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
            <Outlet
              context={{
                activeNote,
                methodology,
                currentProject,
                onNavigateToNote: handleNoteSelect,
              }}
            />
          </S.ContentArea>
        </S.MainContent>
      </S.AppContainer>
    </ThemeProvider>
  );
}
