import React, { useState, useEffect } from "react";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Link } from "react-router-dom";
import axios from "axios";
import HexagonBackground from "./HexagonBackground";
import "./css/Dashboard.css";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const DashboardPage: React.FC = () => {
  const [data, setData] = useState<any>({
    totalExpenses: 0,
    totalIncome: 0,
    remaining: 0,
    expensesByCategory: {},
    monthlyExpenses: Array(12).fill(0),
    monthlyIncome: Array(12).fill(0),
  });

  const [user, setUser] = useState<{ name: string } | null>(null);

  const token = localStorage.getItem("token");
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard", axiosConfig);
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile", axiosConfig);
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDashboard();
    fetchUser();
  }, []);

  const pieData = {
    labels: Object.keys(data.expensesByCategory),
    datasets: [
      {
        data: Object.values(data.expensesByCategory),
        backgroundColor: [
          "#00d8f7", "#d855ff", "#ffb84d", "#4df2aa", "#8c6fff",
          "#f55d5d", "#5d87f5", "#f5d55d"
        ],
        borderColor: "rgba(0,0,0,0.3)",
        borderWidth: 1,
      },
    ],
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const lineData = {
    labels: months,
    datasets: [
      {
        label: "Income",
        data: data.monthlyIncome,
        borderColor: "#00fff7",
        backgroundColor: "rgba(0,255,247,0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Expenses",
        data: data.monthlyExpenses,
        borderColor: "#ff0077",
        backgroundColor: "rgba(255,0,119,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="dashboard-wrapper">
      <HexagonBackground />

      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src="/user.jpg" alt="User Logo" className="sidebar-logo-img" />
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
          <h1>Hello{user ? `, ${user.name}` : ""}</h1>
        </header>

        <div className="stats-grid">
          <Card title="Total Income" value={`${data.totalIncome} Ar`} color="green" />
          <Card title="Total Expenses" value={`${data.totalExpenses} Ar`} color="red" />
          <Card title="Savings" value={`${data.remaining} Ar`} color="teal" />
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h2>Expenses by Category</h2>
            <Pie data={pieData} />
          </div>
          <div className="chart-card">
            <h2>Income vs Expenses</h2>
            <Line data={lineData} />
          </div>
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

export default DashboardPage;
