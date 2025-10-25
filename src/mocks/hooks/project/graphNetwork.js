import { mockSavedProjects } from "./savedProjects";

const DEMO_PROJECT_ID = mockSavedProjects[0]?.id ?? "project-graph-demo";

const zettelFilenameMap = {
  "note-atomic": "atomic-notes.md",
  "note-linking": "linking-practices.md",
  "note-graph": "graph-exploration.md",
  "note-project-ai": "ai-research-plan.md",
  "note-literature": "literature-digest.md",
  "note-writing": "writing-pipeline.md",
  "note-areas": "growth-areas.md",
  "note-archive": "cold-storage.md",
};

const zettelkastenNodes = [
  {
    id: "note-atomic",
    title: "Atomic Notes",
    type: "note",
    tags: ["#zettelkasten", "#evergreen"],
    filename: zettelFilenameMap["note-atomic"],
  },
  {
    id: "note-linking",
    title: "Linking Practices",
    type: "concept",
    tags: ["#structure"],
    filename: zettelFilenameMap["note-linking"],
  },
  {
    id: "note-graph",
    title: "Graph Exploration",
    type: "idea",
    tags: ["#visual"],
    filename: zettelFilenameMap["note-graph"],
  },
  {
    id: "note-project-ai",
    title: "AI Research Project",
    type: "project",
    tags: ["#ai", "#lab"],
    filename: zettelFilenameMap["note-project-ai"],
  },
  {
    id: "note-literature",
    title: "Literature Notes",
    type: "resource",
    tags: ["#references"],
    filename: zettelFilenameMap["note-literature"],
  },
  {
    id: "note-writing",
    title: "Writing Pipeline",
    type: "project",
    tags: ["#draft"],
    filename: zettelFilenameMap["note-writing"],
  },
  {
    id: "note-areas",
    title: "Areas of Growth",
    type: "area",
    tags: ["#learning"],
    filename: zettelFilenameMap["note-areas"],
  },
  {
    id: "note-archive",
    title: "Cold Storage",
    type: "archive",
    tags: ["#reference"],
    filename: zettelFilenameMap["note-archive"],
  },
];

const zettelkastenEdges = [
  { sourceId: "note-atomic", targetId: "note-linking" },
  { sourceId: "note-atomic", targetId: "note-graph" },
  { sourceId: "note-linking", targetId: "note-literature" },
  { sourceId: "note-linking", targetId: "note-writing" },
  { sourceId: "note-graph", targetId: "note-project-ai" },
  { sourceId: "note-project-ai", targetId: "note-literature" },
  { sourceId: "note-project-ai", targetId: "note-areas" },
  { sourceId: "note-writing", targetId: "note-areas" },
  { sourceId: "note-areas", targetId: "note-archive" },
];

const codeParaNodes = [
  {
    id: "para-projects",
    title: "Active Projects",
    type: "project",
    tags: ["#current"],
  },
  {
    id: "para-areas",
    title: "Areas of Responsibility",
    type: "area",
    tags: ["#ongoing"],
  },
  {
    id: "para-resources",
    title: "Resource Library",
    type: "resource",
    tags: ["#references"],
  },
  {
    id: "para-archive",
    title: "Archive",
    type: "archive",
    tags: ["#history"],
  },
  {
    id: "para-capture",
    title: "Capture Inbox",
    type: "idea",
    tags: ["#capture"],
  },
  {
    id: "para-distill",
    title: "Distilled Notes",
    type: "note",
    tags: ["#synthesis"],
  },
  {
    id: "para-express",
    title: "Express Pipeline",
    type: "project",
    tags: ["#output"],
  },
  {
    id: "para-habits",
    title: "Rituals",
    type: "task",
    tags: ["#weekly"],
  },
];

const codeParaEdges = [
  { sourceId: "para-capture", targetId: "para-distill" },
  { sourceId: "para-distill", targetId: "para-express" },
  { sourceId: "para-express", targetId: "para-projects" },
  { sourceId: "para-projects", targetId: "para-areas" },
  { sourceId: "para-areas", targetId: "para-resources" },
  { sourceId: "para-resources", targetId: "para-archive" },
  { sourceId: "para-projects", targetId: "para-habits" },
  { sourceId: "para-habits", targetId: "para-areas" },
  { sourceId: "para-distill", targetId: "para-resources" },
];

const MOCK_GRAPH_DATA = {
  zettelkasten: {
    nodes: zettelkastenNodes,
    edges: zettelkastenEdges,
  },
  "code-para": {
    nodes: codeParaNodes,
    edges: codeParaEdges,
  },
};

export const mockGraphApi = {
  async fetchGraph({ projectId = DEMO_PROJECT_ID, methodology = "zettelkasten" }) {
    const data = MOCK_GRAPH_DATA[methodology] ?? MOCK_GRAPH_DATA.zettelkasten;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          projectId,
          nodes: data.nodes,
          edges: data.edges,
        });
      }, 180);
    });
  },

  async createBacklink({ projectId = DEMO_PROJECT_ID, sourceId, targetId }) {
    const edgeId = `${sourceId}::${targetId}`;
    console.info("[mockGraphApi] createBacklink", { projectId, sourceId, targetId, edgeId });
    return {
      projectId,
      edgeId,
      sourceId,
      targetId,
      createdAt: new Date().toISOString(),
    };
  },

  async deleteBacklink({ projectId = DEMO_PROJECT_ID, sourceId, targetId }) {
    const edgeId = `${sourceId}::${targetId}`;
    console.info("[mockGraphApi] deleteBacklink", { projectId, sourceId, targetId, edgeId });
    return {
      projectId,
      edgeId,
      removed: true,
      removedAt: new Date().toISOString(),
    };
  },
};

export { DEMO_PROJECT_ID as DEMO_GRAPH_PROJECT_ID };
