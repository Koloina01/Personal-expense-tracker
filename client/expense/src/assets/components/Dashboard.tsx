import React, { useEffect, useState } from "react";
import "./Dashboard.css";
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

ChartJS.register(
  Title, Tooltip, Legend, ArcElement,
  LineElement, CategoryScale, LinearScale, PointElement
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`dashboard-card ${className || ""}`}>
    {children}
  </div>
);

const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="card-content">{children}</div>
);

const Button: React.FC<{ children: React.ReactNode; onClick?: () => void; className?: string }> = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`dashboard-button ${className || ""}`}
  >
    {children}
  </button>
);

interface Expense {
  id: number;
  amount: number;
  date: string;
  category: string;
}

const Dashboard: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    setExpenses([
      { id: 1, amount: 120, date: "2025-09-01", category: "Food" },
      { id: 2, amount: 60, date: "2025-09-02", category: "Transport" },
      { id: 3, amount: 200, date: "2025-09-05", category: "Shopping" },
      { id: 4, amount: 50, date: "2025-09-06", category: "Food" },
      { id: 5, amount: 150, date: "2025-09-08", category: "Entertainment" },
      { id: 6, amount: 80, date: "2025-09-10", category: "Transport" },
    ]);
  }, []);

  const categoryMap: Record<string, number> = {};
  expenses.forEach((e) => {
    categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
  });

  const categoryData = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        label: "Dépenses par catégorie",
        data: Object.values(categoryMap),
        backgroundColor: ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
        borderWidth: 0,
      },
    ],
  };

  const lineData = {
    labels: expenses.map((e) => e.date),
    datasets: [
      {
        label: "Dépenses journalières",
        data: expenses.map((e) => e.amount),
        borderColor: "#6366F1",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#6366F1",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#fff",
        },
      },
    },
    scales: {
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#fff",
        },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#fff",
        },
      },
    },
  };

  const pieOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#fff",
        },
      },
    },
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Tableau de Bord des Dépenses</h1>
        <p>Visualisez et analysez vos dépenses</p>
      </div>

      <div className="dashboard-grid">
        <Card>
          <CardContent>
            <h2>Dépenses par catégorie</h2>
            <div className="chart-container">
              <Pie data={categoryData} options={pieOptions} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2>Évolution des dépenses</h2>
            <div className="chart-container">
              <Line data={lineData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        <Card className="full-width">
          <CardContent>
            <h2>Résumé des dépenses</h2>
            <div className="summary-grid">
              <div className="summary-item">
                <p className="summary-label">Total des dépenses</p>
                <p className="summary-value">
                  {expenses.reduce((acc, expense) => acc + expense.amount, 0)}€
                </p>
              </div>
              <div className="summary-item">
                <p className="summary-label">Nombre de transactions</p>
                <p className="summary-value">{expenses.length}</p>
              </div>
              <div className="summary-item">
                <p className="summary-label">Dépense moyenne</p>
                <p className="summary-value">
                  {expenses.length > 0
                    ? Math.round(
                        expenses.reduce((acc, expense) => acc + expense.amount, 0) / expenses.length
                      )
                    : 0}
                  €
                </p>
              </div>
              <div className="summary-item">
                <p className="summary-label">Catégorie principale</p>
                <p className="summary-value">
                  {Object.keys(categoryMap).length > 0
                    ? Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0][0]
                    : "Aucune"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="full-width">
          <CardContent>
            <h2>Exporter les données</h2>
            <div className="button-group">
              <Button onClick={() => alert("Export PDF bientôt dispo")}>Exporter en PDF</Button>
              <Button className="green-button" onClick={() => alert("Export CSV bientôt dispo")}>
                Exporter en CSV
              </Button>
              <Button className="teal-button" onClick={() => alert("Export Excel bientôt dispo")}>
                Exporter en Excel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;