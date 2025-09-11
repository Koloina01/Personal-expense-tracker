import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

interface SidebarProps {
  active: "dashboard" | "profile";
}

const Sidebar: React.FC<SidebarProps> = ({ active }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Poketra vy</h2>
      <ul>
        <li
          className={active === "dashboard" ? "active" : ""}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </li>
        <li
          className={active === "profile" ? "active" : ""}
          onClick={() => navigate("/profile")}
        >
          Profile
        </li>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
