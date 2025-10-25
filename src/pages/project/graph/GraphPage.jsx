"use client";

import { useOutletContext } from "react-router-dom";
import { GraphView } from "../../../component/project/graphView/GraphView";

export function GraphPage() {
  const { methodology, onNavigateToNote } = useOutletContext();

  return (
    <GraphView
      methodology={methodology}
      onNavigateToNote={onNavigateToNote}
    />
  );
}
