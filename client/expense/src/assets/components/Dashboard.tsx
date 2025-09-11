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
  <div className={`bg-white rounded-2xl shadow-md p-4 ${className || ""}`}>
    {children}
  </div>
);

const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="space-y-2">{children}</div>
);

const Button: React.FC<{ children: React.ReactNode; onClick?: () => void; className?: string }> = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition ${className || ""}`}
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
        backgroundColor: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
      },
    ],
  };

  
  const lineData = {
    labels: expenses.map((e) => e.date),
    datasets: [
      {
        label: "Dépenses journalières",
        data: expenses.map((e) => e.amount),
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold">Dépenses par catégorie</h2>
          <Pie data={categoryData} />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-bold">Dépenses dans le temps</h2>
          <Line data={lineData} />
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2">
        <CardContent>
          <h2 className="text-xl font-bold">Exporter les données</h2>
          <div className="flex gap-4">
            <Button onClick={() => alert("Export PDF bientôt dispo")}>Exporter en PDF</Button>
            <Button onClick={() => alert("Export CSV bientôt dispo")} className="bg-green-600 hover:bg-green-700">
              Exporter en CSV
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
