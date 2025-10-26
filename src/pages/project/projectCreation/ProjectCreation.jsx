"use client";

import { useState, useEffect, useMemo } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../styled/thema";
import * as S from "./ProjectCreationStyled";
import {
  Search,
  ArrowRight,
  ArrowLeft,
  Network,
  Clock,
  FolderOpen,
  Trophy,
  BookOpen,
  Briefcase,
} from "lucide-react";
import { templates, bookColors } from "./constants/templates.jsx";
import { useBookshelfCustomization } from "./hooks/useBookshelfCustomization";
import { BookshelfSection } from "./components/bookshelf/BookshelfSection";
import { CustomizationPanel } from "./components/customization/CustomizationPanel";
import { useCreateWorkspace } from "../../../hooks/workspace/useCreateWorkspace.jsx";

const wizardSteps = [
  {
    id: "methodology",
    title: "Choose methodology",
    description: "Pick how this workspace will structure knowledge.",
  },
  {
    id: "template",
    title: "Select template",
    description: "Start from a curated setup tailored to your workflow.",
  },
  {
    id: "details",
    title: "Project details",
    description: "Name your project and confirm your selections.",
  },
];

const methodologyOptions = [
  {
    id: "zettelkasten",
    title: "Zettelkasten",
    description: "Grow ideas with atomic notes and meaningful links.",
    icon: BookOpen,
    highlights: ["Atomic note capture", "Graph-based discovery"],
  },
  {
    id: "code-para",
    title: "CODE/PARA",
    description: "Run projects with Tiago Forte's CODE/PARA system.",
    icon: Briefcase,
    highlights: ["Actionable projects", "Areas, resources, archive"],
  },
];

