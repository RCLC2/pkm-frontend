"use client";

import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { mockSavedProjects } from "./mockdata/savedProjects";

// Legacy Dashboard component - redirects to new routing structure
export default function Dashboard() {
  useEffect(() => {
    // Initialize localStorage with mock data if empty
    const existingProjects = localStorage.getItem("knowledgebase-projects");
    if (!existingProjects || JSON.parse(existingProjects).length === 0) {
      localStorage.setItem(
        "knowledgebase-projects",
        JSON.stringify(mockSavedProjects)
      );
    }
  }, []);

  // Check if user has projects
  const savedProjects = JSON.parse(
    localStorage.getItem("knowledgebase-projects") || "[]"
  );

  // If no projects, redirect to projects page (though mockdata should be loaded)
  if (savedProjects.length === 0) {
    return <Navigate to="/projects" replace />;
  }

  // If has projects, redirect to dashboard welcome page
  return <Navigate to="/dashboard" replace />;
}