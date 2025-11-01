import { mockSavedProjects } from "./savedProjects";
import { getRecentNotes } from "../../../api/note/noteApi";
import { getWorkspaceGraph } from "../../../api/graph/workspaceGraphApi";

const EDGE_STORAGE_KEY = "knowledgebase-graph-edges";
const DEMO_PROJECT_ID = mockSavedProjects[0]?.id ?? "project-graph-demo";

const readEdgeStore = () => {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(EDGE_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    console.warn("[graphNetwork] edge store parse 실패", error);
    return {};
  }
};

const writeEdgeStore = (store) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(EDGE_STORAGE_KEY, JSON.stringify(store));
  } catch (error) {
    console.warn("[graphNetwork] edge store write 실패", error);
  }
};

const toEdgeKey = (sourceId, targetId) => {
  const from = String(sourceId);
  const to = String(targetId);
  return from < to ? `${from}::${to}` : `${to}::${from}`;
};

const dedupeEdges = (edges, validIds = null) => {
  const seen = new Set();
  const allow = validIds
    ? new Set(Array.from(validIds, (value) => String(value)))
    : null;

  return edges.reduce((acc, edge) => {
    if (!edge) return acc;
    const sourceId = String(edge.sourceId ?? edge.from ?? "");
    const targetId = String(edge.targetId ?? edge.to ?? "");
    if (!sourceId || !targetId || sourceId === targetId) {
      return acc;
    }

    if (allow) {
      if (!allow.has(sourceId) || !allow.has(targetId)) {
        return acc;
      }
    }

    const key = toEdgeKey(sourceId, targetId);
    if (seen.has(key)) {
      return acc;
    }

    seen.add(key);
    acc.push({ sourceId, targetId });
    return acc;
  }, []);
};

const GRAPH_PRESETS = {
  zettelkasten: {
    nodes: [
      { id: "preset-zettel-1", title: "Knowledge Core", type: "note", tags: ["hub"] },
      { id: "preset-zettel-2", title: "Fleeting Ideas", type: "idea", tags: ["capture"] },
      { id: "preset-zettel-3", title: "Literature Notes", type: "resource", tags: ["reference"] },
      { id: "preset-zettel-4", title: "Research Project", type: "project", tags: ["active"] },
    ],
    edges: [
      { sourceId: "preset-zettel-1", targetId: "preset-zettel-2" },
      { sourceId: "preset-zettel-1", targetId: "preset-zettel-3" },
      { sourceId: "preset-zettel-3", targetId: "preset-zettel-4" },
    ],
  },
  "code-para": {
    nodes: [
      { id: "preset-para-1", title: "Projects", type: "project", tags: ["current"] },
      { id: "preset-para-2", title: "Areas", type: "area", tags: ["ongoing"] },
      { id: "preset-para-3", title: "Resources", type: "resource", tags: ["library"] },
      { id: "preset-para-4", title: "Archive", type: "archive", tags: ["history"] },
    ],
    edges: [
      { sourceId: "preset-para-1", targetId: "preset-para-2" },
      { sourceId: "preset-para-2", targetId: "preset-para-3" },
      { sourceId: "preset-para-3", targetId: "preset-para-4" },
    ],
  },
};

const determineParaType = (note) => {
  const category = note.paraCategory
    ? String(note.paraCategory).toLowerCase()
    : "";
  if (category) return category;

  const id = String(note.id || "").toLowerCase();
  if (id.includes("project")) return "project";
  if (id.includes("area")) return "area";
  if (id.includes("resource")) return "resource";
  if (id.includes("archive")) return "archive";
  if (id.includes("habit") || id.includes("task")) return "task";
  if (id.includes("express")) return "project";
  if (id.includes("distill")) return "note";
  if (id.includes("capture")) return "idea";
  return "note";
};

const determineNodeType = (note, methodology) => {
  if (methodology === "code-para" || methodology === "para") {
    return determineParaType(note);
  }

  const tags = (note.tags || []).map((tag) => String(tag).toLowerCase());
  if (tags.some((tag) => tag.includes("idea"))) return "idea";
  if (tags.some((tag) => tag.includes("project"))) return "project";
  if (tags.some((tag) => tag.includes("resource") || tag.includes("reference"))) {
    return "resource";
  }
  if (tags.some((tag) => tag.includes("archive"))) return "archive";
  return "note";
};

const toTimestamp = (note) => {
  const value =
    note.updatedAt || note.lastModified || note.createdAt || note.created_at;
  const time = value ? Date.parse(value) : NaN;
  return Number.isFinite(time) ? time : 0;
};

const buildSequentialEdges = (notes) => {
  if (notes.length < 2) return [];
  const sorted = [...notes].sort((a, b) => toTimestamp(a) - toTimestamp(b));
  const edges = [];
  for (let index = 1; index < sorted.length; index += 1) {
    const prev = sorted[index - 1];
    const current = sorted[index];
    edges.push({ sourceId: prev.id, targetId: current.id });
  }
  return edges;
};

