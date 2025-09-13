import { useState } from "react";
import HexagonBackground from "./HexagonBackground";
import { Link } from "react-router-dom";

export default function SettingsPage() {
  const [name, setName] = useState("Erickah Rakoto");
  const [email, setEmail] = useState("erickah@example.com");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    alert(`Profile updated: ${name}, ${email}`);
    setPassword("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="dashboard-wrapper relative min-h-screen flex">
      <HexagonBackground />

      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src="user.jpg" alt="User Logo" className="sidebar-logo-img" />
        </div>
        <nav className="sidebar-nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/expenses-management">Expense Management</Link>
          <Link to="/income">Income Tracking</Link>
          <Link to="/settings">Settings</Link>
        </nav>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </aside>

      <main className="dashboard-main p-6 flex-1">
        <header className="dashboard-header mb-6">
          <h1 className="text-3xl font-bold text-white">Account Settings</h1>
        </header>

        <div className="settings-form bg-gray-800 p-6 rounded-xl shadow-lg max-w-md mx-auto text-white flex flex-col gap-4">
          <label className="font-semibold">Full Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-teal-400"
          />

          <label className="font-semibold">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-teal-400"
          />

          <label className="font-semibold">New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-teal-400"
          />

          <button
            onClick={handleSave}
            className="bg-teal-400 text-black font-bold py-2 rounded hover:bg-teal-500 transition"
          >
            Save
          </button>
        </div>
      </main>
    </div>
  );
}
