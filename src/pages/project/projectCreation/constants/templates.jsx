import {
  BookOpen,
  Briefcase,
  Sparkles,
  FolderTree,
} from "lucide-react";

export const templates = [
  {
    id: "zettelkasten-research",
    name: "Zettelkasten Research",
    methodology: "zettelkasten",
    description:
      "Perfect for academic research, literature reviews, and building interconnected knowledge networks.",
    icon: <BookOpen size={32} />,
    features: [
      "Atomic Notes",
      "Bi-directional Links",
      "Graph Visualization",
      "Tag System",
    ],
    preview: "/img/preview/zettelkasten-research-notes-graph.jpg",
  },
  {
    id: "zettelkasten-creative",
    name: "Creative Writing",
    methodology: "zettelkasten",
    description:
      "Ideal for writers, bloggers, and creative professionals building idea networks.",
    icon: <Sparkles size={32} />,
    features: [
      "Idea Connections",
      "Writing Prompts",
      "Character Development",
      "Plot Threads",
    ],
    preview: "/img/preview/creative-writing-notes-ideas.jpg",
  },
  {
    id: "code-para-productivity",
    name: "Personal Productivity",
    methodology: "code-para",
    description:
      "Organize your life with the proven CODE/PARA system for maximum productivity.",
    icon: <Briefcase size={32} />,
    features: [
      "Project Management",
      "Area Organization",
      "Resource Library",
      "Archive System",
    ],
    preview: "/img/preview/productivity-dashboard-tasks-projects.jpg",
  },
  {
    id: "code-para-business",
    name: "Business Management",
    methodology: "code-para",
    description:
      "Manage business operations, client projects, and strategic planning effectively.",
    icon: <FolderTree size={32} />,
    features: [
      "Client Projects",
      "Strategic Planning",
      "Resource Management",
      "Team Collaboration",
    ],
    preview: "/img/preview/business-management-dashboard-projects.jpg",
  },
];

export const bookColors = [
  "#6C63FF",
  "#FF6584",
  "#FFA947",
  "#00C9A7",
  "#5D9CEC",
];
