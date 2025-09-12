import React, { useEffect, useState } from "react";
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
import HexagonBackground from "./HexagonBackground";
import "./css/Dashboard.css";
import { useNavigate } from "react-router-dom";

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

const DashboardProfile: React.FC = () => {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState<number[]>([200, 300, 150, 100, 250]);
  const [income, setIncome] = useState<number[]>([500, 600, 550, 700, 650]);

  useEffect(() => {
    console.log("Chargement des données du Dashboard...");
  }, []);

  const pieData = {
    labels: ["Logement", "Nourriture", "Transport", "Loisirs", "Autres"],
    datasets: [
      {
        data: expenses,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai"],
    datasets: [
      { label: "Revenus", data: income, borderColor: "#36A2EB", fill: false },
      { label: "Dépenses", data: expenses, borderColor: "#FF6384", fill: false },
    ],
  };

  const user = {
    fullName: "Erickah Rakoto",
    email: "erickah@example.com",
    budget: 250000,
  };

  return (
    
      <div className="dashboard-profile-container">
        <HexagonBackground/>
        <div className="profile-section">
          <h1 className="section-title">Profil Utilisateur</h1>
          <div className="profile-card">
            <p><strong>Nom :</strong> {user.fullName}</p>
            <p><strong>Email :</strong> {user.email}</p>
            <p><strong>Budget :</strong> {user.budget} Ar</p>
          </div>
          <div className="profile-actions">
            <button onClick={() => navigate("/expenses")} className="btn-blue">
              Expense Management
            </button>
            <button onClick={() => navigate("/dashboard")} className="btn-green">
              Dashboard
            </button>
            <button onClick={() => navigate("/settings")} className="btn-gray">
              Paramètres
            </button>
          </div>
        </div>

        
        <div className="dashboard-section">
          <h1 className="section-title">Dashboard Financier</h1>
          <div className="dashboard-grid">
            <Card>
              <h2>Total Revenus</h2>
              <p>{income.reduce((a, b) => a + b, 0)} €</p>
            </Card>
            <Card>
              <h2>Total Dépenses</h2>
              <p>{expenses.reduce((a, b) => a + b, 0)} €</p>
            </Card>
            <Card>
              <h2>Économie</h2>
              <p>{income.reduce((a, b) => a + b, 0) - expenses.reduce((a, b) => a + b, 0)} €</p>
            </Card>
          </div>

          <div className="charts-container">
            <div className="chart-card">
              <h2>Répartition des Dépenses</h2>
              <Pie data={pieData} />
            </div>
            <div className="chart-card">
              <h2>Revenus vs Dépenses</h2>
              <Line data={lineData} />
            </div>
          </div>

          <div className="dashboard-actions">
            <Button>Ajouter une Dépense</Button>
            <Button>Ajouter un Revenu</Button>
          </div>
        </div>
      </div>
    
  );
};


const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="dashboard-card">{children}</div>
);

const Button: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) => (
  <button onClick={onClick} className="dashboard-button">
    {children}
  </button>
);

export default DashboardProfile;
