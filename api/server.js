import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.js";
import apiRoutes from "./src/routes/api.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);   
app.use("/api", apiRoutes);         

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
