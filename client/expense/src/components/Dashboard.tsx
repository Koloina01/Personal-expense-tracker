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
import "./Dashboard.css";


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

const Dashboard: React.FC = () => {
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
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai"],
    datasets: [
      {
        label: "Revenus",
        data: income,
        borderColor: "#36A2EB",
        fill: false,
      },
      {
        label: "Dépenses",
        data: expenses,
        borderColor: "#FF6384",
        fill: false,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

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
          <p>
            {income.reduce((a, b) => a + b, 0) -
              expenses.reduce((a, b) => a + b, 0)}{" "}
            €
          </p>
        </Card>
      </div>

      <div className="charts-container">
        <div className="chart-container">
          <h2>Répartition des Dépenses</h2>
          <Pie data={pieData} />
        </div>

        <div className="chart-container">
          <h2>Revenus vs Dépenses</h2>
          <Line data={lineData} />
        </div>
      </div>

      <div className="actions">
        <Button>Ajouter une Dépense</Button>
        <Button>Ajouter un Revenu</Button>
      </div>
    </div>
  );
};


const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={`dashboard-card ${className || ""}`}>{children}</div>
);

const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}> = ({ children, onClick, className }) => (
  <button onClick={onClick} className={`dashboard-button ${className || ""}`}>
    {children}
  </button>
);

export default Dashboard;