export function ProjectCreation({
  onCreateProject,
  onOpenProject,
  projects = [],
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedMethodology, setSelectedMethodology] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedProjects, setSavedProjects] = useState(projects);
  const [activeTab, setActiveTab] = useState("recent");
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);

  const { mutate } = useCreateWorkspace();

  const {
    points,
    bookshelfTheme,
    unlockedCustomizations,
    bookshelfOptions,
    handleApplyCustomization,
    getPreviewStyle,
  } = useBookshelfCustomization();

  useEffect(() => {
    setSavedProjects(projects);
  }, [projects]);

  useEffect(() => {
    setSelectedTemplate((prev) =>
      prev && prev.methodology === selectedMethodology ? prev : null
    );
    setSearchQuery("");
  }, [selectedMethodology]);

  useEffect(() => {
    if (selectedTemplate) {
      setProjectName((prev) =>
        prev.trim().length > 0 ? prev : selectedTemplate.name
      );
    }
  }, [selectedTemplate]);

  const handleDeleteProject = (projectId) => {
    const updated = savedProjects.filter((p) => p.id !== projectId);
    setSavedProjects(updated);
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

  const templatesForMethodology = useMemo(() => {
    if (!selectedMethodology) {
      return [];
    }

    const query = searchQuery.trim().toLowerCase();

    return templates.filter((template) => {
      if (template.methodology !== selectedMethodology) {
        return false;
      }

      if (!query) {
        return true;
      }

      const haystack =
        `${template.name} ${template.description} ${template.methodology}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [selectedMethodology, searchQuery]);

  const isNextDisabled = useMemo(() => {
    if (currentStep === 0) {
      return !selectedMethodology;
    }

    if (currentStep === 1) {
      return !selectedTemplate;
    }

    return !projectName.trim();
  }, [currentStep, projectName, selectedMethodology, selectedTemplate]);

  const methodologyLabel =
    selectedMethodology === "zettelkasten"
      ? "Zettelkasten"
      : selectedMethodology === "code-para"
      ? "CODE/PARA"
      : "";

  const getBookThickness = (noteCount) => {
    const MIN_THICKNESS = 48;
    const MAX_THICKNESS = 108;
    const SCALE_MAX_NOTES = 150;

    if (!Number.isFinite(noteCount) || noteCount <= 0) {
      return MIN_THICKNESS;
    }

    const clampedCount = Math.min(noteCount, SCALE_MAX_NOTES);
    const ratio = clampedCount / SCALE_MAX_NOTES;
    const thickness = MIN_THICKNESS + ratio * (MAX_THICKNESS - MIN_THICKNESS);

    return Math.round(thickness);
  };

  const handleNextStep = () => {
    if (currentStep === wizardSteps.length - 1) {
      handleCreateProject();
      return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, wizardSteps.length - 1));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleCreateProject = () => {
    if (selectedTemplate && projectName.trim() && selectedMethodology) {
      const type = selectedMethodology === "zettelkasten" ? "zettel" : "para";

      const requestBody = {
        name: projectName.trim(),
        type,
      };

      mutate(requestBody, {
        onSuccess: () => {
          alert(`워크스페이스 '${projectName}' 생성 완료`);
          setCurrentStep(0);
          setSelectedMethodology(null);
          setSelectedTemplate(null);
          setProjectName("");
          setSearchQuery("");
          setActiveTab("recent");
        },
        onError: (err) => {
          console.error("워크스페이스 생성 실패:", err);
        },
      });
      return;
    }

    onCreateProject(selectedTemplate, projectName.trim());
    setCurrentStep(0);
    setSelectedMethodology(null);
    setSelectedTemplate(null);
    setProjectName("");
    setSearchQuery("");
  };

  const startNewProjectFlow = () => {
    setActiveTab("new");
    setCurrentStep(0);
    setSelectedMethodology(null);
    setSelectedTemplate(null);
    setProjectName("");
    setSearchQuery("");
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
                    <S.Button variant="primary" onClick={startNewProjectFlow}>
                      Create New Project
                    </S.Button>
                  </S.EmptyStateContent>
                </S.EmptyState>
              ) : (
                <>
                  <S.CustomizationCallout>
                    <div>
                      <S.CustomizationCalloutTitle>
                        책장 꾸미기
                      </S.CustomizationCalloutTitle>
                      <S.CustomizationCalloutDescription>
                        현재 프로젝트의 책장 테마를 변경하고 새로운 분위기를
                        적용해 보세요.
                      </S.CustomizationCalloutDescription>
                    </div>
                    <S.Button
                      type="button"
                      variant="primary"
                      onClick={() => setIsCustomizationOpen(true)}
                    >
                      꾸미기 열기
                    </S.Button>
                  </S.CustomizationCallout>

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
                    isOpen={isCustomizationOpen}
                    onClose={() => setIsCustomizationOpen(false)}
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
              <S.WizardCard>
                <S.StepHeader>
                  <S.StepList>
                    {wizardSteps.map((step, index) => {
                      const status =
                        index < currentStep
                          ? "complete"
                          : index === currentStep
                          ? "active"
                          : "upcoming";

                      return (
                        <S.StepItem key={step.id} $status={status}>
                          <S.StepMarker $status={status}>
                            {index + 1}
                          </S.StepMarker>
                          <S.StepInfo>
                            <S.StepTitle>{step.title}</S.StepTitle>
                            <S.StepDescription>
                              {step.description}
                            </S.StepDescription>
                          </S.StepInfo>
                        </S.StepItem>
                      );
                    })}
                  </S.StepList>
                </S.StepHeader>

                <S.WizardBody>
                  {currentStep === 0 && (
                    <>
                      <S.StepIntro>
                        <S.StepHeading>Choose your methodology</S.StepHeading>
                        <S.StepText>
                          Select the framework that matches how you want to
                          organize knowledge.
                        </S.StepText>
                      </S.StepIntro>

                      <S.SelectionGrid>
                        {methodologyOptions.map((option) => {
                          const Icon = option.icon;
                          return (
                            <S.SelectionCard
                              key={option.id}
                              type="button"
                              onClick={() => setSelectedMethodology(option.id)}
                              $selected={selectedMethodology === option.id}
                            >
                              <S.SelectionIcon>
                                <Icon size={18} />
                              </S.SelectionIcon>
                              <S.SelectionTitle>
                                {option.title}
                              </S.SelectionTitle>
                              <S.SelectionDescription>
                                {option.description}
                              </S.SelectionDescription>
                              <S.SelectionHighlights>
                                {option.highlights.map((highlight) => (
                                  <li key={`${option.id}-${highlight}`}>
                                    {highlight}
                                  </li>
                                ))}
                              </S.SelectionHighlights>
                            </S.SelectionCard>
                          );
                        })}
                      </S.SelectionGrid>
                    </>
                  )}

                  {currentStep === 1 && (
                    <>
                      <S.StepIntro>
                        <S.StepHeading>Select a starter template</S.StepHeading>
                        <S.StepText>
                          {selectedMethodology
                            ? `Templates tailored for the ${methodologyLabel} workflow.`
                            : "Pick a methodology first to explore templates."}
                        </S.StepText>
                      </S.StepIntro>

                      <S.SearchContainer>
                        <S.SearchIcon>
                          <Search size={16} />
                        </S.SearchIcon>
                        <S.SearchInput
                          placeholder="Search templates..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          disabled={!selectedMethodology}
                        />
                      </S.SearchContainer>

                      {selectedMethodology ? (
                        templatesForMethodology.length > 0 ? (
                          <S.Grid>
                            {templatesForMethodology.map((template) => (
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
                                        <S.CardTitle>
                                          {template.name}
                                        </S.CardTitle>
                                        <S.Badge>
                                          {template.methodology ===
                                          "zettelkasten"
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
                                  <S.CardDescription>
                                    {template.description}
                                  </S.CardDescription>
                                  <S.FeaturesList>
                                    {template.features.map((feature) => (
                                      <S.FeatureBadge key={feature}>
                                        {feature}
                                      </S.FeatureBadge>
                                    ))}
                                  </S.FeaturesList>
                                </S.CardContent>
                              </S.Card>
                            ))}
                          </S.Grid>
                        ) : (
                          <S.StepEmpty>
                            No templates match your search. Try a different
                            keyword.
                          </S.StepEmpty>
                        )
                      ) : (
                        <S.StepEmpty>
                          Select a methodology to browse templates.
                        </S.StepEmpty>
                      )}
                    </>
                  )}

                  {currentStep === 2 && selectedTemplate && (
                    <>
                      <S.StepIntro>
                        <S.StepHeading>Project details</S.StepHeading>
                        <S.StepText>
                          Name your project and review the template before
                          creating it.
                        </S.StepText>
                      </S.StepIntro>

                      <S.FormCard>
                        <S.FormHeader>
                          <S.FormTitle>
                            {selectedTemplate.icon}
                            {selectedTemplate.name}
                          </S.FormTitle>
                          <S.FormDescription>
                            {selectedTemplate.description}
                          </S.FormDescription>
                        </S.FormHeader>
                        <S.FormContent>
                          <S.StepSummary>
                            <S.SummaryRow>
                              {methodologyLabel && (
                                <S.SummaryBadge>
                                  {methodologyLabel}
                                </S.SummaryBadge>
                              )}
                              <span>
                                {selectedTemplate.features.length} key focus
                                areas
                              </span>
                            </S.SummaryRow>
                            <S.FeaturesList>
                              {selectedTemplate.features.map((feature) => (
                                <S.FeatureBadge key={feature}>
                                  {feature}
                                </S.FeatureBadge>
                              ))}
                            </S.FeaturesList>
                          </S.StepSummary>

                          <S.InputGroup>
                            <S.Label htmlFor="project-name">
                              Project Name
                            </S.Label>
                            <S.Input
                              id="project-name"
                              placeholder="My Knowledge Base"
                              value={projectName}
                              onChange={(e) => setProjectName(e.target.value)}
                            />
                          </S.InputGroup>
                        </S.FormContent>
                      </S.FormCard>
                    </>
                  )}

                  {currentStep === 2 && !selectedTemplate && (
                    <S.StepEmpty>
                      Select a template before entering project details.
                    </S.StepEmpty>
                  )}
                </S.WizardBody>

                <S.WizardActions>
                  <S.Button
                    variant="ghost"
                    onClick={handlePrevStep}
                    disabled={currentStep === 0}
                  >
                    <ArrowLeft size={16} />
                    Back
                  </S.Button>
                  <S.Button
                    variant="primary"
                    onClick={handleNextStep}
                    disabled={isNextDisabled}
                  >
                    {currentStep === wizardSteps.length - 1
                      ? "Create Project"
                      : "Next"}
                    <ArrowRight size={16} />
                  </S.Button>
                </S.WizardActions>
              </S.WizardCard>
            </S.TabContent>
          </S.TabsContainer>
        </S.MainContent>
      </S.Container>
    </ThemeProvider>
  );
}
