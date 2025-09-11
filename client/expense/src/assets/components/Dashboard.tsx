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

ChartJS.register(
  Title, Tooltip, Legend, ArcElement,
  LineElement, CategoryScale, LinearScale, PointElement
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg p-6 ${className || ""}`}>
    {children}
  </div>
);

const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="space-y-4">{children}</div>
);

const Button: React.FC<{ children: React.ReactNode; onClick?: () => void; className?: string }> = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium ${className || ""}`}
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
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
      <div className="mb-6 md:col-span-2">
        <h1 className="text-3xl font-bold">Tableau de Bord des Dépenses</h1>
        <p className="text-white/70 mt-2">Visualisez et analysez vos dépenses</p>
      </div>

      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Dépenses par catégorie</h2>
          <div className="h-80">
            <Pie data={categoryData} options={pieOptions} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Évolution des dépenses</h2>
          <div className="h-80">
            <Line data={lineData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Résumé des dépenses</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/5 p-4 rounded-xl text-center">
              <p className="text-white/70">Total des dépenses</p>
              <p className="text-2xl font-bold mt-1">
                {expenses.reduce((acc, expense) => acc + expense.amount, 0)}€
              </p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl text-center">
              <p className="text-white/70">Nombre de transactions</p>
              <p className="text-2xl font-bold mt-1">{expenses.length}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl text-center">
              <p className="text-white/70">Dépense moyenne</p>
              <p className="text-2xl font-bold mt-1">
                {expenses.length > 0
                  ? Math.round(
                      expenses.reduce((acc, expense) => acc + expense.amount, 0) / expenses.length
                    )
                  : 0}
                €
              </p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl text-center">
              <p className="text-white/70">Catégorie principale</p>
              <p className="text-2xl font-bold mt-1">
                {Object.keys(categoryMap).length > 0
                  ? Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0][0]
                  : "Aucune"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Exporter les données</h2>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => alert("Export PDF bientôt dispo")}>Exporter en PDF</Button>
            <Button onClick={() => alert("Export CSV bientôt dispo")} className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700">
              Exporter en CSV
            </Button>
            <Button onClick={() => alert("Export Excel bientôt dispo")} className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700">
              Exporter en Excel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;