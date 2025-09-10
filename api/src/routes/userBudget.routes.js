import express from "express";
import { checkUserBudget } from "../controller/userBudget.controller.js";

const router = express.Router();

router.get("/:userId/check-budget", checkUserBudget);

export default router;
