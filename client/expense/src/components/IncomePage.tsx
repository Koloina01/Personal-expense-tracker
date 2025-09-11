import React, { useEffect, useState } from "react";
import HexagonBackground from "./HexagonBackground"; 
import axios from "axios";

interface Income {
  id: number;
  amount: number;
  date: string;
  source: string;
  description?: string;
}

interface Props {
  userId: number;
}

const API_BASE = "http://localhost:5000";

const IncomePage: React.FC<Props> = ({ userId }) => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const fetchIncomes = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/users/${userId}/incomes`);
      setIncomes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const handleAddIncome = async () => {
    try {
      await axios.post(`${API_BASE}/api/users/${userId}/incomes`, {
        amount: parseFloat(amount),
        source,
        description,
        date,
      });
      setAmount("");
      setSource("");
      setDescription("");
      setDate("");
      fetchIncomes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteIncome = async (id: number) => {
    try {
      await axios.delete(`${API_BASE}/api/incomes/${id}`);
      fetchIncomes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="income-page relative w-full h-screen flex bg-black overflow-hidden font-sans">
      <HexagonBackground />

      {/* Formulaire d'ajout */}
      <div className="income-left flex-1 flex justify-center items-center p-12 text-white z-10">
        <div className="max-w-md w-full">
          <h1 className="text-4xl font-bold mb-4">Add New Income</h1>
          <p className="text-lg opacity-80 mb-6">
            Add your income and keep track of your budget easily.
          </p>

          <div className="flex flex-col gap-4 bg-white/10 p-6 rounded-xl backdrop-blur-md">
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:bg-white/30 outline-none"
            />
            <input
              type="text"
              placeholder="Source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:bg-white/30 outline-none"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:bg-white/30 outline-none"
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:bg-white/30 outline-none"
            />
            <button
              onClick={handleAddIncome}
              className="mt-2 py-3 px-4 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-semibold hover:scale-105 transition-transform"
            >
              Add Income
            </button>
          </div>
        </div>
      </div>

      {/* Liste des revenus */}
      <div className="income-right flex-1 flex justify-center items-center p-12 z-10 overflow-auto">
        <div className="w-full max-w-3xl bg-white/10 p-6 rounded-xl backdrop-blur-md text-white">
          <h2 className="text-3xl font-bold mb-4">Incomes List</h2>
          {incomes.length === 0 ? (
            <p className="opacity-80">No incomes yet.</p>
          ) : (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="border-b border-white/30">
                  <th className="py-2 px-3 text-left">Amount</th>
                  <th className="py-2 px-3 text-left">Source</th>
                  <th className="py-2 px-3 text-left">Date</th>
                  <th className="py-2 px-3 text-left">Description</th>
                  <th className="py-2 px-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {incomes.map((income) => (
                  <tr key={income.id} className="border-b border-white/20 hover:bg-white/10">
                    <td className="py-2 px-3">{income.amount}</td>
                    <td className="py-2 px-3">{income.source}</td>
                    <td className="py-2 px-3">{new Date(income.date).toLocaleDateString()}</td>
                    <td className="py-2 px-3">{income.description || "-"}</td>
                    <td className="py-2 px-3">
                      <button
                        onClick={() => handleDeleteIncome(income.id)}
                        className="text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncomePage;
