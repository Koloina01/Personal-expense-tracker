import { Router } from "express";
import express from "express";
import { createExpense, deleteExpense, getAllExpenses, getExpenseById, updateExpense, createUser, createCategory } from '../controller/expense.controller.js';

const router = express.Router();

router.post("/", createUser);
router.post("/", createCategory);
router.post("/", createExpense);
router.get("/", getAllExpenses);
router.get("/:id", getExpenseById);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;