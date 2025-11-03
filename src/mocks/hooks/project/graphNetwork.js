import { mockSavedProjects } from "./savedProjects";
import { getNotesByIds, getNoteById } from "../../../api/note/noteApi";

const EDGE_STORAGE_KEY = "knowledgebase-graph-edges";
const DEMO_PROJECT_ID = mockSavedProjects[0]?.id ?? "project-graph-demo";

const FALLBACK_GRAPH = {
  nodes: [
    {
      id: "mock-page-1",
      title: "Welcome Guide",
      type: "note",
      tags: ["intro", "start"],
    },
    {
      id: "mock-page-2",
      title: "Project Overview",
      type: "project",
      tags: ["summary"],
    },
    {
      id: "mock-page-3",
      title: "Key Concepts",
      type: "concept",
      tags: ["reference"],
    },
    {
      id: "mock-page-4",
      title: "Active Notes",
      type: "idea",
      tags: ["work"],
    },
    {
      id: "mock-page-5",
      title: "Archive",
      type: "archive",
      tags: ["history"],
    },
  ],
  edges: [
    { sourceId: "mock-page-1", targetId: "mock-page-2", status: "confirmed" },
    { sourceId: "mock-page-2", targetId: "mock-page-3", status: "edited" },
    { sourceId: "mock-page-3", targetId: "mock-page-4", status: "pending" },
    { sourceId: "mock-page-4", targetId: "mock-page-5", status: "edited" },
    { sourceId: "mock-page-1", targetId: "mock-page-4", status: "edited" },
  ],
};

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
    acc.push({ sourceId, targetId, status: edge.status || "edited" });
    return acc;
  }, []);
};

const determineParaType = (node) => {
  const category = node.paraCategory
    ? String(node.paraCategory).toLowerCase()
    : "";
  if (category) return category;

  const id = String(node.id || "").toLowerCase();
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

const determineNodeType = (node, methodology) => {
  if (methodology === "code-para" || methodology === "para") {
    return determineParaType(node);
  }

  const tags = (node.tags || []).map((tag) => String(tag).toLowerCase());
  if (tags.some((tag) => tag.includes("idea"))) return "idea";
  if (tags.some((tag) => tag.includes("project"))) return "project";
  if (tags.some((tag) => tag.includes("resource") || tag.includes("reference"))) {
    return "resource";
  }
  if (tags.some((tag) => tag.includes("archive"))) return "archive";
  return "note";
};

const normalizeApiNode = (node, methodology) => {
  if (!node || typeof node !== "object") return null;
  const id =
    node.id ??
    node.noteId ??
    node.pageId ??
    node.nodeId ??
    node.documentId ??
    node.cardId ??
    node.contentId;
  if (!id) return null;

  const rawType =
    node.type ??
    node.noteType ??
    node.pageType ??
    node.paraCategory ??
    node.category;

  const title =
    node.title ??
    node.name ??
    node.pageTitle ??
    node.noteTitle ??
    node.heading ??
    `Untitled ${id}`;

  const tagsSource =
    node.tags ??
    node.pageTags ??
    node.noteTags ??
    node.labels ??
    [];

  const filename =
    node.filename ??
    node.fileName ??
    node.slug ??
    node.path ??
    null;

  return {
    id: String(id),
    title,
    type: rawType
      ? String(rawType).toLowerCase()
      : determineNodeType(node, methodology),
    tags: Array.isArray(tagsSource) ? tagsSource : [],
    filename,
  };
};

const normalizeApiEdge = (edge) => {
  if (!edge || typeof edge !== "object") return null;
  const sourceId =
    edge.sourceId ??
    edge.from ??
    edge.source ??
    edge.start ??
    edge.sourceNoteId ??
    edge.sourcePageId ??
    edge.parentId ??
    edge.originId;
  const targetId =
    edge.targetId ??
    edge.to ??
    edge.target ??
    edge.end ??
    edge.targetNoteId ??
    edge.targetPageId ??
    edge.childId ??
    edge.destinationId;
  if (!sourceId || !targetId) return null;

  return {
    sourceId: String(sourceId),
    targetId: String(targetId),
    status: String(edge.status || "edited").toLowerCase(),
  };
};

const GRAPH_NODE_KEYS = [
  "nodes",
  "pages",
  "notes",
  "items",
  "documents",
  "pageResponses",
  "pageNodes",
];

const GRAPH_EDGE_KEYS = [
  "edges",
  "links",
  "connections",
  "relations",
  "relationships",
  "linkResponses",
  "pageLinks",
];

const takeFirstArray = (source, keys) => {
  for (const key of keys) {
    const value = source?.[key];
    if (Array.isArray(value) && value.length > 0) {
      return value;
    }
  }
  return [];
};

const collectGraphSources = (root) => {
  const sources = [];
  const stack = [root];
  const visited = new Set();

  while (stack.length) {
    const current = stack.pop();
    if (!current || typeof current !== "object") continue;
    if (visited.has(current)) continue;
    visited.add(current);

    sources.push(current);

    Object.values(current).forEach((value) => {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        stack.push(value);
      }
    });
  }

  return sources;
};

