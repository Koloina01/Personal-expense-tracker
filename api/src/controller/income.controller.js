import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const addIncome = async (req, res) => {
  try {
    const { userId } = req.params;
    const { amount, date, source, description } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ message: "Amount must be a valid number" });
    }

    const user = await prisma.user.findUnique({ 
        where: { id: parseInt(userId) } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const income = await prisma.income.create({
      data: {
        amount: new Decimal(amount),
        date: date ? new Date(date) : new Date(),
        source,
        description,
        userId: parseInt(userId),
      },
    });

    await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { budget: new Decimal(user.budget || 0).plus(amount) },
    });

    res.status(201).json({ message: "Income added successfully", income });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateIncome = async (req, res) => {
  try {
    const { incomeId } = req.params;
    const { amount, date, source, description } = req.body;

    const income = await prisma.income.findUnique({ where: { id: parseInt(incomeId) } });
    if (!income) return res.status(404).json({ message: "Income not found" });

    const user = await prisma.user.findUnique({ where: { id: income.userId } });

    let updatedBudget = new Decimal(user.budget || 0);
    if (amount !== undefined && !isNaN(amount)) {
      updatedBudget = updatedBudget.minus(income.amount).plus(amount);
    }

    const updatedIncome = await prisma.income.update({
      where: { id: parseInt(incomeId) },
      data: {
        amount: amount !== undefined ? new Decimal(amount) : income.amount,
        date: date ? new Date(date) : income.date,
        source: source || income.source,
        description: description ?? income.description,
      },
    });

    await prisma.user.update({
      where: { id: income.userId },
      data: { budget: updatedBudget },
    });

    res.json({ message: "Income updated successfully", updatedIncome });
  } catch (error) {
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
      data: { budget: new Decimal(user.budget || 0).minus(income.amount) },
    });

    await prisma.income.delete({ where: { id: parseInt(incomeId) } });

    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
