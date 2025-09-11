import React, { type JSX } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import DashboardPage from "./components/Dashboard";
// 🔑 Route protégée
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

const App: React.FC = () => {
  return (
    <Routes>
      {/* Route publique */}
      <Route path="/" element={<LoginPage />} />

      {/* Routes protégées */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />

      {/* Si route inconnue → login */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
