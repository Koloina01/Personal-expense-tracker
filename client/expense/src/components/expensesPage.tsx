import { useEffect, useState } from "react";
import axios from "axios";
import { Expense, Category } from "../models/model";
import ExpenseFilter from "./expenseFilter";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const fetchExpenses = async () => {
    const url = selectedCategory
      ? `/api/expenses?categoryId=${selectedCategory}`
      : "/api/expenses";
    const res = await axios.get<Expense[]>(url);
    setExpenses(res.data);
  };


  const fetchCategories = async () => {
    const res = await axios.get<Category[]>("/api/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [selectedCategory]);

  const handleDelete = async (id: number) => {
    await axios.delete(`/api/expenses/${id}`);
    fetchExpenses();
  };

  const handleEdit = (expense: Expense) => {
    console.log("Edit expense", expense);
  };

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Expense Managment</h1>

      <ExpenseFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onChange={handleCategoryChange}
      />

      <ul className="w-full border">
        <li className="flex bg-gray-200 font-bold p-2">
          <span className="w-1/6">Amount</span>
          <span className="w-1/6">Category</span>
          <span className="w-1/6">Date</span>
          <span className="w-1/6">Type</span>
          <span className="w-2/6">Description</span>
          <span className="w-1/6">Actions</span>
        </li>

        {expenses.map((expense) => (
          <li key={expense.id} className="flex border-t p-2">
            <span className="w-1/6">{expense.amount}</span>
            <span className="w-1/6">{expense.category?.name}</span>
            <span className="w-1/6">{expense.date}</span>
            <span className="w-1/6">{expense.type}</span>
            <span className="w-2/6">{expense.description}</span>
            <span className="w-1/6">
              <button onClick={() => handleEdit(expense)}>Edit</button>
              <button onClick={() => handleDelete(expense.id)}>Delete</button>
            </span>
          </li>
        ))}
      </ul>

    </div>
  );
}
