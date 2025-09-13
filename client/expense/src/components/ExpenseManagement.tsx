import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import HexagonBackground from "./HexagonBackground";
import "./css/ExpenseManagement.css";

interface Expense {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
  type: "ONE_TIME" | "RECURRING";
}

interface Category {
  id: number;
  name: string;
}

export default function ExpenseManagement() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingExpenseId, setEditingExpenseId] = useState<number | null>(null);
  const [editDescription, setEditDescription] = useState("");
  const [editAmount, setEditAmount] = useState<number>(0);
  const [editCategory, setEditCategory] = useState<number | "">("");
  const [editType, setEditType] = useState<"ONE_TIME" | "RECURRING">("ONE_TIME");
  const [editDate, setEditDate] = useState<string>(new Date().toISOString().split("T")[0]);

  const [newExpense, setNewExpense] = useState("");
  const [newAmount, setNewAmount] = useState<number>(0);
  const [newCategory, setNewCategory] = useState<number | "">("");
  const [newType, setNewType] = useState<"ONE_TIME" | "RECURRING">("ONE_TIME");
  const [newDate, setNewDate] = useState<string>(new Date().toISOString().split("T")[0]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/expenses", axiosConfig);
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories", axiosConfig);
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  const addExpense = async () => {
    if (!newExpense || !newAmount || newCategory === "") return alert("All fields are required");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/expenses",
        {
          description: newExpense,
          amount: newAmount,
          categoryId: newCategory,
          date: newDate,
          type: newType,
        },
        axiosConfig
      );
      setExpenses([res.data, ...expenses]);
      setNewExpense("");
      setNewAmount(0);
      setNewCategory("");
      setNewType("ONE_TIME");
      setNewDate(new Date().toISOString().split("T")[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteExpense = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`, axiosConfig);
      setExpenses(expenses.filter(e => e.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (expense: Expense, categoryId: number) => {
    setEditingExpenseId(expense.id);
    setEditDescription(expense.description);
    setEditAmount(expense.amount);
    setEditCategory(categoryId);
    setEditType(expense.type);
    setEditDate(expense.date.split("T")[0]);
  };

  const saveEdit = async (id: number) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/expenses/${id}`,
        {
          description: editDescription,
          amount: editAmount,
          categoryId: editCategory,
          type: editType,
          date: editDate,
        },
        axiosConfig
      );
      setExpenses(expenses.map(e => (e.id === id ? res.data : e)));
      setEditingExpenseId(null);
    } catch (err) {
      console.error(err);
    }
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
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Expense Management</h1>
        </header>

        <div className="expenses-list">
          {expenses.map(exp => {
            const categoryObj = categories.find(c => c.name === exp.category);
            const categoryId = categoryObj ? categoryObj.id : 1;
            return (
              <div key={exp.id} className="expense-card">
                {editingExpenseId === exp.id ? (
                  <div className="expense-edit-form">
                    <input type="text" value={editDescription} onChange={e => setEditDescription(e.target.value)} />
                    <input type="number" value={editAmount} onChange={e => setEditAmount(Number(e.target.value))} />
                    <select value={editCategory} onChange={e => setEditCategory(Number(e.target.value))}>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <select value={editType} onChange={e => setEditType(e.target.value as "ONE_TIME" | "RECURRING")}>
                      <option value="ONE_TIME">One-time</option>
                      <option value="RECURRING">Recurring</option>
                    </select>
                    <input type="date" value={editDate} onChange={e => setEditDate(e.target.value)} />
                    <button onClick={() => saveEdit(exp.id)}>Save</button>
                    <button onClick={() => setEditingExpenseId(null)}>Cancel</button>
                  </div>
                ) : (
                  <div className="expense-info">
                    <span className="expense-description">{exp.description}</span>
                    <span className="expense-amount">{exp.amount} Ar</span>
                    <span className="expense-category">Cat: {exp.category}</span>
                    <span className="expense-type">Type: {exp.type}</span>
                    <span className="expense-date">Date: {exp.date}</span>
                    <button onClick={() => startEdit(exp, categoryId)}>Edit</button>
                    <button onClick={() => deleteExpense(exp.id)}>Delete</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="expense-form">
          <input type="text" placeholder="Description" value={newExpense} onChange={e => setNewExpense(e.target.value)} className="expense-input" />
          <input type="number" placeholder="Amount" value={newAmount} onChange={e => setNewAmount(Number(e.target.value))} className="expense-input" />
          <select value={newCategory} onChange={e => setNewCategory(Number(e.target.value))} className="expense-input">
            <option value="">Select Category</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select value={newType} onChange={e => setNewType(e.target.value as "ONE_TIME" | "RECURRING")} className="expense-input">
            <option value="ONE_TIME">One-time</option>
            <option value="RECURRING">Recurring</option>
          </select>
          <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="expense-input" />
          <button onClick={addExpense} className="expense-add">Add Expense</button>
        </div>
      </main>
    </div>
  );
}
