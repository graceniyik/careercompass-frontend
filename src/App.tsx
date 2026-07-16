import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { HomePage } from "./pages/HomePage";
import { AssessmentPage } from "./pages/student/AssessmentPage";
import { AssessmentResultsPage } from "./pages/student/AssessmentResultsPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/assessments/new"
        element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <AssessmentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/assessments/:id/results"
        element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <AssessmentResultsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
