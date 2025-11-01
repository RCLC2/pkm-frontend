"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ThemeProvider } from "styled-components";
import { ZoomIn, ZoomOut, Maximize, RotateCcw } from "lucide-react";
import { theme } from "../../../styled/thema";
import * as S from "./GraphViewStyled";
import {
  mockGraphApi,
  DEMO_GRAPH_PROJECT_ID,
} from "../../../mocks/hooks/project/graphNetwork";

const graphService = mockGraphApi;
const FALLBACK_PROJECT_ID = DEMO_GRAPH_PROJECT_ID;

const TYPE_CONFIG = {
  note: { label: "Permanent Note" },
  idea: { label: "Fleeting Idea" },
  resource: { label: "Literature" },
  project: { label: "Project" },
  area: { label: "Area" },
  archive: { label: "Archive" },
  concept: { label: "Concept" },
  task: { label: "Task" },
};

const FORCE_SETTINGS = {
  repulsionStrength: 16000,
  springStrength: 0.08,
  springLength: 120,
  damping: 0.12,
  attraction: 0.0025,
  maxVelocity: 24,
};

const MIN_SCALE = 0.45;
const MAX_SCALE = 2.4;

function normalizeEdge(a, b) {
  return a < b ? [a, b] : [b, a];
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function composeGraph(rawNodes, rawEdges) {
  const nodes = rawNodes.map((node) => ({
    ...node,
    tags: node.tags ?? [],
    filename: node.filename,
    vx: node.vx ?? 0,
    vy: node.vy ?? 0,
    degree: 0,
    seed: node.seed ?? Math.random() * Math.PI * 2,
  }));

  const edges = rawEdges.map((edge) => {
    const from = edge.from;
    const to = edge.to;
    const [normalizedFrom, normalizedTo] = normalizeEdge(from, to);
    return { from: normalizedFrom, to: normalizedTo };
  });

  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const adjacency = new Map(nodes.map((node) => [node.id, new Set()]));

  edges.forEach(({ from, to }) => {
    adjacency.get(from)?.add(to);
    adjacency.get(to)?.add(from);
  });

  nodes.forEach((node) => {
    node.degree = adjacency.get(node.id)?.size ?? 0;
  });

  return { nodes, edges, nodeMap, adjacency };
}

function convertApiGraph(apiNodes = [], apiEdges = []) {
  if (!apiNodes.length) return null;
  const total = apiNodes.length || 1;
  const nodes = apiNodes.map((node, index) => {
    const angle = (index / total) * Math.PI * 2;
    const baseRadius = 230 + (node.type === "area" ? 80 : 0);
    const jitter = (Math.random() - 0.5) * 60;
    return {
      id: node.id,
      title: node.title,
      type: node.type ?? "note",
      tags: node.tags ?? [],
      x: Math.cos(angle) * baseRadius + jitter,
      y: Math.sin(angle) * baseRadius + jitter,
      vx: 0,
      vy: 0,
      degree: 0,
      seed: Math.random() * Math.PI * 2,
    };
  });

  const edges = apiEdges.map((edge) => {
    const from = edge.sourceId ?? edge.from;
    const to = edge.targetId ?? edge.to;
    const [normalizedFrom, normalizedTo] = normalizeEdge(from, to);
    return { from: normalizedFrom, to: normalizedTo };
  });

  return composeGraph(nodes, edges);
}

function simulate(graph, time = 0, delta = 0.016) {
  const { nodes, edges } = graph;
  if (!nodes.length) return;

  const baseStep = 1 / 60;
  const step = Math.min(delta / baseStep, 2);

  const repulsion = FORCE_SETTINGS.repulsionStrength;
  const springStrength = FORCE_SETTINGS.springStrength;
  const springLength = FORCE_SETTINGS.springLength;
  const damping = FORCE_SETTINGS.damping;
  const attraction = FORCE_SETTINGS.attraction;
  const maxVelocity = FORCE_SETTINGS.maxVelocity;

  for (let i = 0; i < nodes.length; i += 1) {
    const nodeA = nodes[i];
    for (let j = i + 1; j < nodes.length; j += 1) {
      const nodeB = nodes[j];
      const dx = nodeA.x - nodeB.x;
      const dy = nodeA.y - nodeB.y;
      const distSq = dx * dx + dy * dy + 0.01;
      const force = (repulsion / distSq) * step;
      const distance = Math.sqrt(distSq);
      const fx = (dx / distance) * force;
      const fy = (dy / distance) * force;

      nodeA.vx += fx;
      nodeA.vy += fy;
      nodeB.vx -= fx;
      nodeB.vy -= fy;
    }
  }

  edges.forEach(({ from, to }) => {
    const source = graph.nodeMap.get(from);
    const target = graph.nodeMap.get(to);
    if (!source || !target) return;

    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const distance = Math.sqrt(dx * dx + dy * dy) || 0.0001;
    const displacement = distance - springLength;
    const force = displacement * springStrength * step;
    const fx = (dx / distance) * force;
    const fy = (dy / distance) * force;

    source.vx += fx;
    source.vy += fy;
    target.vx -= fx;
    target.vy -= fy;
  });

  const dampingScale = 1 - (1 - damping) * Math.min(step, 1);
  const idleStrength = 0.018 * step;

  nodes.forEach((node, index) => {
    node.vx += -node.x * attraction * step;
    node.vy += -node.y * attraction * step;

    const idlePhase = time * 0.7 + (node.seed ?? index * 0.5);
    node.vx += Math.cos(idlePhase) * idleStrength;
    node.vy += Math.sin(idlePhase * 0.85) * idleStrength;

    node.vx *= dampingScale;
    node.vy *= dampingScale;

    const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
    const maxSpeed = maxVelocity * step;
    if (speed > maxSpeed) {
      const scale = maxSpeed / speed;
      node.vx *= scale;
      node.vy *= scale;
    }

    node.x += node.vx * step;
    node.y += node.vy * step;
  });
}

function getNodeRadius(node) {
  const base = 11;
  return base + Math.min(node.degree, 6) * 4;
}

function toGray(value) {
  const clamped = clamp(Math.round(value), 58, 232);
  const hex = clamped.toString(16).padStart(2, "0");
  return `#${hex}${hex}${hex}`;
}

function getNodePalette(node, intensity = 0) {
  const degree = clamp(node.degree ?? 0, 0, 12);
  const base = 200 - degree * 7;
  const fill = toGray(base + intensity * 12);
  const stroke = toGray(base - 18 + intensity * 8);
  const shadow = `rgba(255, 255, 255, ${0.18 + intensity * 0.12})`;
  return { fill, stroke, shadow };
}

function pointToSegmentDistance(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  if (dx === 0 && dy === 0) {
    const ddx = px - x1;
    const ddy = py - y1;
    return Math.sqrt(ddx * ddx + ddy * ddy);
  }

  const t = ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy);
  const clampedT = clamp(t, 0, 1);
  const closestX = x1 + clampedT * dx;
  const closestY = y1 + clampedT * dy;
  const ddx = px - closestX;
  const ddy = py - closestY;
  return Math.sqrt(ddx * ddx + ddy * ddy);
}

