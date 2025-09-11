import React from "react";
import Sidebar from "../components/Sidebar";
import HexagonBackground from "../components/HexagonBackground";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <HexagonBackground />
      <Sidebar active={"dashboard"} />
      <main className="dashboard">
        <h1>Dashboard</h1>

        <div className="dashboard-card">
          <h2>Total Expenses</h2>
          <p>$1,245</p>
        </div>

        <div className="dashboard-card">
          <h2>This Month</h2>
          <p>$540</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
