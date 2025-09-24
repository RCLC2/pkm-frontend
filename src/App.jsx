import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Production from "./pages/production/Production";
import Login from "./pages/auth/Login";
import { ProjectsPage } from "./pages/project/ProjectsPage";
import { ProjectLayout } from "./component/project/layout/ProjectLayout";
import { WelcomePage } from "./pages/project/dashboard/WelcomePage";
import { EditorPage } from "./pages/project/editor/EditorPage";
import { GraphPage } from "./pages/project/graph/GraphPage";

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (state) => {
    setIsScrolled(state);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Production handleScroll={handleScroll} isScrolled={isScrolled} />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/dashboard" element={<ProjectLayout />}>
          <Route index element={<WelcomePage />} />
          <Route path="editor" element={<EditorPage />} />
          <Route path="editor/:noteId" element={<EditorPage />} />
          <Route path="graph" element={<GraphPage />} />
        </Route>
        {/* Redirect old /dashboard route to new structure */}
        <Route
          path="/dashboard-old"
          element={<Navigate to="/projects" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
