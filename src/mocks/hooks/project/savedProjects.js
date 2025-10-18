// Mock data for saved projects
export const mockSavedProjects = [
  {
    id: "project-1703932800000",
    name: "AI Research Notes",
    methodology: "zettelkasten",
    templateId: "zettelkasten-research",
    createdAt: "2024-12-30T09:00:00.000Z",
    lastModified: "2025-01-15T14:30:00.000Z",
    noteCount: 47,
    description: "Research notes on artificial intelligence and machine learning",
    tags: ["#ai", "#research", "#machine-learning", "#deep-learning"],
    connections: 128,
    lastActivity: "Updated 'Neural Network Architectures' note"
  },
  {
    id: "project-1703846400000",
    name: "Creative Writing Project",
    methodology: "zettelkasten",
    templateId: "zettelkasten-creative",
    createdAt: "2024-12-29T09:00:00.000Z",
    lastModified: "2025-01-14T16:45:00.000Z",
    noteCount: 32,
    description: "Collection of creative writing ideas and character development",
    tags: ["#writing", "#characters", "#plot", "#creativity"],
    connections: 89,
    lastActivity: "Created new character profile for 'Sarah'"
  },
  {
    id: "project-1703760000000",
    name: "Personal Productivity System",
    methodology: "code-para",
    templateId: "code-para-productivity",
    createdAt: "2024-12-28T09:00:00.000Z",
    lastModified: "2025-01-13T11:20:00.000Z",
    noteCount: 25,
    description: "Personal organization system using CODE/PARA methodology",
    tags: ["#productivity", "#gtd", "#organization", "#projects"],
    connections: 56,
    lastActivity: "Archived completed project 'Website Redesign'"
  },
  {
    id: "project-1703673600000",
    name: "Business Strategy Hub",
    methodology: "code-para",
    templateId: "code-para-business",
    createdAt: "2024-12-27T09:00:00.000Z",
    lastModified: "2025-01-12T08:15:00.000Z",
    noteCount: 38,
    description: "Strategic planning and business development resources",
    tags: ["#business", "#strategy", "#planning", "#resources"],
    connections: 72,
    lastActivity: "Added new resource 'Market Analysis Template'"
  },
  {
    id: "project-1703587200000",
    name: "Learning & Development",
    methodology: "zettelkasten",
    templateId: "zettelkasten-research",
    createdAt: "2024-12-26T09:00:00.000Z",
    lastModified: "2025-01-11T19:30:00.000Z",
    noteCount: 18,
    description: "Personal learning journey and skill development tracking",
    tags: ["#learning", "#skills", "#development", "#courses"],
    connections: 34,
    lastActivity: "Linked 'JavaScript Concepts' to 'React Patterns'"
  },
  {
    id: "project-1703500800000",
    name: "Health & Wellness Journal",
    methodology: "code-para",
    templateId: "code-para-productivity",
    createdAt: "2024-12-25T09:00:00.000Z",
    lastModified: "2025-01-10T07:45:00.000Z",
    noteCount: 12,
    description: "Tracking health goals, habits, and wellness insights",
    tags: ["#health", "#wellness", "#habits", "#goals"],
    connections: 23,
    lastActivity: "Updated weekly health metrics"
  }
];

// Helper function to get projects sorted by last modified
export const getRecentProjects = () => {
  return [...mockSavedProjects].sort(
    (a, b) => new Date(b.lastModified) - new Date(a.lastModified)
  );
};

// Helper function to get projects by methodology
export const getProjectsByMethodology = (methodology) => {
  return mockSavedProjects.filter(project => project.methodology === methodology);
};

// Helper function to format date for display
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Helper function to get project stats
export const getProjectStats = () => {
  const totalProjects = mockSavedProjects.length;
  const totalNotes = mockSavedProjects.reduce((sum, project) => sum + project.noteCount, 0);
  const totalConnections = mockSavedProjects.reduce((sum, project) => sum + project.connections, 0);
  const zettelkastenProjects = getProjectsByMethodology("zettelkasten").length;
  const codeParaProjects = getProjectsByMethodology("code-para").length;

  return {
    totalProjects,
    totalNotes,
    totalConnections,
    zettelkastenProjects,
    codeParaProjects,
    averageNotesPerProject: Math.round(totalNotes / totalProjects),
    averageConnectionsPerProject: Math.round(totalConnections / totalProjects)
  };
};
