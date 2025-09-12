import { useState } from "react";

interface Expense {
  id: number;
  description: string;
  amount: number;
}

export default function ExpenseManagement() {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, description: "Achat nourriture", amount: 5000 },
    { id: 2, description: "Transport", amount: 2000 },
  ]);

  const [newExpense, setNewExpense] = useState("");
  const [newAmount, setNewAmount] = useState<number>(0);

  const addExpense = () => {
    if (!newExpense || !newAmount) return;
    setExpenses([
      ...expenses,
      { id: Date.now(), description: newExpense, amount: newAmount },
    ]);
    setNewExpense("");
    setNewAmount(0);
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Expense Management</h1>

      {/* Liste des dépenses */}
      <ul className="mb-6">
        {expenses.map((exp) => (
          <li key={exp.id} className="flex justify-between bg-white p-3 rounded shadow mb-2">
            <span>{exp.description} - {exp.amount} Ar</span>
            <button
              onClick={() => deleteExpense(exp.id)}
              className="text-red-500 font-bold"
            >
              X
            </button>
          </li>
        ))}
      </ul>

      {/* Formulaire ajout */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Description"
          value={newExpense}
          onChange={(e) => setNewExpense(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <input
          type="number"
          placeholder="Montant"
          value={newAmount}
          onChange={(e) => setNewAmount(Number(e.target.value))}
          className="border p-2 rounded w-1/4"
        />
        <button
          onClick={addExpense}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}
