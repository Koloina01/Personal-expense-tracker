import React, { useState, useEffect } from "react";
import axios from "axios";
import HexagonBackground from "./HexagonBackground";
import "./css/ExpenseManagement.css";

interface Income {
  id: number;
  amount: number;
  date: string;
  source: string;
  description: string;
}

export default function IncomePage() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [source, setSource] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const token = localStorage.getItem("token");
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  const fetchIncomes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/incomes", axiosConfig);
      setIncomes(res.data);
    } catch (err) {
      console.error("Error fetching incomes: ", err);
      alert("Impossible de charger vos revenus. Vérifie que tu es connecté !");
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const handleSubmit = async () => {
    if (!amount) return alert("Amount is required");

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/incomes/${editingId}`,
          { amount, date, source, description },
          axiosConfig
        );
        setEditingId(null);
      } else {
        await axios.post(
          "http://localhost:5000/api/incomes",
          { amount, date, source, description },
          axiosConfig
        );
      }
      setAmount(0);
      setDate(new Date().toISOString().split("T")[0]);
      setSource("");
      setDescription("");
      fetchIncomes();
    } catch (err) {
      console.error("Error saving income: ", err);
      alert("Erreur lors de l'enregistrement du revenu !");
    }
  };

  const deleteIncome = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/incomes/${id}`, axiosConfig);
      fetchIncomes();
    } catch (err) {
      console.error("Error deleting income: ", err);
      alert("Erreur lors de la suppression du revenu !");
    }
  };

  const editIncome = (income: Income) => {
    setEditingId(income.id);
    setAmount(income.amount);
    setDate(income.date.split("T")[0]);
    setSource(income.source);
    setDescription(income.description);
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
          <a href="/dashboard">Dashboard</a>
          <a href="/profile">Profile</a>
          <a href="/expenses-management">Expense Management</a>
          <a href="/income">Income Tracking</a>
          <a href="/settings">Settings</a>
        </nav>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Income Management</h1>
        </header>

        <div className="expenses-list">
          {incomes.map((inc) => (
            <div key={inc.id} className="expense-card">
              <div className="expense-info">
                <span className="expense-description">{inc.source || "No Source"}</span>
                <span className="expense-amount">{inc.amount} Ar</span>
                <span className="expense-category">Desc: {inc.description}</span>
                <span className="expense-date">Date: {inc.date.split("T")[0]}</span>
              </div>
              <div className="category-buttons">
                <button onClick={() => editIncome(inc)} className="expense-add">Update</button>
                <button onClick={() => deleteIncome(inc.id)} className="expense-delete">Delete</button>
              </div>
            </div>
          ))}
        </div>

        <div className="expense-form">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="expense-input"
          />
          <input
            type="text"
            placeholder="Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="expense-input"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="expense-input"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="expense-input"
          />
          <button onClick={handleSubmit} className="expense-add">
            {editingId ? "Update Income" : "Add Income"}
          </button>
        </div>
      </main>
    </div>
  );
}