const normalizeGraphPayload = (payload, methodology) => {
  if (!payload || typeof payload !== "object") {
    return { nodes: [], edges: [] };
  }

  const graphRoot = payload.data && typeof payload.data === "object"
    ? payload.data
    : payload;

  const graphData = graphRoot.graph && typeof graphRoot.graph === "object"
    ? graphRoot.graph
    : graphRoot;

  const nestedData = graphData.data && typeof graphData.data === "object"
    ? graphData.data
    : null;

  let rawNodes = Array.isArray(graphData.nodes) ? graphData.nodes : [];
  if (!rawNodes.length) {
    rawNodes = takeFirstArray(graphData, GRAPH_NODE_KEYS);
  }
  if (!rawNodes.length && nestedData) {
    rawNodes = takeFirstArray(nestedData, GRAPH_NODE_KEYS);
  }
  if (!rawNodes.length) {
    const sources = collectGraphSources(graphData);
    for (const source of sources) {
      rawNodes = takeFirstArray(source, GRAPH_NODE_KEYS);
      if (rawNodes.length) break;
    }
  }

  let rawEdges = Array.isArray(graphData.edges) ? graphData.edges : [];
  if (!rawEdges.length) {
    rawEdges = takeFirstArray(graphData, GRAPH_EDGE_KEYS);
  }
  if (!rawEdges.length && nestedData) {
    rawEdges = takeFirstArray(nestedData, GRAPH_EDGE_KEYS);
  }
  if (!rawEdges.length) {
    const sources = collectGraphSources(graphData);
    for (const source of sources) {
      rawEdges = takeFirstArray(source, GRAPH_EDGE_KEYS);
      if (rawEdges.length) break;
    }
  }

  const nodes = rawNodes
    .map((node) => normalizeApiNode(node, methodology))
    .filter(Boolean);

  const validIds = new Set(nodes.map((node) => node.id));
  const edges = dedupeEdges(
    rawEdges.map((edge) => normalizeApiEdge(edge)).filter(Boolean),
    validIds
  );

  return { nodes, edges };
};

const mergeEdges = (existing = [], incoming = [], validIds) => {
  const dedupedExisting = dedupeEdges(existing, validIds);
  const merged = [...dedupedExisting, ...incoming];
  return dedupeEdges(merged, validIds);
};

const fetchWorkspaceNotes = async (workspaceId) => {
  try {
    const noteIds = await getNotesByIds({ workspaceId });
    console.log("[graphNetwork] note ids for workspace", workspaceId, noteIds);

    if (!Array.isArray(noteIds) || noteIds.length === 0) {
      return [];
    }

    const seen = new Set();
    const normalizedIds = [];

    noteIds.forEach((candidate) => {
      const rawId =
        candidate && typeof candidate === "object" && "id" in candidate
          ? candidate.id
          : candidate;
      if (!rawId) return;
      const key = String(rawId);
      if (seen.has(key)) return;
      seen.add(key);
      normalizedIds.push(rawId);
    });

    const limitedIds = normalizedIds.slice(0, 200);
    console.log("[graphNetwork] normalized note id list", limitedIds);

    const notes = await Promise.all(
      limitedIds.map(async (noteId) => {
        try {
          const note = await getNoteById(noteId);
          return note;
        } catch (error) {
          console.warn("[graphNetwork] failed to fetch note", noteId, error);
          return null;
        }
      })
    );

    return notes.filter(Boolean);
  } catch (error) {
    console.error("[graphNetwork] failed to fetch workspace notes", error);
    return [];
  }
};

export const mockGraphApi = {
  async fetchGraph({ projectId = DEMO_PROJECT_ID, methodology = "zettelkasten" }) {
    const store = readEdgeStore();

    if (!projectId) {
      return { projectId, nodes: [], edges: [] };
    }

    try {
      const notes = await fetchWorkspaceNotes(projectId);
      console.log("[graphNetwork] fetched workspace notes", notes);

      const normalizedResponse = normalizeGraphPayload({ nodes: notes, edges: [] }, methodology);
      console.log("[graphNetwork] normalized graph nodes", normalizedResponse.nodes);
      console.log("[graphNetwork] normalized graph edges", normalizedResponse.edges);
      const withFallback = normalizedResponse.nodes.length
        ? normalizedResponse
        : FALLBACK_GRAPH;

      const validIds = new Set(withFallback.nodes.map((node) => node.id));
      const storedEdges = Array.isArray(store[projectId]) ? store[projectId] : [];
      const mergedEdges = mergeEdges(storedEdges, withFallback.edges, validIds);

      if (mergedEdges.length !== storedEdges.length) {
        store[projectId] = mergedEdges;
        writeEdgeStore(store);
      }

      const result = {
        projectId,
        nodes: withFallback.nodes,
        edges: mergedEdges,
      };

      console.log("[graphNetwork] normalized graph response", result);
      return result;
    } catch (error) {
      console.error("[graphNetwork] workspace graph api error", error);
      return { projectId, nodes: [], edges: [] };
    }
  },

  async createBacklink({ projectId = DEMO_PROJECT_ID, sourceId, targetId }) {
    const store = readEdgeStore();
    const current = Array.isArray(store[projectId]) ? store[projectId] : [];
    const edges = dedupeEdges([...current, { sourceId, targetId, status: "edited" }], null);
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
