import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const addIncome = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const userId = req.user.id;
    const { amount, date, source, description } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ message: "Amount must be a valid number" });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const income = await prisma.income.create({
      data: {
        amount: parseFloat(amount),
        date: date ? new Date(date) : new Date(),
        source,
        description,
        userId,
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { budget: (user.budget || 0) + parseFloat(amount) },
    });

    res.status(201).json({ message: "Income added successfully", income });
  } catch (error) {
    console.error("Error adding income:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getIncomes = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const userId = req.user.id;
    const incomes = await prisma.income.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });
    res.json(incomes);
  } catch (error) {
    console.error("Error getting incomes:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const deleteIncome = async (req, res) => {
  try {
    const { incomeId } = req.params;
    const income = await prisma.income.findUnique({ where: { id: parseInt(incomeId) } });
    if (!income) return res.status(404).json({ message: "Income not found" });

    const user = await prisma.user.findUnique({ where: { id: income.userId } });

    await prisma.user.update({
      where: { id: income.userId },
      data: { budget: (user.budget || 0) - parseFloat(income.amount) },
    });

    await prisma.income.delete({ where: { id: parseInt(incomeId) } });
    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    console.error("Error deleting income:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateIncome = async (req, res) => {
  try {
    const { incomeId } = req.params;
    const { amount, date, source, description } = req.body;

    const income = await prisma.income.findUnique({ where: { id: parseInt(incomeId) } });
    if (!income) return res.status(404).json({ message: "Income not found" });

    let budgetDelta = 0;
    if (amount && !isNaN(amount)) {
      budgetDelta = parseFloat(amount) - income.amount;
    }

    const updatedIncome = await prisma.income.update({
      where: { id: parseInt(incomeId) },
      data: {
        amount: amount ? parseFloat(amount) : income.amount,
        date: date ? new Date(date) : income.date,
        source: source || income.source,
        description: description ?? income.description,
      },
    });

    if (budgetDelta !== 0) {
      await prisma.user.update({
        where: { id: income.userId },
        data: { budget: { increment: budgetDelta } },
      });
    }

    res.json({ message: "Income updated successfully", income: updatedIncome });
  } catch (error) {
    console.error("Error updating income:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getUserIncomes = async (req, res) => {
  try {
    const userId = req.user.id; 
    const incomes = await prisma.income.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });
    res.json(incomes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
