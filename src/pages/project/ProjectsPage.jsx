"use client";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ProjectCreation } from "./projectCreation/ProjectCreation";
import { mockSavedProjects } from "../../mocks/hooks/project/savedProjects";

export function ProjectsPage() {
  const navigate = useNavigate();

  // Initialize localStorage with mock data if empty
  useEffect(() => {
    const existingProjects = localStorage.getItem("knowledgebase-projects");
    if (!existingProjects || JSON.parse(existingProjects).length === 0) {
      localStorage.setItem(
        "knowledgebase-projects",
        JSON.stringify(mockSavedProjects)
      );
    }
  }, []);

  const handleCreateProject = (template, projectName) => {
    const projectId = `project-${Date.now()}`;
    const project = { template, name: projectName, id: projectId };

    // Save project to localStorage
    const savedProjects = JSON.parse(
      localStorage.getItem("knowledgebase-projects") || "[]"
    );
    const newProject = {
      id: project.id,
      name: project.name,
      methodology: project.template.methodology,
      templateId: project.template.id,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      noteCount: 1,
      description: `New ${project.template.methodology} project`,
      tags: ["#new"],
      connections: 0,
      lastActivity: "Project created"
    };

    const existingIndex = savedProjects.findIndex((p) => p.id === project.id);
    if (existingIndex >= 0) {
      savedProjects[existingIndex] = {
        ...savedProjects[existingIndex],
        lastModified: new Date().toISOString(),
      };
    } else {
      savedProjects.unshift(newProject);
    }

    localStorage.setItem(
      "knowledgebase-projects",
      JSON.stringify(savedProjects)
    );

    // Navigate to dashboard
    navigate("/dashboard");
  };

  const handleOpenProject = (savedProject) => {
    // Update last modified timestamp
    const savedProjects = JSON.parse(
      localStorage.getItem("knowledgebase-projects") || "[]"
    );
    const updatedProjects = savedProjects.map((p) =>
      p.id === savedProject.id
        ? { ...p, lastModified: new Date().toISOString() }
        : p
    );
    localStorage.setItem(
      "knowledgebase-projects",
      JSON.stringify(updatedProjects)
    );

    // Navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <ProjectCreation
      onCreateProject={handleCreateProject}
      onOpenProject={handleOpenProject}
    />
  );
}
