"use client";

import { useNavigate } from "react-router-dom";
import { useGetWorkspaces } from "../../hooks/workspace/useGetWorkspaces"; // ✅ 백엔드 조회 훅
import { ProjectCreation } from "./projectCreation/ProjectCreation";

export function ProjectsPage() {
  const navigate = useNavigate();
  const userId = "12321"; // 로그인 된 유저 ID (테스트용)

  const { data } = useGetWorkspaces(userId);
  const workspaces = data?.data || [];

  const handleCreateProject = (template, projectName) => {
    console.log("새 워크스페이스 생성 요청:", { template, projectName });
    navigate("/dashboard");
  };

  const handleOpenProject = (workspace) => {
    console.log("열린 워크스페이스:", workspace);
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
