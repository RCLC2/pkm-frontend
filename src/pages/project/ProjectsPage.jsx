"use client";

import { useNavigate } from "react-router-dom";
import { useGetWorkspaces } from "../../hooks/workspace/useGetWorkspaces"; // 백엔드 조회 훅
import { ProjectCreation } from "./projectCreation/ProjectCreation";

export function ProjectsPage() {
  const navigate = useNavigate();

  const { data } = useGetWorkspaces();
  const workspaces = data?.data ?? data ?? [];

  const handleCreateProject = (template, projectName) => {
    console.log("새 워크스페이스 생성 요청:", { template, projectName });
    navigate("/dashboard");
  };

  const handleOpenProject = (workspace) => {
    console.log("열린 워크스페이스:", workspace);
    localStorage.setItem("current_workspace", JSON.stringify(workspace));
    navigate("/dashboard");
  };

  return (
    <ProjectCreation
      onCreateProject={handleCreateProject}
      onOpenProject={handleOpenProject}
      projects={workspaces}
    />
  );
}
