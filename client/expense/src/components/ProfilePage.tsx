import React from "react";
import HexagonBackground from "./HexagonBackground";
import Sidebar from "./Sidebar"; 
import "./css/ProfilePage.css";

const ProfilePage: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="profile-page">
      <HexagonBackground />

      <Sidebar active="profile" />

      <div className="profile-content">
        <h1>Profile</h1>
        <div className="profile-card">
          <p><strong>Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Budget:</strong> {user.budget}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
