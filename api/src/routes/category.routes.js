import express from "express";
import {
  getCategories,
  updateCategory,
  deleteCategory,
  getCategoryBudget,
  setCategoryBudget,
} from "../controller/category.controller.js";

const router = express.Router();

router.get("/", getCategories);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
router.get("/:id/budget", getCategoryBudget);
router.put("/:id/budget", setCategoryBudget);

export default router;
