import { useState, useEffect } from "react";
import axios from "axios";
import { Expense, Category, ExpenseType } from "../models/model";

interface Props {
  expense?: Expense;
  onSaved: () => void;
}

export default function ExpenseForm({ expense, onSaved }: Props) {
  const [amount, setAmount] = useState(expense?.amount || "");
  const [date, setDate] = useState(expense?.date || "");
  const [description, setDescription] = useState(expense?.description || "");
  const [type, setType] = useState<ExpenseType>(expense?.type || "ONE_TIME");
  const [categoryId, setCategoryId] = useState<number>(expense?.categoryId || 0);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios.get<Category[]>("/api/categories").then((res) => setCategories(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { amount, date, description, type, categoryId };

    if (expense) {
      await axios.put(`/api/expenses/${expense.id}`, data);
    } else {
      await axios.post("/api/expenses", data);
    }
    onSaved();
  };

  return (
    <form className="p-4 bg-white border rounded mb-4" onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Montant"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-1 mb-2 w-full"
      />
      <input
        type="date"
        value={date?.split("T")[0] || ""}
        onChange={(e) => setDate(e.target.value)}
        className="border p-1 mb-2 w-full"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value as ExpenseType)}
        className="border p-1 mb-2 w-full"
      >
        <option value="ONE_TIME">One-time</option>
        <option value="RECURRING">Recurring</option>
      </select>
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(Number(e.target.value))}
        className="border p-1 mb-2 w-full"
      >
        <option value={0}>Choose category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-1 mb-2 w-full"
      />
      <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
        {expense ? "Mettre à jour" : "Ajouter"}
      </button>
    </form>
  );
}
