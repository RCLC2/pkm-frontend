"use client";

import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../styled/thema";
import { getProjectStats, formatDate } from "../../../mocks/hooks/project/savedProjects";
import { welcomePageMockRecentActivity } from "../../../mocks/component/project/welcomePageMock";
import * as S from "./WelcomePageStyled";
import {
  BookOpen,
  FileText,
  Network,
  Plus,
  Calendar,
  Tag,
  TrendingUp,
  Users,
} from "lucide-react";

export function WelcomePage() {
  const { methodology, currentProject } = useOutletContext();
  const [stats, setStats] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const isZettelkasten = methodology === "zettelkasten";

  useEffect(() => {
    // Load stats from saved projects
    const projectStats = getProjectStats();
    const savedProjects = JSON.parse(
      localStorage.getItem("knowledgebase-projects") || "[]"
    );

    // Create stats array
    setStats([
      {
        label: "Total Projects",
        value: projectStats.totalProjects.toString(),
        icon: BookOpen,
      },
      {
        label: "Total Notes",
        value: projectStats.totalNotes.toString(),
        icon: FileText,
      },
      {
        label: "Connections",
        value: projectStats.totalConnections.toString(),
        icon: Network,
      },
      {
        label: "Avg Notes/Project",
        value: projectStats.averageNotesPerProject.toString(),
        icon: TrendingUp,
      },
    ]);

    // Create recent activity from saved projects
    const recentProjects = savedProjects
      .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified))
      .slice(0, 5);

    const activities = recentProjects.map((project) => ({
      type: "project",
      title: project.lastActivity || `Updated ${project.name}`,
      action: "Modified",
      time: formatDate(project.lastModified),
      projectName: project.name,
    }));

    setRecentActivity(activities);
  }, []);

  const quickActionsSection = (
    <S.Section>
      <S.SectionHeader>
        <S.SectionTitle>Quick Actions</S.SectionTitle>
      </S.SectionHeader>
      <S.QuickActions>
        <S.ActionCard>
          <S.ActionIcon>
            <Plus size={20} />
          </S.ActionIcon>
          <S.ActionContent>
            <S.ActionTitle>Create New Note</S.ActionTitle>
            <S.ActionDescription>Start writing a new atomic note</S.ActionDescription>
          </S.ActionContent>
        </S.ActionCard>
        <S.ActionCard>
          <S.ActionIcon>
            <Network size={20} />
          </S.ActionIcon>
          <S.ActionContent>
            <S.ActionTitle>Explore Graph</S.ActionTitle>
            <S.ActionDescription>Visualize note connections</S.ActionDescription>
          </S.ActionContent>
        </S.ActionCard>
        <S.ActionCard>
          <S.ActionIcon>
            <BookOpen size={20} />
          </S.ActionIcon>
          <S.ActionContent>
            <S.ActionTitle>Browse Notes</S.ActionTitle>
            <S.ActionDescription>Explore your knowledge base</S.ActionDescription>
          </S.ActionContent>
        </S.ActionCard>
      </S.QuickActions>
    </S.Section>
  );

  return (
    <ThemeProvider theme={theme}>
      <S.WelcomeContainer>
        <S.WelcomeHeader>
          <S.WelcomeTitle>
            Welcome back to {currentProject?.name || "Knowledge Base"}
          </S.WelcomeTitle>
          <S.WelcomeSubtitle>
            {methodology === "zettelkasten"
              ? "Continue building your interconnected knowledge network"
              : "Organize and manage your projects effectively"}
          </S.WelcomeSubtitle>
        </S.WelcomeHeader>

        {!isZettelkasten && (
          <S.StatsGrid>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <S.StatCard key={index}>
                  <S.StatIcon>
                    <Icon size={24} />
                  </S.StatIcon>
                  <S.StatContent>
                    <S.StatValue>{stat.value}</S.StatValue>
                    <S.StatLabel>{stat.label}</S.StatLabel>
                  </S.StatContent>
                </S.StatCard>
              );
            })}
          </S.StatsGrid>
        )}

        {isZettelkasten ? (
          <S.ContentGrid>{quickActionsSection}</S.ContentGrid>
        ) : (
          <S.ContentGrid>
            <S.Section>
              <S.SectionHeader>
                <S.SectionTitle>Recent Activity</S.SectionTitle>
              </S.SectionHeader>
              <S.ActivityList>
                {recentActivity.length > 0
                  ? recentActivity.map((activity, index) => (
                      <S.ActivityItem key={index}>
                        <S.ActivityIcon>
                          {activity.type === "note" && <FileText size={16} />}
                          {activity.type === "connection" && (
                            <Network size={16} />
                          )}
                          {activity.type === "tag" && <Tag size={16} />}
                          {activity.type === "project" && <BookOpen size={16} />}
                        </S.ActivityIcon>
                        <S.ActivityContent>
                          <S.ActivityTitle>{activity.title}</S.ActivityTitle>
                          <S.ActivityMeta>
                            {activity.projectName && `${activity.projectName} • `}
                            {activity.action} • {activity.time}
                          </S.ActivityMeta>
                        </S.ActivityContent>
                      </S.ActivityItem>
                    ))
                  : welcomePageMockRecentActivity.map((activity, index) => (
                      <S.ActivityItem key={index}>
                        <S.ActivityIcon>
                          {activity.type === "note" && <FileText size={16} />}
                          {activity.type === "connection" && (
                            <Network size={16} />
                          )}
                          {activity.type === "tag" && <Tag size={16} />}
                        </S.ActivityIcon>
                        <S.ActivityContent>
                          <S.ActivityTitle>{activity.title}</S.ActivityTitle>
                          <S.ActivityMeta>
                            {activity.action} • {activity.time}
                          </S.ActivityMeta>
                        </S.ActivityContent>
                      </S.ActivityItem>
                  ))}
            </S.ActivityList>
          </S.Section>

            {quickActionsSection}
          </S.ContentGrid>
        )}
      </S.WelcomeContainer>
    </ThemeProvider>
  );
}
