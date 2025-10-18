"use client";

import { useEffect, useRef } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../styled/thema";
import * as S from "./GraphViewStyled";
import { ZoomIn, ZoomOut, Maximize, RotateCcw } from "lucide-react";

export function GraphView() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const nodes = [
      {
        id: "welcome-note",
        x: 400,
        y: 300,
        title: "Welcome to Zettelkasten",
        connections: 3,
      },
      {
        id: "note-1",
        x: 200,
        y: 200,
        title: "Knowledge Management",
        connections: 2,
      },
      { id: "note-2", x: 600, y: 200, title: "Atomic Notes", connections: 4 },
      { id: "note-3", x: 300, y: 450, title: "Linking Ideas", connections: 2 },
      { id: "project-1", x: 500, y: 450, title: "AI Research", connections: 1 },
      {
        id: "area-1",
        x: 150,
        y: 350,
        title: "Personal Development",
        connections: 1,
      },
    ];

    const edges = [
      { from: "welcome-note", to: "note-1" },
      { from: "welcome-note", to: "note-2" },
      { from: "welcome-note", to: "note-3" },
      { from: "note-1", to: "note-2" },
      { from: "note-2", to: "note-3" },
      { from: "note-1", to: "area-1" },
      { from: "note-2", to: "project-1" },
    ];

    // Clear canvas with dark background
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    ctx.strokeStyle = "#27272a";
    ctx.lineWidth = 2;
    edges.forEach((edge) => {
      const fromNode = nodes.find((n) => n.id === edge.from);
      const toNode = nodes.find((n) => n.id === edge.to);
      if (fromNode && toNode) {
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();
      }
    });

    // Draw nodes
    nodes.forEach((node) => {
      const radius = Math.max(20, node.connections * 8);
      ctx.fillStyle = "#2563eb";
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
      ctx.fill();

      ctx.strokeStyle = "#fafafa";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#fafafa";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      const maxWidth = 100;
      const words = node.title.split(" ");
      let line = "";
      let y = node.y + radius + 20;

      words.forEach((word, index) => {
        const testLine = line + word + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && index > 0) {
          ctx.fillText(line, node.x, y);
          line = word + " ";
          y += 15;
        } else {
          line = testLine;
        }
      });
      ctx.fillText(line, node.x, y);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <S.GraphContainer>
        <S.Controls>
          <S.ControlButton>
            <ZoomIn size={16} />
          </S.ControlButton>
          <S.ControlButton>
            <ZoomOut size={16} />
          </S.ControlButton>
          <S.ControlButton>
            <Maximize size={16} />
          </S.ControlButton>
          <S.ControlButton>
            <RotateCcw size={16} />
          </S.ControlButton>
        </S.Controls>

        <S.GraphCanvas ref={canvasRef} />

        <S.Legend>
          <S.LegendTitle>Graph Legend</S.LegendTitle>
          <S.LegendItems>
            <S.LegendItem>
              <S.LegendIcon round color="#2563eb" />
              <span>Notes (size = connections)</span>
            </S.LegendItem>
            <S.LegendItem>
              <S.LegendLine />
              <span>Links between notes</span>
            </S.LegendItem>
          </S.LegendItems>
        </S.Legend>
      </S.GraphContainer>
    </ThemeProvider>
  );
}
