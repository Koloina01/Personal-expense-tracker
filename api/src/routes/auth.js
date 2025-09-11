import express from "express";
import { register, login } from "../controller/authController.js";
import { createExpense, deleteExpense, getAllExpenses, getExpenseById, updateExpense, createUser, createCategory } from '../controller/expense.controller.js';
import { getCategories, updateCategory, deleteCategory, getCategoryBudget, setCategoryBudget } from "../controller/category.controller.js";
import { checkUserBudget } from "../controller/userBudget.controller.js";
import { addIncome, updateIncome, deleteIncome } from '../controller/income.controller.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/users", createUser);
router.get("/users/:userId/check-budget", checkUserBudget);
router.post("/categories", createCategory);
router.get("/categories", getCategories);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);
router.get("/categories/:id/budget", getCategoryBudget);
router.put("/categories/:id/budget", setCategoryBudget);
router.post("/expenses", createExpense);
router.get("/expenses", getAllExpenses);
router.get("/expenses/:id", getExpenseById);
router.put("/expenses/:id", updateExpense);
router.delete("/expenses/:id", deleteExpense);
router.post("/users/:userId/incomes", addIncome);
router.put("/incomes/:incomeId", updateIncome);
router.delete("/incomes/:incomeId", deleteIncome);

export default router;