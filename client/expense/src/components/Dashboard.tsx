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

const HexagonBackground: React.FC = () => {
  return (
    <div 
      className="hexagon-background"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: '120px',
            height: '104px',
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='104' viewBox='0 0 120 104'%3E%3Cpolygon points='60,0 120,26 120,78 60,104 0,78 0,26' fill='%23eaeaea'/%3E%3C/svg%3E\")",
            opacity: 0.3,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${15 + Math.random() * 20}s infinite ease-in-out`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  );
};

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
        tension: 0.1,
      },
      {
        label: "Dépenses",
        data: expenses,
        borderColor: "#FF6384",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#001948',
          font: {
            family: "'Poppins', sans-serif"
          }
        }
      }
    }
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#001948',
          font: {
            family: "'Poppins', sans-serif"
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 25, 72, 0.1)'
        },
        ticks: {
          color: '#001948',
          font: {
            family: "'Poppins', sans-serif"
          }
        }
      },
      x: {
        grid: {
          color: 'rgba(0, 25, 72, 0.1)'
        },
        ticks: {
          color: '#001948',
          font: {
            family: "'Poppins', sans-serif"
          }
        }
      }
    }
  };

  return (
    <div className="dashboard-container">
      <HexagonBackground />
      
      <h1 className="dashboard-title">Dashboard Financier</h1>

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
          <h2>Économies</h2>
          <p>
            {income.reduce((a, b) => a + b, 0) -
              expenses.reduce((a, b) => a + b, 0)}{" "}
            €
          </p>
        </Card>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h2>Répartition des Dépenses</h2>
          <div className="chart-wrapper">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>

        <div className="chart-card">
          <h2>Revenus vs Dépenses</h2>
          <div className="chart-wrapper">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
      </div>

      <div className="actions">
        <Button className="green-button">Ajouter une Dépense</Button>
        <Button className="teal-button">Ajouter un Revenu</Button>
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