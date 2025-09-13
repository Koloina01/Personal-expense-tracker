import express from "express";
import {
  createExpense,
  deleteExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  createUser,
  createCategory,
} from "../controller/expense.controller.js";

import {
  getCategories,
  updateCategory,
  deleteCategory,
  getCategoryBudget,
  setCategoryBudget,
} from "../controller/category.controller.js";

import { checkUserBudget } from "../controller/userBudget.controller.js";
import { addIncome, updateIncome, deleteIncome, getUserIncomes } from "../controller/income.controller.js";
import { getDashboardData } from "../controller/dashboard.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/users", createUser);
router.get("/users/:userId/check-budget", checkUserBudget);

router.post("/categories", createCategory);
router.get("/categories", getCategories);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);
router.get("/categories/:id/budget", getCategoryBudget);
router.put("/categories/:id/budget", setCategoryBudget);

router.post("/expenses", authMiddleware, createExpense);
router.get("/expenses", authMiddleware, getAllExpenses);
router.get("/expenses/:id", authMiddleware, getExpenseById);
router.put("/expenses/:id", authMiddleware, updateExpense);
router.delete("/expenses/:id", authMiddleware, deleteExpense);

router.get("/incomes", authMiddleware, getUserIncomes);
router.post("/incomes", authMiddleware, addIncome);
router.put("/incomes/:incomeId", authMiddleware, updateIncome);
router.delete("/incomes/:incomeId", authMiddleware, deleteIncome);

router.get("/dashboard", authMiddleware, getDashboardData);

export default router;
