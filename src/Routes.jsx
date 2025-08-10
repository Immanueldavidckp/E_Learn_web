import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Pages
import UserAuthenticationLoginRegister from "pages/user-authentication-login-register";
import CodeEditorWithDebugging from "pages/code-editor-with-debugging";
import InteractiveLessonViewer from "pages/interactive-lesson-viewer";
import LearningDashboard from "pages/learning-dashboard";
import CircuitSimulationWorkspace from "pages/circuit-simulation-workspace";
import ComponentLibraryBrowser from "pages/component-library-browser";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<LearningDashboard />} />
          <Route
            path="/user-authentication-login-register"
            element={<UserAuthenticationLoginRegister />}
          />
          <Route
            path="/code-editor-with-debugging"
            element={<CodeEditorWithDebugging />}
          />
          <Route 
            path="/interactive-lesson-viewer"
            element={<InteractiveLessonViewer />} 
          />
          <Route
            path="/interactive-lesson-viewer/:courseId"
            element={<InteractiveLessonViewer />}
          />

          <Route
            path="/learning-dashboard"
            element={<LearningDashboard />}
          />
          <Route
            path="/circuit-simulation-workspace"
            element={<CircuitSimulationWorkspace />}
          />
          <Route
            path="/component-library-browser"
            element={<ComponentLibraryBrowser />}
          />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