const buildTagEdges = (notes) => {
  const tagMap = new Map();
  notes.forEach((note) => {
    (note.tags || []).forEach((rawTag) => {
      const tag = String(rawTag).toLowerCase();
      if (!tagMap.has(tag)) {
        tagMap.set(tag, []);
      }
      tagMap.get(tag).push(note.id);
    });
  });

  const edges = [];
  tagMap.forEach((ids) => {
    if (ids.length < 2) return;
    const anchor = ids[0];
    for (let index = 1; index < ids.length; index += 1) {
      edges.push({ sourceId: anchor, targetId: ids[index] });
    }
  });

  return edges;
};

const normalizeApiNode = (node, methodology) => {
  if (!node) return null;
  const id = node.id ?? node.noteId ?? node.nodeId;
  if (!id) return null;
  return {
    id,
    title: node.title || node.name || "Untitled Note",
    type: node.type || determineNodeType(node, methodology),
    tags: node.tags || [],
  };
};

const normalizeApiEdge = (edge) => {
  if (!edge) return null;
  const sourceId = edge.sourceId ?? edge.from ?? edge.source ?? edge.start;
  const targetId = edge.targetId ?? edge.to ?? edge.target ?? edge.end;
  if (!sourceId || !targetId) return null;
  return { sourceId, targetId };
};

const buildGraphFromNotes = async (projectId, methodology) => {
  try {
    const notes = await getRecentNotes({ workspaceId: projectId, size: 120 });
    if (!Array.isArray(notes) || notes.length === 0) {
      return null;
    }

    const nodes = notes.map((note) => ({
      id: note.id,
      title: note.title || "Untitled Note",
      type: determineNodeType(note, methodology),
      tags: note.tags || [],
    }));

    const sequentialEdges = buildSequentialEdges(notes);
    const tagEdges = buildTagEdges(notes);
    const idSet = new Set(nodes.map((node) => String(node.id)));
    const generatedEdges = dedupeEdges([...sequentialEdges, ...tagEdges], idSet);

    return { nodes, edges: generatedEdges };
  } catch (error) {
    console.warn("[graphNetwork] recent notes fetch 실패", error);
    return null;
  }
};

const buildPresetGraph = (methodology) => {
  const preset = GRAPH_PRESETS[methodology] ?? GRAPH_PRESETS.zettelkasten;
  return {
    nodes: preset.nodes,
    edges: preset.edges,
  };
};

const mergeEdges = (existing = [], generated = [], validIds = null) => {
  const merged = [...(existing || []), ...(generated || [])];
  return dedupeEdges(merged, validIds);
};

export const mockGraphApi = {
  async fetchGraph({ projectId = DEMO_PROJECT_ID, methodology = "zettelkasten" }) {
    const store = readEdgeStore();

    if (!projectId) {
      return { projectId, nodes: [], edges: [] };
    }

    try {
      const apiGraph = await getWorkspaceGraph(projectId);
      console.log("[graphNetwork] workspace graph api response", apiGraph);

      const nodes = Array.isArray(apiGraph?.nodes)
        ? apiGraph.nodes
            .map((node) => normalizeApiNode(node, methodology))
            .filter(Boolean)
        : [];

      const edgesFromApi = Array.isArray(apiGraph?.edges)
        ? dedupeEdges(apiGraph.edges.map(normalizeApiEdge).filter(Boolean))
        : [];

      if (!nodes.length) {
        return { projectId, nodes: [], edges: [] };
      }

      const validIds = new Set(nodes.map((node) => String(node.id)));
      const storedEdges = Array.isArray(store[projectId]) ? store[projectId] : [];
      const mergedEdges = mergeEdges(storedEdges, edgesFromApi, validIds);

      if (mergedEdges.length !== storedEdges.length) {
        store[projectId] = mergedEdges;
        writeEdgeStore(store);
      }

      const response = { projectId, nodes, edges: mergedEdges };
      console.log("[graphNetwork] normalized graph response", response);
      return response;
    } catch (error) {
      console.error("[graphNetwork] workspace graph api error", error);
      return { projectId, nodes: [], edges: [] };
    }
  },

  async createBacklink({ projectId = DEMO_PROJECT_ID, sourceId, targetId }) {
    const store = readEdgeStore();
    const current = Array.isArray(store[projectId]) ? store[projectId] : [];
    const edges = dedupeEdges([...current, { sourceId, targetId }], null);
    store[projectId] = edges;
    writeEdgeStore(store);

    const edgeId = toEdgeKey(sourceId, targetId);
    console.info("[graphNetwork] createBacklink", { projectId, sourceId, targetId });
    return {
      projectId,
      edgeId,
      sourceId,
      targetId,
      createdAt: new Date().toISOString(),
    };
  },

  async deleteBacklink({ projectId = DEMO_PROJECT_ID, sourceId, targetId }) {
    const store = readEdgeStore();
    const current = Array.isArray(store[projectId]) ? store[projectId] : [];
    const key = toEdgeKey(sourceId, targetId);
    const edges = current.filter(
      (edge) => toEdgeKey(edge.sourceId, edge.targetId) !== key
    );
    store[projectId] = edges;
    writeEdgeStore(store);

    console.info("[graphNetwork] deleteBacklink", { projectId, sourceId, targetId });
    return {
      projectId,
      edgeId: key,
      removed: true,
      removedAt: new Date().toISOString(),
    };
  },
};

export { DEMO_PROJECT_ID as DEMO_GRAPH_PROJECT_ID };