function drawGraph(ctx, canvas, graph, view, highlight) {
  const dpr = window.devicePixelRatio || 1;
  ctx.save();
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#050509";
  ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);

  ctx.translate(view.offsetX, view.offsetY);
  ctx.scale(view.scale, view.scale);

  const { nodes, edges } = graph;
  const { selectedId, hoveredId } = highlight;

  const selectedNeighbors = selectedId
    ? new Set(graph.adjacency.get(selectedId) || [])
    : null;
  const hoveredNeighbors = hoveredId
    ? new Set(graph.adjacency.get(hoveredId) || [])
    : null;

  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  edges.forEach(({ from, to }) => {
    const source = graph.nodeMap.get(from);
    const target = graph.nodeMap.get(to);
    if (!source || !target) return;

    const edgeHighlighted =
      (selectedId &&
        (from === selectedId ||
          to === selectedId ||
          selectedNeighbors?.has(from) ||
          selectedNeighbors?.has(to))) ||
      (hoveredId &&
        (from === hoveredId ||
          to === hoveredId ||
          hoveredNeighbors?.has(from) ||
          hoveredNeighbors?.has(to)));

    ctx.strokeStyle = edgeHighlighted
      ? "rgba(226, 232, 240, 0.7)"
      : "rgba(148, 163, 184, 0.18)";
    ctx.lineWidth = edgeHighlighted ? 2.2 : 1;

    ctx.beginPath();
    ctx.moveTo(source.x, source.y);
    ctx.lineTo(target.x, target.y);
    ctx.stroke();
  });

  nodes.forEach((node) => {
    const radius = getNodeRadius(node);
    const isSelected = node.id === selectedId;
    const isHovered = node.id === hoveredId;
    const isNeighbor =
      (selectedNeighbors && selectedNeighbors.has(node.id)) ||
      (hoveredNeighbors && hoveredNeighbors.has(node.id));
    const shouldDim =
      (selectedId || hoveredId) && !(isSelected || isHovered || isNeighbor);

    const intensity = isSelected ? 2 : isHovered || isNeighbor ? 1 : 0;
    const palette = getNodePalette(node, intensity);

    ctx.save();
    ctx.globalAlpha = shouldDim ? 0.22 : isSelected || isHovered ? 1 : 0.88;
    ctx.fillStyle = palette.fill;

    if (isSelected || isHovered) {
      ctx.shadowColor = palette.shadow;
      ctx.shadowBlur = isSelected ? 24 : 16;
    }

    ctx.beginPath();
    ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.lineWidth = isSelected ? 3 : 1.1;
    ctx.strokeStyle = isSelected ? "#f8fafc" : palette.stroke;
    ctx.stroke();
    ctx.restore();

    const renderLabel = (text, offsetY, options = {}) => {
      ctx.save();
      ctx.font = `${options.weight || 500} ${
        options.size || 12
      }px 'Inter', sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const paddingX = options.paddingX || 12;
      const paddingY = options.paddingY || 6;
      const textWidth = ctx.measureText(text).width;
      const boxWidth = textWidth + paddingX * 2;
      const boxHeight = (options.size || 12) + paddingY * 2;
      const boxX = node.x - boxWidth / 2;
      const boxY = offsetY - boxHeight / 2;

      ctx.fillStyle = options.background || "rgba(15, 16, 24, 0.88)";
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(boxX, boxY, boxWidth, boxHeight, options.radius || 10);
      } else {
        ctx.rect(boxX, boxY, boxWidth, boxHeight);
      }
      ctx.fill();

      ctx.fillStyle = options.color || "#e2e8f0";
      ctx.fillText(text, node.x, offsetY);
      ctx.restore();
    };

    const titleOffset = node.y - radius - 24;
    const subtitleOffset = node.y + radius + 18;

    if (isSelected || isHovered) {
      renderLabel(node.title, titleOffset, {
        size: 12,
        radius: 12,
        paddingX: 12,
        paddingY: 6,
      });
    }

    if (node.filename) {
      const fileLabel = node.filename;
      renderLabel(fileLabel, subtitleOffset, {
        size: 11,
        radius: 8,
        paddingX: 10,
        paddingY: 4,
        background: "rgba(15, 16, 24, 0.72)",
        color: "#cbd5f5",
      });
    }
  });

  ctx.restore();
}

function screenToWorld(x, y, view) {
  return {
    x: (x - view.offsetX) / view.scale,
    y: (y - view.offsetY) / view.scale,
  };
}

function GraphViewInner({
  methodology = "zettelkasten",
  onNavigateToNote,
  projectId,
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const ctxRef = useRef(null);
  const graphRef = useRef({
    nodes: [],
    edges: [],
    nodeMap: new Map(),
    adjacency: new Map(),
  });
  const viewRef = useRef({
    scale: 0.9,
    offsetX: 0,
    offsetY: 0,
    pointerDown: false,
    pointerMoved: false,
    dragCanvas: false,
    draggedNodeId: null,
    lastX: 0,
    lastY: 0,
    startX: 0,
    startY: 0,
    hoveredNodeId: null,
    selectedNodeId: null,
  });
  const highlightRef = useRef({ selectedId: null, hoveredId: null });
  const projectIdRef = useRef(projectId || FALLBACK_PROJECT_ID);
  const selectionRef = useRef(null);
  const linkSourceRef = useRef(null);
  const tooltipRef = useRef(null);
  const timeRef = useRef(0);
  const lastFrameRef = useRef(
    typeof performance !== "undefined" ? performance.now() : 0
  );

  const [stats, setStats] = useState({ nodes: 0, edges: 0, focus: "전체" });
  const [selection, setSelection] = useState(null);
  const [linkSourceId, setLinkSourceId] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [activeTypes, setActiveTypes] = useState([]);

  useEffect(() => {
    selectionRef.current = selection;
  }, [selection]);

  useEffect(() => {
    linkSourceRef.current = linkSourceId;
  }, [linkSourceId]);

  useEffect(() => {
    tooltipRef.current = tooltip;
  }, [tooltip]);

  useEffect(() => {
    projectIdRef.current = projectId || FALLBACK_PROJECT_ID;
  }, [projectId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctxRef.current = ctx;
    timeRef.current = 0;
    lastFrameRef.current =
      typeof performance !== "undefined" ? performance.now() : 0;

    let cancelled = false;
    const view = viewRef.current;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);

    const renderGraph = () => {
      const currentCanvas = canvasRef.current;
      const currentCtx = ctxRef.current;
      if (!currentCanvas || !currentCtx) return;
      drawGraph(currentCtx, currentCanvas, graphRef.current, viewRef.current, {
        selectedId: highlightRef.current.selectedId,
        hoveredId: highlightRef.current.hoveredId,
      });
    };

    const energizeNodes = (strength = 0.35) => {
      const { nodes } = graphRef.current;
      if (!nodes.length) return;
      nodes.forEach((node) => {
        node.vx += (Math.random() - 0.5) * strength;
        node.vy += (Math.random() - 0.5) * strength;
      });
    };

    const setSelectionState = (value) => {
      selectionRef.current = value;
      setSelection(value);
      renderGraph();
    };

    const setLinkSourceState = (value) => {
      linkSourceRef.current = value;
      setLinkSourceId(value);
      renderGraph();
    };

    const setTooltipState = (value) => {
      tooltipRef.current = value;
      setTooltip(value);
    };

    const updateViewToFit = () => {
      const { nodes } = graphRef.current;
      if (!nodes.length) return;

      const xs = nodes.map((node) => node.x);
      const ys = nodes.map((node) => node.y);
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const padding = 220;
      const graphWidth = maxX - minX + padding;
      const graphHeight = maxY - minY + padding;

      if (graphWidth === 0 || graphHeight === 0) return;

      const scale = clamp(
        Math.min(width / graphWidth, height / graphHeight),
        0.45,
        1.8
      );
      view.scale = scale;
      view.offsetX = width / 2 - ((minX + maxX) / 2) * scale;
      view.offsetY = height / 2 - ((minY + maxY) / 2) * scale;
    };

    const applyGraph = (graph, { refit = true } = {}) => {
      graphRef.current = graph;
      highlightRef.current.selectedId = null;
      highlightRef.current.hoveredId = null;
      view.selectedNodeId = null;
      view.hoveredNodeId = null;
      setSelectionState(null);
      setLinkSourceState(null);
      setTooltipState(null);
      setActiveTypes([...new Set(graph.nodes.map((node) => node.type))]);
      setStats((prev) => ({
        ...prev,
        nodes: graph.nodes.length,
        edges: graph.edges.length,
        focus: "전체",
      }));

      if (refit) {
        updateViewToFit();
      }

      energizeNodes(0.45);
      renderGraph();
    };

    applyGraph(composeGraph([], []), { refit: false });

    const convertAndApplyApiGraph = (payload) => {
      if (!payload) {
        applyGraph(composeGraph([], []));
        return;
      }

      const nodes = Array.isArray(payload.nodes) ? payload.nodes : [];
      const edges = Array.isArray(payload.edges) ? payload.edges : [];

      if (nodes.length === 0) {
        applyGraph(composeGraph([], []));
        return;
      }

      const apiGraph = convertApiGraph(nodes, edges);
      if (!apiGraph) {
        applyGraph(composeGraph([], []));
        return;
      }

      applyGraph(apiGraph);
    };

    const loadGraphFromApi = async () => {
      try {
        const payload = await graphService.fetchGraph({
          projectId: projectIdRef.current,
          methodology,
        });
        if (!cancelled) {
          console.log("[GraphView] fetched graph payload", payload);
          convertAndApplyApiGraph(payload);
        }
      } catch (error) {
        console.error("Failed to fetch graph data", error);
        if (!cancelled) {
          applyGraph(composeGraph([], []));
        }
      }
    };

    void loadGraphFromApi();

    const loop = (now) => {
      if (cancelled) return;
      const last = lastFrameRef.current || now;
      const delta = Math.min((now - last) / 1000, 0.05);
      lastFrameRef.current = now;
      timeRef.current += delta;

      if (graphRef.current.nodes.length) {
        simulate(graphRef.current, timeRef.current, delta);
      }

      renderGraph();
      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    const findNodeAt = (offsetX, offsetY) => {
      const { x, y } = screenToWorld(offsetX, offsetY, viewRef.current);
      const { nodes } = graphRef.current;
      for (let i = nodes.length - 1; i >= 0; i -= 1) {
        const node = nodes[i];
        const radius = getNodeRadius(node);
        const dx = node.x - x;
        const dy = node.y - y;
        if (dx * dx + dy * dy <= radius * radius) {
          return node;
        }
      }
      return null;
    };

    const updateSelection = (node) => {
      if (!node) {
        highlightRef.current.selectedId = null;
        view.selectedNodeId = null;
        setSelectionState(null);
        setStats((prev) => ({ ...prev, focus: "전체" }));
        return;
      }

      highlightRef.current.selectedId = node.id;
      view.selectedNodeId = node.id;
      const neighborIds = Array.from(
        graphRef.current.adjacency.get(node.id) || []
      );
      const neighbors = neighborIds
        .map((id) => graphRef.current.nodeMap.get(id))
        .filter(Boolean);

      setSelectionState({
        id: node.id,
        title: node.title,
        type: TYPE_CONFIG[node.type]?.label || node.type,
        tags: node.tags || [],
        degree: neighborIds.length,
        neighbors,
      });

      setStats((prev) => ({ ...prev, focus: node.title }));
    };

    const addEdgeBetweenNodes = (sourceId, targetId) => {
      if (sourceId === targetId) return false;

      const [from, to] = normalizeEdge(sourceId, targetId);
      const edges = graphRef.current.edges;
      const exists = edges.some(
        (edge) =>
          (edge.from === from && edge.to === to) ||
          (edge.from === to && edge.to === from)
      );

      if (exists) {
        return false;
      }

      edges.push({ from, to });

      if (!graphRef.current.adjacency.has(from)) {
        graphRef.current.adjacency.set(from, new Set());
      }
      if (!graphRef.current.adjacency.has(to)) {
        graphRef.current.adjacency.set(to, new Set());
      }

      graphRef.current.adjacency.get(from)?.add(to);
      graphRef.current.adjacency.get(to)?.add(from);

      const sourceNode = graphRef.current.nodeMap.get(from);
      const targetNode = graphRef.current.nodeMap.get(to);

      if (sourceNode) {
        sourceNode.degree = graphRef.current.adjacency.get(from)?.size ?? 0;
      }
      if (targetNode) {
        targetNode.degree = graphRef.current.adjacency.get(to)?.size ?? 0;
      }

      if (sourceNode && targetNode) {
        const dx = targetNode.x - sourceNode.x;
        const dy = targetNode.y - sourceNode.y;
        const adjust = 0.0025;
        sourceNode.vx += dx * adjust;
        sourceNode.vy += dy * adjust;
        targetNode.vx -= dx * adjust;
        targetNode.vy -= dy * adjust;
      }

      setStats((prev) => ({ ...prev, edges: edges.length }));
      energizeNodes(0.35);
      renderGraph();

      void graphService
        .createBacklink({
          projectId: projectIdRef.current,
          sourceId: from,
          targetId: to,
        })
        .catch((error) => {
          console.error("Failed to sync backlink (mock)", error);
        });

      return true;
    };

    const findEdgeNear = (offsetX, offsetY) => {
      const world = screenToWorld(offsetX, offsetY, viewRef.current);
      const threshold = 16 / viewRef.current.scale;
      let match = null;
      let minDistance = Infinity;

      graphRef.current.edges.forEach((edge, index) => {
        const source = graphRef.current.nodeMap.get(edge.from);
        const target = graphRef.current.nodeMap.get(edge.to);
        if (!source || !target) return;

        const distance = pointToSegmentDistance(
          world.x,
          world.y,
          source.x,
          source.y,
          target.x,
          target.y
        );

        if (distance < threshold && distance < minDistance) {
          minDistance = distance;
          match = { index, edge };
        }
      });

      return match;
    };

    const removeEdgeAtIndex = (edgeIndex) => {
      const edges = graphRef.current.edges;
      const removed = edges.splice(edgeIndex, 1)[0];
      if (!removed) return false;

      const { from, to } = removed;
      graphRef.current.adjacency.get(from)?.delete(to);
      graphRef.current.adjacency.get(to)?.delete(from);

      const sourceNode = graphRef.current.nodeMap.get(from);
      const targetNode = graphRef.current.nodeMap.get(to);

      if (sourceNode) {
        sourceNode.degree = graphRef.current.adjacency.get(from)?.size ?? 0;
      }
      if (targetNode) {
        targetNode.degree = graphRef.current.adjacency.get(to)?.size ?? 0;
      }

      setStats((prev) => ({ ...prev, edges: edges.length }));

      const selectedId = view.selectedNodeId;
      if (selectedId) {
        const selectedNode = graphRef.current.nodeMap.get(selectedId);
        if (selectedNode) {
          updateSelection(selectedNode);
        } else {
          updateSelection(null);
        }
      }

      energizeNodes(0.28);
      renderGraph();

      void graphService
        .deleteBacklink({
          projectId: projectIdRef.current,
          sourceId: from,
          targetId: to,
        })
        .catch((error) => {
          console.error("Failed to delete backlink (mock)", error);
        });

      return true;
    };

    const updateHover = (event) => {
      const node = findNodeAt(event.offsetX, event.offsetY);
      const hoveredId = node?.id ?? null;
      if (view.hoveredNodeId !== hoveredId) {
        view.hoveredNodeId = hoveredId;
        highlightRef.current.hoveredId = hoveredId;

        if (node) {
          setTooltipState({
            id: node.id,
            x: event.offsetX,
            y: event.offsetY,
            title: node.title,
            type: TYPE_CONFIG[node.type]?.label || node.type,
          });
        } else {
          setTooltipState(null);
        }
      } else if (
        node &&
        tooltipRef.current &&
        tooltipRef.current.id === node.id
      ) {
        setTooltipState({
          ...tooltipRef.current,
          x: event.offsetX,
          y: event.offsetY,
        });
      }

      if (!node && tooltipRef.current) {
        setTooltipState(null);
      }

      renderGraph();
    };

    const onPointerDown = (event) => {
      canvas.setPointerCapture(event.pointerId);
      view.pointerDown = true;
      view.pointerMoved = false;
      view.lastX = event.clientX;
      view.lastY = event.clientY;
      view.startX = event.clientX;
      view.startY = event.clientY;
      view.dragCanvas = false;
      view.draggedNodeId = null;

      const node = findNodeAt(event.offsetX, event.offsetY);
      if (node) {
        view.draggedNodeId = node.id;
      } else {
        view.dragCanvas = true;
      }
    };

    const onPointerMove = (event) => {
      if (!view.pointerDown) {
        updateHover(event);
        return;
      }

      const dx = event.clientX - view.lastX;
      const dy = event.clientY - view.lastY;
      const totalDelta =
        Math.abs(event.clientX - view.startX) +
        Math.abs(event.clientY - view.startY);

      if (totalDelta > 6) {
        view.pointerMoved = true;
      }

      if (view.draggedNodeId) {
        const node = graphRef.current.nodeMap.get(view.draggedNodeId);
        if (node) {
          const world = screenToWorld(event.offsetX, event.offsetY, view);
          node.x = world.x;
          node.y = world.y;
          node.vx = 0;
          node.vy = 0;
        }
      } else if (view.dragCanvas) {
        view.offsetX += dx;
        view.offsetY += dy;
      }

      view.lastX = event.clientX;
      view.lastY = event.clientY;

      renderGraph();
    };

    const onPointerUp = (event) => {
      canvas.releasePointerCapture(event.pointerId);
      const totalDelta =
        Math.abs(event.clientX - view.startX) +
        Math.abs(event.clientY - view.startY);
      if (totalDelta <= 6) {
        view.pointerMoved = false;
      }
      if (!view.pointerMoved) {
        const node = findNodeAt(event.offsetX, event.offsetY);
        const currentSource = linkSourceRef.current;

        if (node) {
          if (currentSource && currentSource === node.id) {
            setLinkSourceState(null);
            updateSelection(node);
          } else if (currentSource && currentSource !== node.id) {
            const created = addEdgeBetweenNodes(currentSource, node.id);
            if (created) {
              setLinkSourceState(null);
            } else {
              setLinkSourceState(node.id);
            }
            updateSelection(node);
          } else {
            setLinkSourceState(node.id);
            updateSelection(node);
          }
        } else {
          const hitEdge = findEdgeNear(event.offsetX, event.offsetY);
          if (hitEdge) {
            removeEdgeAtIndex(hitEdge.index);
            setLinkSourceState(null);
          } else {
            setLinkSourceState(null);
            updateSelection(null);
          }
        }
      }

      view.pointerDown = false;
      view.dragCanvas = false;
      view.draggedNodeId = null;
      energizeNodes(0.18);
      renderGraph();
    };

    const onPointerLeave = () => {
      view.pointerDown = false;
      view.dragCanvas = false;
      view.draggedNodeId = null;
      view.hoveredNodeId = null;
      highlightRef.current.hoveredId = null;
      setTooltipState(null);
      renderGraph();
    };

    const onWheel = (event) => {
      event.preventDefault();
      const zoomIntensity = 0.0015;
      const delta = -event.deltaY;
      const scaleFactor = Math.exp(delta * zoomIntensity);

      const prevScale = view.scale;
      const nextScale = clamp(view.scale * scaleFactor, MIN_SCALE, MAX_SCALE);

      const worldPos = screenToWorld(event.offsetX, event.offsetY, view);
      view.scale = nextScale;
      view.offsetX = event.offsetX - worldPos.x * nextScale;
      view.offsetY = event.offsetY - worldPos.y * nextScale;

      if (nextScale !== prevScale) {
        view.pointerMoved = true;
      }

      renderGraph();
    };

    canvas.style.touchAction = "none";
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      cancelled = true;
      resizeObserver.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      animationRef.current = null;
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("wheel", onWheel);
    };
  }, [methodology, projectId]);

  const handleZoom = (direction) => {
    const view = viewRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const zoomFactor = direction === "in" ? 1.2 : 1 / 1.2;
    const centerX = canvas.clientWidth / 2;
    const centerY = canvas.clientHeight / 2;
    const worldBefore = screenToWorld(centerX, centerY, view);

    view.scale = clamp(view.scale * zoomFactor, MIN_SCALE, MAX_SCALE);
    view.offsetX = centerX - worldBefore.x * view.scale;
    view.offsetY = centerY - worldBefore.y * view.scale;

    const ctx = ctxRef.current;
    if (ctx) {
      drawGraph(ctx, canvas, graphRef.current, view, {
        selectedId: highlightRef.current.selectedId,
        hoveredId: highlightRef.current.hoveredId,
      });
    }
  };

  const handleResetView = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const view = viewRef.current;
    const { nodes } = graphRef.current;
    if (!nodes.length) return;

    const xs = nodes.map((node) => node.x);
    const ys = nodes.map((node) => node.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const padding = 220;
    const graphWidth = maxX - minX + padding;
    const graphHeight = maxY - minY + padding;

    const scale = clamp(
      Math.min(width / graphWidth, height / graphHeight),
      0.45,
      1.8
    );
    view.scale = scale;
    view.offsetX = width / 2 - ((minX + maxX) / 2) * scale;
    view.offsetY = height / 2 - ((minY + maxY) / 2) * scale;

    const ctx = ctxRef.current;
    if (ctx) {
      drawGraph(ctx, canvas, graphRef.current, view, {
        selectedId: highlightRef.current.selectedId,
        hoveredId: highlightRef.current.hoveredId,
      });
    }
  };

  const handleFocusSelection = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const view = viewRef.current;
    const selectedId = view.selectedNodeId;
    if (!selectedId) return;

    const node = graphRef.current.nodeMap.get(selectedId);
    if (!node) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const targetScale = clamp(
      view.scale < 1 ? 1.2 : view.scale * 1.1,
      0.6,
      2.4
    );
    view.scale = targetScale;
    view.offsetX = width / 2 - node.x * targetScale;
    view.offsetY = height / 2 - node.y * targetScale;

    const ctx = ctxRef.current;
    if (ctx) {
      drawGraph(ctx, canvas, graphRef.current, view, {
        selectedId: highlightRef.current.selectedId,
        hoveredId: highlightRef.current.hoveredId,
      });
    }
  };

  const handleOpenSelection = useCallback(() => {
    if (!selection || !onNavigateToNote) return;
    onNavigateToNote(selection.id);
  }, [selection, onNavigateToNote]);

  const canOpenSelection = Boolean(selection && onNavigateToNote);

  return (
    <ThemeProvider theme={theme}>
      <S.GraphContainer>
        <S.Controls>
          <S.ControlButton
            onClick={() => handleZoom("in")}
            aria-label="그래프 확대"
          >
            <ZoomIn size={16} />
          </S.ControlButton>
          <S.ControlButton
            onClick={() => handleZoom("out")}
            aria-label="그래프 축소"
          >
            <ZoomOut size={16} />
          </S.ControlButton>
          <S.ControlButton
            onClick={handleFocusSelection}
            aria-label="선택 노드로 이동"
          >
            <Maximize size={16} />
          </S.ControlButton>
          <S.ControlButton onClick={handleResetView} aria-label="그래프 초기화">
            <RotateCcw size={16} />
          </S.ControlButton>
        </S.Controls>

        <S.Hud>
          <S.MetricsPanel>
            <S.MetricItem>
              <S.MetricLabel>Nodes</S.MetricLabel>
              <S.MetricValue>{stats.nodes}</S.MetricValue>
            </S.MetricItem>
            <S.MetricItem>
              <S.MetricLabel>Links</S.MetricLabel>
              <S.MetricValue>{stats.edges}</S.MetricValue>
            </S.MetricItem>
            {canOpenSelection ? (
              <S.FocusMetricButton
                type="button"
                onClick={handleOpenSelection}
                aria-label={`${selection?.title ?? stats.focus} 문서로 이동`}
                title={`${selection?.title ?? stats.focus} 문서로 이동`}
              >
                <S.MetricLabel>Focus</S.MetricLabel>
                <S.MetricValue>{stats.focus}</S.MetricValue>
              </S.FocusMetricButton>
            ) : (
              <S.MetricItem>
                <S.MetricLabel>Focus</S.MetricLabel>
                <S.MetricValue>{stats.focus}</S.MetricValue>
              </S.MetricItem>
            )}
          </S.MetricsPanel>
        </S.Hud>

        <S.SelectionPanel>
          <S.SelectionTitle>Focused Node</S.SelectionTitle>
          {selection ? (
            <>
              {canOpenSelection ? (
                <S.SelectionNameButton
                  type="button"
                  onClick={handleOpenSelection}
                  title={`${selection.title} 문서로 이동`}
                >
                  {selection.title}
                </S.SelectionNameButton>
              ) : (
                <S.SelectionName>{selection.title}</S.SelectionName>
              )}
              <S.SelectionTags>
                <S.SelectionTag>{selection.type}</S.SelectionTag>
                {selection.tags.map((tag) => (
                  <S.SelectionTag key={`${selection.id}-${tag}`}>
                    #{tag}
                  </S.SelectionTag>
                ))}
              </S.SelectionTags>
              <S.SelectionMeta>
                <span>{selection.degree} connections</span>
                {selection.neighbors.length > 0 && <span>Linked with:</span>}
              </S.SelectionMeta>
              {selection.neighbors.length > 0 && (
                <S.SelectionTags>
                  {selection.neighbors.map((neighbor) => (
                    <S.SelectionTag
                      key={`${selection.id}-neighbor-${neighbor.id}`}
                    >
                      {neighbor.title}
                    </S.SelectionTag>
                  ))}
                </S.SelectionTags>
              )}
              {linkSourceId === selection.id ? (
                <S.SelectionHint>
                  선택된 노드를 출발점으로 설정했습니다. 연결할 다른 노드를
                  선택하면 백링크가 생성됩니다.
                </S.SelectionHint>
              ) : (
                <S.SelectionHint>
                  노드를 두 번 클릭하면 링크 모드를 종료할 수 있고, 링크 선을
                  클릭하면 백링크가 제거됩니다.
                </S.SelectionHint>
              )}
            </>
          ) : (
            <S.SelectionMeta>
              <span>
                노드를 클릭해 구조를 탐색하고, 다른 노드를 이어서 백링크를
                추가하세요.
              </span>
            </S.SelectionMeta>
          )}
        </S.SelectionPanel>

        <S.GraphCanvas ref={canvasRef} />

        <S.Legend>
          <S.LegendTitle>Legend</S.LegendTitle>
          <S.LegendItems>
            {activeTypes.map((type, index) => {
              const shade = getNodePalette(
                { degree: Math.min(10, index * 2 + 2) },
                0
              ).fill;
              return (
                <S.LegendItem key={type}>
                  <S.LegendIcon round color={shade} />
                  <span>{TYPE_CONFIG[type]?.label || type}</span>
                </S.LegendItem>
              );
            })}
            <S.LegendItem>
              <S.LegendLine />
              <span>Bidirectional links</span>
            </S.LegendItem>
          </S.LegendItems>
        </S.Legend>

        {tooltip && (
          <S.Tooltip style={{ left: tooltip.x, top: tooltip.y }}>
            <strong>{tooltip.title}</strong>
            <div>{tooltip.type}</div>
          </S.Tooltip>
        )}
      </S.GraphContainer>
    </ThemeProvider>
  );
}

export function GraphView({
  methodology = "zettelkasten",
  onNavigateToNote,
  projectId,
}) {
  return (
    <GraphViewInner
      methodology={methodology}
      onNavigateToNote={onNavigateToNote}
      projectId={projectId}
    />
  );
}
