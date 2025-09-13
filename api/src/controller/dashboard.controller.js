import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id; 

    const expenses = await prisma.expense.findMany({
      where: { userId },
      include: { category: true },
    });

    const incomes = await prisma.income.findMany({ where: { userId } });

    const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
    const totalIncome = incomes.reduce((sum, i) => sum + Number(i.amount), 0);
    const remaining = totalIncome - totalExpenses;

    const expensesByCategory = {};
    expenses.forEach(e => {
      const cat = e.category?.name || "Autres";
      if (!expensesByCategory[cat]) expensesByCategory[cat] = 0;
      expensesByCategory[cat] += Number(e.amount);
    });

    const monthlyExpenses = Array(12).fill(0);
    const monthlyIncome = Array(12).fill(0);

    expenses.forEach(e => {
      const month = new Date(e.date).getMonth();
      monthlyExpenses[month] += Number(e.amount);
    });

    incomes.forEach(i => {
      const month = new Date(i.date).getMonth();
      monthlyIncome[month] += Number(i.amount);
    });

    res.json({
      totalExpenses,
      totalIncome,
      remaining,
      expensesByCategory,
      monthlyExpenses,
      monthlyIncome,
      name: req.user.name || "User", 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
