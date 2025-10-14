"use client";

import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../styled/thema";
import * as S from "./ProjectCreationStyled";
import { Search, ArrowRight, Network, Clock, FolderOpen, Trophy } from "lucide-react";
import { templates, bookColors } from "./constants/templates.jsx";
import { useBookshelfCustomization } from "./hooks/useBookshelfCustomization";
import { BookshelfSection } from "./components/bookshelf/BookshelfSection";
import { CustomizationPanel } from "./components/customization/CustomizationPanel";

export function ProjectCreation({ onCreateProject, onOpenProject }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedProjects, setSavedProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("recent");
  const {
    points,
    bookshelfTheme,
    unlockedCustomizations,
    bookshelfOptions,
    handleApplyCustomization,
    getPreviewStyle,
  } = useBookshelfCustomization();

  useEffect(() => {
    const saved = localStorage.getItem("knowledgebase-projects");
    if (saved) {
      setSavedProjects(JSON.parse(saved));
    }
  }, []);

  const handleDeleteProject = (projectId) => {
    const updatedProjects = savedProjects.filter((p) => p.id !== projectId);
    setSavedProjects(updatedProjects);
    localStorage.setItem(
      "knowledgebase-projects",
      JSON.stringify(updatedProjects)
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.methodology.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const getBookThickness = (noteCount) => {
    if (!noteCount || noteCount <= 0) return 28;
    return Math.min(80, 24 + noteCount * 4);
  };

  const handleCreateProject = () => {
    if (selectedTemplate && projectName.trim()) {
      onCreateProject(selectedTemplate, projectName.trim());
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <S.Container>
        <S.Header>
          <S.HeaderContent>
            <S.Logo>
              <S.LogoIcon>
                <Network size={20} />
              </S.LogoIcon>
              <S.LogoText>Knowledge Base</S.LogoText>
            </S.Logo>
            <S.HeaderNav>
              <S.PointsBadge>
                <Trophy size={14} />
                {points} pts
              </S.PointsBadge>
              <span>Help</span>
              <span>Feedback</span>
            </S.HeaderNav>
          </S.HeaderContent>
        </S.Header>

        <S.MainContent>
          <S.TitleSection>
            <S.MainTitle>Knowledge Base</S.MainTitle>
            <S.MainSubtitle>
              Create new projects or continue working on existing ones.
            </S.MainSubtitle>
          </S.TitleSection>

          <S.TabsContainer>
            <S.TabsList>
              <S.TabTrigger
                active={activeTab === "recent"}
                onClick={() => setActiveTab("recent")}
              >
                <Clock size={16} />
                Recent Projects
              </S.TabTrigger>
              <S.TabTrigger
                active={activeTab === "new"}
                onClick={() => setActiveTab("new")}
              >
                <FolderOpen size={16} />
                New Project
              </S.TabTrigger>
            </S.TabsList>

            <S.TabContent active={activeTab === "recent"}>
              {savedProjects.length === 0 ? (
                <S.EmptyState>
                  <S.EmptyStateContent>
                    <S.EmptyStateIcon>
                      <FolderOpen size={48} />
                    </S.EmptyStateIcon>
                    <S.EmptyStateTitle>No projects yet</S.EmptyStateTitle>
                    <S.EmptyStateDescription>
                      Create your first knowledge base project to get started.
                    </S.EmptyStateDescription>
                    <S.Button
                      variant="primary"
                      onClick={() => setActiveTab("new")}
                    >
                      Create New Project
                    </S.Button>
                  </S.EmptyStateContent>
                </S.EmptyState>
              ) : (
                <>
                  <BookshelfSection
                    projects={savedProjects}
                    templates={templates}
                    bookshelfTheme={bookshelfTheme}
                    getPreviewStyle={getPreviewStyle}
                    getBookThickness={getBookThickness}
                    bookColors={bookColors}
                    formatDate={formatDate}
                    onOpenProject={onOpenProject}
                    onDeleteProject={handleDeleteProject}
                  />

                  <CustomizationPanel
                    points={points}
                    bookshelfOptions={bookshelfOptions}
                    bookshelfTheme={bookshelfTheme}
                    unlockedCustomizations={unlockedCustomizations}
                    onApplyCustomization={handleApplyCustomization}
                  />
                </>
              )}
          </S.TabContent>

            <S.TabContent active={activeTab === "new"}>
              <S.SearchContainer>
                <S.SearchIcon>
                  <Search size={16} />
                </S.SearchIcon>
                <S.SearchInput
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </S.SearchContainer>

              <S.Grid>
                {filteredTemplates.map((template) => (
                  <S.Card
                    key={template.id}
                    selected={selectedTemplate?.id === template.id}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <S.CardHeader>
                      <S.CardHeaderContent>
                        <S.CardIconSection>
                          <S.CardIcon>{template.icon}</S.CardIcon>
                          <S.CardTitleSection>
                            <S.CardTitle>{template.name}</S.CardTitle>
                            <S.Badge>
                              {template.methodology === "zettelkasten"
                                ? "Zettelkasten"
                                : "CODE/PARA"}
                            </S.Badge>
                          </S.CardTitleSection>
                        </S.CardIconSection>
                      </S.CardHeaderContent>
                    </S.CardHeader>
                    <S.CardContent>
                      <S.PreviewImage
                        src={template.preview || "/placeholder.svg"}
                        alt={`${template.name} preview`}
                      />
                      <S.CardDescription>{template.description}</S.CardDescription>
                      <S.FeaturesList>
                        {template.features.map((feature) => (
                          <S.FeatureBadge key={feature}>{feature}</S.FeatureBadge>
                        ))}
                      </S.FeaturesList>
                    </S.CardContent>
                  </S.Card>
                ))}
              </S.Grid>

              {selectedTemplate && (
                <S.FormCard>
                  <S.FormHeader>
                    <S.FormTitle>
                      {selectedTemplate.icon}
                      Create {selectedTemplate.name} Project
                    </S.FormTitle>
                    <S.FormDescription>
                      Give your new knowledge base a name to get started.
                    </S.FormDescription>
                  </S.FormHeader>
                  <S.FormContent>
                    <S.InputGroup>
                      <S.Label htmlFor="project-name">Project Name</S.Label>
                      <S.Input
                        id="project-name"
                        placeholder="My Knowledge Base"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                      />
                    </S.InputGroup>

                    <S.FormActions>
                      <S.Button
                        variant="outline"
                        onClick={() => setSelectedTemplate(null)}
                      >
                        Back to Templates
                      </S.Button>
                      <S.Button
                        variant="primary"
                        onClick={handleCreateProject}
                        disabled={!projectName.trim()}
                      >
                        Create Project
                        <ArrowRight size={16} />
                      </S.Button>
                    </S.FormActions>
                  </S.FormContent>
                </S.FormCard>
              )}
            </S.TabContent>
          </S.TabsContainer>
        </S.MainContent>
      </S.Container>
    </ThemeProvider>
  );
}
