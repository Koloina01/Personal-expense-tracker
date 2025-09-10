import express from "express";
import dotenv from "dotenv";

import expenseRoutes from "./routes/expense.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/expenses", expenseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
