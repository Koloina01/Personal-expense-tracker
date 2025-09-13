import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HexagonBackground from "./HexagonBackground";
import "./css/ProfilePage.css";

interface ProfileData {
  user: { fullName: string; email: string; id: number };
  totalIncome: number;
  totalExpenses: number;
  remaining: number;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (!profile) return <p>Loading...</p>;

  const { user, totalIncome, totalExpenses, remaining } = profile;

  return (
    <div className="dashboard-wrapper">
      <HexagonBackground />

      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src="/user.jpg" alt="Avatar" className="sidebar-logo-img" />
        </div>
        <nav className="sidebar-nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/expenses-management">Expense Management</Link>
          <Link to="/income">Income Tracking</Link>
          <Link to="/settings">Settings</Link>
        </nav>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>{user.fullName}'s Profile</h1>
        </header>

        <div className="profile-info-card">
          <img src="/user.jpg" alt="Avatar" className="profile-avatar" />
          <div className="profile-details">
            <p><strong>Name:</strong> {user.fullName}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        </div>

        <div className="stats-grid">
          <Card title="Total Income" value={`${totalIncome} Ar`} color="green" />
          <Card title="Total Expenses" value={`${totalExpenses} Ar`} color="red" />
          <Card title="Savings" value={`${remaining} Ar`} color="teal" />
        </div>
      </main>
    </div>
  );
};

const Card: React.FC<{ title: string; value: string; color: string }> = ({ title, value, color }) => (
  <div className={`stat-card ${color}`}>
    <h2>{title}</h2>
    <p>{value}</p>
  </div>
);

export default ProfilePage;
