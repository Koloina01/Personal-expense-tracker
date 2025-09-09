import express from "express";
import { createExpense, deleteExpense, getAllExpenses, getExpenseById, updateExpense } from "./controllers/expense.controller.js";

const router = express.Router();

router.post("/", createExpense);
router.get("/", getAllExpenses);
router.get("/:id", getExpenseById);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;